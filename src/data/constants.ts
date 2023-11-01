export const strapiURL = "https://strapi.cblsrv43.rtatel.com";
export const gqlURL = `${strapiURL}/graphql`;

export const setURL = (url: String) => {
  return `${strapiURL}${url}`;
};

export const custLocale = (locale: String) => {
  return locale === "es" ? "es-419" : locale;
};

export const mediaUrl = `
data {
    attributes {
        url
        alternativeText
        caption
    }
}
`;

export const sectionSEO = `
SEO {
    MetaTitle
    MetaDescription
    Keywords
    preventIndexing
}
`;
