import { mediaUrl, sectionSEO } from "~/data/constants";

export const gfInternetQuery = (locale:string)=>{
    return `query QueryGFInternet {
        pageGfInternet(locale:"${locale}"){
          data {
            attributes {
              Logo {
                ${mediaUrl}
              }
              Introduction {
                Paragraph
                Buttons {
                  Text
                  Link
                }
              }
              PackTables {
                Logo {
                  ${mediaUrl}
                }
                Title
                Subtitle
                Price
                Pricetime
                Description
                Features {
                  Text
                  Title
                }
                Button {
                  Link
                  Text
                }
              }
              Disclaimer
              GFInternetSupport {
                Title
                Subtitle
                Paragraph
                Logo {
                  ${mediaUrl}
                }
                Media {
                  ${mediaUrl}
                }
                Buttons {
                  Text
                  Link
                }
              }
              ${sectionSEO}
            }
          }
        }
      }
      `;
}