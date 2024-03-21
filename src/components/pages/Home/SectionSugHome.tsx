import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/Button";
import { Linking_picture } from "~/components/linking-picture";

export const SectionSugHome = component$(({ data }: { data: any }) => {
  return (
    <div class="flex items-center justify-evenly gap-4 px-8 py-6 max-[1200px]:flex-col">
      {data.map((sugPage: any, i: number) => {
        return (
          <div
            key={i}
            class=" flex max-w-[400px] flex-col items-center gap-2 text-center text-primary-blue"
          >
            <Linking_picture
              url={sugPage["Media"]["data"]["attributes"]["formats"]['small']['url']}
              alt={sugPage["Media"]["data"]["attributes"]["alternativeText"]}
              title={sugPage["Media"]["data"]["attributes"]["caption"]}

              //   height="h-[36/0px]"
              width="w-[360px]"
              color="bg-primary-blue"
            />
            <h2 class="text-[24px] font-[700]">{sugPage["Title"]}</h2>
            <p class="text-[17px] font-[400]">{sugPage["Paragraph"]}</p>
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
