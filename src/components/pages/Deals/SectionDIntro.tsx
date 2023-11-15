import { component$ } from "@builder.io/qwik";
import { Markdown } from "~/components/Markdown";
import { SerializedParagraph } from "~/components/Paragraph";

export const SectionDIntro = component$(({ data }: { data: any }) => {
  console.log(data);
  return (
    <div class="w-full">
      <div class="h-[30px] w-full bg-primary-blue opacity-20"></div>
      <div class="h-[30px] w-full bg-primary-blue opacity-50"></div>

      <div class="min-h-[200px] w-full bg-gradient-to-br from-primary-light-blue to-[#23477f] !text-white">
        <SerializedParagraph data={data} reverse color="white" />
        {/* <div>
          <span class="text-[30px]">{"a"}</span>
          <Markdown classN="" text={"a"} />
        </div>
        <div></div> */}
      </div>
      <div class="h-[30px] w-full bg-primary-blue opacity-50"></div>
      <div class="h-[30px] w-full bg-primary-blue opacity-20"></div>
    </div>
  );
});
