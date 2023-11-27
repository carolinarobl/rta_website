import { mediaUrl, sectionSEO } from "~/data/constants";

export const blogQuery = (locale: string) => {
  return ` query QueryBlog {
        pageBlog(locale:"${locale}"){    
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
