import { component$ } from "@builder.io/qwik";

export const LocalWeatherStations = component$(({ data }: { data: any }) => {
  const pageData = data["pageLocWeather"]["data"]["attributes"];
  return (
    <div
      onClick$={() => {
        console.log(pageData);
        console.log(data["weatherData"]);
      }}
    >
      Hello Qwik!
    </div>
  );
});
