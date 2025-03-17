import { $, component$, Slot, useSignal } from '@builder.io/qwik';
import { FaLocationPinSolid } from '@qwikest/icons/font-awesome';
import { Button } from '~/components/Button';
import { searchBastropCoverage } from '~/services/coverage_search';
import { Spinner } from '~/components/Spinner';
import { FormBastrop } from './forms/form-bastrop';
import { BsXLg } from '@qwikest/icons/bootstrap';

export default component$(({ isES, formData }: { isES: any, formData?: any }) => {

  const addressInput = useSignal<HTMLInputElement>(
    (<input></input>) as unknown as HTMLInputElement,
  );

  let selectedAddress = useSignal('');

  const coverageFlag = useSignal(true);
  const isloading = useSignal(false);
  const isFormOpen = useSignal(false);
  const isAddressMissing = useSignal(false);


  const lat = useSignal("");
  const lng = useSignal("");

  const typingTimer = useSignal<any>();
  const suggestions = useSignal([]);
  const suggStatus = useSignal<"none" | "notfound" | "success" | "selected">(
    "none",
  );

  const handleCheck = $(() => {

    if(addressInput.value.value.length > 0){
      isAddressMissing.value = false;
      
    if (lat.value != "" && lng.value != "") {
      isloading.value = true;

      selectedAddress.value = addressInput.value.value;
      const data = searchBastropCoverage(lat.value, lng.value);
  
      data.then((res) => {
        coverageFlag.value = res['coverage'];
  
        if (coverageFlag.value  ) {
              isFormOpen.value = true;
              isloading.value = false; // Asegurar que se oculta el spinner al finalizar

        } else {
          isloading.value = false; // En caso de que no haya cobertura
        }
      }).catch(() => {
        isloading.value = false; // Si ocurre un error
      });
  
      coverageFlag.value = true;
      lng.value = "";
      lat.value = "";
  
    } else {
      coverageFlag.value = false;
      isloading.value = false;
    }

  }
  else{
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

  const formFields = formData?.['Fields'] ?? [{ 'Placeholder': isES ? 'Busca una dirección':'Address Search' }];
  const formButton = formData?.['ActionButton'] ?? { 'Text': isES ? 'Consultar':'Check' };

  return  <div>

              {isFormOpen.value && (
                <div class="fixed inset-0 !z-[999999] flex flex-col items-center justify-center bg-black bg-opacity-40 bastrop-form">
                <div class={` flex-col-reverse md:flex-row w-fit" animate-zoomIn flex `}>
                  <div class="flex p-4 flex-wrap overflow-hidden items-center justify-center ">
                    <FormBastrop 
                      lang={isES ? 'es' : 'en'}
                      bastrop_address={selectedAddress.value}
                    />;
                  </div>

                  <button
                    aria-label="Close popup"
                    onClick$={() => {isFormOpen.value = false}}
                    class={`bg-secondary-red flex items-center justify-center text-white rounded-full h-[30px] w-[30px] focus:outline-none !z-[9999]`}>
                      <div><BsXLg/></div>
                  </button>
                </div>
              </div>
              )}

            <div class={`flex max-w-[1200px] gap-2 text-primary-blue justify-center items-center flex-col`}>

                    <div class={`flex bg-white md:rounded-full rounded-[20px]  flex flex-col items-center justify-around p-4 gap-2`}>
                                        
                        <form action="" class="w-full flex items-center justify-center gap-2 flex-row" >
                            
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


