import { mediaUrl, sectionSEO } from "~/data/constants";

export const businessQuery = (locale: string) => {
  return `query QueryBusiness {
    pageBusiness(locale:"${locale}"){    
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
  }`;
};
