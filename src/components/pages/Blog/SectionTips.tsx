import { component$ } from "@builder.io/qwik";
import { BsLightbulbFill } from "@qwikest/icons/bootstrap";
import Carousel from "~/components/Carousel";
import { Markdown } from "~/components/Markdown";

export const SectionTips = component$(({ data }: { data: any }) => {

    const tipsSlidesData = data['TechTips']['data'];


    const SlideTip = component$(({ slide }: { slide: any }) => {
        return (
            <div class="flex flex-col items-center justify-center w-fit ">
                <div class="  px-2 mb-8  md:max-h-[150px]  overflow-y-scroll">
                    <Markdown classN="text-[12.5px]" text={slide["attributes"]['Content']} />
                </div>
            </div>
        );
    });

    const tipsSlides = tipsSlidesData.map((slideContent: any, i: number) => (
        <SlideTip slide={slideContent} key={i} />
    ));
    return (
        <div class=" gap-2 flex flex-row bg-white p-3 md:rounded-full rounded-3xl md:w-[750px] w-[90%] shadow-lg items-center">
            <div>
                <div class={`bg-[#2e5899] p-5 rounded-full shadow-lg md:min-h-[130px] md:max-w-[130px] md:max-h-[130px] max-w-[80px] flex justify-center items-center max-[768px]:hidden	`}>
                    <div class="bg-white md:p-5 p-2 w-fit h-fit items-center rounded-full  text-[#2e5899]">
                        <BsLightbulbFill class={` md:w-[55px] md:h-[55px] w-[30px] h-[30px] fill-[#2e5899]`}></BsLightbulbFill>
                    </div>
                </div>
            </div>
            <div class=" justify-center items-center  md:w-[650px] max-w-[100%]">
                <div class="text-[18px] tracking-wide font-[600] leading-10 text-[#2E5899]">{data['Title']}</div>
                <div class="h-fit relative flex md:w-[650px] max-w-[90%]  items-center justify-center overflow-hidden   ">
                    <Carousel slides={tipsSlides} slidesQty={1} id="techTipsCarousel" addSpace={false} hasArrows={false}/>
                </div>
            </div>
        </div>
    );
});