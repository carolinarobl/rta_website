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

const pixelScript = `
!function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '427875699033893');
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
          <meta name="robots" content="index" />
          {/* <link ref="icon" href="/favicon.png" /> */}
          <RouterHead />

          <script defer async src={analyticsScriptP1} ></script>
          <script defer async dangerouslySetInnerHTML={analyticsScriptP2}></script>
          <script defer async dangerouslySetInnerHTML={gtmScriptP1}></script>
          <script defer async dangerouslySetInnerHTML={pixelScript}></script>
          <ServiceWorkerRegister />
        </head>
        <body lang="en" class="max-h-screen overflow-x-hidden">
        <noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=427875699033893&ev=PageView&noscript=1"
/></noscript>
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W5BJSW4"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

          <RouterOutlet />
        </body>
      </QwikCityProvider>
    </QwikSpeakProvider>
  );
});