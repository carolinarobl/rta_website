import { mediaUrl, sectionSEO } from "~/data/constants"

export const gfTvsQuery = (locale:string)=>{
    return `query gfTvSupport {
        pageGfTvS (locale:"${locale}") {
          data {
            attributes {
              IntroText
              IntroMedia {
                ${mediaUrl}
              }
              DevicesTitle
              Devices {
                Title
                Paragraph
                Buttons {
                  Text
                  Link
                }
              }
              DevicesNote
              GuidePar {
                Title
                Paragraph
              }
              Guides {
                Title
                BtnText
                Guide {
                  data {
                    attributes {
                      url
                      name
                    }
                  }
                }
              }
              ${sectionSEO}
            }
          }
        }
        sectionChGuide{
          data{
            attributes{
              Logo{
                data{
                  attributes{
                    url
                  }
                }
              }
              Picture{
                data{
                  attributes{
                    url
                  }
                }
              }
              Title
              Paragraph
              GuideBox{
                Title
                BtnText
                Guide{
                  data{
                    attributes{
                      url
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
      ` 
}