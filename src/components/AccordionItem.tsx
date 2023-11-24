import { Slot, component$, useSignal } from "@builder.io/qwik";

export const AccordionItem = component$(({ title, classContainer, classChild, inFooter=false }: { title: string, classContainer?:string, classChild?:string, inFooter?:boolean }) => {
  const isOpen = useSignal(false);

  return (
    <div class="mb-2 my-8 w-full">
      <div
        class={`flex cursor-pointer flex-row transition ${
          inFooter ? "" : isOpen.value ? "rounded-t-2xl rounded-b-none" : "rounded-full"
        } justify-between ${classContainer} p-2 `}
        onClick$={() => {
          isOpen.value = !isOpen.value;
        }}
      >
        <span class="flex w-full items-center justify-center font-bold">
          {title}
        </span>
        <div class={`w-[20px] h-[20px] flex items-center justify-center ${inFooter?"":"bg-secondary-red text-white rounded-full"}`}>
        <span class="w-1/8 flex items-center justify-end text-xs">
          {isOpen.value ? "▲" : "▼"}
        </span>
        </div>
      </div>
      {isOpen.value && (
        <div class={`${classChild} ${inFooter?"":"border-t-2 bg-white rounded-b-2xl rounded-t-none"} duration-500 transition-all ease-in-out p-2 text-center`} >
          <Slot />
        </div>
      )}
    </div>
  );
});
