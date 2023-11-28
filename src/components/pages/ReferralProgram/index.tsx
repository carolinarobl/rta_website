import { component$ } from "@builder.io/qwik";
import { SectionRefIntro } from "./SectionRefIntro";
import { Stepper } from "~/components/Stepper";

export const ReferralProgram = component$(({ data }: { data: any }) => {
  const pageData = data["pageReferralP"]["data"]["attributes"];
  const steps = pageData["Steps"]["Bullets"].map((e: any) => e["Text"]);

  return (
    <div>
      <SectionRefIntro data={pageData["RefInfo"]} />
      <div class="flex items-center justify-center px-8 py-8">
        <div class=" max-w-[1400px] ">
          <h4 class="mb-6 text-center text-[20px] font-[500] leading-6 text-primary-blue">
            {pageData["StepsIntro"]}
          </h4>
          <h3 class="mb-6 text-center text-[42px] font-[700] leading-10 text-secondary-red">
            {pageData["Steps"]["Title"]}
          </h3>
          <div class="max-[799px]:hidden">
            <Stepper steps={steps} direction="vertical" align={"center"} />
          </div>
          <div class="min-[800px]:hidden">
            <Stepper steps={steps} direction="vertical" align={"start"} />
          </div>
        </div>
      </div>
    </div>
  );
});
