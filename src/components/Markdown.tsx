import { component$ } from "@builder.io/qwik";
import { parse } from "marked";

export const Markdown = component$(
  ({ text, classN = "" }: { text: String; classN: String }) => {
    return (
      <div
        dangerouslySetInnerHTML={parse(text)}
        class={`flex list-inside list-disc flex-col gap-3 text-justify ${classN}`}
      ></div>
    );
  },
);
