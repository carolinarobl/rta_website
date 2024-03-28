import { Slot, component$, useSignal } from "@builder.io/qwik";

export const AccordionItem = component$(
  ({
    title,
    classContainer,
    classChild,
    inFooter = false,
  }: {
    title: string;
    classContainer?: string;
    classChild?: string;
    inFooter?: boolean;
  }) => {
    const isOpen = useSignal(false);

    return (
      <div class="my-8 mb-2 w-full">
        <div
          class={`flex cursor-pointer flex-row items-center transition ${
            inFooter
              ? ""
              : isOpen.value
                ? "rounded-b-none rounded-t-2xl"
                : "rounded-full"
          } justify-between ${classContainer} p-2 `}
          onClick$={() => {
            isOpen.value = !isOpen.value;
          }}
        >
          <h3 class="flex w-full items-center justify-center font-bold">
            {title}
          </h3>
          <div
            class={`flex h-[20px] w-[20px] items-center justify-center ${
              inFooter ? "" : "rounded-full bg-secondary-red text-white"
            }`}
          >
            <span class="w-1/8 flex items-center justify-end text-xs">
              {isOpen.value ? "▲" : "▼"}
            </span>
          </div>
        </div>
        {isOpen.value && (
          <div
            class={`${classChild} ${
              inFooter ? "" : "rounded-b-2xl rounded-t-none border-t-2 bg-white"
            } p-2 text-center transition-all duration-500 ease-in-out`}
          >
            <Slot />
          </div>
        )}
      </div>
    );
  },
);
