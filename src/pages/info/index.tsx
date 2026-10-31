import { DocExamples } from "@/components/welcome/doc-examples";
import { InfoPage } from "@/components/welcome/info-page";
import { Faq } from "@/components/welcome/faq";

export function Terms() {
  return (
    <InfoPage title="Terms of Use">
      <p>Last updated: October 2026. By using JSON Formatter you agree to these terms.</p>
      <h2>The service</h2>
      <p>JSON Formatter is a free tool that formats, validates and converts JSON entirely in your browser. It is provided "as is", without warranties of any kind.</p>
      <h2>Your content</h2>
      <p>You keep all rights to the documents you work with. We never receive them, so we cannot view, store or use them.</p>
      <h2>Acceptable use</h2>
      <p>Don't use the tool to break the law or to interfere with the site's operation.</p>
      <h2>Liability</h2>
      <p>We are not liable for any loss arising from use of the tool. Always keep your own copy of important data.</p>
      <h2>Installed app and offline use</h2>
      <p>You may install JSON Formatter on your device and use it without an internet connection. The installed app updates itself when you're back online. Offline availability is offered as a convenience and isn't guaranteed — your browser may clear its saved copy at any time.</p>
      <h2>Changes</h2>
      <p>We may update these terms; the date above shows the latest revision.</p>
    </InfoPage>
  );
}

export function Privacy() {
  return (
    <InfoPage title="Privacy Policy">
      <p>Last updated: October 2026. Short version: your JSON never leaves your device.</p>
      <h2>What we collect</h2>
      <p>Nothing you paste or open is sent to a server. Parsing, formatting and conversion all run locally in your browser.</p>
      <h2>Local storage</h2>
      <p>Your current document and theme preference are saved in your browser's local storage so they're there next time. Clearing your browser data removes them.</p>
      <h2>Offline copy of the app</h2>
      <p>To work offline, your browser keeps a copy of the app's own files (pages, styles, icons) on your device. This copy contains no personal data and none of your documents. Nothing is tracked or synced in the background while you're offline. Uninstalling the app or clearing site data removes it.</p>
      <h2>Share links</h2>
      <p>A share link contains the document itself, compressed into the URL. Anyone with the link can read it, so only share it with people you trust.</p>
      <h2>Contact</h2>
      <p>Questions about privacy? Get in touch and we'll be happy to help.</p>
    </InfoPage>
  );
}

export function Docs() {
  return (
    <InfoPage title="Docs">
      <p>Everything you need to get the most out of JSON Formatter.</p>
      <h2>Getting started</h2>
      <p>Open the editor and paste JSON into the left pane, or upload a file up to 5 MB. The formatted result appears on the right as you type.</p>
      <h2>Errors</h2>
      <p>If your JSON is invalid, the problems panel shows what went wrong and the line is highlighted in the editor.</p>
      <h2>Converting</h2>
      <p>Switch the output tab to YAML, XML or CSV. CSV works best for flat arrays of objects.</p>
      <h2>Minify and copy</h2>
      <p>Use the action bar to minify, copy the output, or download it as a file.</p>
      <h2>Sharing</h2>
      <p>Create a share link to send your document to someone else. The document is stored inside the link — no account needed.</p>
      <h2>Themes</h2>
      <p>Pick an editor theme from the theme menu; your choice is remembered.</p>
      <h2>Install the app</h2>
      <p>JSON Formatter can be installed like a regular app. In Chrome or Edge on desktop, click the install icon in the address bar. On Android, open the browser menu and choose "Install app". On iPhone or iPad, tap Share in Safari, then "Add to Home Screen". It opens in its own window, straight into the editor.</p>
      <h2>Working offline</h2>
      <p>After your first visit, the app is saved on your device, so formatting, validating, minifying and converting to YAML, XML or CSV all keep working without internet. Your document stays saved locally, and a small notice tells you when you go offline or come back online. Updates download automatically next time you're connected.</p>
      <h2>Try it: examples</h2>
      <p>Copy any example, or open it straight in the editor to try formatting and converting.</p>
      <DocExamples />
    </InfoPage>
  );
}

export function Faqs() {
  return (
    <InfoPage title="FAQs">
      <div className="-mx-6"><Faq /></div>
    </InfoPage>
  );
}
