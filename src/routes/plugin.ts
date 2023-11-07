import { config } from "../speak-config";

export const onRequest: RequestHandler = ({ params, locale }) => {
  // Check supported locales
  const supportedLocale = config.supportedLocales.find(
    (value) => value.lang === params.lang,
  );
  console.log(params);

  // Check for 404 error page
  const lang = supportedLocale
    ? supportedLocale.lang
    : !params.lang && config.defaultLocale.lang;

  if (!lang) return;

  // Set Qwik locale
  locale(lang);
};
