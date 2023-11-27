import { component$ } from "@builder.io/qwik";
import { AccordionItem } from "../AccordionItem";
import {BsInfoCircleFill} from "@qwikest/icons/bootstrap"

export const Faq = component$(({ data }: { data: any }) => {
  return <div class="my-8">
    <h1 class="text-center text-xl font-semibold text-primary-blue">{data['Introduction']['Titles'][0]['Text']}</h1>
    <h2 class="text-center text-primary-blue">{data['Introduction']['TextContent']}</h2>
    <div class="px-4 md:px-10">
      {data['FAQList'].map((question: any, index: any) => (
        <AccordionItem key={index} title={question['Title']}
          classContainer="text-center bg-white text-primary-blue text-base md:text-lg shadow-xl"
          classChild=" text-sm md:text-base border-primary-blue">
          <p class="text-primary-blue">{question['Paragraph']}</p>
          {question['Disclaimer'] !== null ?
            (<div class="flex flex-row items-center justify-center">
              <BsInfoCircleFill class="text-secondary-red"></BsInfoCircleFill>
              <p class="text-s text-primary-dark-blue">
              {question['Disclaimer']['Text']}
            </p>
            </div>) : null}
          {question['Table'] !== null ? <div class="flex flex-col item-center justify-center">
            <table class="border-collapse border rounded-2xl border-gray-200 w-full">
              <tbody>
                {question['Table'].map((column: any, index: any) => (
                  <tr class={`${
                    index === 0 ? 'bg-primary-blue text-white' : index % 2 === 1 ? 'bg-blue-100 text-primary-blue' : 'bg-blue-200 text-primary-blue'
                  }`} key={index}>
                    <td>{column['ColumnOne']}</td>
                    <td>{column['ColumnTwo']}</td>
                    <td>{column['ColumnThree']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> : null}
        </AccordionItem>
      ))}
    </div>
  </div>
});