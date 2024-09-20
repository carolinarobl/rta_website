import { component$ } from "@builder.io/qwik";
import { Markdown } from "../Markdown";

export const InternetTransparency = component$(({ data }: { data: any }) => {
    return <div class="w-full flex flex-row items-center justify-center">
        <div class="px-4 py-2 md:px-10 md:py-2 max-w-[1200px]">
        <h1 class="text-primary-blue text-center font-semibold text-lg md:text-2xl mb-4">{data['Titles'][0]['Text']}</h1>
        <Markdown text={data['TextContent']} classN=" text-justify text-primary-blue font-normal text-sm md:text-base"></Markdown>
    </div>
    </div>
});