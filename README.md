# Json Formatter

A browser-based JSON formatter that parses, pretty-prints, minifies, validates, and converts your JSON to XML, CSV, or YAML. Paste your data, get results in one click, share via URL.

![Json Formatter](json-formatter.png)

## Designed For

- Developers debugging API responses and config files.
- Building internal tooling for engineering teams.
- Converting JSON payloads across data formats.
- Sharing structured data without third-party accounts.

## Features & capabilities

- Pretty-print formatting: Re-prints JSON from the token stream at 2, 3, or 4-space indent. Preserves 64-bit integers verbatim so numeric precision is never silently lost.
- One-click minification: Strips all whitespace and shows a live byte-reduction stat so you know exactly how much smaller the output is before you copy it.
- Caret-style validation: Parses your JSON and pinpoints errors with line, column, and expected-token detail. Click "Jump to line" and the editor scrolls to the problem.
- XML, CSV, and YAML conversion: Switch tabs to convert JSON into XML, YAML, or CSV without installing separate tools. Download each format with the correct file extension.
- URL-hash document sharing: Compresses the document into the URL with lz-string. Send the link and the recipient sees the exact JSON, no account or backend required.
- localStorage autosave: Every keystroke saves your document to the browser. Close the tab, come back later, and your work is exactly where you left it.
- File upload and download: Upload a local JSON file via drag or file picker. Download any output tab as .json, .xml, .csv, .yaml, or .txt with deterministic filenames.
- CodeMirror 6 editor: Full syntax highlighting, line numbers, bracket matching, and undo history powered by CodeMirror 6. Feels like a real IDE, runs in the browser.
- Client-only privacy: No data leaves your browser. No server, no analytics, no tracking. The tool runs entirely on the client with zero network requests at runtime.
