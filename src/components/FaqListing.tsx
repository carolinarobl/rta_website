import { $, component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { BsArrowDownShort, BsInfoCircleFill } from "@qwikest/icons/bootstrap";
import { Markdown } from "~/components/Markdown";
import { Button } from "./Button";
import { useLocation } from "@builder.io/qwik-city";
import { gtag } from '~/utils/gtag';



export default component$(({ faqs, listall = true, analyticsOrigin }: { faqs: any, listall?: boolean, analyticsOrigin?: string }) => {

      const location = useLocation();
      const isES = location.prevUrl?.pathname.includes("/es/");

  const state = useStore({
    openIndex: -1,
    heights: {} as Record<number, number>,
    showAll: listall, // nuevo estado
  });

  // Identifica la altura de cada sección de contenido
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => state.showAll); // Recalcula cada vez que cambia showAll
  
    setTimeout(() => {
      document.querySelectorAll(".faq-content").forEach((el, index) => {
        state.heights[index] = (el as HTMLElement).scrollHeight;
      });
    }, 50); // le damos un poco de tiempo a que aparezcan en el DOM
  });

  const toggleFAQ = $((index: number) => {
    state.openIndex = state.openIndex === index ? -1 : index;
  });

  return (
    <div class="w-full mx-auto p-4 flex flex-col">
      
      {faqs.map((faq:any, index:number) => {
        const isVisible = state.showAll || index < 8;
          if (!isVisible) return null;
  
            const isOpen = state.openIndex === index;
          
        const linkRegex = /\[([^\]]+)\]\((=p[^)]+)\)/g;
        const matches = [...faq.Paragraph.matchAll(linkRegex)];

        const specialLinks = matches.map((match) => ({
          text: match[1], 
          id: match[2],  
        }));

        const cleanedParagraph = faq.Paragraph.replace(linkRegex, () => '');
        
        return (
          <div key={index} class="border-b border-primary-blue/30">

            <button
              onClick$={() => toggleFAQ(index)}
              class="w-full flex justify-between items-center py-4 text-left font-medium text-gray-700 hover:text-gray-900 focus:outline-none gap-2"
              aria-expanded={isOpen}
            >
              <div class="grow">{faq.Title}</div>
              <div class={`flex h-[30px] min-h-[30px] w-[30px] min-w-[30px] items-center justify-center rounded-full p-0 text-white transition-transform duration-300 ${state.openIndex === index ? "rotate-180 bg-primary-blue/10" : "rotate-0 bg-primary-blue"}`}>
                <BsArrowDownShort
                  class={`text-3xl transition-colors duration-300 ${state.openIndex === index ? "text-primary-blue/70" : "text-white"}`}
                  style={{
                    width: "24px",
                    height: "24px"
                  }}
                />
              </div>
            </button>


            <div
              class="flex flex-col faq-content overflow-hidden transition-all duration-300 ease-in-out w-full"
              style={{
                maxHeight: isOpen ? `${state.heights[index] || 0}px` : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
                       
            <Markdown text={cleanedParagraph} classN="text-primary-blue p-2 !text-[14px]" />
            
            {specialLinks.map((link) => (
              // <CustomLink key={link.id} id={link.id} label={link.text} />
              <Button
              key={link.id}
              text={link.text}
              link={link.id}
              />
            ))}
            

              {faq.Disclaimer &&
                (<div class="flex flex-row items-center justify-center gap-2">
                  <BsInfoCircleFill class="text-secondary-red"/>
                  <Markdown text={faq['Disclaimer']['Text']} classN="text-[12px] text-primary-dark-blue" />
                </div>)
              }

              {faq.Table &&
                <div class="flex flex-col justify-center w-full">
                  <table class="border-collapse border rounded-2xl border-gray-200 w-full">
                    <tbody class="bg-purple-300 m-2">
                      {faq.Table.map((column: any, index: any) => (
                        <div class='' key={index}>
                          {
                            column['ColumnThree'].includes("Title")
                              ? 
                              <tr class={`bg-white text-start flex w-full`} key={index}>
                                <th colSpan={column['ColumnThree'].includes('Column')? 2 : 3}>
                                  <Markdown text={column['ColumnOne']} classN="px-2 text-start"/>
                                </th>
                              </tr>
                              :
                              <tr class={`flex ${index === 0 ? 'text-white bg-primary-blue' : index % 2 === 1 ? 'bg-blue-100 text-primary-blue text-[13px]' : 'bg-blue-200 text-primary-blue text-[13px]' }`} key={index}>
                                <td class="flex w-full"><Markdown text={column['ColumnOne']} classN={`text-start px-2 ${index === 0 ? 'text-white ' : 'text-primary-blue'}`}/> </td>
                                <td class="flex w-full"><Markdown text={column['ColumnTwo']} classN={`text-start px-2 ${index === 0 ? 'text-white ' : 'text-primary-blue'}`}/></td>
                                {
                                  !(column['ColumnThree'].includes('Column')) && !(column['ColumnThree'].includes("Title")) &&
                                  <td class="flex w-full"><Markdown text={column['ColumnThree']} classN={`text-start px-2 ${index === 0 ? 'text-white ' : 'text-primary-blue'}`}/></td>
                                }
                              </tr>
                    }
                  </div>
                ))}
              </tbody>
            </table>

          </div>}


            </div>
          </div>
        );
      })}

<div class={`${listall ? 'hidden' : 'flex'} justify-center mt-4`}>
  <button
    onClick$={() => {
      if (analyticsOrigin && !state.showAll) {
        gtag('event', 'click_more_bastrop_faq', {
          event_category: 'bastrop_faq',
          event_label: analyticsOrigin,
          value: 1
        });
      }
      
      state.showAll = !state.showAll;

    
    }}

    class="text-primary-blue underline hover:text-primary-blue/70 transition"
  >
    {state.showAll
      ? isES ? 'Ver menos preguntas' : 'View fewer questions'
      : isES ? 'Ver más preguntas' : 'View more questions'}
  </button>
</div>
    </div>
  );
});