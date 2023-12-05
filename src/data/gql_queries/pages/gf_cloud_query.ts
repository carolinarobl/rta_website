import { mediaUrl, sectionSEO } from "~/data/constants"

export const gfCloudQuery = (locale:string)=>{
    return `query QueryGFCloud {
        pageGfCloud (locale:"${locale}"){    
          data{
            attributes{
              GNetworkLogo{
                ${mediaUrl}
              }
            GFCloud{
              Title
              Logo{
                ${mediaUrl}
              }
              Paragraph
              Media{
                ${mediaUrl}
              }
              Buttons{
                Text
                Link
              }
            }
              
            ${sectionSEO}
            }
          }
        }
        sectionNetwork (locale:"${locale}"){
          data {
            attributes {
              Map {
                MapPicture {
                  ${mediaUrl}
                }
                ServersTitle
                Servers {
                  Text
                  Link
                  Icon{
                    data{
                      attributes{
                        url
                      }
                    }
                  }
                }
              }
              Description{
                Title
                Paragraph
              }
            }
          }
        }
      }` 
}