import { mediaUrl, sectionSEO } from "~/data/constants";

export const postQuery = (slug: string, locale: string) => {
  const isES = locale === "es-419";

  return `query QueryPostPage {
        posts (filters: {Slug: {eq: "${slug}${
          isES ? "-es" : ""
        }"}} pagination:{limit:1} locale:"${locale}") {
          data {
            attributes {
              Title
              Date
              Description
              Slug
              Cover {
                ${mediaUrl}
              }
              ${sectionSEO} 
            }
          }
        }
      }`;
};
