import { sectionBasicContent, sectionSEO } from "~/data/constants";

export const transparencyQuery = (locale: string) => {
    return `query QueryInternetTransparency {
        pageTransparency(locale:"${locale}"){    
          ${sectionBasicContent}
          ${sectionSEO}
            }
          }
        }
      }`;
}