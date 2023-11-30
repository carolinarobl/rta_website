import { component$ } from "@builder.io/qwik";

export const AppreciationGiveaway = component$(({data}:{data:any}) => {
  return <div class="h-[550px] w-full  flex flex-col items-center justify-center">
    <iframe  class="w-3/4 my-4 h-full rounded-3xl" src={data['iFrame_link']} loading="lazy"></iframe>
  </div>
});