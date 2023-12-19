import { component$ } from "@builder.io/qwik";
import { SectionHeaderZSS } from "./SectionHeaderZSS";
import { SectionZaneDesc } from "./SectionZaneDesc";
import { SectionCareerHLZSS } from "./SectionCareerHLZSS";

export const ZaneSmithSponsorship = component$(({ data }: { data: any }) => {
  const pageData = data["pageZaneSpon"]["data"]["attributes"];

  return (
    <div
      onClick$={() => {
        console.log(pageData);
      }}
    >
      <SectionHeaderZSS data={pageData} />
      <div class="flex min-h-[1000px] justify-center bg-gradient-to-b from-[#041630] to-[#153069]">
        <div class="max-w-[1200px] px-8 pt-8">
          <SectionZaneDesc data={pageData} />
          <SectionCareerHLZSS data={pageData} />
        </div>
      </div>
    </div>
  );
});
