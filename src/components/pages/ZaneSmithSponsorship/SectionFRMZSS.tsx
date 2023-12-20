import { component$ } from "@builder.io/qwik";
import { Markdown } from "~/components/Markdown";
import { StrapiImage } from "~/components/StrapiImage";

export const SectionFRMZSS = component$(({ data }: { data: any }) => {
  return (
    <div class="my-[80px] flex flex-col items-center justify-center">
      <div class="mb-6 flex items-center justify-center gap-6">
        <span class="text-[40px] font-[600] text-white">
          {data["AboutFRM"]["Title"]}
        </span>
        <StrapiImage
          url={data["AboutFRM"]["Logo"]["data"]["attributes"]["url"]}
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
            url={data["FRMChamps"]["data"]["attributes"]["url"]}
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
            url={data["AboutFRM"]["Media"]["data"]["attributes"]["url"]}
          />
          <Markdown
            classN="text-white text-[13px]"
            text={data["AboutFRM"]["Media"]["data"]["attributes"]["caption"]}
          />
          <div class="mt-4 flex flex-col items-start justify-start gap-1 self-start">
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
                    url={btn["Icon"]["data"]["attributes"]["url"]}
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
