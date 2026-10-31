import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { DataProvider } from "@/lib/data-provider";
import ApplicationLayout from "./layouts/application-layout";
import JsonFormatter from "./pages/landing";
import Welcome from "./pages/welcome";
import NotFound from "./pages/not-found";
import { Terms, Privacy, Faqs, Docs } from "./pages/info";

/**
 * JSON Formatter — a client-only tool with a marketing page in front of it.
 *
 * There is no auth, no backend data layer, no demo mirror, and no protected
 * routes. `/` explains the product, `/editor` is the product.
 *
 * Share links are the thing to be careful about here. `encodeShare` packs the
 * whole document into the URL hash, so a link IS its document — lose the hash
 * and the document is gone. Links made before the editor moved point at
 * `origin + "/#" + document`, which now lands on this marketing page. `Front`
 * below catches exactly that case and forwards the hash on, so every link ever
 * shared keeps working. Without it, an old link would show the landing page and
 * silently drop what it was carrying.
 */

/** `/` — the welcome page, unless the visitor is carrying a document. */
function Front() {
  const { hash } = useLocation();
  // A hash here can only be a share link: nothing else on this page writes one.
  if (hash && hash.length > 1) return <Navigate to={`/editor${hash}`} replace />;
  return <Welcome />;
}

const App = () => (
  <BrowserRouter>
    <DataProvider>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route element={<ApplicationLayout />}>
          <Route path="/editor" element={<JsonFormatter />} />
        </Route>
        {/* The old address, kept working rather than 404'd — it was published,
            and a link someone saved should not rot. */}
        <Route path="/welcome" element={<Navigate to="/" replace />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DataProvider>
    <Toaster />
  </BrowserRouter>
);

export default App;
