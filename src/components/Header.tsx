import { component$, useSignal, $} from "@builder.io/qwik";
import { Button } from "./Button";
// import Carousel from "./Carousel";
import { PopupConfigurator } from "./popups/popup_configurator";
import { PopupLeaving } from "./popups/popup_leaving";
import { BsGeoAltFill, BsHouseFill, BsSearch, BsTelephoneFill } from "@qwikest/icons/bootstrap";
import { FaLocationPinSolid } from "@qwikest/icons/font-awesome";
import { Markdown } from "./Markdown";
import { Link } from "@builder.io/qwik-city";


export const Header = component$(({ data, isHeroMode }: { data: any; isHeroMode?: boolean }) => {

  // V A R I A B L E S

  // V a r i a b l e s   |   A d d r e s s   s u g g e s t i o n s
  const typingTimer = useSignal<any>();
  const suggestions = useSignal([]);
  const suggStatus = useSignal<"none" | "notfound" | "success" | "selected">(
    "none",
  );

  // V a r i a b l e s   |   P o p u p s
  const showPopupLeaving = useSignal(false);
  const showPopupConfigurator = useSignal(false);
  const slideData = (data['Slide'] as any[]).find((slide) => slide?.Buttons?.[0]?.Link?.includes('=pConf='));
  const formButton = slideData?.Buttons?.[0];
  const fullFrameSource = useSignal<string>(
  formButton?.Link || '=pConf=https://ecom.rtatel.com/#/prefill/?address=streetInput&zipcode=zipInput');

  // Va r i a b l e s   |   F o r m   I n p u t s
   const addressInput = useSignal<HTMLInputElement>(
    (<input></input>) as unknown as HTMLInputElement,
  );
  const selectedAddress = useSignal('');

  const isloading = useSignal(false);
  const isAddressMissing = useSignal(false);
  const zip = useSignal('');

  // V a r i a b l e s   |   C a l l   B u t t o n
  const callButtonData = data['CallButton'];

  // H A N D L E R S
  // H a n d l e r   |   A d d r e s s   s u g g e s t i o n s
  const handleSearch = $(() => {
    clearTimeout(typingTimer.value);
    typingTimer.value = setTimeout(() => {
      if (addressInput.value.value.length > 2)
        fetch(`/api/get-streets?q=${encodeURIComponent(addressInput.value.value)}`)
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
  })

  // H a n d l e r   |   P o p u p : P r e - e x i t
  // const handlePopupLeaving = $((): void => {
  //   window.localStorage.getItem("sendform_leaving") != "true"
  //     ?  
  //     showPopupLeaving.value = true
  //     :
  //     showPopupConfigurator.value = true; 
  // });


  // H a n d l e r   |   P o p u p : C o n f i g u r a t o r
  const handlePopupConfigurator = $(async () => {

    if (addressInput.value.value.length > 0) {
      isAddressMissing.value = false;
      isloading.value = true;
      selectedAddress.value = addressInput.value.value;

      try {
        const street = addressInput.value.value.split(", ")[0];
        
        fullFrameSource.value = fullFrameSource.value
                                  .replace("=pConf=", "")
                                  .replace("streetInput", street)
                                  .replace("zipInput", zip.value);

        showPopupConfigurator.value = true;

      } catch (error) {
        console.error('Error at configurator call:', error);
      }

    } else {
      isAddressMissing.value = true;
    }
  });
  
  return (

    <div class={`flex flex-col items-center justify-center p-4 gap-2 w-full`}>     
      
      {/* F I X E D   B U T T O N | C A L L   B U T T O N */}
      { callButtonData && !isHeroMode &&
        <Link href={callButtonData['Link']}>
          <div class="bg-teal-500 fixed flex flex-row right-0 md:bottom-auto bottom-10 rounded-full rounded-r-none !z-[999] p-2 shadow-xl shadow-primary-blue/30 items-center gap-2">
            <div class="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white p-0 opacity-70 text-btn-green">
              <BsTelephoneFill />
            </div>

            <Markdown
              text={callButtonData['Text']}
              classN="!text-white text-[12px] !tracking-wider"
            />
          </div>
        </Link>
      }
     
      {/* F O R M   A R E A | T I T L E S */}
      <div class="flex flex-row gap-2 items-center justify-center animate-fade-in">
        <BsGeoAltFill style={{ color: isHeroMode ? "#ffffff" : "#d20053", width:"14px" }}/>
        <p
          class={`font-semibold md:text-[18px] text-[15px] ${isHeroMode ? "text-white drop-shadow-lg" : "text-primary-blue"}`}>
            {slideData?.Title ?? 'Explore coverage in your service area:'}
        </p>

      </div>
      <div class={`relative flex rounded-full bg-white shadow-xl shadow-primary-blue/30 items-center justify-around gap-2 p-1 !z-[5] w-full max-w-[600px] animate-slide-in-right`}>
                                        
        <form action="" class="w-full flex items-center justify-center gap-2 flex-row grow" >
        
        <div class="w-full bg-primary-light-blue/5 flex items-center p-2 gap-2 rounded-full border border-[#2e5899] border-opacity-10">
          <BsSearch style={{ color: "#2e5899", opacity:"0.65", width:"14px" }}/>
           <input
            name='search-address'
            id='search-address'
            class=" w-full focus:outline-none  text-[15px] bg-transparent placeholder-primary-blue/70 md:min-w-[250px]"
            placeholder={slideData?.Paragraph ?? 'Type an address and select'}
            required
            onKeyUp$={handleSearch}
            ref={addressInput}
            type="text"
          />
        </div>
         
                            
          <div class="inline-block">
             <Button
              style="full"
                text={formButton?.Text ?? 'Check for plans'}
                onClick={handlePopupConfigurator}
                 
              /> 
           </div>
               
        </form>

      
                <div class={`absolute left-0 top-full mt-2 w-full z-10 flex max-h-[200px] flex-col gap-3 overflow-y-auto rounded-xl bg-white p-4 text-primary-blue shadow-lg
  ${suggStatus.value === "none" || suggStatus.value === "selected" ? "hidden" : ""}`}>

                              
        {suggestions.value.length === 0 ? "Not found" : ""}

        {suggestions.value.map((sugg: any, i: number) => { return (
                                  
          <div
            key={i}
            class="grid items-center gap-4 hover:cursor-pointer"
            style={{gridTemplateColumns: "20px 1fr",}}
            onClick$={() => {
              addressInput.value.value = sugg["address"];
              zip.value = sugg["zip"];
              suggStatus.value = "selected";
            }}
          >
                  
            <FaLocationPinSolid class="w-6" />    
            <span class="text-[14px]">{sugg["address"]}</span>
                                  
          </div>

        );})}

      </div>

      </div>
      
      {showPopupConfigurator.value && (
        <div class="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black bg-opacity-40">
          <div class={`w-full h-full flex-row-reverse  animate-zoomIn flex `}>
            <div class="flex p-4 flex-wrap overflow-hidden items-center justify-center ">
              <PopupConfigurator route={fullFrameSource.value} />
              {showPopupLeaving.value
                && window.localStorage.getItem("sendform_leaving") != "true"
                ?
                <PopupLeaving signalMainPopup={showPopupConfigurator} signalPopupLeaving={showPopupLeaving} /> : null}
            </div>
            <button aria-label="Close popup"
              onClick$={() => {
                if (fullFrameSource.value !='' && window.localStorage.getItem("sendform_leaving") != "true") {
                  showPopupLeaving.value = true;
                }
                else {
                  showPopupConfigurator.value = false;
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