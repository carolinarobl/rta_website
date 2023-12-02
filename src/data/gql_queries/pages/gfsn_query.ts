import { mediaUrl, sectionSEO } from "~/data/constants"

export const gfSportsNetworkQuery=(locale:string)=>{
    return `query queryGfsn{
        pageGfSports(locale:"${locale}"){
          data{
            attributes{
              
              Introduction{
                Title
                Subtitle
                Paragraph
                Media{
                 ${mediaUrl}
                }
               
              }
              
              UpdatesTitle
              
              UpdatesCarousel{
                Picture{
                  ${mediaUrl}
                }
                Link
                Title
                Subtitle
              }
              
              FeatInterview{
                Title
                Subtitle
                Paragraph
                
                Buttons{
                  Text
                  Link
                  Icon{
                    ${mediaUrl}
                  }
                }
              }
              
              
              FeatVideo
              
              Interviews{
                Picture{
                  ${mediaUrl}
                }
                Link
                Title
              }
              ${sectionSEO}
            }
          }
        }
      }`
}