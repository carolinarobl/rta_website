import { mediaUrl, sectionSEO } from "~/data/constants";

export const localWeatherQuery = (locale: string) => {
  return `query locWeather{
        pageLocWeather(locale:"${locale}"){
          data{
            attributes{
              LocTables{
                Location
                LocationPic{
                  ${mediaUrl}
                }
              }
              ${sectionSEO}
            }
          }
        }
      }`;
};
