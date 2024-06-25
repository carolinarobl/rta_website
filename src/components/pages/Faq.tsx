import { component$ } from "@builder.io/qwik";
import { AccordionItem } from "../AccordionItem";
import {BsInfoCircleFill} from "@qwikest/icons/bootstrap"
import { Markdown } from "../Markdown";
import { StrapiImage } from "../StrapiImage";

export const Faq = component$(({ data }: { data: any }) => {
  console.log(data['FAQList'][1])

  return <div class="my-8">
    <h1 class="text-center text-xl font-semibold text-primary-blue">{data['Introduction']['Titles'][0]['Text']}</h1>
    <h2 class="text-center text-primary-blue">{data['Introduction']['TextContent']}</h2>
    <div class="px-4 md:px-10">
      {data['FAQList'].map((question: any, index: any) => (
        <AccordionItem key={index} title={question['Title']}
          classContainer="text-center bg-white text-primary-blue text-base md:text-lg shadow-xl"
          classChild=" text-sm md:text-base border-primary-blue">
          <Markdown text={question['Paragraph']} classN="text-primary-blue p-2" />

          {question['Disclaimer'] !== null ?
            (<div class="flex flex-row items-center justify-center gap-2">
              <BsInfoCircleFill class="text-secondary-red"></BsInfoCircleFill>
              <Markdown text={question['Disclaimer']['Text']} classN="text-[12px] text-primary-dark-blue" />
            </div>) : null}
          {question['Table'] !== null ? <div class="flex flex-col item-center justify-center">
            <table class="border-collapse border rounded-2xl border-gray-200 w-full">
              <tbody>
                {question['Table'].map((column: any, index: any) => (
                  <div>
                    {
                    column['ColumnThree'].includes("Title")? 
                    <tr class={`bg-white text-start`} key={index}>
                      <th colSpan={2}><Markdown text={column['ColumnOne']} classN="px-2 text-start"/> </th>
                    </tr>
                    :
                    <tr class={`${index === 0 ? 'text-white bg-primary-blue' : index % 2 === 1 ? 'bg-blue-100 text-primary-blue text-[13px]' : 'bg-blue-200 text-primary-blue text-[13px]' }`} key={index}>
                    <td><Markdown text={column['ColumnOne']} classN={`text-start px-2 ${index === 0 ? 'text-white ' : 'text-primary-blue'}`}/> </td>
                    <td><Markdown text={column['ColumnTwo']} classN={`text-start px-2 ${index === 0 ? 'text-white ' : 'text-primary-blue'}`}/></td>
                  </tr>
                    }
                  </div>
                ))}
              </tbody>
            </table>

          </div> : null}
        </AccordionItem>
      ))}
    </div>
  </div>
});
