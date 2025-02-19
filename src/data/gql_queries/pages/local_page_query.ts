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
                    Schema
                    Phone{
                      Link
                      Text
                    }
                  }
                }
              }
          Name
          ZipCode
          Description
          Slug
          
          posts(sort: "Date:desc", pagination: { limit: 100 }){
            data{
              attributes{
                Title
                Date
                Cover{
                  ${mediaUrl}
                }
                Description
                VideoLink
                Gallery{
                  ${mediaUrl}
                }
                Slug
              }
            }
          }

              FAQ{
                Title
                Paragraph
                Disclaimer{
                Icon{
                    ${mediaUrl}
                }
                Title
                Text
                Caption
                }

                Table(pagination: { limit: 50 }){
                ColumnOne
                ColumnTwo
                ColumnThree
                }
              }
          
          SEO {
            MetaTitle
            MetaDescription
            preventIndexing
            Keywords
          }
        }
      }
    }
    sectionProsRta(locale:"${locale}") {
    data {
      attributes {
        Pros {
          Icon {
            ${mediaUrl}
          }
          Title
          Text
          Caption
        }
      }
    }
  }

  pageHome(locale:"${locale}"){
    data{
      attributes{

        ProsPar{
          Title
          Paragraph
        }

        ProsPicture{
          ${mediaUrl}
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
