import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { BsHouseFill } from "@qwikest/icons/bootstrap";
import { FaLocationPinSolid } from "@qwikest/icons/font-awesome";
import { Button } from "~/components/Button";
import Carousel from "~/components/Carousel";
import { Markdown } from "~/components/Markdown";
import { StrapiAsset } from "~/components/StrapiAsset";
import { StrapiImage } from "~/components/StrapiImage";
import { setURL } from "~/data/constants";
import { CarouselTestimonials } from "./CarouselTestimonials";
import { PromoBanner } from "./PromoBanner";

export const HomeHeader = component$(({ data, bannerData }: { data: any, bannerData: any }) => {
  const heroSlidesData = data["HeroCarSlides"];
  const TestimonialsIsEmpty = data['Testimonials'].length < 1 ? true : false;
  const promoBanner = bannerData;

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

  const screenW = useSignal<number>(1000);
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    screenW.value = window.innerWidth;

    window.addEventListener("resize", () => {
      screenW.value = window.innerWidth;
    });
  });

  const handleModal = $((): void => {
    modalIsOpen.value = !modalIsOpen.value;
    // var finalStreetValue= streetRef.value.value.split(", ")[0];
    const finalStreetValue= streetRef.value.value.split(", ")[0];

    if (!modalIsOpen.value) return;
    fullFrameSource.value = data["HeroForm"]["ActionButton"]["Link"]
      .replace("=pConf=", "")
      .replace("streetInput", finalStreetValue)
      .replace("zipInput", zipRef.value.value);
  });

  const SlideCard = component$(({ slide }: { slide: any }) => {
    return (
      <div class="flex items-center justify-between gap-1">
        <div class="flex flex-col gap-1 max-[1000px]:gap-2">
          <StrapiImage
            clasN="w-[160px]"
            width="1667"
            media={slide["Logo"]["data"]["attributes"]}
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
          media={slide["Media"]["data"]["attributes"]}
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
          class={`flex h-[200px] items-center  justify-center overflow-hidden bg-white   ${isMobile
            ? "w-full max-w-[420px] rounded-full min-[1000px]:hidden"
            : "w-[420px] rounded-br-full rounded-tr-full bg-white/60 backdrop-blur-sm border border-white/60 max-[1000px]:hidden"
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
      <div class="relative flex h-[80vh] max-h-[750px] w-full items-center ">
        {/* MODAL */}
        <div
          class={`fixed bottom-0 left-0 right-0 bg-white top-${modalIsOpen.value ? "0 z-[200]" : "[100vh] -z-[200]"
            }  transition-all duration-1000 ease-in-out`}
        >
          {/* <FaXmarkSolid
            onClick$={handleModal}
            class="text-md absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondary-red text-white hover:cursor-pointer"
          /> */}

          <button aria-label="Close popup" onClick$={handleModal} class={`absolute right-2  mt-2 mx-0" bg-secondary-red flex items-center justify-center text-white rounded-full h-[30px] focus:outline-none z-[600]`} ><div class="px-3 flex flex-row items-center text-xs gap-2">Back to site <BsHouseFill /></div></button>
          <iframe
            src={fullFrameSource.value}
            title="load popup"
            class="h-full w-full"
            frameBorder="0"
          ></iframe>

        </div>
        {/* MODAL */}
        {/* {modalIsOpen.value && "aaaaaaaaaa"} */}
        <video
          class="absolute left-0 top-0 -z-10 h-full w-full object-cover"
          poster={setURL(
            data[
            // `${screenW.value <= 800 ? "VideoBGMobile" : "VideoBGDesktop"}`
            'VideoBGDesktop'
            ]["data"]["attributes"]["caption"])}
          preload='auto'
          autoplay
          playsInline
          loop
          muted
        >
          <source src={setURL(
            data[
            `${screenW.value <= 800 ? "VideoBGMobile" : "VideoBGDesktop"}`
            ]["data"]["attributes"]["url"],
          ) + "#t=0.1"} type="video/mp4"></source>
        </video>
        <div class="flex flex-col items-center justify-between h-full w-full md:mb-10">
          <div class="flex h-full w-full items-center justify-between max-[1000px]:flex-col max-[1000px]:px-4">
          
          <div class="flex flex-col gap-4">
            <div class="opacity-0">
            <PromoBanner data={promoBanner} />
            </div>

              <HeroCarousel />
            </div>

            <div class="flex flex-col gap-4">

              {/* BANNER DE PROMOCIÓN */}
              <PromoBanner data={promoBanner} />

            <div class="relative flex w-[420px] flex-col items-center justify-center gap-3 rounded-bl-full rounded-tl-full bg-white/60 backdrop-blur-sm max-[1000px]:mb-8 max-[1000px]:w-full max-[1000px]:max-w-[420px] max-[1000px]:rounded-[30px] max-[1000px]:py-2 max-[1000px]:my-5 min-[1000px]:h-[200px] border border-white/60 ">
              <div
                class={`absolute left-10 right-10 top-[90%] flex max-h-[200px] flex-col gap-3 overflow-y-auto rounded-xl bg-white p-6 text-primary-blue shadow-lg ${suggStatus.value === "none" || suggStatus.value === "selected"
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
                        streetRef.value.value = sugg["address"];
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
              <div class=" text-center text-[20px] font-[600] text-primary-blue ">
                {data["HeroForm"]["Title"]}
              </div>
              <div class="flex w-full items-center gap-3 px-6  ">
                <input
                  class="w-[100%] rounded-full px-3 py-2 placeholder-primary-blue"
                  placeholder="Address Search"
                  onKeyUp$={handleSearch}
                  ref={streetRef}
                  type="text"
                />
                {/* <input
                  class="w-[60%] rounded-full px-3 py-2 placeholder-primary-blue"
                  placeholder="Zip Code"
                  ref={zipRef}
                  type="text"
                /> */}
              </div>
              <Button
                text={data["HeroForm"]["ActionButton"]["Text"]}
                // link={data["HeroForm"]["ActionButton"]["Link"]}
                onClick={handleModal}
              />
            </div>
            </div>

          </div>
          {
            TestimonialsIsEmpty ? null : <div class="block max-[1000px]:hidden w-full">
              <CarouselTestimonials testimonials={data['Testimonials']} />
            </div>
          }

        </div>
      </div>
      <div class="flex flex-col  justify-evenly items-center bg-gradient-to-r from-[#3d76c1] to-[#3568ae] px-4 pt-4">
        <HeroCarousel isMobile />
        {TestimonialsIsEmpty ? null
          : <div class="max-[1000px]:block hidden w-full">
            <CarouselTestimonials testimonials={data['Testimonials']} isMobile={true} />
          </div>}
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
