import { component$ } from "@builder.io/qwik";
import { ListedParagraphs } from "../../Paragraph";

export const GigfastIOT = component$(({ data }: { data: any }) => {
  console.log(data);
  const services = data["pageGfIoT"]["data"]["attributes"]["Services"];
  return (
    <div
      onClick$={() => {
        console.log(data);
      }}
    >
      <ListedParagraphs data={services} />
    </div>
  );
});
