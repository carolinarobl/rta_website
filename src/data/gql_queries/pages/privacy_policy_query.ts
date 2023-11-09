import { sectionBasicContent, sectionSEO } from "~/data/constants";

export const PrivacyPQuery = (locale:string) => {
    return `
query QueryPrivacyP {
  pagePrivacyP(locale:"${locale}"){    
    ${sectionBasicContent}
    ${sectionSEO}
      }
    }
  }
}
`;}