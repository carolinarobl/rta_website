import { component$ } from "@builder.io/qwik";
import { Markdown } from "../Markdown";

export const PrivacyPolicy = component$(({ data }:{data:any}) => {
    return <div class="p-6">
        <h1 class="text-primary-blue text-center font-semibold text-2xl mb-4">{data['Titles'][0]['Text']}</h1>
        <Markdown text={data['TextContent']} classN="markdownTitle markdownHyper text-justify text-primary-blue font-normal text-sm md:text-base"></Markdown>
    </div>
});