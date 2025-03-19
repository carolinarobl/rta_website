import { component$ } from "@builder.io/qwik";
import { BsInfoCircleFill } from "@qwikest/icons/bootstrap";
import { AccordionItem } from "~/components/AccordionItem";
import { Markdown } from "~/components/Markdown";

export const SectionFaq = component$(({ faqList }: { faqList: any }) => {
  return (
    <>
      {faqList.map((question: any, index: number) => (
        <AccordionItem
          key={index}
          title={question["Title"]}
          classContainer="text-center bg-white text-primary-blue text-base shadow-xl"
          classChild="text-sm md:text-base border-primary-blue"
        >
          <Markdown text={question["Paragraph"]} classN="text-primary-blue p-2" />

          {question["Disclaimer"] !== null ? (
            <div class="flex flex-row items-center justify-center gap-2">
              <BsInfoCircleFill class="text-secondary-red" />
              <Markdown text={question["Disclaimer"]["Text"]} classN="text-[10px] text-primary-dark-blue" />
            </div>
          ) : null}

          {question["Table"] !== null ? (
            <div class="flex flex-col items-center justify-center">
              <table class="border-collapse border rounded-2xl border-gray-200 w-full">
                <tbody>
                  {question["Table"].map((column: any, index: number) => (
                    <tr
                      key={index}
                      class={
                        column["ColumnThree"]?.includes("Title")
                          ? "bg-white text-start"
                          : index === 0
                          ? "text-white bg-primary-blue"
                          : index % 2 === 1
                          ? "bg-blue-100 text-primary-blue text-[13px]"
                          : "bg-blue-200 text-primary-blue text-[13px]"
                      }
                    >
                      {column["ColumnThree"]?.includes("Title") ? (
                        <th colSpan={2}>
                          <Markdown text={column["ColumnOne"]} classN="px-2 text-start" />
                        </th>
                      ) : (
                        <>
                          <td>
                            <Markdown
                              text={column["ColumnOne"]}
                              classN={`text-start px-2 ${index === 0 ? "text-white" : "text-primary-blue"}`}
                            />
                          </td>
                          <td>
                            <Markdown
                              text={column["ColumnTwo"]}
                              classN={`text-start px-2 ${index === 0 ? "text-white" : "text-primary-blue"}`}
                            />
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </AccordionItem>
      ))}
    </>
  );
});
