import { sectionBoardMembers, sectionSEO } from "~/data/constants";

export const boardDirectorsQuery = (locale: string) => {
    return `query QueryBoardOfDirectors{
        pageBDirectors(locale:"${locale}"){
          data{
            attributes{
              ${sectionBoardMembers}
              ${sectionSEO}
              }
            }
          }
        }`;
}