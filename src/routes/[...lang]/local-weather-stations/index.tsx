import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { MainLayout } from "~/components/MainLayout";
import { SEOh1 } from "~/components/SEOh1";
import { LocalWeatherStations } from "~/components/pages/LocalWeatherStations";
import { headSEO } from "~/data/constants";
import { localWeatherQuery } from "~/data/gql_queries/pages/weather_query";
import { getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
  const lang = req.params["lang"] == "" ? "en" : "es-419";
  const content = await getPageData(localWeatherQuery, lang);
  const weatherData: any = { status: "error", data: [] };
  for (const locTable of content["pageData"]["data"]["pageLocWeather"]["data"][
    "attributes"
  ]["LocTables"]) {
    const cityName: string = locTable["Location"];
    const weatherResp = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/next7days?unitGroup=us&include=days%2Ccurrent&key=J8MMBMZC9DTQTVGHBPNEWPPGS&contentType=json`,
    );
    if (weatherResp.ok) {
      const cityData = await weatherResp.json();
      weatherData.data.push({
        city: cityName,
        data: cityData,
      });
      // weatherData = {
      //   status: "ok",
      //   data: [
      //     ...weatherData.data,
      //     {
      //       city: cityName,
      //       data: cityData,
      //     },
      //   ],
      // };
    }
  }

  return {
    ...content,
    weatherData,
  };
});

export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;
  return (
    <MainLayout data={data["layoutData"]}>
      <SEOh1 SEOdata={data["pageData"]["data"]["pageLocWeather"]["data"]["attributes"]["SEO"]} />
      <LocalWeatherStations
        data={{
          pageLocWeather: data["pageData"]["data"]["pageLocWeather"],
          weatherData: data["weatherData"],
        }}
      />
    </MainLayout>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData =
    pageData["pageData"]["data"]["pageLocWeather"]["data"]["attributes"]["SEO"];

  return headSEO(seoData);
};
