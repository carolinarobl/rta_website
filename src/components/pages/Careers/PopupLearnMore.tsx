import { component$, useSignal } from "@builder.io/qwik";
import {
  FaLocationArrowSolid,
  FaCalendarSolid,
  FaCheckSolid,
} from "@qwikest/icons/font-awesome";
import { Markdown } from "~/components/Markdown";

export const PopupLearnMore = component$(({ data }: { data: any }) => {
  const selected = useSignal<"duties" | "qualifications">("duties");
  return (
    <div class="flex w-[60%] min-w-[310px] max-w-[550px] flex-col items-center rounded-[50px] bg-white p-8 text-primary-blue">
      <div class="mb-2 flex items-center gap-1">
        <FaLocationArrowSolid class="text-secondary-red" />
        <span class="text-[14px] opacity-60">{data["Location"]}</span>
      </div>
      <h4 class="mb-4 text-center text-[20px] font-[600] leading-7 text-primary-dark-blue">
        {data["Name"]}
      </h4>
      <div class="relative my-4 flex w-[300px] justify-between gap-2 overflow-hidden rounded-[30px] border border-primary-blue border-opacity-60 px-6 py-2">
        <div
          class={`absolute bottom-0 transition-all ${
            selected.value === "duties"
              ? "left-0 right-[55%]"
              : "left-[45%] right-0"
          } top-0 z-[1] rounded-[30px] bg-primary-blue shadow-sm`}
        />
        <div
          class="z-[2] flex w-[45%] cursor-pointer items-center gap-1 px-2"
          onClick$={() => {
            selected.value = "duties";
          }}
        >
          <div class="flex h-6 w-6 items-center justify-center rounded-full bg-white p-1">
            <FaCalendarSolid class="text-secondary-red" />
          </div>

          <span
            class={`font-[400] text-${
              selected.value === "duties" ? "white" : "primary-blue"
            }`}
          >
            Duties
          </span>
        </div>
        <div
          class="z-[2] flex w-[55%] cursor-pointer items-center gap-1 px-2"
          onClick$={() => {
            selected.value = "qualifications";
          }}
        >
          <div class="flex h-6 w-6 items-center justify-center rounded-full bg-white p-1">
            <FaCheckSolid class="text-secondary-red" />
          </div>

          <span
            class={`font-[400] text-${
              selected.value === "qualifications" ? "white" : "primary-blue"
            }`}
          >
            Qualifications
          </span>
        </div>
      </div>
      <div class="relative flex h-[200px] w-full overflow-x-hidden text-[13px] leading-4 transition-all ">
        <div
          class={`absolute h-[200px] w-full p-4 transition-all ${
            selected.value !== "duties" ? "right-full" : " right-0"
          }`}
        >
          <Markdown text={data["Duties"]} />
        </div>
        <div
          class={`absolute h-[200px] w-full p-4 transition-all ${
            selected.value !== "qualifications" ? "left-full" : "left-0"
          }`}
        >
          <Markdown text={data["Qualifications"]} />
        </div>
      </div>
    </div>
  );
});
