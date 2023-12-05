import { component$ } from "@builder.io/qwik";
import Carousel from "~/components/Carousel";
import { setURL } from "~/data/constants";

export const SectionSportsUpdates = component$(({ carouselData, title }: { carouselData: any, title: any }) => {

    const UpdateCard = component$(({ update }: { update: any }) => {
        return (
            <div  class={`relative text-center items-center justify-center }`}>
                <img src={setURL(update['Picture']['data']['attributes']['url'])} alt={update['Picture']['data']['attributes']['alternativeText']} title={update['Picture']['data']['attributes']['caption']} height={500} width={350} />
            </div>
        );
    });

    const updatesSlides = carouselData.map(
        (slideContent: any, i: number) => (
            <UpdateCard update={slideContent} key={i} />
        ),
    );

    return (
        <div class="flex flex-row max-w-[1200px] items-center justify-center max-[800px]:flex-col h-full">
            <div>
                <h2 class="text-center text-4xl font-bold text-primary-blue max-[800px]:w-[40%]">{title}</h2>
            </div>

            <div class="h-[600px] w-[60%] flex items-center justify-center ">
                <Carousel slides={updatesSlides} id={"updatesSlider"} hasPagination={false}/>
            </div>
        </div>

    );
});
