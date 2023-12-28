import { component$ } from "@builder.io/qwik";
import { SectionHeaderZSS } from "./SectionHeaderZSS";
import { SectionZaneDesc } from "./SectionZaneDesc";
import { SectionCareerHLZSS } from "./SectionCareerHLZSS";
import { SectionFRMZSS } from "./SectionFRMZSS";
import { SectionCarouselZSS } from "./SectionCarouselZSS";

export const ZaneSmithSponsorship = component$(({ data }: { data: any }) => {
  const pageData = data["pageZaneSpon"]["data"]["attributes"];

  return (
    <div
      onClick$={() => {
        console.log(pageData);
      }}
    >
      <SectionHeaderZSS data={pageData} />
      <div class="bg-gradient-to-b from-[#041630] to-[#153069]">
        <div class=" md:flex w-full justify-center items-center">
        <div class="max-w-[1200px] px-8 pt-8">
          <SectionZaneDesc data={pageData} />
          <SectionCarouselZSS data={pageData} />
          <SectionCareerHLZSS data={pageData} />
          <SectionFRMZSS data={pageData} />
        </div>
        </div>
      </div>
    </div>
  );
});
