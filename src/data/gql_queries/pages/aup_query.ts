import { sectionBasicContent, sectionSEO } from "~/data/constants";

export const aupQuery = (locale: string) => {
    return `query QueryAUP {
        pageAuPolicy(locale:"${locale}"){    
          ${sectionBasicContent}
          ${sectionSEO}
            }
          }
        }
      }`;
}