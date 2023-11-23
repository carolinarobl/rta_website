import { mediaUrl, sectionSEO } from "~/data/constants";

export const newsQuery = (locale: string) => {
  return ` query QueryNews {
        pageNews(locale:"${locale}"){    
          data{
          attributes{
            Posts(sort: "Date:desc", pagination: { limit: 100 }){
                data{
                  attributes{
                    Title
                    Date
                    Cover{
                      ${mediaUrl}
                    }
                    Description
                    VideoLink
                    Gallery{
                      ${mediaUrl}
                    }
                    Slug
                  }
                }
              }
            SugPages{
              Title
              Pages{
              Title
              Link
              Picture{
                ${mediaUrl}
              }
              }
            }
            ${sectionSEO}
          }
        }
        }
      }`;
};
