import { Slot, component$, useSignal } from "@builder.io/qwik";

export const AccordionItem = component$(({ title, classContainer, classChild }: { title: string, classContainer?:string, classChild?:string }) => {
  const isOpen = useSignal(false);

  return (
    <div class="mb-2 my-8 w-full">
      <div
        class={`flex cursor-pointer text- flex-row transition justify-between ${classContainer} p-2 `}
        onClick$={() => {
          isOpen.value = !isOpen.value;
        }}
      >
        <span class="flex w-full items-center justify-center font-bold">
          {title}
        </span>
        <span class="w-1/8 flex items-center justify-end text-xs">
          {isOpen.value ? "▲" : "▼"}
        </span>
      </div>
      {isOpen.value && (
        <div class={`${classChild} duration-500 mx-4 transition-all ease-in-out p-2 text-center`} >
          <Slot />
        </div>
      )}
    </div>
  );
});
