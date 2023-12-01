import { component$ } from "@builder.io/qwik";
import { FaLocationArrowSolid } from "@qwikest/icons/font-awesome";
import { Button } from "~/components/Button";
import { Markdown } from "~/components/Markdown";
export const SectionOpenPositions = component$(({ data }: { data: any }) => {
  const PositionCard = component$(({ position }: { position: any }) => {
    return (
      <div class="flex h-[380px] w-[460px] flex-col items-center justify-between rounded-[30px] bg-white p-6 text-center shadow-lg max-[800px]:h-[280px] max-[800px]:w-[340px]">
        <div class="flex-col items-center">
          <div class="flex items-center justify-center gap-2">
            <FaLocationArrowSolid />
            <span class="font-[500] opacity-60">{position["Location"]}</span>
          </div>
          <h4 class="mt-2 text-[19px] font-[700] text-primary-dark-blue">
            {position["Name"]}
          </h4>
          <Markdown
            classN="text-[15px] max-[800px]:text-[13px]"
            text={position["Summary"]}
          />
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="flex gap-1 text-[15px]">
            <span class="text-btn-green hover:cursor-pointer">Learn more</span>{" "}
            <span class="text-black">or</span>
          </div>
          <Button text="Submit Resume" />
        </div>
      </div>
    );
  });
  return (
    <div class="my-8 flex w-full justify-center px-8 text-primary-blue">
      <div class="flex flex-col gap-4">
        <h3 class="text-center text-[44px] font-[600]">
          {data["PositionsTitle"]}
        </h3>
        <PositionCard position={data["Positions"][0]["attributes"]} />
      </div>
    </div>
  );
});
