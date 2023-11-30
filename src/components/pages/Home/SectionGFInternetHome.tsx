import { component$ } from "@builder.io/qwik";
import { AccordionItem } from "~/components/AccordionItem";
import { Button } from "~/components/Button";
import { Markdown } from "~/components/Markdown";
import { StrapiImage } from "~/components/StrapiImage";

export const SectionGFInternetHome = component$(
  ({ data, parGFIPlans }: { data: any; parGFIPlans: any[] }) => {
    const buttons = data["Buttons"];
    const logoSrc = data["Logo"]["data"]["attributes"]["url"];
    const mediaSrc = data["Media"]["data"]["attributes"]["url"];
    return (
      <div class="mb-4 flex max-w-[1200px] items-center justify-center gap-4 self-center px-8 max-[800px]:flex-col">
        <div class="flex w-[300px] items-center justify-center self-center p-4 min-[800px]:w-[40%]">
          <StrapiImage url={mediaSrc} width={1000} height={1000} />
        </div>
        <div class="flex flex-col items-center justify-center gap-4 min-[800px]:w-[60%]">
          <div class="max-w-[470px]">
            <StrapiImage url={logoSrc} width={1230} height={230} />
          </div>
          <div class="flex items-start gap-2">
            <div class="text-center text-[38px] font-bold text-[#2E5899] max-sm:text-[28px]">
              {data["Title"]}
            </div>
            <div class="text-center text-[28px] font-bold text-secondary-red max-sm:text-[18px]">
              {data["Subtitle"]}
            </div>
          </div>

          <div class="text-primary-blue">
            <Markdown
              classN={
                "text-justify max-sm:text-[15px] text-[18px] text-[#2E5899]"
              }
              text={data["Paragraph"]}
            />
            {parGFIPlans.map((plan: any, i: number) => {
              return (
                <div key={i} class="text-[22px]">
                  <AccordionItem title={plan["Title"]}>
                    <Markdown
                      classN="text-[16px] text-justify"
                      text={plan["Paragraph"]}
                    />
                  </AccordionItem>
                </div>
              );
            })}
          </div>
          <div class="flex gap-4">
            {buttons.map((button: any, i: number) => (
              <Button
                key={i}
                text={button["Text"]}
                link={button["Link"]}
              ></Button>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
