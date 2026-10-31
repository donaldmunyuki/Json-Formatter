/**
 * The shared parse step for the JSON Formatter (`/`).
 *
 * Runs the `@humanwhocodes/momoa` tokenizer ONCE per document change and returns
 * a `DocumentResult`. Every output tab consumes this result — no tab ever parses
 * the document itself, and no render path ever throws.
 *
 * `momoa` is used deliberately (a recorded deviation from the idea doc's
 * "no external dependency" line): it yields a token stream with source ranges
 * (enabling lossless re-printing that preserves 64-bit integers) and structured
 * errors carrying exact line/column positions (powering the caret-style report).
 */
import { parse, evaluate } from "@humanwhocodes/momoa";

/** A parsed JSON value (numbers may be rounded — value consumers don't need lexeme fidelity). */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

/** One lexical token with its source range — everything Format/Minify need. */
export interface JsonToken {
  type: string;
  range: [number, number];
  loc: { start: { line: number; column: number; offset: number }; end: { line: number; column: number; offset: number } };
}

/** A structured, positioned parse error for the Problems tab. */
export interface ParseReport {
  line: number;
  column: number;
  /** The offending source line, left-truncated to ~60 chars (with a leading `...`). */
  context: string;
  /** Column position within `context` for the `^` caret line. */
  caretOffset: number;
  /** The tokenizer's message, e.g. "Unexpected token ',' at line 4, column 24". */
  message: string;
}

export type DocumentResult =
  | { status: "empty" }
  | { status: "invalid"; report: ParseReport }
  | { status: "valid"; value: JsonValue; tokens: JsonToken[]; source: string };

/** momoa token-type → the friendly lexeme shown in the error message. */
const FRIENDLY: Record<string, string> = {
  LBrace: "'{'",
  RBrace: "'}'",
  LBracket: "'['",
  RBracket: "']'",
  Colon: "':'",
  Comma: "','",
  String: "string",
  Number: "number",
  Boolean: "boolean",
  Null: "null",
  EOF: "end of input",
};

const MAX_CONTEXT = 60;

/** Turn momoa's raw message + position into the human report string. */
function humanize(rawMsg: string, line: number, column: number): string {
  const core = rawMsg
    .replace(/\s*\(\d+:\d+\)\s*$/, "")
    .replace(/\s*found\.?\s*$/, "")
    .replace(
      /\b(LBrace|RBrace|LBracket|RBracket|Colon|Comma|String|Number|Boolean|Null|EOF)\b/g,
      (m) => FRIENDLY[m] ?? m,
    );
  return `${core} at line ${line}, column ${column}`;
}

/** Build the caret context window for a given line/column of `source`. */
function buildContext(source: string, line: number, column: number): { context: string; caretOffset: number } {
  const lines = source.split("\n");
  const raw = lines[line - 1] ?? "";
  let context = raw;
  let caretOffset = Math.max(0, column - 1);

  if (context.length > MAX_CONTEXT) {
    const start = Math.max(0, caretOffset - 40);
    context = (start > 0 ? "... " : "") + context.slice(start, start + MAX_CONTEXT);
    caretOffset = (start > 0 ? 4 : 0) + (caretOffset - start);
  }
  caretOffset = Math.min(caretOffset, context.length);
  return { context, caretOffset };
}

/** Extract a positioned report from a momoa parse error. */
function extractReport(error: unknown, source: string): ParseReport {
  const rawMsg = error instanceof Error ? error.message : String(error);
  const match = rawMsg.match(/\((\d+):(\d+)\)\s*$/);
  const line = match ? Number(match[1]) : 1;
  const column = match ? Number(match[2]) : 1;
  const { context, caretOffset } = buildContext(source, line, column);
  return { line, column, context, caretOffset, message: humanize(rawMsg, line, column) };
}

/**
 * Parse a document. Pure and synchronous — never throws. Callers memoize this by
 * referential equality of `text` (every CodeMirror `onChange` yields a new string).
 */
export function parseDocument(text: string): DocumentResult {
  if (text.trim() === "") return { status: "empty" };
  try {
    const ast = parse(text, { mode: "json", ranges: true, tokens: true }) as unknown as {
      tokens: JsonToken[];
    };
    return {
      status: "valid",
      value: evaluate(ast as never) as JsonValue,
      tokens: ast.tokens,
      source: text,
    };
  } catch (error) {
    return { status: "invalid", report: extractReport(error, text) };
  }
}
