import { mediaUrl, sectionSEO } from "~/data/constants";

export const gigfastIOTQuery = (locale: String) => {
  return `
  query QueryGFIoT {
    pageGfIoT(locale:"${locale}"){
      data{
        attributes{
          Logo{
            ${mediaUrl}
          }
          
          Introduction{
            Title
            Paragraph
          }
          
          WeatherAnounce{
            Title
            Paragraph
            Buttons{
              Text
              Link
            }
          }
          
          Services{
            Logo{
             ${mediaUrl}
            }
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
          ${sectionSEO}
        }
      }
    }
  }
    `;
};
