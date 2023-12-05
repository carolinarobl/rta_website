import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/Button";
import { Markdown } from "~/components/Markdown";
import { StrapiImage } from "~/components/StrapiImage";

export const SectionGFVIntro = component$(({ data }: { data: any }) => {
  return (
    <div class="flex w-full justify-center text-primary-blue">
      <div class="mx-8 my-8 flex flex-col items-center gap-6 text-center text-[18px]">
        <StrapiImage
          url={data["Logo"]["data"]["attributes"]["url"]}
          alt={data["Logo"]["data"]["attributes"]["alternativeText"]}
          title={data["Logo"]["data"]["attributes"]["caption"]}
          width={"450"}
          clasN="mb-6"
        />
        <Markdown text={data["Paragraph"]} />
        <Button
          text={data["Buttons"][0]["Text"]}
          link={data["Buttons"][0]["Link"]}
        />
      </div>
    </div>
  );
});
