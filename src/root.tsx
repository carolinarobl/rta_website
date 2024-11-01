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
//   const analyticsScriptP1 = `https://www.googletagmanager.com/gtag/js?id=G-73FN8JZHHH`;

// const analyticsScriptP2 = `
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());
//   gtag('config', 'G-73FN8JZHHH');
// `;

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
          <meta name="robots" content="noindex"/> 
          {/* <link ref="icon" href="/favicon.png" /> */}
          <RouterHead />

          <script defer async dangerouslySetInnerHTML={pixelScript}></script>
          <noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=427875699033893&ev=PageView&noscript=1"
/></noscript>
          {/* <script defer async src={analyticsScriptP1} ></script>
          <script defer async dangerouslySetInnerHTML={analyticsScriptP2}></script> */}

          <ServiceWorkerRegister />
        </head>
        <body lang="en" class="max-h-screen overflow-x-hidden">
          <RouterOutlet />
        </body>
      </QwikCityProvider>
    </QwikSpeakProvider>
  );
});
