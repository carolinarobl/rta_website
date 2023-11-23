import { sectionSEO } from "~/data/constants"

export const gfTvsQuery = (locale:string)=>{
    return `query gfTvSupport {
        pageGfTvS (locale:"${locale}") {
          data {
            attributes {
              IntroText
              IntroMedia {
                data {
                  attributes {
                    url
                  }
                }
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
      }
      ` 
}