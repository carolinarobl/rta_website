import { type Signal, component$, Slot } from "@builder.io/qwik";
import { FaXmarkSolid } from "@qwikest/icons/font-awesome";
export const Modal = component$(
  ({ showSignal }: { showSignal: Signal<boolean> }) => {
    return (
      <div
        class={`fixed left-0 right-0 top-0 z-[500] flex h-screen items-center justify-center bg-primary-dark-blue bg-opacity-30 transition-all duration-300 ${
          showSignal.value ? "" : "hidden"
        }`}
        onClick$={(e: PointerEvent) => {
          if (e.target.id === "modalback") {
            showSignal.value = false;
          }
        }}
        id="modalback"
      >
        <FaXmarkSolid
          class="absolute right-2 top-2 rounded-full bg-secondary-red p-1 text-[30px] font-[200] text-white hover:cursor-pointer"
          onClick$={() => {
            showSignal.value = false;
          }}
        />
        <Slot></Slot>
      </div>
    );
  },
);
