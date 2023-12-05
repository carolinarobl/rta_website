import { component$ } from "@builder.io/qwik";
import { ListedParagraphs } from "../Paragraph";

export const GivingBack = component$(({ data }: { data: any }) => {
  const helpingData = data["pageGivingBack"]["data"]["attributes"]["Helping"];
  return (
    <div
      onClick$={() => {
      }}
    >
      <ListedParagraphs data={helpingData} />
    </div>
  );
});
