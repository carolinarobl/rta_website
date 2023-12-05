import { mediaUrl } from "~/data/constants"

export const sectionChannelGuideQuery = (locale: string) => {
  return `sectionChGuide(locale:"${locale}"){
        data{
          attributes{
            Logo{
              ${mediaUrl}
            }
            Title
            Paragraph
            
            GuideBox{
              BtnText
              Guide{
                data{
                  attributes{
                    name
                    url
                  }
                }
              }
            }
            
            Picture{
             ${mediaUrl}
            }
          }
        }
      }`
}