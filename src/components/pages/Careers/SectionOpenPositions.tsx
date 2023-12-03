import { component$ } from "@builder.io/qwik";
import { FaLocationArrowSolid } from "@qwikest/icons/font-awesome";
import { Button } from "~/components/Button";
import Carousel from "~/components/Carousel";
import { Markdown } from "~/components/Markdown";
export const SectionOpenPositions = component$(({ data }: { data: any }) => {
  const PositionCard = component$(({ position }: { position: any }) => {
    return (
      <div class="flex h-[380px] w-[460px] flex-col justify-between rounded-[30px] bg-white p-6 text-center shadow-lg max-[800px]:h-[280px] ">
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
          <Button text="Submit Resume" link="=pContactEmail=" />
        </div>
      </div>
    );
  });

  const positionsSlides = data["Positions"].map(
    (slideContent: any, i: number) => (
      <PositionCard position={slideContent["attributes"]} key={i} />
    ),
  );
  return (
    <div class="my-8 flex justify-center text-primary-blue">
      <div class="flex flex-col ">
        <h3 class="text-center text-[44px] font-[600]">
          {data["PositionsTitle"]}
        </h3>
        {/* <PositionCard position={data["Positions"][0]["attributes"]} /> */}
        <div class="flex-column flex w-[1200px] ">
          <Carousel
            slides={positionsSlides}
            id={"carPositions"}
            hasArrows={true}
            hasPagination={false}
            slidesQty={3}
          />
        </div>
      </div>
    </div>
  );
});
