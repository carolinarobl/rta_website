import { sectionBasicContent, sectionSEO } from "~/data/constants";

export const gigfastTvPrivacyPQuery =(locale:string)=>{
    return `query QuerygftvPrivacyP {
        pageGfTvPp(locale:"${locale}"){    
          ${sectionBasicContent}
          ${sectionSEO}
            }
          }
        }
      }`;
}