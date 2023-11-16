import { component$ } from "@builder.io/qwik";
import { AccordionItem } from "../AccordionItem";

export const Faq = component$(({ data }: { data: any }) => {
  return <div class="my-8">
    <h1 class="text-center text-xl font-semibold text-primary-blue">{data['Introduction']['Titles'][0]['Text']}</h1>
    <h2 class="text-center text-primary-blue">{data['Introduction']['TextContent']}</h2>
    <div class="px-4 md:px-10">
      {data['FAQList'].map((question: any, index: any) => (
        <AccordionItem key={index} title={question['Title']} classContainer="text-center bg-white rounded-full text-primary-blue text-base md:text-lg shadow-xl" classChild="bg-white rounded-xl text-sm md:text-base">
          <p>{question['Paragraph']}</p>
        </AccordionItem>
      ))}
    </div>
  </div>
});
{/*  */ }