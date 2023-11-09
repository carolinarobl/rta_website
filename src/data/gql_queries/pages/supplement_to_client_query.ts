import { sectionBasicContent, sectionSEO } from "~/data/constants";

export const supplementToClientQuery = (locale: string) => {
    return `query QuerySupplement {
        pageSuppleTerms(locale:"${locale}"){    
          ${sectionBasicContent}
          ${sectionSEO}
            }
          }
        }
      }`;
}