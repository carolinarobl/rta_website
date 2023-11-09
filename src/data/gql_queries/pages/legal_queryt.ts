import { sectionBasicContent, sectionSEO } from "~/data/constants";

export const legalQuery = (locale: string) => {
    return `query QueryLegal {
        pageLegal(locale:"${locale}"){    
          ${sectionBasicContent}
          ${sectionSEO}
            }
          }
        }
      }`;
}