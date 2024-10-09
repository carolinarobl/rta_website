import { sectionSEO } from "~/data/constants"

export const broadbandLabelQuery = (locale:string)=>{
    return `query{
  pageBroadbandlabel(locale:"${locale}"){
    data{
      attributes{
        Title
        Form{
          Title
          Fields{
            Placeholder
          }
            ActionButton{
            Text
          }
        }
        
        LogoServices{
          data{
            attributes{
              url
              alternativeText
              caption
            }
          }
        }
        
        CustomerType{
          title
        }
        
        Message

        ${sectionSEO}
      }
    }
  }
}`
}