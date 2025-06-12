import { component$ } from "@builder.io/qwik";
import { parse } from "marked";

export const Markdown = component$(
  ({ text, classN = "" }: { text: string; classN?: string }) => {
    return (
      <div
        dangerouslySetInnerHTML={parse(text)}
        class={`flex list-outside flex-col gap-3 text-primary-blue tracking-[0.15px] font-[350]
                [&>*>a]:text-secondary-red
                min-[1000px]:[&>h1]:text-[45px]
                [&>h1]:text-[15px]
                [&>h1]:leading-tight
                [&>h1]:font-[400]
                [&>h2]:text-[26px]
                [&>h3]:text-[26px]
                [&>ul]:flex
                [&>ul]:flex-col
                [&>ul]:gap-3 
                ${classN}`}
      ></div>
    );
  },
);
