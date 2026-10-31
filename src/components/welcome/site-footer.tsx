import { Link } from "react-router-dom";
import { IconBraces } from "@tabler/icons-react";

const COLUMNS = [
  { title: "Company", links: [{ to: "/terms", label: "Terms" }, { to: "/privacy", label: "Privacy" }] },
  { title: "Resources", links: [{ to: "/faqs", label: "FAQs" }, { to: "/docs", label: "Docs" }] },
];

/** Shared footer for the marketing pages: brand, link columns, copyright. */
export function SiteFooter() {
  return (
    <footer className="w-full px-6 py-12" style={{ borderTop: "1px solid var(--w-hairline)" }}>
      <div className="mx-auto flex max-w-[1380px] flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-3">
          <Link to="/" className="flex items-center gap-2">
            <IconBraces size={20} style={{ color: "var(--tint-to)" }} />
            <span className="text-[15px] font-semibold" style={{ color: "var(--w-label)" }}>JSON Formatter</span>
          </Link>
          <span className="text-[13px]" style={{ color: "var(--w-muted)" }}>© 2026 JSON Formatter</span>
        </div>
        <nav aria-label="Footer" className="flex gap-16">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="mb-3 text-[13px] font-semibold" style={{ color: "var(--w-label)" }}>{col.title}</h2>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-[13px] hover:underline" style={{ color: "var(--w-muted)" }}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
