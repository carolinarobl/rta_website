import { sectionSEO } from "~/data/constants"

export const appreciationGiveawayQuery = (locale:string)=>{
    return `query QueryAprGive {
        pageAprGive(locale:"${locale}"){
          data{
            attributes{
              iFrame_link
              ${sectionSEO}
            }
          }
        }
        }`
}