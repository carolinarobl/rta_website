import { mediaUrl, sectionSEO } from "~/data/constants"

export const texasQuery = (locale:string)=>{
    return `query{
        locations(locale:"${locale}", pagination:{limit:500}){
          data{
            attributes{
              Name
              ZipCode
              Description
              Slug
              office{
                data{
                  attributes{
                    Location
                  }
                }
              }
              ${sectionSEO}
            }
          }
        }
      }`
}