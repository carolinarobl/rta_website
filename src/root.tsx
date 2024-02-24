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
  const analyticsScriptP1 = `https://www.googletagmanager.com/gtag/js?id=G-19EN0CY127`;

  const analyticsScriptP2 = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-19EN0CY127');
  `;

  const gtmScriptP1 = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-W5BJSW4');`;




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
          <meta name="robots" content="index" />
          {/* <link ref="icon" href="/favicon.png" /> */}
          <RouterHead />

          <script defer async src={analyticsScriptP1} ></script>
          <script defer async dangerouslySetInnerHTML={analyticsScriptP2}></script>
          <script defer async dangerouslySetInnerHTML={gtmScriptP1}></script>

          <ServiceWorkerRegister />
        </head>
        <body lang="en" class="max-h-screen overflow-x-hidden">
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W5BJSW4"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

          <RouterOutlet />
        </body>
      </QwikCityProvider>
    </QwikSpeakProvider>
  );
});