import { component$ } from "@builder.io/qwik";
// import { QwikRive } from "qwik-rive";
import { Markdown } from "~/components/Markdown";
import { StrapiImage } from "~/components/StrapiImage";

export const ProsSection = component$(({ data }: { data: any }) => {
  const { prosData, prosPar } = data;
  return (
    <div class="w-full bg-gradient-to-br from-[#3d76c2] to-[#2e599a] px-14 py-6 text-white">
      <div class="flex w-[50%] flex-col text-justify">
        <div class="text-[38px] font-bold max-sm:text-[28px]">
          {prosPar["Title"]}
        </div>
        <div class="text-[18px] max-sm:text-[15px]">{prosPar["Paragraph"]}</div>
        <div class="mt-6 flex flex-col gap-4">
          {prosData.map((pro: any, i: any) => {
            return (
              <div key={i} class="flex gap-4">
                <div class="h-fit w-fit rounded-full bg-secondary-red p-[9px]">
                  <StrapiImage
                    toWhite
                    width={42}
                    url={pro["Icon"]["data"]["attributes"]["url"]}
                  />
                </div>
                <div class="flex flex-col">
                  <span class="text-[28px] font-bold">
                    <Markdown text={pro["Title"]} />
                  </span>
                  <span class="text-[18px] ">
                    <Markdown text={pro["Text"]} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        {/* <StrapiImage
          width={60}
          url={prosPicture}
        /> */}
        {/* <QwikRive
          options={{
            src: "https://cdn.rive.app/animations/vehicles.riv",
          }}
        /> */}
      </div>
    </div>
  );
});
