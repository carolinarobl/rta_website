import { mediaUrl, sectionNetwork, sectionSEO } from "~/data/constants";

export const wholesaleQuery = (locale: string) => {
  return `query QueryWholesale {
        pageWholesale(locale:"${locale}"){    
          data{
            attributes{
            Introduction{
              Title
              Paragraph
              Buttons{
                Text
                Link
              }
            }
              
            NetworkLogo{
                ${mediaUrl}
            }
            NetworkDIA{
              Title
              Paragraph
              Subtitle
              FeaturesTitle
              Features{
                Text
              }
              Media{
                ${mediaUrl}
              }
            }
            NetworkCircuits{
              Title
              Subtitle
              Paragraph
              Media{
                 ${mediaUrl}
              }
            }
           
              
            GFServices{
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
              NetworkMap {
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
                    }
                  }
                }
              }
            }
          }
        }
        ${sectionNetwork(locale)}
      }`;
};
