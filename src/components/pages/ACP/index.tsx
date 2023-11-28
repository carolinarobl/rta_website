import { component$ } from "@builder.io/qwik";
import { SerializedParagraph } from "~/components/Paragraph";
import { SectionACPVideo } from "./SectionACPVideo";
import { Stepper } from "~/components/Stepper";

export const ACP = component$(({ data }: { data: any }) => {
  const pageData = data["pageAcp"]["data"]["attributes"];
  const steps = pageData["Steps"]["Bullets"].map((e: any) => e["Text"]);
  return (
    <div
      onClick$={() => {
        console.log(data);
      }}
    >
      <SerializedParagraph
        data={pageData["SummaryPar"]}
        hasPricing={false}
        textPercentage={50}
        alt
      />
      <div class="flex w-full items-center justify-center">
        <SectionACPVideo
          info={pageData["InfoHowItWorks"]}
          video={pageData["ACPVideo"]}
        />
      </div>
      <div class="mt-5 flex flex-col items-center justify-center bg-[#f2f6fb] pb-8">
        <div class="h-[32px] w-full bg-white opacity-70"></div>
        <div class="h-[32px] w-full bg-white opacity-40"></div>
        <h2 class="px-6 pt-8 text-center text-[36px] font-[500] leading-9 text-primary-blue">
          {pageData["Steps"]["Title"]}
        </h2>
        <div class="px-6">
          <Stepper steps={steps} />
        </div>
      </div>
    </div>
  );
});
