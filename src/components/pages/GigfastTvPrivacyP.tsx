import { component$ } from "@builder.io/qwik";

export const GigfastTvPrivacyP = component$(({data}:{data:any}) => {
return <div class="px-4 py-2 md:px-10 md:py-2">
  <h1 class="text-primary-blue text-center font-semibold text-lg md:text-2xl mb-4">{data['Titles'][0]['Text']}</h1>

  <p class="mb-8 space-x-4 tracking-wider text-primary-blue font-normal text-sm md:text-base">{data['TextContent']}</p>
</div>
});