import { component$ } from "@builder.io/qwik";
import { Paragraph } from "~/components/Paragraph";

export const SectionSpeed = component$(({ parData, speedList }: { parData: any, speedList: any}) => {
    const content= parData;
    const speeds = speedList;
    
    return (
    <div class={`flex md:flex-row flex-col-reverse w-full text-center items-center justify-center p-8 bg-gradient-to-r from-blue-500 to-[#2e5899]`}>
        <div class="max-w-[1300px] w-full flex flex-col">

            {/* Cajas de velocidad */}
            <div class="flex md:flex-row flex-col">
            {speeds &&
                speeds.map((speed: any, i: number) => (
                    <div key={i} class={`bg-white/80 grow m-2 rounded-2xl drop-shadow-2xl p-5`}>
                        <h3 class="text-[#d20030] md:text-[28px] text-[22px] font-bold">{speed['Title']}</h3>
                        <span class="text-[#2e5899] md:text-[18px] text-[15px]">{speed['Text']}</span>
                    </div>
                ))
            }                
            </div>

            <Paragraph color="white" title={content['Title']} text={content['Paragraph']} buttons={content['Buttons']} backgroundColor={"transparent"}/>

        </div>
    </div>
  );
});
