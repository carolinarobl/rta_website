import { component$ } from "@builder.io/qwik";
import { SerializedParagraph } from "~/components/Paragraph";

export const SectionRefIntro = component$(({ data }: { data: any }) => {
  return (
    <div class="w-full">
      <div class="h-[30px] w-full bg-primary-blue opacity-20"></div>
      <div class="h-[30px] w-full bg-primary-blue opacity-50"></div>

      <div class="min-h-[200px] w-full bg-gradient-to-br from-primary-light-blue to-[#23477f] !text-white">
        <SerializedParagraph data={data} color="white" reverse />
      </div>
      <div class="h-[30px] w-full bg-primary-blue opacity-50"></div>
      <div class="h-[30px] w-full bg-primary-blue opacity-20"></div>
    </div>
  );
});
