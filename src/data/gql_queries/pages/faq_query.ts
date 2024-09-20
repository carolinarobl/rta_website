import { mediaUrl, sectionSEO } from "~/data/constants"

export const faqQuery = (locale:string)=>{
    return `query QueryFAQ {
        pageFaq(locale:"${locale}") {
          data{
            attributes{    
              Introduction{
                Titles{
                  Text
                }
                TextContent
              }
      
              FAQList{
                Title
                Paragraph
                Disclaimer{
                Icon{
                    ${mediaUrl}
                }
                Title
                Text
                Caption
                }

                Table(pagination: { limit: 50 }){
                ColumnOne
                ColumnTwo
                ColumnThree
                }
              }
              
              ${sectionSEO}
            }
          }
        }
      }`
}