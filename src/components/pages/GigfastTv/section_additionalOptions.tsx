import { component$ } from "@builder.io/qwik";
import { Markdown } from "~/components/Markdown";

export const SectionAdditionalOptions = component$(({data, title, disclaimers}:{data:any, title:string, disclaimers:string}) => {
  return <div class="flex flex-col items-center justify-center px-6">
    <h2 class="text-3xl md:text-5xl my-3 font-semibold text-primary-blue">{title}</h2>
    <div class="flex flex-wrap gap-8 items-start justify-center my-4">
        {data.map((option:any, key:any)=>(
            <div key={key} class="flex flex-col w-full md:w-2/5 my-3 md:my-5 p-6 text-center items-center justify-center rounded-2xl bg-white shadow-xl">
                <h3 class="text-primary-dark-blue my-4 font-semibold text-xl">{option['Title']}</h3>
                <Markdown text={option['Paragraph']}></Markdown>
            </div>
        ))}
    </div>
    <Markdown classN="markdownli text-s" text={disclaimers}></Markdown>
  </div>
});