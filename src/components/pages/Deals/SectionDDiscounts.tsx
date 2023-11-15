import { component$ } from "@builder.io/qwik";
import { Markdown } from "~/components/Markdown";
import { Linking_picture } from "~/components/linking-picture";

export const SectionDDiscounts = component$(({ data }: { data: any }) => {
  return (
    <div class="flex w-full items-center justify-center">
      <div class="flex max-w-[1200px] flex-wrap items-start justify-evenly gap-6 p-8">
        {data.map((discount, i) => (
          <div key={i} class="flex w-[280px] flex-col items-center gap-2">
            <Linking_picture
              url={discount["Media"]["data"]["attributes"]["url"]}
              color={i % 2 === 0 ? "bg-[#2E5899]" : "bg-secondary-red"}
              size={"250px"}
            />
            <Markdown
              text={discount["Title"]}
              classN="font-[600] text-center text-[18px] tracking-[-1px]"
            />
            <Markdown
              text={discount["Paragraph"]}
              classN="text-center text-[16px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
});
