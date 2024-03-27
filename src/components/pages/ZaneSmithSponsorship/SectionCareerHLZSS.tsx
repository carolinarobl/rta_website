import { component$ } from "@builder.io/qwik";
import { Markdown } from "~/components/Markdown";
import { StrapiImage } from "~/components/StrapiImage";

export const SectionCareerHLZSS = component$(({ data }: { data: any }) => {
  return (
    <div class="flex items-center justify-center gap-10 px-8 max-[800px]:flex-col">
      <div class="flex min-w-[300px] max-w-[400px] flex-col items-center justify-center rounded-[30px] bg-white p-8 text-primary-blue ">
        <StrapiImage
          clasN="h-fit w-[180px]"
          media={data["AboutZane"]["Media"]["data"]["attributes"]}
        />
        <h2 class="mt-4 text-[30px] font-[500] text-secondary-red">
          {data["AboutZane"]["Title"]}
        </h2>
        <Markdown
          classN="[&>h2]:text-[21px] [&>h2]:leading-10 [&>h2]:font-[600]"
          text={data["AboutZane"]["Paragraph"]}
        />
        <div class="mb-4 flex w-full items-center justify-evenly gap-2 rounded-full bg-primary-blue p-2">
          {data["AboutZane"]["Buttons"]
            .filter((btn: any) => !btn["Text"])
            .map((btn: any, i: number) => {
              return (
                <div
                  key={i}
                  class="hover:cursor-pointer"
                  onClick$={() => {
                    window.open(btn["Link"], "_blank");
                  }}
                >
                  <StrapiImage
                    clasN="h-[20px]"
                    toWhite={i !== 0}
                    media={btn["Icon"]["data"]["attributes"]}
                  />
                </div>
              );
            })}
        </div>
        {data["AboutZane"]["Buttons"]
          .filter((btn: any) => btn["Text"])
          .map((btn: any, i: number) => {
            return (
              <div
                key={i}
                class="flex gap-2 self-start hover:cursor-pointer"
                onClick$={() => {
                  window.open(btn["Link"], "_blank");
                }}
              >
                <StrapiImage
                  clasN="h-[24px] w-[24px]"
                  media={btn["Icon"]["data"]["attributes"]}
                />
                <span class="text-[14px] font-[500]">{btn["Text"]}</span>
              </div>
            );
          })}
      </div>
      <div class="flex flex-col text-white">
        <span class="mb-4 text-[40px] font-[600]">
          {data["Highlights"]["Title"]}
        </span>
        <Markdown classN="text-white text-justify" text={data["Highlights"]["Paragraph"]} />
      </div>
    </div>
  );
});
