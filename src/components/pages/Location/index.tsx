import { component$ } from "@builder.io/qwik";
import { SectionLocIntro } from "./SectionLocIntro";
import { SectionLocOffers } from "./SectionLocOffers";

export const Location = component$(({ data }: { data: any }) => {
  return (
    <div class="flex flex-col items-center justify-center">
      <SectionLocIntro
        data={data["locations"]["data"][0]["attributes"]}
      ></SectionLocIntro>
      <SectionLocOffers data={data} />
    </div>
  );
});
