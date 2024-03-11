import { mediaUrl, sectionSEO } from "~/data/constants"

export const freeInstallQuery = (locale:string)=>{
    return `query QueryLPNeighbor {
        lpNeighbor (locale:"${locale}"){    
          data{
            attributes{
              Logo{
                ${mediaUrl}
              }

              SectionHead{
                Title
                Subtitle
                Paragraph
                Logo{
                    ${mediaUrl}
                }
                Media{
                    ${mediaUrl}
                }
                Buttons{
                  Text
                  Link
                }
              }

              SpeedBullets{
                Title
                Text
              }

              SectionSpeed{
                Title
                Paragraph
                Buttons{
                  Text
                  Link
                }
              }

              SectionRating{
                Title
                Subtitle
                Paragraph
                Buttons{
                  Text
                  Link
                }
                Media{
                    ${mediaUrl}
                }
              }
              
              Footer{
                Text
                Link
              }
            ${sectionSEO}
            }
          }
        }
        
      }` 
}