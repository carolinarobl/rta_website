import { component$ } from "@builder.io/qwik";
import { Markdown } from "~/components/Markdown";
import { StrapiImage } from "~/components/StrapiImage";

export const SectionSupportTips = component$(({ data }: { data: any }) => {
  const TipBox = component$(({ tip }: { tip: any }) => {
    return (
      <div
        class="flex w-full flex-col items-center justify-center gap-3 rounded-xl bg-white p-8 shadow-xl"
        key={tip["Title"]}
      >
        <div class="w-fit rounded-full bg-secondary-red p-2">
          <StrapiImage
            media={tip["Icon"]["data"]["attributes"]}
            width={17}
            height={17}
            toWhite
          />
        </div>
        <h4 class="text-center font-[700] text-primary-blue">{tip["Title"]}</h4>
        <Markdown classN="text-[14px] font-[500]" text={tip["Text"]} />
      </div>
    );
  });
  return (
    <div class="mt-6 flex w-full max-w-[1200px] flex-col items-center justify-center gap-4 p-8">
      <h2 class="text-center text-[40px] font-[500] text-primary-blue">
        {data["Title"]}
      </h2>
      <div class="grid w-full grid-cols-3 gap-4  max-[800px]:grid-cols-1">
        {data["Bullets"].slice(0, 3).map((tip: any, i: number) => {
          return <TipBox tip={tip} key={i} />;
        })}
      </div>
      <div class="grid w-full grid-cols-2 gap-4 max-[800px]:grid-cols-1">
        {data["Bullets"].slice(3, 5).map((tip: any, i: number) => {
          return <TipBox tip={tip} key={i} />;
        })}
      </div>
    </div>
  );
});
