import { component$ } from "@builder.io/qwik";
import { ListedParagraphs } from "../Paragraph";

export const GivingBack = component$(({ data }: { data: any }) => {
  console.log(data);
  const helpingData = data["pageGivingBack"]["data"]["attributes"]["Helping"];
  return (
    <div
      onClick$={() => {
        console.log(helpingData);
      }}
    >
      <ListedParagraphs data={helpingData} />
    </div>
  );
});
