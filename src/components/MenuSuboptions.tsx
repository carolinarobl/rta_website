import { Slot, component$, useSignal } from "@builder.io/qwik";
import { FaAngleDownSolid } from "@qwikest/icons/font-awesome";
export const MenuSuboptions = component$(
  ({
    title,
    containerClass = "",
  }: {
    title: string;
    containerClass?: string;
  }) => {
    const openMenu = useSignal(false);
    return (
      <div class="relative w-fit">
        <span
          class={`${containerClass} flex cursor-pointer items-center gap-2`}
          onClick$={() => {
            openMenu.value = !openMenu.value;
          }}
          onFocusout$={() => {
            openMenu.value = false;
          }}
        >
          <span>{title}</span>
          <FaAngleDownSolid />
        </span>
        <div
          class={`absolute bottom-0 left-0 right-0 top-full z-10 min-w-[140px]  rounded-md bg-white shadow-lg transition-all duration-300 ${
            openMenu.value ? "" : "hidden"
          }`}
        >
          <Slot />
        </div>
      </div>
    );
  },
);
