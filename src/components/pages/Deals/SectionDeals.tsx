import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/Button";
import { Markdown } from "~/components/Markdown";
import { StrapiAsset } from "~/components/StrapiAsset";

export const SectionDeals = component$(({ data }: { data: any }) => {
  return (
    <div
      class={`${data["isVisible"] ? "" : "hidden"} flex w-full flex-col items-center justify-center text-primary-blue`}
    >
      <div
        class={`my-4 flex max-w-[1200px] items-center justify-center max-[800px]:flex-col`}
      >
        <div
          class={`flex flex-col items-center justify-center px-10 min-[800px]:w-[70%]`}
        >
          <span class="text-center text-[38px] font-[800] text-secondary-red max-[800px]:text-[30px]">
            {data["Title"]}
          </span>
          <Markdown
            classN="mb-3 w-full bg-primary-blue p-2 font-[600] text-[26px] max-[800px]:text-[20px] text-white text-center mx-4 rounded-full"
            text={data["Description"]}
          />
          <Markdown classN="text-center text-[26px]" text={data["Deal"]} />
          <Markdown
            classN="text-center text-[18px] mb-3"
            text={data["Deals_description"]}
          />
          <div class="mb-3 flex items-start justify-evenly gap-4 max-[600px]:flex-col">
            {data["Services"].map((deal: any, i: any) => (
              <div key={i} class="flex items-center justify-center gap-1">
                <StrapiAsset
                  url={deal["Icon"]["data"]["attributes"]["url"]}
                  clasN="w-[100px] max-[1000px]:w-[80px] "
                  muted={true}
                />
                <span class="font-[600]">{deal["Title"]}</span>
              </div>
            ))}
          </div>
          <Button text={data["Button"]["Text"]} link={data["Button"]["Link"]} />
        </div>
        <div class="flex w-[300px] items-center justify-center self-center p-4 max-[600px]:hidden min-[800px]:w-[30%]">
          <StrapiAsset
            url={data["Media"]["data"]["attributes"]["url"]}
            clasN="rounded-full  mr-[30px]"
            autoplay
            loop
            muted={true}
          />
        </div>
      </div>
    </div>
  );
});
