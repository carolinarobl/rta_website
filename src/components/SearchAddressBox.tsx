import { $, component$, Slot, useSignal } from '@builder.io/qwik';
import { FaLocationPinSolid } from '@qwikest/icons/font-awesome';
import { Button } from '~/components/Button';
import { searchBastropCoverage, searchCoverage } from '~/services/coverage_search';
import { Spinner } from '~/components/Spinner';
import { FormBastrop } from './forms/form-bastrop';
import { BsHouseFill, BsXLg } from '@qwikest/icons/bootstrap';
import { PopupConfigurator } from './popups/popup_configurator';
import { PopupLeaving } from './popups/popup_leaving';

  const generateConfiguratorRoute = (baseLink: string, street: string, zip: string) => {
  return baseLink
    .replace("=pConf=", "")
    .replace("streetInput", street)
    .replace("zipInput", zip);
};

export default component$(({ isES, formData, confLink }: { isES: any, formData?: any, confLink: string }) => {

  const addressInput = useSignal<HTMLInputElement>(
    (<input></input>) as unknown as HTMLInputElement,
  );

  const selectedAddress = useSignal('');
  const configuratorRoute= useSignal<string>("");
  const showPopupLeaving = useSignal(false);

  const coverageFlag = useSignal<'bastrop_nofiber' | 'bastrop_elegible' | 'bastrop_nocoverage' | 'notbastrop' | 'unknown'> ('unknown');
  const isloading = useSignal(false);
  const isFormOpen = useSignal(false);
  const isAddressMissing = useSignal(false);

  const lat = useSignal("");
  const lng = useSignal("");
  const zip = useSignal('');

  const typingTimer = useSignal<any>();
  const suggestions = useSignal([]);
  const suggStatus = useSignal<"none" | "notfound" | "success" | "selected">(
    "none",
  );

const handleCheck = $(async () => {
  if (addressInput.value.value.length > 0) {
    isAddressMissing.value = false;


    if (lat.value !== "" && lng.value !== "") {
      isloading.value = true;
      selectedAddress.value = addressInput.value.value;

      try {
        const res = await searchBastropCoverage(lat.value, lng.value);
        coverageFlag.value = res['serviceType'];

        // Si es bastrop_nocoverage, verificamos si tiene cobertura especial
        if (coverageFlag.value === 'bastrop_nocoverage') {
          const extraCoverage = await searchCoverage(lat.value, lng.value, zip.value);
          if (extraCoverage['coverage']) {
          coverageFlag.value = 'notbastrop';
          }
        }

        if(coverageFlag.value == 'notbastrop'){
          const street = addressInput.value.value.split(", ")[0];
          configuratorRoute.value = generateConfiguratorRoute(confLink, street, zip.value)
        }

        // ✅ Ahora que coverageFlag ya está actualizado, abrimos el modal
        isFormOpen.value = true;

      } catch (error) {
        console.error('Error al buscar cobertura:', error);
      }

      isloading.value = false;
      lat.value = "";
      lng.value = "";

    } else {
      isloading.value = false;
    }

  } else {
    isAddressMissing.value = true;
  }
});
  

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

    const handleLeavingModal = $((): void => {

    if(window.localStorage.getItem("sendform_leaving") != "true") {
      showPopupLeaving.value = true;
    }
    else {
      isFormOpen.value = false;
    }
    
});

  const formFields = formData?.['Fields'] ?? [{ 'Placeholder': isES ? 'Busca una dirección':'Address Search' }];
  const formButton = formData?.['ActionButton'] ?? { 'Text': isES ? 'Consultar':'Check' };

  return  <div class='w-full'>

{isFormOpen.value && (
  <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40 bastrop-form">

    <div class="relative animate-zoomIn flex flex-col-reverse md:flex-row w-fit max-w-full max-h-full">


      {/* Botón condicional según el tipo de popup */}
      {!(coverageFlag.value === 'notbastrop') && ((
        <button
          aria-label="Close popup"
          onClick$={() => { isFormOpen.value = false }}
          class="absolute top-2 right-2 bg-secondary-red flex items-center justify-center text-white rounded-full h-[30px] w-[30px] focus:outline-none z-[9999] hover:bg-red-600"
        >
          <BsXLg />
        </button>
      ))}

      <div class="flex p-4 flex-wrap overflow-hidden items-center justify-center">
        {
          coverageFlag.value === 'notbastrop'
            ?
            <PopupConfigurator route={configuratorRoute.value} />
            : <FormBastrop 
                lang={isES ? 'es' : 'en'}
                service_type={coverageFlag.value}
                bastrop_address={selectedAddress.value}
              />
        }
      </div>

    </div>

    {(coverageFlag.value === 'notbastrop' || coverageFlag.value === 'bastrop_nocoverage') && (
  <button
    aria-label="Close popup"
    onClick$={() => {
      // Aquí podrías abrir un popup extra si quieres confirmar que quiere salir (como `PopupLeaving`)
      isFormOpen.value = false;
      handleLeavingModal
    }}
    class="absolute top-2 right-12 bg-secondary-red flex items-center justify-center text-white rounded-full h-[30px] px-3 text-xs gap-2 z-[9999]"
  >
    Back to site <BsHouseFill />
  </button>
)}

        <div>
          {
            showPopupLeaving.value && window.localStorage.getItem("sendform_leaving") != "true" ? <PopupLeaving signalMainPopup={isFormOpen} signalPopupLeaving={showPopupLeaving} /> : null
          }
        </div>

  </div>

  
)}

            <div class={`flex gap-2 text-primary-blue justify-center items-center flex-col grow w-full`}>

                    <div class={`flex bg-white md:rounded-full rounded-[20px] md:w-auto w-full flex-col items-center justify-around p-4 gap-2`}>
                                        
                        <form action="" class="w-full flex items-center justify-center gap-2 md:flex-row flex-col grow" >
                            
                            <input
                                name='search-address'
                                id='search-address'
                                class="w-full rounded-full px-3 py-2 placeholder-primary-blue bg-primary-light-blue/20"
                                placeholder={formFields[0]['Placeholder']}
                                required
                                onKeyUp$={handleSearch}
                                ref={addressInput}
                                type="text"
                            />
                            
                            <div class="">
                              <Button
                                text={formButton['Text']}
                                onClick={handleCheck}
                              /> 

                            </div>

                        
                        </form>

                        <p class={`${coverageFlag.value ? "hidden" : "flex"} text-secondary-red text-sm font-bold`}>{isES? 'Lamentablemente, no hay cobertura en tu área.' : 'Unfortunately, there is no coverage in your area.'}</p>
                        <p class={`${isAddressMissing.value ? "flex" : "hidden"} text-secondary-red text-sm font-bold`}>{isES? 'Por favor, ingresa una dirección.' : 'Please, enter an address.'}</p>

                    </div>
    

                    <div class={`flex max-h-[200px] flex-col gap-3 overflow-y-auto rounded-xl bg-white p-6 text-primary-blue shadow-lg ${suggStatus.value === "none" || suggStatus.value === "selected" ? "hidden" : "" }`}>
                        
                        {suggestions.value.length === 0 ? "Not found" : ""}
                        
                        {suggestions.value.map((sugg: any, i: number) => { return (
                            
                            <div
                                key={i}
                                class="grid items-center gap-4 hover:cursor-pointer"
                                style={{gridTemplateColumns: "20px 1fr",}}
                                onClick$={() => {
                                    addressInput.value.value = sugg["address"];
                                    lat.value = sugg["position"]["lat"];
                                    lng.value = sugg["position"]["lng"];
                                    zip.value = sugg["zip"];
                                    suggStatus.value = "selected";
                                }}
                            >
            
                                <FaLocationPinSolid class="w-6" />    
                                <span class="text-[14px]">{sugg["address"]}</span>
                            
                            </div>
                        );})}
                    </div>

                    { isloading.value && (
                        <Spinner size='70px' />
                    )}

                    { (coverageFlag.value && isloading.value == false) &&
                    (
                      <div class=" flex flex-grow justify-center place-items-center">
                        <Slot/>
                      </div>
                    )
                    }

                  
                </div>
              </div>
                });


