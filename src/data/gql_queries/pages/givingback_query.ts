import { mediaUrl, sectionSEO } from "~/data/constants";

export const givingBackQuery = (locale: String) => {
  return `
    query QueryGivingBack {
        pageGivingBack(locale:"${locale}"){    
          data{
            attributes{
                 Title
              Helping{
                Logo{
                 ${mediaUrl}
                }
                Media{
                  ${mediaUrl}
                }
                Title
                Paragraph
                Buttons{
                  Text
                  Link
                }
              }
              ${sectionSEO}
            }
          }
        }
      }
    `;
};
