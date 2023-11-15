import { component$ } from "@builder.io/qwik";
import { parse } from "marked";

export const Markdown = component$(
  ({ text, classN = "" }: { text: string; classN?: string }) => {
    return (
      <div
        dangerouslySetInnerHTML={parse(text)}
        class={`flex list-inside markdownol flex-col gap-3 ${classN}`}
      ></div>
    );
  },
);
