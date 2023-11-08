import { mediaUrl, sectionSEO } from "~/data/constants";

export const residentialQuery = (locale: String) => {
  return `
  query QueryResidential {
    pageResidential(locale:"${locale}"){    
      data{
        attributes{
          Services{
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
