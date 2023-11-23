import { mediaUrl, sectionSEO } from "~/data/constants";

export const dealsQuery = (locale: string) => {
  return `
  query QueryDeals{
    pageDeals(locale:"${locale}"){
      data{
        attributes{
          Deals {
            isVisible
            Title
            Description
            Deal
            Deals_description
            Media {
              ${mediaUrl}
            }
            Services {
              Title
              Icon {
                ${mediaUrl}
              }
            }
            Button {
              Text
              Link
            }
          }
  
          RefInfo{
            Title
            Paragraph
            Media{
              ${mediaUrl}
            }
            Buttons{
              Text
              Link
            }
          }
          RefBackground{
            ${mediaUrl}
          }
          
          Discounts{
            Title
            Paragraph
            Media{
             ${mediaUrl}
            }
          }
          Disclaimer
          
          ${sectionSEO}
        }
      }
    }
  }
    `;
};
