import { component$ } from "@builder.io/qwik";

export const SectionChpack = component$(({data}:{data:any}) => {
  return <div class="flex flex-col h-auto items-center justify-center">
    <h1>{data['ChPackTitle']}</h1>
  </div>
});