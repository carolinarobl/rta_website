import { mediaUrl, sectionSEO } from "~/data/constants"

export const awardsQuery = (locale:string)=>{
    return `query {
        pageAward(locale:"${locale}"){
          data {
            attributes {
              Title
              Description
              
              Background {
                ${mediaUrl}
              }
              
              Awards {
                Title
                Award
                Year
                Background {
                  ${mediaUrl}
                }
                Icon {
                  ${mediaUrl}
                }
                Button{
                  Text
                  Link
                }
              }
      
              ${sectionSEO}
            }
          }
        }
      }` 
}