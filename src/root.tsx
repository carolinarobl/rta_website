import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import { QwikSpeakProvider } from "qwik-speak";
import { config } from "./speak-config";
import { translationFn } from "./speak-functions";

import "./global.css";

export default component$(() => {
  const analyticsScriptP1 = `https://www.googletagmanager.com/gtag/js?id=G-73FN8JZFH3`;

const analyticsScriptP2 = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-73FN8JZFH3');
`;
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikSpeakProvider config={config} translationFn={translationFn}>
      <QwikCityProvider>
        <head>

        
          <meta charSet="utf-8" />
          <link rel="manifest" href="/manifest.json" />
          {/* <link ref="icon" href="/favicon.png" /> */}
          <RouterHead />
          <script defer async src={analyticsScriptP1} ></script>
          <script defer async dangerouslySetInnerHTML={analyticsScriptP2}></script>

          <ServiceWorkerRegister />
        </head>
        <body lang="en" class="max-h-screen">
          <RouterOutlet />
        </body>
      </QwikCityProvider>
    </QwikSpeakProvider>
  );
});
