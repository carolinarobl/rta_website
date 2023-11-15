import { component$ } from "@builder.io/qwik";
import { SectionGFVIntro } from "./SectionGFVIntro";

export const GigfastVoice = component$(({ data }: { data: any }) => {
  const introData = {
    ...data["pageGfV"]["data"]["attributes"]["Introduction"],
    Logo: data["pageGfV"]["data"]["attributes"]["Logo"],
  };
  const packagesData = data["pageGfV"]["data"]["attributes"]["PackTables"];
  return (
    <div
      onClick$={() => {
        console.log(data);
      }}
    >
      <SectionGFVIntro data={introData} />
    </div>
  );
});
