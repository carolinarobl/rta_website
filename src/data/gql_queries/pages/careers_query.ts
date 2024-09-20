import { mediaUrl, sectionSEO } from "~/data/constants";

export const careersQuery = (locale: string) => {
  return `query QueryCareers {
    pageCareers(locale:"${locale}"){    
      data{
        attributes{
                  HeaderLogo{
                    ${mediaUrl}
                  }
          HeaderPictures{
            ${mediaUrl}
          }
          HeaderBackground{
           ${mediaUrl}
          }
          HeaderTitle{
            Text
          }
          
          
          BeliefsTitle
          BeliefsSubtitle
          Beliefs{
            Text
          }
          BeliefsDescription
          
          
          OfferingTitle
          Offerings{
            Title
            Paragraph
            Media{
              ${mediaUrl}
            }
          }
          
          PositionsTitle
          Positions(sort: "Name:Asc"){
            data{
              attributes{
                Location
                Name
                Summary
                Duties
                Qualifications
              }
            }
          }
          
          FormParagraph{
            Title
            Paragraph
            Buttons{
            Link
            }
          }
          FormCareers{
            Title
            Fields{
              Label
              Icon{
                ${mediaUrl}
              }
            }
            ActionButton{
              Text
              Link
            }
          }
        ${sectionSEO}
        }
      }
    }
  }`;
};
