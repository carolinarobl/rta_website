import { component$ } from "@builder.io/qwik";
import { ListedParagraphs } from "../Paragraph";

export const Residential = component$(({ data }: { data: any }) => {
  const servicesData =
    data["pageResidential"]["data"]["attributes"]["Services"];
  return (
    <div>
      <ListedParagraphs data={servicesData} />
    </div>
  );
});
