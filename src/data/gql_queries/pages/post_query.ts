export const postQuery = (slug: string, locale: string) => {
  const isES = locale === "es-419";
  console.log(`query QueryPostPage {
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
            data {
              attributes {
                url
                caption
                alternativeText
              }
            }
          }
          SEO {
            MetaTitle
            MetaDescription
            Keywords
            preventIndexing
          }
          
        }
      }
    }
  }`);
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
                data {
                  attributes {
                    url
                    caption
                    alternativeText
                  }
                }
              }
              SEO {
                MetaTitle
                MetaDescription
                Keywords
                preventIndexing
              }
              
            }
          }
        }
      }`;
};
