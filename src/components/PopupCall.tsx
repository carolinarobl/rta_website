import { component$, useSignal } from "@builder.io/qwik";
import { FormCarrers } from "./forms/form-carrers";
import { PortabilityRequest } from "./popups/portabilityRequest";
import { FormSupport } from "./forms/form-support";
import { BsTagFill } from "@qwikest/icons/bootstrap";

export const PopupCall = component$(({ link, text }: { link: string, text: string }) => {
  const configurator = "=pConf=";
  const contactEmail = "=pContactEmail=";
  const iFrame = "=pIFrame=";
  const channelLineup = "=pChannelLineup=";

  // var popupCall = link;
  let child = null

  if (link.includes(configurator)) {
    // popupCall = configurator;
    child = <FormCarrers />

    // link = link.replaceAll(configurator, "");
  } else if (link.includes(contactEmail)) {
    // popupCall = contactEmail;
    child = <FormSupport />

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

    {link.includes(configurator) ? <div class="my-4 cursor-pointer flex h-[80px] w-full flex-col items-center justify-center">
      <div class="border-gary-500 my-4 h-[1px] w-full border-t-2"></div>
      <div class="flex h-[50px] w-full flex-row items-center justify-center rounded-full border-2 border-teal-500 bg-transparent p-1 px-6 text-btn-green hover:bg-teal-500 hover:text-white"
        onClick$={() => showModal.value = true}>
        <p class="mx-4 font-bold">{text}</p>
        <div class="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-teal-500 ">
          <BsTagFill class="fill-white" />
        </div>
      </div>
    </div> : <button class={`flex w-fit items-center justify-center gap-2 ${link.includes(channelLineup) ? "" : "border-2 border-teal-500 p-1 px-7 rounded-full shadow-md transition-all  hover:text-white hover:cursor-pointer hover:border-transparent hover:bg-teal-500"}  bg-white  text-btn-green opacity-80  text-[15px] font-[600] max-md:text-[14px] max-sm:text-[13px] `}
      onClick$={() => showModal.value = true}>{text}</button>}


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