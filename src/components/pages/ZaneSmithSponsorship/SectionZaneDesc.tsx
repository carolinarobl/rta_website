import { component$ } from "@builder.io/qwik";
import { Markdown } from "~/components/Markdown";

export const SectionZaneDesc = component$(({ data }: { data: any }) => {
  return (
    <div class="flex flex-col items-center justify-center text-center text-white">
      <span class="text-[24px]">
        <Markdown classN="text-white" text={data["QuoteText"]} />
      </span>
      <div class="mt-4 flex flex-col">
        <span class="text-[19px] font-[600] text-[#7bc8ff]">
          {data["QuoteAuthor"]}
        </span>
        <span class="max-w-[200px] text-[14px] tracking-[2px]">
          {data["QuoteADesc"]}
        </span>
      </div>
    </div>
  );
});
