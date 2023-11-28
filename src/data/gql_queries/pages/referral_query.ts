import { mediaUrl, sectionSEO } from "~/data/constants";

export const referralQuery = (locale: String) => {
  return `
  query QueryReferralProgram{
    pageReferralP(locale:"${locale}"){
      data{
        attributes{
            RefInfo{
          Title
          Subtitle
          Paragraph
          Media{
            ${mediaUrl}
          }
        }
          StepsIntro
          Steps{
            Title
            Bullets{
              Text
              Caption
            }
          }
          ${sectionSEO}
        }
      }
    }
  }
    `;
};
