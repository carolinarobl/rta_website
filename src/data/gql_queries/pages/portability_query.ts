import { mediaUrl, sectionSEO } from "~/data/constants";

export const portabilityQuery = (locale: String) => {
  return `
    query QueryPortability{
        pagePortability(locale:"${locale}"){    
          data{
            attributes{
              Introduction{
                Title
                Subtitle
                Logo{
                ${mediaUrl}
                }
                Paragraph
                Media{
                ${mediaUrl}
                }
              }
              
              IntroductionBG{
                ${mediaUrl}
              }
      
              PortabilityActs{
                Title
                Subtitle
                Buttons{
                  Text
                  Link
                }
                Logo{
                ${mediaUrl}
                }
                Paragraph
                Media{
                ${mediaUrl}
                }
              }
              ${sectionSEO}
            }
          }
        }
      }
    `;
};
