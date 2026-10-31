import { useState } from "react";
import { Link } from "react-router-dom";
import LZString from "lz-string";

const EXAMPLES = [
  {
    title: "API response",
    tip: "Format it, then switch the output to YAML.",
    json: `{"id":42,"user":{"name":"Ada Lovelace","roles":["admin","editor"]},"active":true,"tags":[{"key":"team","value":"core"}]}`,
  },
  {
    title: "Table of records",
    tip: "Switch the output to CSV to get a spreadsheet-ready table.",
    json: `[{"sku":"A-100","name":"Notebook","price":4.5,"stock":120},{"sku":"B-200","name":"Pen","price":1.2,"stock":540},{"sku":"C-300","name":"Stapler","price":9.99,"stock":35}]`,
  },
  {
    title: "Service config",
    tip: "Compare the XML and YAML outputs.",
    json: `{"service":{"name":"api","port":8080,"database":{"host":"localhost","pool":10},"features":["cache","metrics"]}}`,
  },
  {
    title: "Broken JSON",
    tip: "Open it to see how errors are explained and highlighted.",
    json: `{\n  "name": "demo",\n  "items": [1, 2, 3,],\n  "ok": true\n}`,
  },
];

function pretty(text: string) {
  try { return JSON.stringify(JSON.parse(text), null, 2); } catch { return text; }
}

function Example({ title, tip, json }: (typeof EXAMPLES)[number]) {
  const [copied, setCopied] = useState(false);
  const shown = pretty(json);
  const copy = async () => {
    await navigator.clipboard.writeText(shown);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const hash = LZString.compressToEncodedURIComponent(shown);
  return (
    <div className="not-prose my-5 overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/50 px-4 py-2">
        <span className="text-sm font-medium">{title}</span>
        <div className="flex gap-2">
          <button onClick={copy} className="rounded-md border border-border px-3 py-1 text-sm hover:bg-muted" aria-live="polite">
            {copied ? "Copied" : "Copy"}
          </button>
          <Link to={`/editor#${hash}`} className="rounded-md px-3 py-1 text-sm font-medium" style={{ color: "var(--tint-to)" }}>
            Try in editor
          </Link>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed"><code>{shown}</code></pre>
      <p className="border-t border-border px-4 py-2 text-sm text-muted-foreground">{tip}</p>
    </div>
  );
}

export function DocExamples() {
  return <>{EXAMPLES.map((e) => <Example key={e.title} {...e} />)}</>;
}
