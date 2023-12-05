import { component$ } from "@builder.io/qwik";
import { SimpleTable } from "~/components/pricing-table/simple-table";

export const SectionGFVPacks = component$(({ data }: { data: any }) => {
  return (
    <div class="max-w-1200 mx-8 flex flex-wrap justify-evenly gap-6">
      {data.map((pack:any, i:any) => {
        return (
          <SimpleTable
            key={i}
            title={pack["Title"]}
            btnText={pack["Button"]["Text"]}
            btnLink={pack["Button"]["Link"]}
            description={pack["Description"]}
            price={pack["Price"].toString()}
            features={pack["Features"]}
            logo={pack["Logo"]["data"]["attributes"]}
            priceTime={pack["Pricetime"]}
          />
        );
      })}
    </div>
  );
});
