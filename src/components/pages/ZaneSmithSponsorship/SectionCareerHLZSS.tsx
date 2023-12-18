import { component$ } from "@builder.io/qwik";
import { Markdown } from "~/components/Markdown";

export const SectionCareerHLZSS = component$(({ data }: { data: any }) => {
  return (
    <div class="flex items-center justify-center gap-10 px-8 max-[800px]:flex-col">
      <div class="flex min-w-[300px] max-w-[400px] flex-col items-center justify-center rounded-[30px] bg-white p-8 "></div>
      <div class="flex flex-col text-white">
        <span class="mb-4 text-[40px] font-[600]">
          {data["Highlights"]["Title"]}
        </span>
        <Markdown classN="text-white" text={data["Highlights"]["Paragraph"]} />
      </div>
    </div>
  );
});
