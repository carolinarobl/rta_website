import { mediaUrl, sectionSEO } from "~/data/constants";

export const contactUsQuery = (locale:string)=>{
    return `query QueryContactUs{
        pageContact(locale:"${locale}"){
          data{
            attributes{
              Introduction{
                Title
                Paragraph
                Buttons{
                  Text
                  Link
                }
              }
              
              SocialMedia{
                Text
                SubOption{
                  Text
                  Link
                  Icon{
                    ${mediaUrl}
                  }
                }
              }
              
              OfficesTitle
              OfficesLocation{
                Title
                Paragraph
                Buttons{
                  Text
                  Link
                }
              }
              
              ${sectionSEO}
            }
          }
        }
      }`; 
}