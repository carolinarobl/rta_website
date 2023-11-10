import { sectionBoardMembers, sectionSEO } from "~/data/constants"

export const LeadershipQuery = (locale:string)=>{
    return `query QueryLeadershipTeam{
        pageLeadershipT(locale:"${locale}"){
          data{
            attributes{
              ${sectionBoardMembers}
              ${sectionSEO}
              }
            }
          }
        }`
}