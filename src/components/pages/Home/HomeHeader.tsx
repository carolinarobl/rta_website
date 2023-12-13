import { component$, useSignal, $ } from "@builder.io/qwik";
import { FaXmarkSolid, FaLocationPinSolid } from "@qwikest/icons/font-awesome";
import { Button } from "~/components/Button";
import Carousel from "~/components/Carousel";
import { Markdown } from "~/components/Markdown";
import { StrapiAsset } from "~/components/StrapiAsset";
import { StrapiImage } from "~/components/StrapiImage";
import { setURL } from "~/data/constants";
// import { Slider } from "qwik-slider";
// import { StrapiImage } from "~/components/StrapiImage";
// import { Markdown } from "~/components/Markdown";
// import { Carouseld } from "~/components/Carousel";

export const HomeHeader = component$(({ data }: { data: any }) => {
  const heroSlidesData = data["HeroCarSlides"];
  const streetRef = useSignal<HTMLInputElement>(
    (<input></input>) as unknown as HTMLInputElement,
  );
  const zipRef = useSignal<HTMLInputElement>(
    (<input></input>) as unknown as HTMLInputElement,
  );
  const fullFrameSource = useSignal<string>("");
  const modalIsOpen = useSignal<boolean>(false);
  const typingTimer = useSignal<any>();
  const suggestions = useSignal([]);
  const suggStatus = useSignal<"none" | "notfound" | "success" | "selected">(
    "none",
  );

  const handleModal = $((): void => {
    modalIsOpen.value = !modalIsOpen.value;
    if (!modalIsOpen.value) return;
    fullFrameSource.value = data["HeroForm"]["ActionButton"]["Link"]
      .replace("=pConf=", "")
      .replace("streetInput", streetRef.value.value)
      .replace("zipInput", zipRef.value.value);
  });

  const SlideCard = component$(({ slide }: { slide: any }) => {
    return (
      <div class="flex items-center justify-between gap-1">
        <div class="flex flex-col gap-1 max-[1000px]:gap-2">
          <StrapiImage
            clasN="w-[160px]"
            width="1667"
            url={slide["Logo"]["data"]["attributes"]["url"]}
            alt={slide["Logo"]["data"]["attributes"]["alternativeText"]}
            title={slide["Logo"]["data"]["attributes"]["caption"]}
          />
          <div class="mx-3 max-[1000px]:hidden">
            <Markdown classN="text-[13px]" text={slide["Paragraph"]} />
          </div>
          <Button
            text={slide["Buttons"][0]["Text"]}
            link={slide["Buttons"][0]["Link"]}
          />
        </div>
        <StrapiAsset
          clasN="rounded-full w-[150px] mr-[30px] max-[1000px]:w-[40%]"
          url={slide["Media"]["data"]["attributes"]["url"]}
          alt={slide["Media"]["data"]["attributes"]["alternativeText"]}
          title={slide["Media"]["data"]["attributes"]["caption"]}
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

  const HeroCarousel = component$(
    ({ isMobile = false }: { isMobile?: boolean }) => {
      return (
        <div
          class={`flex h-[230px] items-center  justify-center overflow-hidden bg-white   ${
            isMobile
              ? "w-full max-w-[420px] rounded-full min-[1000px]:hidden"
              : "w-[420px] rounded-br-full rounded-tr-full bg-opacity-60 max-[1000px]:hidden"
          }`}
        >
          {/* <SlideCard slide={heroSlides[0]} /> */}
          <Carousel
            slides={heroSlides}
            hasArrows={false}
            slidesQty={1}
            id={`header_car_${isMobile ? "mobile" : "desk"}`}
          />
        </div>
      );
    },
  );

  const handleSearch = $(() => {
    clearTimeout(typingTimer.value);
    typingTimer.value = setTimeout(() => {
      if (streetRef.value.value.length > 2)
        fetch(`/api/get-streets?q=${encodeURIComponent(streetRef.value.value)}`)
          .then((res) => res.json())
          .then((data) => {
            const items = data["data"];
            if (items.length === 0) {
              suggStatus.value = "notfound";
            } else {
              suggStatus.value = "success";
            }
            suggestions.value = items;
          });
    }, 1000);
  });

  return (
    <>
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
        
          <iframe
            src={fullFrameSource.value}
            class="h-full w-full"
            frameBorder="0"
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
        <div class="flex h-full w-full items-center justify-between max-[1000px]:flex-col-reverse max-[1000px]:px-4">
          <HeroCarousel />
          <div class="relative flex w-[420px] flex-col items-center justify-center gap-5 rounded-bl-full rounded-tl-full bg-white bg-opacity-60 max-[1000px]:mb-8 max-[1000px]:w-full max-[1000px]:max-w-[420px] max-[1000px]:rounded-full max-[1000px]:py-8 min-[1000px]:h-[230px]">
            <div
              class={`absolute left-10 right-10 top-[90%] z-20 flex max-h-[200px] flex-col gap-3 overflow-y-auto rounded-xl bg-white p-6 text-primary-blue shadow-lg ${
                suggStatus.value === "none" || suggStatus.value === "selected"
                  ? "hidden"
                  : ""
              }`}
            >
              {suggestions.value.length === 0 ? "Not found" : ""}
              {suggestions.value.map((sugg: any, i: number) => {
                return (
                  <div
                    key={i}
                    class="grid items-center gap-4 hover:cursor-pointer"
                    style={{
                      gridTemplateColumns: "20px 1fr",
                    }}
                    onClick$={() => {
                      streetRef.value.value = sugg["address"].split(", ")[0];
                      zipRef.value.value = sugg["zip"];
                      suggStatus.value = "selected";
                    }}
                  >
                    <FaLocationPinSolid class="w-6 text-secondary-red" />
                    <span class="text-[14px]">{sugg["address"]}</span>
                  </div>
                );
              })}
            </div>
            <div class="px-8 text-center text-[22px] font-[600] text-primary-blue max-[1000px]:px-12">
              {data["HeroForm"]["Title"]}
            </div>
            <div class="flex w-full items-center gap-4 px-6 max-[1000px]:flex-col ">
              <input
                class="w-[50%] rounded-full px-3 py-2 placeholder-primary-blue"
                placeholder="Address Search"
                onKeyUp$={handleSearch}
                ref={streetRef}
                type="text"
              />
              <input
                class="w-[50%] rounded-full px-3 py-2 placeholder-primary-blue"
                placeholder="Zip Code"
                ref={zipRef}
                type="text"
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
      <div class="flex justify-center bg-gradient-to-r from-[#3d76c1] to-[#3568ae] px-4 pt-4">
        <HeroCarousel isMobile />
        {/* <div
          class={`relative z-20 flex h-[230px]  w-full max-w-[420px] items-center   
              justify-center overflow-hidden rounded-full min-[1000px]:hidden

          `}
        >
          <Carousel slides={heroSlides} hasArrows={false} slidesQty={1} />
        </div> */}
      </div>
    </>
  );
});
