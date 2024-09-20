import { mediaUrl, sectionSEO } from "~/data/constants"

export const sheridanQuery = (locale:string)=>{
    return `query QueryLPSheridan {
        lpSheridan (locale:"${locale}"){    
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

             Bullets{
                Title
                Text
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