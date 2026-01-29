import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/Button";
import { Linking_picture } from "~/components/linking-picture";

export const SectionSugHome = component$(({ data }: { data: any }) => {
  return (
    <div class="flex items-center justify-evenly gap-8 px-8 py-12 max-[1200px]:flex-col md:gap-12">
      {data.map((sugPage: any, i: number) => {
        return (
          <div
            key={i}
            class="flex max-w-[400px] flex-col items-center gap-4 text-center text-white"
          >
            <Linking_picture
              media={sugPage["Media"]["data"]["attributes"]}
              //   height="h-[36/0px]"
              width="w-[360px]"
              color="bg-white"
            />
            <h2 class="text-[24px] font-[700] text-white drop-shadow-md">{sugPage["Title"]}</h2>
            <p class="text-[17px] font-[400] text-white/90">{sugPage["Paragraph"]}</p>
            <Button
              text={sugPage["Buttons"][0]["Text"]}
              link={sugPage["Buttons"][0]["Link"]}
            />
          </div>
        );
      })}
    </div>
  );
});
