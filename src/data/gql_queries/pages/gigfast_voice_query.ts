import { mediaUrl, sectionSEO } from "~/data/constants";

export const gigfastVoiceQuery = (locale: string) => {
  return `
  query {
    pageGfV(locale:"${locale}") {
      data {
        attributes {
          Logo {
            ${mediaUrl}
          }
          Introduction {
            Title
            Paragraph
            Buttons {
              Text
              Link
            }
          }
          PackTables {
            Logo {
              ${mediaUrl}
            }
            Title
            Subtitle
            Price
            Pricetime
            Description
            Features {
              Title
              Text
            }
            Button {
              Text
              Link
              Icon {
                data {
                  attributes {
                    name
                    url
                  }
                }
              }
            }
          }
          ${sectionSEO}
        
        }
      }
    }
    sectionPortGfv(locale:"${locale}"){
        data{
          attributes{
            Portability{
              Title
              Logo{
               ${mediaUrl}
              }
              Paragraph
              Media{
               ${mediaUrl}
              }
              Buttons{
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
