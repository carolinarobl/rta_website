import { mediaUrl } from "~/data/constants";

export const locationQuery = (locale: string, slug: string) => {
  const slugSuffix = locale === "en" ? "" : "-es";
  return `
  query QueryLocalPage {
    locations(
      filters: { Slug: { eq: "${slug}${slugSuffix}" } }
      locale: "${locale}"
    ) {
      data {
        attributes {
            office {
                data {
                  attributes {
                    Address
                  }
                }
              }
          Name
          ZipCode
          Description
          Slug
          SEO {
            MetaTitle
            MetaDescription
            preventIndexing
            Keywords
          }
        }
      }
    }
    lpPtGroup(locale:"${locale}"){
        data{
          attributes{
            PricingTables{
              Logo{
                ${mediaUrl}
              }
              Title
              Subtitle
              Price
              Pricetime
              Description
              Features{
                Text
              }
              Button{
                Text
                Link
              }
            }
          }
        }
      } 
  }  
    `;
};
