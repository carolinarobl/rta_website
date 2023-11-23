import { mediaUrl, sectionSEO } from "~/data/constants"

export const ourStoryQuery = (locale:string)=>{
    return `query QueryOurStory{
        pageOurStory(locale:"${locale}"){
          data{
            attributes{
              Titles{
                Text
              }
              CommitmentPar{
                Title
                Paragraph
                Media{
                ${mediaUrl}
                }
              }
              
              ColumnsPar{
                Title
                Paragraph
              }
              
              SponsorshipsTitle
              Sponsorships{
                Title
                Subtitle
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
             
            }
          }
        }
      }`
}