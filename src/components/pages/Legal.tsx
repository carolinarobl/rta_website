import { component$ } from "@builder.io/qwik";
import { Markdown } from "../Markdown";

export const Legal = component$(({ data }: { data: any }) => {
    return <div class="px-4 py-2 md:px-10 md:py-2">
        <h1 class="text-primary-blue text-center font-semibold text-lg md:text-2xl mb-4">{data['Titles'][0]['Text']}</h1>
        <h2 class="text-primary-blue text-center font-semibold text-lg md:text-2xl mb-4">{data['Titles'][1]['Text']}</h2>
        <Markdown text={data['TextContent']} classN=" tracking-wider text-primary-blue font-normal text-sm md:text-base"></Markdown>
    </div>
});