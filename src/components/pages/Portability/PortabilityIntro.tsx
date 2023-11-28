import { component$ } from "@builder.io/qwik";
import { Markdown } from "~/components/Markdown";
import { StrapiImage } from "~/components/StrapiImage";

export const PortabilityIntro = component$(({ data }: { data: any }) => {
  const logoSrc = data["Logo"]["data"]["attributes"]["url"];
  const mediaSrc = data["Media"]["data"]["attributes"]["url"];
  return (
    <div class="flex max-w-[1200px] items-center justify-center self-center max-[800px]:flex-col">
      <div class="flex flex-col items-center justify-center gap-4 px-10 min-[800px]:w-[70%]">
        <div class="text-center text-[38px] font-bold text-[#2E5899] max-sm:text-[28px]">
          {data["Title"]}
        </div>
        <div class="max-w-[470px]">
          <StrapiImage url={logoSrc} width={1230} height={230} />
        </div>
        <div>
          <Markdown
            classN={"max-sm:text-[15px] text-[18px] text-[#2E5899]"}
            text={data["Paragraph"]}
          />
        </div>
      </div>
      <div class="flex w-[300px] items-center justify-center self-center p-4 min-[800px]:w-[30%]">
        <StrapiImage url={mediaSrc} width={1000} height={1000} />
      </div>
    </div>
  );
});
