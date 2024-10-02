import { mediaUrl, sectionSEO } from "~/data/constants"

export const allBroadbandLabelsQuery = (locale:string)=>{
    return `query {
  pageAllBroadbandlabel (locale:"${locale}"){
    data{
      attributes{
        Title
        Services{
          Picture{
            ${mediaUrl}
          }
          
          Title
        }

        ${sectionSEO}
        
      }
    }
  }
}`
}