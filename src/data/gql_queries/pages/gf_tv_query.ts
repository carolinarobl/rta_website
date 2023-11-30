import { mediaUrl, sectionSEO } from "~/data/constants"
import { sectionChannelGuideQuery } from "../sections_queries/section_channel_guide_query"

export const gfTvQuery =(locale:string)=>{
    return `query {
        pageGfTv(locale:"${locale}"){
          data {
            attributes {
              Logo {
               ${mediaUrl}
              }
              Titles {
                Text
              }
              Features {
                Title
                Subtitle
                Paragraph
                Media {
                  ${mediaUrl}
                }
              }
              Feature {
                Title
                Subtitle
                Paragraph
              }
              ChPackTitle
              ChPackTables {
                Logo {
                  ${mediaUrl}
                }
                Title
                Subtitle
                Price
                Pricetime
                Description
                Channels {
                  ${mediaUrl}
                }
                LineupButton{
                  Text
                  Link
                }
                Features {
                  Title
                  Text
                }
                Button {
                  Text
                  Link
                }
              }
              PremiumTitle
              PremiumTables {
                Title
                Price
                Pricetime
                Features {
                  Title
                }
              }
      
              
              
              AdditionalsTitle
              Additionals {
                Title
                Paragraph
              }
              Disclaimers
              
              ${sectionSEO}
            }
          }
        }
        ${sectionChannelGuideQuery(locale=locale)}
      }` 
}