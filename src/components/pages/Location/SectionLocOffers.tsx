import { component$ } from "@builder.io/qwik";
import { SimpleTable } from "~/components/pricing-table/simple-table";

export const SectionLocOffers = component$(({ data }: { data: any }) => {
  const tables = data["lpPtGroup"]["data"]["attributes"]["PricingTables"];
  return (
    <div class="w-full">
      <div class="h-[30px] w-full bg-primary-blue opacity-20"></div>
      <div class="h-[30px] w-full bg-primary-blue opacity-50"></div>

      <div class="flex min-h-[200px]  w-full items-center justify-center bg-gradient-to-br from-primary-light-blue to-[#23477f] p-8">
        <div class="flex w-full max-w-[1200px] flex-col items-center justify-center">
          <span class="text-center text-[38px] font-[600] leading-10 text-white max-[800px]:text-[28px]">
            Find available offers in your area
          </span>
          <div class="mt-8 flex w-full gap-8 max-[1200px]:flex-col">
            <div class="flex min-h-[360px] items-center justify-center overflow-hidden rounded-2xl min-[1200px]:w-[36%]">
              <iframe
                src={
                  data["locations"]["data"][0]["attributes"]["office"]["data"][
                    "attributes"
                  ]["Address"]
                }
                class="h-full w-full rounded-2xl"
                allowfullscreen=""
                loading="lazy"
                frameborder="0"
              ></iframe>
            </div>
            <div class="flex justify-evenly gap-4 max-[1200px]:flex-wrap min-[1200px]:w-[64%]">
              {tables.map((table, i) => (
                <SimpleTable
                  key={i}
                  btnText={table["Button"]["Text"]}
                  btnLink={table["Button"]["Link"]}
                  description={table["Description"]}
                  logo={table["Logo"]["data"]["attributes"]["url"]}
                  features={table["Features"]}
                  price={table["Price"].toString()}
                  priceTime={table["Pricetime"]}
                  title={table["Title"]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div class="h-[30px] w-full bg-primary-blue opacity-50"></div>
      <div class="h-[30px] w-full bg-primary-blue opacity-20"></div>
    </div>
  );
});
