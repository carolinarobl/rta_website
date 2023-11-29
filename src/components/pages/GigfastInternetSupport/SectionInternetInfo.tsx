import { component$ } from "@builder.io/qwik";
import { SerializedParagraph } from "~/components/Paragraph";

export const SectionInternetInfo = component$(({ data }: { data: any }) => {
  return (
    <>
      {data.map((par: any, i: number) => {
        return (
          <SerializedParagraph
            key={i}
            data={par}
            reverse={i % 2 === 1}
            textPercentage={60}
          />
        );
      })}
    </>
  );
});
