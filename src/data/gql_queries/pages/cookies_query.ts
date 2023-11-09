import { sectionBasicContent, sectionSEO } from "~/data/constants";

export const cookiesQuery = (locale:string)=>{
  return `
query QueryCookies {
  pageCookies(locale:"${locale}"){    
    ${sectionBasicContent}
    ${sectionSEO}
      }
    }
  }
}`;
};