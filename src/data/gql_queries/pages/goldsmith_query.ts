import { mediaUrl, sectionSEO } from "~/data/constants"

export const goldsmithQuery = (locale:string)=>{
    return `query QueryLPGoldsmith {
        lpGoldsmith (locale:"${locale}"){    
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