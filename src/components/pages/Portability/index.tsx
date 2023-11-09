import { component$ } from "@builder.io/qwik";
import { ListedParagraphs } from "../../Paragraph";

export const Portability = component$(({ data }: { data: any }) => {
  console.log(data);
  const portabilityActs =
    data["pagePortability"]["data"]["attributes"]["PortabilityActs"];
  return (
    <div
      onClick$={() => {
        console.log(data);
      }}
    >
      <ListedParagraphs data={portabilityActs} />
    </div>
  );
});
