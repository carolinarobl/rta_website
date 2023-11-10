import { component$ } from "@builder.io/qwik";
import { Markdown } from "../Markdown";

export const ClientServicesTermsAndConditions = component$(({data}:{data:any}) => {
  console.log(data['TextContent'])
  return <div class="px-4 py-2 md:px-10 md:py-2">
    <h1 class="text-primary-blue text-center font-semibold text-lg md:text-2xl mb-4">{data['Titles'][0]['Text']}</h1>
    <Markdown text={data['TextContent']} classN="markdownTitle markdownh3 markdownHyper tracking-wider flex text-primary-blue font-normal text-sm md:text-base" ></Markdown>
  </div>
});