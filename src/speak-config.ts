import type { SpeakConfig } from "qwik-speak";

export const config: SpeakConfig = {
  defaultLocale: {
    lang: "en",
    currency: "USD",
    timeZone: "America/Los_Angeles",
  },
  supportedLocales: [
    { lang: "en", currency: "USD", timeZone: "America/Los_Angeles" },
    { lang: "es", currency: "USD", timeZone: "America/Los_Angeles" },
  ],
  assets: [
    "app", // Translations shared by the pages
  ],
};
