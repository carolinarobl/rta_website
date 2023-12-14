import { mediaUrl, sectionSEO } from "~/data/constants";

export const zaneSmithSponsorshipQuery = (locale: string) => {
  return `query {
    pageZaneSpon(locale:"${locale}") {
      data {
        attributes {
          Title
          Subtitle
          LogoCorp {
            ${mediaUrl}
          }
          LogoSponsor {
            ${mediaUrl}
          }
          HeaderPictures {
            ${mediaUrl}
          }
          HeaderButtons {
            Text
            Link
          }
          NascarSchedule {
            ${mediaUrl}
          }
          yt {
            ${mediaUrl}
          }
          GiveawayBox {
            Video {
              Link
              Paragraph
            }
            Button {
              Text
              Link
            }
          }
          QuoteText
          QuoteAuthor
          QuoteADesc
          RaceRepLogo {
            ${mediaUrl}
          }
          RaceRepVids {
            Link
            Paragraph
          }
          CarouselTitle
          CarouselContent {
            Link
            Paragraph
            Cover {
                ${mediaUrl}
            }
          }
          AboutZane {
            Title
            Subtitle
            Paragraph
            Media {
                ${mediaUrl}
            }
            Buttons {
              Text
              Link
              Icon {
                ${mediaUrl}
              }
            }
          }
          Highlights {
            Title
            Paragraph
          }
          AboutFRM {
            Title
            Subtitle
            Paragraph
            Buttons {
              Text
              Link
              Icon {
                ${mediaUrl}
              }
            }
            Logo {
                ${mediaUrl}
            }
            Media {
                ${mediaUrl}
            }
          }
  
          Sponsors{
            ${mediaUrl}
          }
  
            FRMChamps{
                ${mediaUrl}
            }
  
          AboutFRMPInfo
  
          
          ${sectionSEO}
          
        }
      }
    }
  }`;
};
