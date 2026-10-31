import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconBraces } from "@tabler/icons-react";
import { APP_TINT } from "@/lib/tints";
import { SiteFooter } from "./site-footer";
import "@/pages/welcome/welcome.css";

/** Shell for simple content pages (terms, privacy, docs, faqs). */
export function InfoPage({ title, children }: { title: string; children: ReactNode }) {
  useEffect(() => {
    document.title = `${title} — JSON Formatter`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div data-welcome data-tint={APP_TINT} className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--w-page)" }}>
      <header className="flex h-11 w-full items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <IconBraces size={22} style={{ color: "var(--tint-to)" }} />
          <span className="text-[17px] font-semibold" style={{ color: "var(--w-label)" }}>JSON Formatter</span>
        </Link>
        <Link to="/editor" className="text-[15px] font-medium" style={{ color: "var(--tint-to)" }}>Open editor</Link>
      </header>
      <main className="mx-auto w-full max-w-[760px] flex-1 px-6 py-16">
        <h1 className="mb-8 text-[40px] font-semibold tracking-tight" style={{ color: "var(--w-label)" }}>{title}</h1>
        <div className="space-y-6 text-[17px] leading-relaxed [&_h2]:mt-10 [&_h2]:text-[21px] [&_h2]:font-semibold [&_h2]:text-[var(--w-label)]" style={{ color: "var(--w-muted)" }}>
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
