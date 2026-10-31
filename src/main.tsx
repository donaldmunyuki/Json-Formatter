import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { installPaletteVars } from "@/lib/palette";
import { setupPwa, watchConnectivity } from "@/lib/pwa";
import { toast } from "sonner";
import "./index.css";
import "./base.css";
import "./style-pack.css";
import "./tints.css";
import "./motion.css";

// Publish the card palette as CSS variables so the Tailwind color tokens resolve.
installPaletteVars();

const theme = localStorage.getItem("theme") ?? "system";
if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")!).render(<App />);

setupPwa();
watchConnectivity((online) =>
  online
    ? toast.success("Back online")
    : toast("You're offline", { description: "Formatting and converting still work — your edits are saved on this device." }),
);
