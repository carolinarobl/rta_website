import { mediaUrl, sectionSEO } from "~/data/constants";

export const acpQuery = (locale: String) => {
  return `
  query QueryACP {
    pageAcp(locale:"${locale}"){    
      data{
        attributes{
        
          SummaryPar{
            Title
            Subtitle
            Paragraph
            Media{
              ${mediaUrl}
            }
          }
          
          ACPVideo{
            Link
            Paragraph
          }
          
          InfoHowItWorks{
            Title
            Subtitle
            Paragraph
          
          }
          
          Steps{
            Title
            Bullets{
              Title
              Text
            }
          }
          
          ${sectionSEO}
        }
      }
    }
  }
    `;
};
