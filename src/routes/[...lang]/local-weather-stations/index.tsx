import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { MainLayout } from "~/components/MainLayout";
import { LocalWeatherStations } from "~/components/pages/LocalWeatherStations";
import { headSEO } from "~/data/constants";
import { localWeatherQuery } from "~/data/gql_queries/pages/weather_query";
import { getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
  const lang = req.params["lang"] == "" ? "en" : "es-419";
  //   const cityName = "Crystal Beach, TX";
  //   const weatherResp = await fetch(
  //     `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/next7days?unitGroup=us&include=days%2Ccurrent&key=J8MMBMZC9DTQTVGHBPNEWPPGS&contentType=json`,
  //   );
  let weatherData = { status: "error" };
  //   if (weatherResp.ok) {
  //     weatherData = {
  //       status: "ok",
  //       data: await weatherResp.json(),
  //     };
  //   }
  weatherData = { status: "error" };

  console.log(weatherData);

  const content = await getPageData(localWeatherQuery, lang);
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
