import { mediaUrl, sectionSEO } from "~/data/constants";

export const gfiSupportQuery = (locale: string) => {
  return `query {
    pageGfIS(locale:"${locale}") {
      data {
        attributes {
          Introduction {
            Paragraph
            Media {
              ${mediaUrl}
            }
          }
          Tips {
            Title
            Bullets {
              Title
              Text
              Icon {
               ${mediaUrl}
              }
            }
          }
          InternetInfo {
            Title
            Paragraph
            Media {
              ${mediaUrl}
            }
          }
          InternetExample {
            Text
          }
          WiFiPicture {
           ${mediaUrl}
          }
          WiFiListing {
            Title
            Bullets {
              Title
              Text
            }
          }
          TestPar{
            Title
            Paragraph
            Media{
              ${mediaUrl}
            }
          }
          TestStepss{
            Title
            Text
          }
          TestGlossary {
            Paragraph
            Media {
              ${mediaUrl}
            }
          }
          TroubleSteps {
            Title
            Bullets {
              Title
              Text
            }
          }
          TroubleDescription
          ${sectionSEO}
  
        }
      }
    }
  }`;
};
