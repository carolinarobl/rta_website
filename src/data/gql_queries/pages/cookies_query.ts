import { sectionBasicContent, sectionSEO } from "~/data/constants";

export const cookiesQuery = (locale:string)=>{`
query QueryCookies {
  pageCookies(locale:"${locale}"){    
    ${sectionBasicContent}
    ${sectionSEO}
      }
    }
  }
}`;}