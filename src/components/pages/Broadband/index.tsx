import { $, component$, useSignal } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { FaLocationPinSolid } from '@qwikest/icons/font-awesome';
import { Button } from '~/components/Button';
import { searchCoverage } from '~/services/coverage_search';
import { searchProducts } from '~/services/products_search';
import { BroadbandPlans } from './broadbandplans';
import { Spinner } from '~/components/Spinner';

export default component$(({ data }: { data: any }) => {
  const location = useLocation();
    const isES = location.prevUrl?.pathname.includes("/es/");

  const broadbandPageData = data['pageBroadbandlabel']['data']['attributes'];


  const addressInput = useSignal<HTMLInputElement>(
    (<input></input>) as unknown as HTMLInputElement,
  );
  const zipRef = useSignal<HTMLInputElement>(
    (<input></input>) as unknown as HTMLInputElement,
  );
  const coverageFlag = useSignal(true);
  const isloading = useSignal(false);
  const locationGroup = useSignal("");
  const type = useSignal("");
  const isBusiness = useSignal<boolean>(false);

  const lat = useSignal("");
  const lng = useSignal("");
  const packagesInternetResidential = useSignal<any>([]);
  const packagesInternetBusiness = useSignal<any>([]);

  const packagesVoiceResidential = useSignal<any>([]);
  const packagesVoiceBusiness = useSignal<any>([]);
  // console.log(coverageFlag.value);


  const typingTimer = useSignal<any>();
  const suggestions = useSignal([]);
  const suggStatus = useSignal<"none" | "notfound" | "success" | "selected">(
    "none",
  );

  const handleCheck = $(() => {
    if (lat.value != "" && lng.value != "") {
      isloading.value = true;
      packagesInternetResidential.value = [];
      packagesInternetBusiness.value = [];
      packagesVoiceBusiness.value = [];
      packagesVoiceResidential.value = [];

      const data = searchCoverage(lat.value, lng.value, zipRef.value.value);

      data.then((res) => {
        coverageFlag.value = res['coverage'];
        locationGroup.value = res['locationgroup'];
        type.value = res["type"];

        if (coverageFlag.value && locationGroup.value != "" && type.value != "") {
          searchProducts(locationGroup.value, type.value).then((data) => {
            isloading.value = false;
            packagesInternetResidential.value = [...data.residentialInternet];
            packagesInternetBusiness.value = [...data.businessInternet];

            packagesVoiceBusiness.value = [...data.businessVoice];
            packagesVoiceResidential.value = [...data.residentialVoice];
          }
          );
        }
      });


      coverageFlag.value = true;
      lng.value = "";
      lat.value = "";

    } else {
      coverageFlag.value = false;
    }
  })

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


  return <div class="flex flex-col items-center justify-around">
    <h1 class="text-center text-[38px] font-bold text-[#2E5899] max-sm:text-[28px]">
      {broadbandPageData['Title']}
    </h1>

    <div class="bg-white md:h-[200px] h-[220px] rounded-full md:w-1/2 w-[90%] flex flex-col items-center justify-around my-5 gap-2">
      <p class="px-8 text-center text-[22px] font-[600] text-primary-blue max-[1000px]:px-12">{broadbandPageData['Form']['Title']}</p>
      <form action="" class="w-3/4 flex items-center justify-center gap-4 md:flex-row flex-col" >
        <input
          class="md:w-[50%] w-[80%] rounded-full px-3 py-2 placeholder-primary-blue bg-primary-light-blue/20"
          placeholder={broadbandPageData['Form']['Fields'][0]['Placeholder']}
          required
          onKeyUp$={handleSearch}
          ref={addressInput}
          type="text"
        />
        <input
          class="w-[60%] rounded-full px-3 py-2 hidden placeholder-primary-blue"
          placeholder="Zip Code"
          ref={zipRef}
          type="text"
        />
        <Button
          text={broadbandPageData['Form']['ActionButton']['Text']}
          onClick={handleCheck}
        />
      </form>

      <p class="text-xs text-primary-blue text-center ">{isES?"Ingresa tu dirección y selecciona la opción correcta de la lista desplegable que aparecerá":"Enter your address and select the correct option from the dropdown list that appears"}</p>

      <label class={`${coverageFlag.value === true ? "flex" : "hidden"} inline-flex items-center mb-5 cursor-pointer`}>
        <input type="checkbox" checked={isBusiness.value}
          onChange$={() => {
            isBusiness.value = !isBusiness.value;
          }}
          class="sr-only peer" />
        <span class="me-3 text-sm font-medium text-primary-blue">{broadbandPageData['CustomerType'][0]['title']}</span>
        <div class="relative w-11 h-6 bg-secondary-red peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full  rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-primary-blue"></div>
        <span class="ms-3 text-sm font-medium text-primary-blue">{broadbandPageData['CustomerType'][1]['title']}</span>
      </label>

      <p class={`${coverageFlag.value ? "hidden" : "flex"} text-secondary-red text-xl font-bold`}>{broadbandPageData['Message']}</p>
    </div>
    <div
      class={`flex max-h-[200px] flex-col gap-3 overflow-y-auto rounded-xl bg-white p-6 text-primary-blue shadow-lg ${suggStatus.value === "none" || suggStatus.value === "selected"
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
              addressInput.value.value = sugg["address"];
              lat.value = sugg["position"]["lat"];
              lng.value = sugg["position"]["lng"];
              zipRef.value.value = sugg['zip'];
              suggStatus.value = "selected";

              console.log(lat.value + " "+ lng.value);
            }}
          >
            <FaLocationPinSolid class="w-6 text-secondary-red" />
            <span class="text-[14px]">{sugg["address"]}</span>
          </div>
        );
      })}
    </div>

    {
      isloading.value && (
          <Spinner size='100px'/>
      )
    }

    
    {
      coverageFlag.value && (
        <>
          {/* PLANES DE GIGFASTINTERNET */}
          <BroadbandPlans
            isVisible={!isBusiness.value}
            plans={packagesInternetResidential.value}
            broadbandPageData={broadbandPageData}
            index={0}
            customerTypeIndex={0}
            />

          <BroadbandPlans
            isVisible={isBusiness.value}
            plans={packagesInternetBusiness.value}
            broadbandPageData={broadbandPageData}
            index={0}
            customerTypeIndex={1}
            />

          {/* PLANES DE GIGFASTVOICE */}
          {/* <BroadbandPlans
            isVisible={!isBusiness.value}
            plans={packagesVoiceResidential.value}
            broadbandPageData={broadbandPageData}
            index={1}
            customerTypeIndex={0}
            isVoice
            />

          <BroadbandPlans
            isVisible={isBusiness.value}
            plans={packagesVoiceBusiness.value}
            broadbandPageData={broadbandPageData}
            index={1}
            customerTypeIndex={1}
            isVoice
            /> */}
        </>
      )
    }
    </div>
});