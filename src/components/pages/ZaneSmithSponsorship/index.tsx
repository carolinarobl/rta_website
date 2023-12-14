import { component$ } from "@builder.io/qwik";
import { SectionHeaderZSS } from "./SectionHeaderZSS";

export const ZaneSmithSponsorship = component$(({ data }: { data: any }) => {
  const pageData = data["pageZaneSpon"]["data"]["attributes"];

  return (
    <div
      onClick$={() => {
        console.log(pageData);
      }}
    >
      <SectionHeaderZSS data={pageData} />
    </div>
  );
});
