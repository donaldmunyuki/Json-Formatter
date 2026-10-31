# Agent rules

- Offline support uses vite-plugin-pwa (generateSW, `/sw.js`) registered only from `src/lib/pwa.ts`, which refuses dev, iframes and Lovable preview hosts — stale workers in previews break the editor.
