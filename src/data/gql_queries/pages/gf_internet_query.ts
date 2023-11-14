import { sectionSEO } from "~/data/constants";

export const gfInternetQuery = (locale:string)=>{
    return `query QueryGFInternet {
        pageGfInternet(locale:"${locale}"){
          data {
            attributes {
              Logo {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
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
                  data {
                    attributes {
                      url
                      alternativeText
                    }
                  }
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
                  data {
                    attributes {
                      url
                      alternativeText
                    }
                  }
                }
                Media {
                  data {
                    attributes {
                      url
                      alternativeText
                    }
                  }
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