import { component$ } from "@builder.io/qwik";
import Carousel from "~/components/Carousel";
import { setURL } from "~/data/constants";

export const SectionSportsUpdates = component$(({ carouselData, title }: { carouselData: any, title: any }) => {

    const UpdateCard = component$(({ update }: { update: any }) => {
        return (
            <div class={`relative z-0 h-3/4 w-[250px] text-center items-center justify-center }`}>
                <img class="object-fill h-full w-full" src={setURL(update['Picture']['data']['attributes']['url'])} alt={update['Picture']['data']['attributes']['alternativeText']} title={update['Picture']['data']['attributes']['caption']}
                    height={500}
                    width={250} />
                <a href={update['Link']}>
                    <div class="absolute flex items-center justify-center flex-col inset-0 w-full h-full bg-black bg-opacity-30 text-white">
                        <h2 class="text-2xl font-semibold">{update['Title']}</h2>
                        <p class="text-xl">{update['Subtitle']}</p>
                    </div>
                </a>
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
            <h2 class="text-center text-4xl font-bold text-primary-blue max-[800px]:w-[40%]">{title}</h2>

            <div class="h-fit w-[60%] flex items-center justify-center ">
                <Carousel slides={updatesSlides} fillSlide={true} addSpace={false} id={"updatesSlider"} hasPagination={false} />
            </div>
        </div>

    );
});
