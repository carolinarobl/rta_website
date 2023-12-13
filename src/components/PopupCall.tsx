import { Slot, component$, useSignal } from "@builder.io/qwik";
import { PortabilityRequest } from "./popups/portabilityRequest";
import { FormContact } from "./forms/form-contact";
import { PopupChannelsLineup } from "./popups/popup_channels_lineup";
import { PopupLoginForm } from "./popups/popup_login_form";
import { BsTagFill } from "@qwikest/icons/bootstrap";
import { useLocation } from "@builder.io/qwik-city";
import { PopupConfigurator } from "./popups/popup_configurator";

export const PopupCall = component$((
  { link, dataChannels, planId, channels, text, hasStyle= true}:
    {
      link: string,
      dataChannels?: any,
      planId?: string,
      channels?: string,
      text?: string,
      hasStyle?: boolean
    }) => {

  const configurator = "=pConf=";
  const login = "=pLogin"
  const contactEmail = "=pContactEmail=";
  const iFrame = "=pIFrame=";
  const channelLineup = "=pChannelLineup=";
  const locationNumber ="=pOfficeCall";

  const location = useLocation();
  const isES = location.prevUrl?.pathname.includes("/es/");

  // var popupCall = link;
  let child = null

  if (link.includes(configurator)) {
    const frameRoute = link.replace(configurator,"");
    child = <PopupConfigurator route={frameRoute}/>
  }
   else if (link.includes(contactEmail)) {
    // popupCall = contactEmail;
    const templateID = link.replace(contactEmail, "");
    child = <FormContact templateID={templateID}/>

    // link = link.replaceAll(contactEmail, "");
  } else if (link.includes(iFrame)) {
    const linkClean = link.replaceAll(iFrame, "");
    child = <PortabilityRequest link={linkClean} />
  } else if (link.includes(channelLineup)) {

    child = <PopupChannelsLineup
      channels={channels}
      planId={planId}
      data={dataChannels} />

  }
  else if(link.includes(login)){
    child=<PopupLoginForm title={isES?"Inicia sesión en el portal de tu zona":"Log into the portal of your area"}
    description={isES?"Simplemente ingrese su código postal.":"Just enter your Zip code."}
    btnText={isES?"Ir ahora":"Go Now"}
    popup="login"></PopupLoginForm>
  }
  else if(link.includes(locationNumber)){
    child=<PopupLoginForm popup="location"
    title={isES?"Llame a su oficina local":"Call your local office"}
    description={isES?"Descubra exactamente qué servicios ofrece RTA en su ciudad natal. Ingrese su código postal para el número de teléfono de su oficina local."
    :"Find out exactly what services RTA has to offer in your hometown. Input your zip code for your local office phone number."}
    notFountText={isES?"Desafortunadamente, RTA no está disponible actualmente en su área. Sin embargo, RTA continúa expandiéndose en todo Estados Unidos. Si está interesado en los servicios de RTA en su área, envíenos un correo electrónico o llame a nuestra oficina principal.":"Find out exactly what services RTA has to offer in your hometown. Input your zip code for your local office phone number."}
    btnText={isES?"Comprobar ahora":"Check Now"}></PopupLoginForm>
  }


  const showModal = useSignal(false);

  return (
    <div class={`relative flex`}>
      {link.includes(configurator) &&
        (!(text?.includes("Check")) || !(text?.includes("Buscar"))) ? (
        <div
        onClick$={() => (showModal.value = true)}
        class={`flex w-fit items-center justify-center rounded-full border-2 border-teal-500 border-opacity-70 bg-white p-0.5 px-1 text-btn-green opacity-90 shadow-md transition-all hover:cursor-pointer hover:border-transparent hover:bg-teal-500 hover:text-white transition ease-in-out delay-150`}
      >
        <p class="mx-2 tracking-wide text-[15px] font-[600] max-md:text-[14px] min-sm:text-[13px] ">
          {text}
        </p>
        <div class="flex h-[25px] w-[25px] items-center p-0 justify-center rounded-full opacity-70 bg-teal-500 ">
          <BsTagFill class="fill-white font-bold" />
        </div>
      </div>
      ) : !hasStyle ? <div onClick$={() => (showModal.value = true)}><Slot/> </div>:
      (
        <button
          class={`flex w-fit items-center justify-center gap-2 ${link.includes(channelLineup)
            ? ""
            : "rounded-full border-2 border-teal-500 p-1 px-7 shadow-md transition-all  hover:cursor-pointer hover:border-transparent hover:bg-teal-500 hover:text-white"
            }  bg-white  text-[15px] font-[600]  text-btn-green opacity-80 max-md:text-[14px] max-sm:text-[13px] `}
          onClick$={() => {showModal.value = true}}
        >
          {text}
        </button>
      )}

      {showModal.value && (
        <div role="dialog" aria-modal="true" tabIndex={-1} class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-700 p-6 bg-opacity-40 rounded-lg shadow-md">
          <div  class={` ${link.includes(configurator) ? "w-full h-full flex-row-reverse" : "w-fit"} animate-zoomIn flex flex-row`}>
          <div class="flex p-4 flex-wrap overflow-hidden items-center justify-center ">
            {child}
          </div>
          <button aria-label="Close popup" onClick$={() => showModal.value = false} class="bg-secondary-red flex items-center justify-center text-white p-4 rounded-full w-[30px] h-[30px] focus:outline-none z-[600]">X</button>
          </div>
        </div>
      )}
    </div>
  )
});