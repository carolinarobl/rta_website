import { component$ } from "@builder.io/qwik";
import { SectionDeals } from "./SectionDeals";
import { SectionDIntro } from "./SectionDIntro";
import { SectionDDiscounts } from "./SectionDDiscounts";

export const Deals = component$(({ data }: { data: any }) => {
  const dealsData = data["pageDeals"]["data"]["attributes"]["Deals"];
  const introData = data["pageDeals"]["data"]["attributes"]["RefInfo"];
  const discountsData = data["pageDeals"]["data"]["attributes"]["Discounts"];
  const disclaimer = data["pageDeals"]["data"]["attributes"]["Disclaimer"];
  return (
    <div>
      <SectionDeals data={dealsData} />
      <SectionDIntro data={introData} />
      <SectionDDiscounts data={discountsData} />

      <div class="flex w-full items-center  justify-center p-8 text-center text-[14px] italic text-primary-dark-blue">
        {disclaimer}
      </div>
    </div>
  );
});
