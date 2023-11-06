import { Slot, component$, useSignal } from "@builder.io/qwik";

export const AccordionItem = component$(({ title }: { title: String }) => {
  const isOpen = useSignal(false);
  return (
    <div class="mb-2 mt-4 w-full border-b-2 border-t-2 border-blue-600">
      <div
        class="flex cursor-pointer flex-row justify-between bg-primary-dark-blue p-2 text-center text-xl text-white"
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
        <div class="bg-primary-dark-blue p-2 text-center">
          <Slot />
        </div>
      )}
    </div>
  );
});
