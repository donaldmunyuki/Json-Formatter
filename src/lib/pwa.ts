// Single place that registers the offline service worker. Never runs in dev or Lovable previews.
function isRefusedContext(): boolean {
  if (!import.meta.env.PROD) return true;
  try {
    if (window.self !== window.top) return true;
  } catch {
    return true;
  }
  const host = window.location.hostname.toLowerCase();
  const label = host.split(".")[0];
  const previewDomain = /\.(lovable\.app|gpt-eng\.com|gptengineer\.run)$/.test(host);
  if (previewDomain && /^(?:id-preview|preview)(?:-[a-z0-9]+)?--.+$/.test(label)) return true;
  if (previewDomain && /^project--[a-z0-9-]+-dev$/.test(label)) return true;
  if (/(^|\.)lovableproject(-dev)?\.com$/.test(host)) return true;
  if (/(^|\.)beta\.lovable\.dev$/.test(host)) return true;
  if (new URLSearchParams(window.location.search).get("sw") === "off") return true;
  return false;
}

async function unregisterAppWorkers() {
  if (!("serviceWorker" in navigator)) return;
  const regs = await navigator.serviceWorker.getRegistrations();
  await Promise.all(
    regs
      .filter((r) => [r.active, r.waiting, r.installing].some((w) => w?.scriptURL.endsWith("/sw.js")))
      .map((r) => r.unregister()),
  );
}

export async function setupPwa() {
  if (!("serviceWorker" in navigator)) return;
  if (isRefusedContext()) {
    await unregisterAppWorkers().catch(() => {});
    return;
  }
  const { registerSW } = await import("virtual:pwa-register");
  registerSW({ immediate: true });
}

// Tell the user when connection drops or returns; the app keeps working either way.
export function watchConnectivity(notify: (online: boolean) => void) {
  const on = () => notify(true);
  const off = () => notify(false);
  window.addEventListener("online", on);
  window.addEventListener("offline", off);
}
