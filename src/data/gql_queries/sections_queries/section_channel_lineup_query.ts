import { mediaUrl } from "~/data/constants"

export const sectionChannelLinueupQuery=()=>{
    return `channelLineups (pagination:{limit:250}){
          data{
            attributes{
              Channel_name
              Image{
                ${mediaUrl}
              }
              Category
              package_tvs{
                data{
                  attributes{
                    package
                  }
                }
              }
            }
        }
        }` 
}