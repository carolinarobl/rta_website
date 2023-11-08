import { component$ } from "@builder.io/qwik";
import { ListedParagraphs } from "../Paragraph";

export const Business = component$(({ data }: { data: any }) => {
  console.log(data);
  const servicesData = data["pageBusiness"]["data"]["attributes"]["Services"];
  return (
    <div
      onClick$={() => {
        console.log(servicesData);
      }}
    >
      {/* aaa */}
      <ListedParagraphs data={servicesData} />
    </div>
  );
});
