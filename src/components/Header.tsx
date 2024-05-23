import { component$, useSignal, $, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { Button } from "./Button";
import { Markdown } from "./Markdown";
import Carousel from "./Carousel";
import { PopupConfigurator } from "./popups/popup_configurator";
import { PopupLeaving } from "./popups/popup_leaving";
import { BsHouseFill } from "@qwikest/icons/bootstrap";


export const Header = component$(({ data }: { data: any }) => {

  const showModal = useSignal(false)
  const showPopupLeaving = useSignal(false)

  const headlerChangeSignal = $((): void => {
    showModal.value = true;
  })

  const frameRoute = useStore({ url: "" });

  const SlideElement = component$(({ slide, index }: { slide: any, index: number }) => {
    useVisibleTask$(()=>{
      if (slide["Buttons"][0]["Link"].includes('=pConf=')) {
        frameRoute.url = slide["Buttons"][0]["Link"].replace('=pConf=', "")
      }
    })

    return (
      <div class="flex flex-col items-center justify-between">
        <div class={`z-20 mb-1 flex flex-col justify-center`}>
          <span class="text-center text-[20px] font-semibold">
            {slide["Title"]}
          </span>
          <span class="text-[14px] font-light">
            <Markdown classN="text-white" text={slide["Paragraph"]} />
          </span>
        </div>
        {slide["Buttons"][0]["Link"].includes('=pConf=') ? <Button
          key={index}
          text={slide["Buttons"][0]["Text"]}
          onClick={headlerChangeSignal}
        /> : <Button
          key={index}
          link={slide["Buttons"][0]["Link"]}
          text={slide["Buttons"][0]["Text"]}
        />}
      </div>
    );
  });

  const headerSlides = data["Slide"].map((slideContent: any, i: number) => (
    <SlideElement slide={slideContent} key={i} index={i} />
  ));

  return (
    <div
      class={`mb-4 flex w-[40%] min-w-[350px] max-w-[500px] flex-col items-center justify-center overflow-hidden rounded-full rounded-t-none bg-[#0E4FB0] px-8 py-1 text-white max-[400px]:w-[98%] max-[400px]:min-w-[200px] max-[400px]:pb-10 `}
    >
      <Carousel slides={headerSlides} hasPagination={false} addSpace={false} duration={4000} id={"headerCarousel"} slidesQty={1} />

      {showModal.value && (
        <div class="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black bg-opacity-40">
          <div class={`w-full h-full flex-row-reverse  animate-zoomIn flex `}>
            <div class="flex p-4 flex-wrap overflow-hidden items-center justify-center ">
              <PopupConfigurator route={frameRoute.url} />
              {showPopupLeaving.value
                && window.localStorage.getItem("sendform_leaving") != "true" ? <PopupLeaving signalMainPopup={showModal} signalPopupLeaving={showPopupLeaving} /> : null}
            </div>
            <button aria-label="Close popup"
              onClick$={() => {
                if (frameRoute.url && window.localStorage.getItem("sendform_leaving") != "true") {
                  console.log(showPopupLeaving.value);
                  showPopupLeaving.value = true;
                  console.log(showPopupLeaving.value);
                }
                else {
                  showModal.value = false;
                }
              }}
              class={`mt-2 mx-0 bg-secondary-red flex items-center justify-center text-white rounded-full h-[30px] focus:outline-none z-[600]`} >
              <div class="px-3 flex flex-row items-center text-xs gap-2">Back to site <BsHouseFill />
              </div></button>
          </div>
        </div>
      )}
    </div>
  );
});
