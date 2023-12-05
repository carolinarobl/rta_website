import { component$ } from "@builder.io/qwik";
import { ListedParagraphs } from "../../Paragraph";
import { Button } from "~/components/Button";
import { StrapiImage } from "~/components/StrapiImage";
import { Markdown } from "~/components/Markdown";

export const GigfastIOT = component$(({ data }: { data: any }) => {
  const services = data["pageGfIoT"]["data"]["attributes"]["Services"];
  const intro = data["pageGfIoT"]["data"]["attributes"]["Introduction"];
  const logo =
    data["pageGfIoT"]["data"]["attributes"]["Logo"]["data"]["attributes"]
  const WeatherAnounce =
    data["pageGfIoT"]["data"]["attributes"]["WeatherAnounce"];
  return (
    <div class="flex flex-col items-center justify-center ">
      <div class="m-4 flex items-center justify-center gap-4 rounded-full bg-[#edf6ff] px-8 py-5 shadow-xl max-sm:flex-col">
        <span class="text-center text-[18px] font-[600] text-primary-blue max-md:text-[14px]">
          {WeatherAnounce["Paragraph"]}
        </span>
        <Button
          text={WeatherAnounce["Buttons"][0]["Text"]}
          link={WeatherAnounce["Buttons"][0]["Link"]}
        />
      </div>
      <div class="mx-4 my-8 max-w-[500px]">
        <StrapiImage url={logo['url']} alt={logo['alternativeText']} title={logo['caption']} width={1230} height={229} />
      </div>
      <div class="mx-10 my-4 flex max-w-[800px] flex-col items-center justify-center gap-2 text-primary-blue">
        <span class="text-center text-[38px] font-bold text-[#2E5899] max-sm:text-[28px]">
          {intro["Title"]}
        </span>
        <Markdown classN={"text-justify"} text={intro["Paragraph"]} />
      </div>
      <ListedParagraphs data={services} />
    </div>
  );
});
