import { component$ } from "@builder.io/qwik";
import { ServiceTv } from "~/components/pricing-table/service-tv";

export const SectionChpack = component$(({data, title}:{data:any, title:string}) => {

  return <div class="flex flex-col items-center justify-center my-8 mx-4">
    <h2 class="text-3xl text-center md:text-5xl font-semibold text-primary-blue">{title}</h2>
    <div class="flex flex-wrap items-center justify-center gap-4 my-6">
    {data.map((table:any,key:any)=>(
      <ServiceTv key={key} logo={table['Logo']['data']['attributes']['url']}
      title={table['Title']}
      subtitle={table['Subtitle']}
      price={table['Price']}
      priceTime={table['Pricetime']}
      description={table['Description']}
      channels={table['Channels']['data']}
      btnSeeMoreLink={table['LineupButton']['Link']}
      btnSeeMoreText={table['LineupButton']['Text']}
      features={table['Features']}
      btnLink={table['Button']['Link']}
      btnText={table['Button']['Text']}
      ></ServiceTv>
))}
    </div>
  </div>
});