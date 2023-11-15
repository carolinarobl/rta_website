import { component$ } from "@builder.io/qwik";

export const Deals = component$(({ data }: { data: any }) => {
  const dealsData = data["pageDeals"]["data"]["attributes"]["Deals"];
  const introData = data["pageDeals"]["data"]["attributes"]["RefIntro"];
  return (
    <div
      onClick$={() => {
        console.log(data);
      }}
    >
      Deals
    </div>
  );
});
