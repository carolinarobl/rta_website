import { sectionSEO } from "~/data/constants"

export const gfCloudQuery = (locale:string)=>{
    return `query QueryGFCloud {
        pageGfCloud (locale:"${locale}"){    
          data{
            attributes{
              GNetworkLogo{
                data{
                  attributes{
                    url
                  }
                }
              }
            GFCloud{
              Title
              Logo{
                data{
                  attributes{
                    url
                  }
                }
              }
              Paragraph
              Media{
                data{
                  attributes{
                    url
                  }
                }
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
        sectionNetwork {
          data {
            attributes {
              Map {
                MapPicture {
                  data {
                    attributes {
                      url
                    }
                  }
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