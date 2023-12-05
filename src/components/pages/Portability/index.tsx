import { component$ } from "@builder.io/qwik";
import { ListedParagraphs } from "../../Paragraph";
import { PortabilityIntro } from "./PortabilityIntro";

export const Portability = component$(({ data }: { data: any }) => {
  const portabilityActs =
    data["pagePortability"]["data"]["attributes"]["PortabilityActs"];
  const portabilityIntro =
    data["pagePortability"]["data"]["attributes"]["Introduction"];
  return (
    <div class="flex flex-col items-center justify-center">
      <PortabilityIntro data={portabilityIntro} />
      <ListedParagraphs data={portabilityActs} />
    </div>
  );
});
