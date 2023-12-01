import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/Button";
import { Markdown } from "~/components/Markdown";
import { StrapiAsset } from "~/components/StrapiAsset";
import { StrapiImage } from "~/components/StrapiImage";
import { setURL } from "~/data/constants";
// import { Slider } from "qwik-slider";
// import { StrapiImage } from "~/components/StrapiImage";
// import { Markdown } from "~/components/Markdown";
// import { Carouseld } from "~/components/Carousel";

export const HomeHeader = component$(({ data }: { data: any }) => {
  const heroSlides = data["HeroCarSlides"];

  const SlideCard = component$(({ slide }: { slide: any }) => {
    return (
      <div class="flex">
        <div class="flex w-[60%] flex-col items-center justify-between gap-1 px-4 text-center">
          <StrapiImage
            clasN="w-[160px]"
            width="1667"
            height="272"
            url={slide["Logo"]["data"]["attributes"]["url"]}
          />
          <Markdown classN="text-[15px]" text={slide["Paragraph"]} />
          <Button
            text={slide["Buttons"][0]["Text"]}
            link={slide["Buttons"][0]["Link"]}
          />
        </div>
        <StrapiAsset
          clasN="rounded-full h-[150px] w-[150px] mr-[30px]"
          url={slide["Media"]["data"]["attributes"]["url"]}
          autoplay
          loop
          muted
        />
      </div>
    );
  });

  return (
    <div class="relative flex h-[80vh] max-h-[750px] w-full items-center">
      <video
        class="absolute left-0 top-0 -z-10 h-full w-full object-cover"
        src={setURL(data["VideoBGDesktop"]["data"]["attributes"]["url"])}
        autoPlay
        loop
        muted
      ></video>
      <div class="flex w-full items-center justify-between">
        <div class="relative flex h-[230px] w-[400px] items-center justify-center overflow-hidden rounded-br-full rounded-tr-full bg-white bg-opacity-60 max-[1000px]:hidden">
          <SlideCard slide={heroSlides[0]} />
          {/* <Carouseld /> */}
          {/* <Slider gap={400} showScrollbar={false} styleClass="overflow-hidden">
            {heroSlides.map((slide, i) => {
              return (
                <div key={i} class="flex flex-col gap-2">
                  <StrapiImage
                    url={slide["Logo"]["data"]["attributes"]["url"]}
                  />
                  <Markdown text={slide["Paragraph"]} />
                  <Button
                    text={slide["Buttons"][0]["Text"]}
                    link={slide["Buttons"][0]["Link"]}
                  />
                </div>
              );
            })}
            <div class="">test</div>
          </Slider> */}
        </div>
        <div class="flex h-[230px] w-[400px] flex-col items-center justify-center gap-5 rounded-bl-full rounded-tl-full bg-white bg-opacity-60 max-[1000px]:hidden">
          <div class="px-6 text-[22px] font-[600] text-primary-blue">
            {data["HeroForm"]["Title"]}
          </div>
          <div class="flex w-full gap-4 px-6">
            <input
              class="w-[50%] rounded-full px-3 py-2 placeholder-primary-blue"
              placeholder="Address Search"
              type="text"
            />
            <input
              class="w-[50%] rounded-full px-3 py-2 placeholder-primary-blue"
              placeholder="Zip Code"
              type="text"
            />
          </div>
          <Button
            text={data["HeroForm"]["ActionButton"]["Text"]}
            link={data["HeroForm"]["ActionButton"]["Link"]}
          />
        </div>
      </div>
    </div>
  );
});
