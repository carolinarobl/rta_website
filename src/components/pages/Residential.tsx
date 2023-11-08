import { component$ } from "@builder.io/qwik";
import { ListedParagraphs } from "../Paragraph";

export const Residential = component$(({ data }: { data: any }) => {
  console.log(data);
  const servicesData =
    data["pageResidential"]["data"]["attributes"]["Services"];
  return (
    <div
      onClick$={() => {
        console.log(data);
      }}
    >
      <ListedParagraphs data={servicesData} />
    </div>
  );
});
