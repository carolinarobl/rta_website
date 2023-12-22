import { component$ } from "@builder.io/qwik";
import Carousel from "~/components/Carousel";
// import { Modal } from "~/components/Modal";
import { StrapiImage } from "~/components/StrapiImage";
// import { YTVideo } from "~/components/YTVideo";

export const SectionCarouselZSS = component$(({ data }: { data: any }) => {
  // const selectedVideo = useSignal("");
  // const modalSignal = useSignal(false);
  return (
    <div class="my-[80px] flex flex-col items-center justify-center text-white">
      {/* <Modal showSignal={modalSignal}>
        {selectedVideo.value !== "" && modalSignal.value && (
          <YTVideo
            // eslint-disable-next-line qwik/no-react-props
            classN="h-[70vh] w-[80vw] rounded-3xl"
            ytURL={selectedVideo.value}
          />
        )}
      </Modal> */}
      <span class="text-center text-[40px] font-[600]">
        {data["CarouselTitle"]}
      </span>
      <div class="max-w-[1300px] px-8">
        <Carousel
          direction="horizontal"
          addSpace
          slidesQty={3}
          hasArrows
          id="zss_carousel"
          slides={data["CarouselContent"].map((slide: any, i: number) => {
            return (
              <div
                key={i}
                class="relative overflow-hidden rounded-3xl hover:cursor-pointer"
                onClick$={() => {
                  window.open(slide['Link'], "_blank");
                }}
              >
                <div class="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-10 text-[60px] font-[900] text-white">
                  ▷
                </div>
                <StrapiImage
                  url={slide["Cover"]["data"]["attributes"]["url"]}
                />
              </div>
            );
          })}
        />
      </div>
    </div>
  );
});
