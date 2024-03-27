import { component$ } from "@builder.io/qwik";
import { Markdown } from "~/components/Markdown";
import { StrapiImage } from "~/components/StrapiImage";

export const SectionFRMZSS = component$(({ data }: { data: any }) => {
  return (
    <div class="mt-[80px] flex flex-col items-center justify-center">
      <div class="mb-6 flex items-center justify-center gap-6">
        <span class="text-[40px] font-[600] text-white max-[800px]:hidden">
          {data["AboutFRM"]["Title"]}
        </span>
        <StrapiImage
          media={data["AboutFRM"]["Logo"]["data"]["attributes"]}
        />
      </div>
      <div class="flex gap-8 max-[800px]:flex-col">
        <div class="flex w-[60%] flex-col items-center gap-4 max-[800px]:w-full">
          <Markdown
            classN="text-white text-[18px] text-justify"
            text={data["AboutFRM"]["Paragraph"]}
          />
          <StrapiImage
            clasN="w-[80%] min-w-[300px] rounded-3xl"
            media={data["FRMChamps"]["data"]["attributes"]}
          />
          <Markdown
            classN="text-white text-[12px]"
            text={data["FRMChamps"]["data"]["attributes"]["caption"]}
          />
          <Markdown
            classN="text-white text-[12px] text-justify"
            text={data["AboutFRMPInfo"]}
          />
        </div>
        <div class="flex w-[40%] flex-col items-center max-[800px]:w-full">
          <Markdown
            classN="text-white text-[15px] font-[600]"
            text={data["AboutFRM"]["Subtitle"]}
          />
          <StrapiImage
            clasN="w-[80%] min-w-[180px] rounded-3xl my-2"
            media={data["AboutFRM"]["Media"]["data"]["attributes"]}
          />
          <Markdown
            classN="text-white text-[13px]"
            text={data["AboutFRM"]["Media"]["data"]["attributes"]["caption"]}
          />
          <div class="my-4 flex flex-col items-start justify-start gap-1 self-start">
            {data["AboutFRM"]["Buttons"].map((btn: any, i: number) => {
              return (
                <div
                  key={i}
                  class="flex items-center"
                  onClick$={() => {
                    window.open(btn["Link"], "_blank");
                  }}
                >
                  <StrapiImage
                    clasN="h-[16px] w-[16px] mr-2"
                    toWhite
                    media={btn["Icon"]["data"]["attributes"]}
                  />
                  <span class="text-white">{btn["Text"]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});
