import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/Button";
import { Markdown } from "~/components/Markdown";

export const SectionLocIntro = component$(({ data }: { data: any }) => {
  const isSpanish =
    data["Slug"].substring(data["Slug"].length - 3, data["Slug"].length) ===
    "-es";
  return (
    <div class="flex max-w-[1200px] gap-3 px-8 py-20 text-primary-blue max-[800px]:flex-col">
      <div class="flex flex-col items-center justify-center gap-1 text-center min-[800px]:w-[50%]">
        <h1 class="text-[38px] font-[700] leading-10">
          {`gigFAST INTERNET ${isSpanish ? "e" : "i"}n ${data["Name"]}`}
        </h1>
        <span class="text-[24px]">{data["ZipCode"]}, TX</span>
        <span class="text-[28px] font-[600]">
          {isSpanish ? "Llamar ahora:" : "Call now:"}
        </span>
        <Button text={"512 360 4273"} />
      </div>
      <div class="text-justify text-[16px] max-[800px]:text-[13px] min-[800px]:w-[50%]">
        <Markdown text={data["Description"]} />
      </div>
    </div>
  );
});
