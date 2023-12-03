import { $, component$, useSignal } from "@builder.io/qwik";
import { Button } from "~/components/Button";
import Carousel from "~/components/Carousel";
import { Markdown } from "~/components/Markdown";
import { StrapiAsset } from "~/components/StrapiAsset";
import { StrapiImage } from "~/components/StrapiImage";
import { setURL } from "~/data/constants";
import { FaXmarkSolid } from "@qwikest/icons/font-awesome";
// import { Slider } from "qwik-slider";
// import { StrapiImage } from "~/components/StrapiImage";
// import { Markdown } from "~/components/Markdown";
// import { Carouseld } from "~/components/Carousel";

export const HomeHeader = component$(({ data }: { data: any }) => {
  const heroSlidesData = data["HeroCarSlides"];
  const streetRef = useSignal<Element>();
  const zipRef = useSignal<Element>();
  const fullFrameSource = useSignal<string>("");
  const modalIsOpen = useSignal<boolean>(false);

  const handleModal = $(() => {
    modalIsOpen.value = !modalIsOpen.value;
    console.log(streetRef.value.value);
    if (!modalIsOpen.value) return;
    fullFrameSource.value = data["HeroForm"]["ActionButton"]["Link"]
      .replace("=pConf=", "")
      .replace("streetInput", streetRef.value.value)
      .replace("zipInput", zipRef.value.value);
    console.log(modalIsOpen.value);
  });

  const SlideCard = component$(({ slide }: { slide: any }) => {
    return (
      <div class="flex items-center justify-between">
        <div class=" flex-row gap-1 ">
          <StrapiImage
            clasN="w-[160px]"
            width="1667"
            url={slide["Logo"]["data"]["attributes"]["url"]}
          />
          <div class="mx-3">
            <Markdown classN="text-[14px]" text={slide["Paragraph"]} />
          </div>
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
          muted={true}
        />
      </div>
    );
  });

  const heroSlides = heroSlidesData.map((slideContent: any, i: number) => (
    <SlideCard slide={slideContent} key={i} />
  ));

  return (
    <div class="relative flex h-[80vh] max-h-[750px] w-full items-center">
      {/* MODAL */}
      <div
        class={`fixed bottom-0 left-0 right-0 bg-white top-${
          modalIsOpen.value ? "0 z-[200]" : "[100vh] -z-[200]"
        }  transition-all duration-1000 ease-in-out`}
      >
        <FaXmarkSolid
          onClick$={handleModal}
          class="text-md absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondary-red text-white hover:cursor-pointer"
        />
        {/* <span
          onClick$={handleModal}
          class="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-secondary-red text-lg text-white hover:cursor-pointer"
        >
          x
        </span> */}
        <iframe
          src={fullFrameSource.value}
          class="h-full w-full"
          frameborder="0"
        ></iframe>
      </div>
      {/* MODAL */}
      {/* {modalIsOpen.value && "aaaaaaaaaa"} */}
      <video
        class="absolute left-0 top-0 -z-10 h-full w-full object-cover"
        src={setURL(data["VideoBGDesktop"]["data"]["attributes"]["url"])}
        autoPlay
        loop
        muted
      ></video>
      <div class="flex w-full items-center justify-between">
        <div class="relative flex h-[230px] w-[400px] items-center justify-center overflow-hidden rounded-br-full rounded-tr-full bg-white bg-opacity-60 max-[1000px]:hidden">
          {/* <SlideCard slide={heroSlides[0]} /> */}
          <Carousel slides={heroSlides} hasArrows={false} />
        </div>
        <div class="flex h-[230px] w-[400px] flex-col items-center justify-center gap-5 rounded-bl-full rounded-tl-full bg-white bg-opacity-60 max-[1000px]:hidden">
          <div class="px-6 text-[22px] font-[600] text-primary-blue">
            {data["HeroForm"]["Title"]}
          </div>
          <div class="flex w-full gap-4 px-6">
            <input
              ref={streetRef}
              class="w-[50%] rounded-full px-3 py-2 text-primary-blue "
              placeholder="Address Search"
              type="text"
            />
            <input
              ref={zipRef}
              class="w-[50%] rounded-full px-3 py-2 text-primary-blue"
              placeholder="Zip Code"
              type="number"
              maxLength={5}
              minLength={4}
              min={1}
            />
          </div>
          <Button
            text={data["HeroForm"]["ActionButton"]["Text"]}
            // link={data["HeroForm"]["ActionButton"]["Link"]}
            onClick={handleModal}
          />
        </div>
      </div>
    </div>
  );
});
