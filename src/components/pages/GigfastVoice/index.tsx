import { component$ } from "@builder.io/qwik";
import { SectionGFVIntro } from "./SectionGFVIntro";
import { SectionGFVPacks } from "./SectionGFVPacks";
import { SerializedParagraph } from "~/components/Paragraph";

export const GigfastVoice = component$(({ data }: { data: any }) => {
  const introData = {
    ...data["pageGfV"]["data"]["attributes"]["Introduction"],
    Logo: data["pageGfV"]["data"]["attributes"]["Logo"],
  };

  const packagesData = data["pageGfV"]["data"]["attributes"]["PackTables"];

  const portabilityData =
    data["sectionPortGfv"]["data"]["attributes"]["Portability"];

  return (
    <div>
      <SectionGFVIntro data={introData} />
      <div class="mt-6">
        <SectionGFVPacks data={packagesData} />
      </div>
      <div class="mt-6">
        <SerializedParagraph data={portabilityData} color={"primary-blue"} />
      </div>
    </div>
  );
});
