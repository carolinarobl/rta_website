import { component$ } from "@builder.io/qwik";
import { BsStarFill } from "@qwikest/icons/bootstrap";
import { Markdown } from "~/components/Markdown";
import { Paragraph } from "~/components/Paragraph";

export const SectionSpeed = component$(({ parData, speedList, addIcons }: { parData?: any, speedList: any, addIcons?:boolean}) => {
    const content= parData;
    const speeds = speedList;
    const iconed = addIcons;
    
    return (
    <div class={` flex md:flex-row flex-col-reverse w-full text-center items-center justify-center p-8 bg-gradient-to-r from-blue-600 to-[#2e5899]`}>
        <div class="max-w-[1300px] w-full flex flex-col">

            {/* Cajas de velocidad */}
            <div class="flex md:flex-row flex-col">
            {speeds &&
                speeds.map((speed: any, i: number) => (
                    <div key={i} class={`bg-white/80 grow m-2 rounded-2xl drop-shadow-2xl p-5 flex flex-row items-center justify-center gap-5`}>
                        {
                            iconed &&
                         <BsStarFill class="text-[#d20030]"/>
                        }
                        <div>
                        <h3 class="text-[#d20030] md:text-[28px] text-[22px] font-bold">{speed['Title']}</h3>
                        <Markdown text={speed['Text']} classN="md:text-[25px] text-[18px]"/>
                        </div>
                        {
                            iconed &&
                         <BsStarFill  class="text-[#d20030]"/>
                        }                        {/* <span class="text-[#2e5899] md:text-[18px] text-[15px]">{speed['Text']}</span> */}
                    </div>
                ))
            }                
            </div>
            {parData &&
              <Paragraph color="white" title={content['Title']} text={content['Paragraph']} buttons={content['Buttons']} backgroundColor={"transparent"}/>
            }

        </div>
    </div>
  );
});
