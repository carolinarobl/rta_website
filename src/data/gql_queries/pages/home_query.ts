import { mediaUrl, sectionSEO } from "~/data/constants";

const date = new Date();
const today = date.toISOString().substring(0, 10);
const time = date.toISOString().substring(11, 19);
export const homeQuery = (locale: string) => {
  return `
    query QueryHome{
  pageHome(locale:"${locale}"){
    data{
      attributes{
        
        VideoBGDesktop{
          ${mediaUrl}
        }
        VideoBGMobile{
          ${mediaUrl}
        }
        HeroCarSlideZS{
          Video{
            ${mediaUrl}
          }
          Description
          Logo{
            ${mediaUrl}
          }
          RaceDate
        }

        HeroCarSlides{
          Title
          Subtitle
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
        HeroForm{
          Title
          ActionButton{
            Text
            Link
          }
        }
        ProsPar{
          Title
          Paragraph
        }

        ProsPicture{
          ${mediaUrl}
        }
        ProsBackground{
          ${mediaUrl}
        }
        ParACP{
          Title
          Subtitle
          Paragraph
          Logo{
          ${mediaUrl}
          }
          Media{
          ${mediaUrl}
          }
          Buttons{
            Text
            Link
          }
        }
        ParGFIPlans{
          Title
          Paragraph
          Disclaimer{
            Title
            Text
            Caption
            Icon{
          ${mediaUrl}
            }
          }
          Table{
            ColumnOne
            ColumnTwo
            ColumnThree
          }

        }
        ParGFServices{
          Title
          Subtitle
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
        SugsPages{
          Title
          Paragraph
          Media{
          ${mediaUrl}
          }
          Buttons{
            Text
            Link
          }
        }
        SugsPagesBG{
          ${mediaUrl}
        }
        ${sectionSEO}
      }
    }
  }
  zaneRaces (
    filters: {RaceDay: {gte: "${today}"}, RaceTime: {gte: "${time}"}}, 
    locale:"en", 
    sort: "RaceDate"
    pagination: {limit: 1}) {
    data {
      attributes {
        Video {
          data {
            attributes {
              url
              alternativeText
              caption
            }
          }
        }
        Logo {
          data {
            attributes {
              url
              alternativeText
              caption
            }
          }
        }
        Description
        RaceDay
        RaceTime
      }
    }
  }
  sectionProsRta(locale:"${locale}") {
    data {
      attributes {
        Pros {
          Icon {
            data {
            attributes {
              url
              alternativeText
              caption
            }
          }
          }
          Title
          Text
          Caption
        }
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
        }
      }
    }
  }
}
`;
};
