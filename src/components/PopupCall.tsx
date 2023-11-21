import { Slot, component$, useSignal } from "@builder.io/qwik";
import { FormCarrers } from "./forms/form-carrers";
import { PortabilityRequest } from "./popups/portabilityRequest";

export const PopupCall = component$(({ link, text }: { link: string, text: string }) => {
  const configurator = "=pConf=";
  const contactEmail = "=pContactEmail=";
  const iFrame = "=pIFrame=";
  const channelLineup = "=pChannelLineup=";

  // var popupCall = link;
  var child = null

  if (link.includes(configurator)) {
    // popupCall = configurator;
    child = <FormCarrers />

    // link = link.replaceAll(configurator, "");
  } else if (link.includes(contactEmail)) {
    // popupCall = contactEmail;
    child = <FormCarrers />

    // link = link.replaceAll(contactEmail, "");
  } else if (link.includes(iFrame)) {
    const linkClean = link.replaceAll(iFrame, "");
    child = <PortabilityRequest link={linkClean} />
  } else if (link.includes(channelLineup)) {
    // popupCall = channelLineup;
    child = <FormCarrers />

    // link = link.replaceAll(channelLineup, "");
  }


  const showModal = useSignal(false);

  return <div class="flex relative">
    <button class="flex w-fit items-center justify-center gap-2 rounded-full border-2 border-teal-500 bg-white p-1 px-7 text-btn-green opacity-80 shadow-md transition-all hover:cursor-pointer hover:border-transparent hover:bg-teal-500 text-[15px] font-[600] max-md:text-[14px] max-sm:text-[13px] hover:text-white"
      onClick$={() => showModal.value = true}>{text}</button>
    {showModal.value && (
      <div class="fixed inset-0 z-50 flex flex-col items-end justify-center bg-blue-700 bg-opacity-40">
        <button onClick$={() => showModal.value = false} class="bg-secondary-red text-white px-4 py-2 rounded-full">X</button>
        <div class="flex p-8 flex-wrap overflow-hidden items-center justify-center w-full animate-zoomIn">
          {child}
        </div>
      </div>
    )}
  </div>
});