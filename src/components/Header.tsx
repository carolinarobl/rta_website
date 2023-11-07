import { component$ } from "@builder.io/qwik";
import { Button } from "./Button";
import { FaCircleArrowRightSolid } from "@qwikest/icons/font-awesome";

export const Header = component$(({ vertical = true }: { vertical: bool }) => {
  return (
    <div
      class={`flex w-[550px] max-[600px]:w-[400px] ${
        vertical ? "flex-col" : ""
      } items-center justify-between gap-3 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0E4FB0] to-[#1D65C3] px-8 py-4 text-white`}
    >
      <div
        class={`flex flex-col ${
          vertical ? "items-center" : ""
        } justify-center gap-3`}
      >
        <span class="text-[24px] font-semibold">Gigometer</span>
        <span class="text-[15px] font-light">
          Wondering how fast your internet really is?
        </span>
      </div>
      <Button type="link" text="Test your speed">
        <FaCircleArrowRightSolid
          color="#13B295"
          class="text-[18px] opacity-60"
        />
      </Button>
    </div>
  );
});
