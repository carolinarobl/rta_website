import { component$ } from "@builder.io/qwik";
// import { QwikRive } from "qwik-rive";
import { Markdown } from "~/components/Markdown";
import { StrapiImage } from "~/components/StrapiImage";

export const ProsSection = component$(({ data }: { data: any }) => {
  const { prosData, prosPar, prosMap } = data;
  return (
    <div class="z-20 flex w-full justify-center bg-gradient-to-br from-[#3d76c2] to-[#2e599a] px-10 py-6 text-white">
      <div class="flex max-w-[1100px] items-center justify-center gap-8 max-[1000px]:flex-col">
        <div class="flex w-[50%] flex-col text-justify max-[1000px]:w-[100%]">
          <div class="text-[38px] font-bold max-sm:text-[28px]">
            {prosPar["Title"]}
          </div>
          <div class="text-[18px] max-sm:text-[15px]">
            {prosPar["Paragraph"]}
          </div>
          <div class="mt-6 flex flex-col gap-4">
            {prosData.map((pro:any, i:any) => {
              return (
                <div key={i} class="flex gap-4">
                  <div class="h-fit w-fit rounded-full bg-secondary-red p-[9px]">
                    <StrapiImage
                      toWhite
                      width={42}
                      height={42}
                      url={pro["Icon"]["data"]["attributes"]["url"]}
                    />
                  </div>
                  <div class="flex flex-col">
                    <span class="text-[28px] font-bold">
                      <Markdown text={pro["Title"]} classN="text-white" />
                    </span>
                    <span class="text-[18px] ">
                      <Markdown text={pro["Text"]} classN="text-white" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <StrapiImage
          width="800"
          height="800"
          url={prosMap}
          clasN="px-8  min-w-[250px]"
        />
      </div>
    </div>
  );
});
