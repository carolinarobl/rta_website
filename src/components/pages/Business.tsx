import { component$ } from "@builder.io/qwik";
import { ListedParagraphs } from "../Paragraph";

export const Business = component$(({ data }: { data: any }) => {
  const servicesData = data["pageBusiness"]["data"]["attributes"]["Services"];
  return (
    <div>
      <ListedParagraphs data={servicesData} />
    </div>
  );
});
