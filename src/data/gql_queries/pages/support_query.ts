import { mediaUrl, sectionSEO } from "~/data/constants"
import { sectionContactBoxesQuery } from "../sections_queries/section_contact_boxes_query"

export const supportQuery = (locale:string)=>{
    return `query QuerySupport{
        pageSupport(locale:"${locale}"){
          data{
            attributes{
              Marquee
              
              WTTTitle
              WTTButton{
                Text
                Link
              }
              
              Introduction{
                Title
                Subtitle
                Paragraph
              }
              
              SelfSupport{
                Media{
                ${mediaUrl}
                }
                Title
                Paragraph
                Buttons{
                  Text
                  Link
                }
              }
              
              ${sectionSEO}
            }
          }
        }
        ${sectionContactBoxesQuery(locale)}
      }` 
}