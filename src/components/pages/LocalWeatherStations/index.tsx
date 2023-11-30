import { component$ } from "@builder.io/qwik";
import { StrapiImage } from "~/components/StrapiImage";
import { FaLocationArrowSolid } from "@qwikest/icons/font-awesome";
import { SEOh1 } from "~/components/SEOh1";

export const LocalWeatherStations = component$(({ data }: { data: any }) => {
  const pageData = data["pageLocWeather"]["data"]["attributes"];

  const iconURL = (code: string) => {
    return `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${code}.png`;
  };
  return (
    <div
      onClick$={() => {
        console.log(pageData);
        console.log(data["weatherData"]);
      }}
      class="flex flex-wrap items-center justify-center gap-8 px-8 py-8 text-white"
    >
      <SEOh1 SEOdata={pageData["SEO"]} />
      {data["weatherData"]["data"].map((weather: any, i: number) => {
        return (
          <div
            key={i}
            class="relative h-[350px] w-[600px] max-[1200px]:h-[280px] max-[1200px]:w-[500px]"
          >
            <div class="relative flex h-full w-[50%] flex-col justify-between overflow-hidden rounded-[30px] px-4 py-8 ">
              <div class="absolute bottom-0 left-0 right-0 top-0 -z-[6] h-full w-full">
                <StrapiImage
                  clasN="h-[400px]"
                  width="2622"
                  height="3086"
                  url={
                    pageData["LocTables"].find(
                      (e) => e["Location"] === weather["city"],
                    )["LocationPic"]["data"]["attributes"]["url"]
                  }
                />
              </div>
              <div class="absolute bottom-0 left-0 right-0 top-0 -z-[5] h-full w-full bg-black opacity-30" />
              <div class="flex flex-col">
                <span class="text-[20px] font-[700]">Thursday</span>
                <span class="text-[12px]">Nov 30, 2023</span>
                <div class="mt-2 flex items-center gap-3">
                  <FaLocationArrowSolid class="text-[15px] text-white" />
                  <span class="text-[17px] font-[600] max-[1200px]:text-[15px]">
                    {weather["city"]}
                  </span>
                </div>
              </div>
              <div>
                <span class="text-[18px] font-[700]">Rain, Overcast</span>
                <img
                  width="50"
                  height="50"
                  src={iconURL(weather["data"]["days"][0]["icon"])}
                  alt={`icon-${weather["data"]["days"][0]["icon"]}`}
                />
              </div>
              <div class="flex w-full justify-evenly">
                <div class="flex flex-col items-center">
                  <span class="text-[14px]">Min</span>
                  <span class="text-[28px] font-[700] max-[1200px]:text-[20px]">
                    {weather["data"]["days"][0]["tempmin"]}°F
                  </span>
                </div>
                <div class="flex flex-col items-center">
                  <span class="text-[14px]">Max</span>
                  <span class="text-[28px] font-[700] max-[1200px]:text-[20px]">
                    {weather["data"]["days"][0]["tempmin"]}°F
                  </span>
                </div>
              </div>
            </div>
            <div class="absolute bottom-3 right-0 top-3 -z-[7] flex w-[56%] flex-col gap-1 rounded-[30px] bg-[#172c4b] py-8 pl-14 pr-6 text-[17px] max-[1200px]:text-[13px]">
              <div class="flex justify-between font-[700] ">
                <span>PRECIPITATION</span>
                <span class="font-[300]">
                  {weather["data"]["days"][0]["precipprob"]}%
                </span>
              </div>
              <div class="flex justify-between font-[700]">
                <span>HUMIDITY</span>
                <span class="font-[300]">
                  {weather["data"]["days"][0]["humidity"]}%
                </span>
              </div>
              <div class="flex justify-between font-[700]">
                <span>WIND</span>
                <span class="font-[300]">
                  {weather["data"]["days"][0]["windspeed"]} mph
                </span>
              </div>
              <div class="mt-6 grid grid-cols-3 justify-center gap-1">
                {[1, 2, 3].map((dayN: number) => {
                  return (
                    <div
                      key={dayN}
                      class="flex flex-col items-center gap-1 text-[12px] max-[1200px]:text-[9px]"
                    >
                      <img
                        width="30"
                        height="30"
                        src={iconURL(weather["data"]["days"][dayN]["icon"])}
                        alt={`icon-${weather["data"]["days"][dayN]["icon"]}`}
                      />
                      <span class="">Thursday</span>
                      <span class="font-[600]">
                        {weather["data"]["days"][dayN]["tempmax"]}°F
                      </span>
                      <span class="font-[600]">
                        {weather["data"]["days"][dayN]["tempmin"]}°F
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});
