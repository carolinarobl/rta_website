import { $, component$, useSignal, useStore } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { FaLocationPinSolid } from '@qwikest/icons/font-awesome';
import { BroadbandLabel } from '~/components/BroadbandLabel';
import { Button } from '~/components/Button';
import { Markdown } from '~/components/Markdown';
import Lang from '~/routes/[...lang]';
import { searchCoverage } from '~/services/coverage_search';
import { searchProducts } from '~/services/products_search';

export default component$(({ plans }: { plans: any }) => {
  const description = `Experience the speed and reliability of *Gigfast Internet* with our detailed Broadband Labels. Easily compare pricing, contract terms, and additional features for each plan to find the best fit for your needs. With Gigfast, you get ultra-fast Internet, perfect for homes and businesses that demand top-tier connectivity. Browse our options and choose the plan that will take you to the next level.`

  const location = useLocation();
  const isES = location.prevUrl?.pathname.includes("/es/");

  const addressInput = useSignal<HTMLInputElement>(
    (<input></input>) as unknown as HTMLInputElement,
  );
  const zipRef = useSignal<HTMLInputElement>(
    (<input></input>) as unknown as HTMLInputElement,
  );
  const coverageFlag = useSignal(true);
  const locationGroup = useSignal("");
  const type = useSignal("");
  const isBusiness = useSignal<boolean>(false);

  const lat = useSignal("");
  const lng = useSignal("");
  const packagesResidential = useSignal<any>([]);
  const packagesBusiness = useSignal<any>([]);

  // console.log(coverageFlag.value);


  const typingTimer = useSignal<any>();
  const suggestions = useSignal([]);
  const suggStatus = useSignal<"none" | "notfound" | "success" | "selected">(
    "none",
  );

  const handleCheck = $(() => {
    if (lat.value != "" && lng.value != "") {
      packagesResidential.value = [];
      packagesBusiness.value = [];

      const data = searchCoverage(lat.value, lng.value, zipRef.value.value);

      data.then((res) => {
        coverageFlag.value = res['coverage'];
        locationGroup.value = res['locationgroup'];
        type.value = res["type"];

        if (coverageFlag.value && locationGroup.value != "" && type.value != "") {
          searchProducts(locationGroup.value, type.value).then((data) => {
            packagesResidential.value = [...data.residential];
            packagesBusiness.value = [...data.business];
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
      Broadband Labels
    </h1>
    <div class="bg-white h-[150px] rounded-full md:w-1/2 w-[90%] flex flex-col items-center justify-around my-5">
      <p class="px-8 text-center text-[22px] font-[600] text-primary-blue max-[1000px]:px-12">{isES ? "Encuentra los planes disponibles en tu area" : "Find the available plans in your area"}</p>
      <form action="" class="w-3/4 flex items-center justify-center gap-4" >
        <input
          class="w-[50%] rounded-full px-3 py-2 placeholder-primary-blue bg-primary-light-blue/20"
          placeholder="Address Search"
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
          text="Check Now"
          // link={data["HeroForm"]["ActionButton"]["Link"]}
          onClick={handleCheck}
        />
      </form>

      <label class={`${coverageFlag.value === true ? "flex" : "hidden"} inline-flex items-center mb-5 cursor-pointer`}>
        <input type="checkbox" checked={isBusiness.value}
          onChange$={() => {
            isBusiness.value = !isBusiness.value;
          }}
          class="sr-only peer" />
        <span class="me-3 text-sm font-medium text-primary-blue">Residential</span>
        <div class="relative w-11 h-6 bg-secondary-red peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full  rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-primary-blue"></div>
        <span class="ms-3 text-sm font-medium text-primary-blue">Business</span>
      </label>

      <p class={`${coverageFlag.value ? "hidden" : "flex"} text-secondary-red text-xl font-bold`}>No coverage</p>
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
            }}
          >
            <FaLocationPinSolid class="w-6 text-secondary-red" />
            <span class="text-[14px]">{sugg["address"]}</span>
          </div>
        );
      })}
    </div>
    {coverageFlag.value && <div class="mx-4 my-8 max-w-[500px]">
      <img src="https://strapi42.rtatel.com/uploads/gig_FAST_Internet_0253314cce.webp" width={1230} height={229} alt="" />
      {/* cambiar img  */}
      {/* <StrapiImage media="/uploads/gig_FAST_Internet_0253314cce.webp" width={1230} height={229} /> */}
    </div>

    }
    {/* <div class="mx-10 my-4 flex max-w-[800px] flex-col items-center justify-center gap-2 text-primary-blue">
      
      <Markdown classN={"text-center"} text={description} />
    </div> */}
    {
      coverageFlag.value && packagesResidential.value.length > 0 &&

      <div class={`${isBusiness.value ? "hidden" : "flex"} flex-col items-center gap-2`}>
        <h2 class="text-center text-[38px] font-bold text-[#2E5899] max-sm:text-[28px]">Residential</h2>

        <div class={`flex w-full overflow-x-auto gap-1 flex-row xl:justify-center mb-4 pb-4`}>
        
        {
          packagesResidential.value.length > 0 &&
          packagesResidential.value.map((plan: any, index: number) => {
            return (
              <BroadbandLabel key={'Broadband-' + index} monthlyPrice={plan['price']}
                servicePlan={plan['name']}
                // providerName={plan['values']['provider_name'][0]['data']}
                typicalDownSpeed={plan['download_mbps']}
                typicalUploadSpeed={plan['upload_mbps']}
              />
            )
          })
        }
      </div>
      </div>
    }

    {
      coverageFlag.value && packagesBusiness.value.length > 0 &&
      <div class={`${isBusiness.value ? "flex" : "hidden"} flex-col items-center gap-2`}>
        <h2 class="text-center text-[38px] font-bold text-[#2E5899] max-sm:text-[28px]">Business</h2>

        <div class={`flex w-full overflow-x-auto gap-1 flex-row xl:justify-center mb-4 pb-4`}>

          {
            packagesBusiness.value.length > 0 &&
            packagesBusiness.value.map((plan: any, index: number) => {
              return (
                <BroadbandLabel key={'Broadband-' + index} monthlyPrice={plan['price']}
                  servicePlan={plan['name']}
                  // providerName={plan['values']['provider_name'][0]['data']}
                  typicalDownSpeed={plan['download_mbps']}
                  typicalUploadSpeed={plan['upload_mbps']}
                />
              )
            })
          }
        </div>
      </div>

    }
  </div>
});