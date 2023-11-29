import { mediaUrl, sectionSEO } from "~/data/constants"

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
      }` 
}