import { component$ } from "@builder.io/qwik";
import Carousel from "~/components/Carousel";
import { setURL } from "~/data/constants";
import { StrapiImage } from "~/components/StrapiImage";

export const SectionInterviews = component$(({ data }: { data: any }) => {
    const slides = data.map((slide: any, index: any) => {
        return <div key={index} class="relative z-0 w-350 h-150 rounded-2xl">
            <img class="rounded-2xl" src={setURL(slide['Picture']['data']['attributes']['url'])} alt={slide['Picture']['data']['attributes']['alternativeText']}
                width={350}
                height={150} />
            <div class="absolute inset-0 h-full w-full flex items-center justify-center">
                <StrapiImage url="/uploads/youtube_67497ef97d.svg" toWhite={true} height={50} width={50}></StrapiImage>
            </div>
        </div>
    })


    return <div class="w-full flex items-center justify-center">
        <Carousel slides={slides} id="InterviewCarousel" duration={5000} hasPagination={false}></Carousel>
    </div>
});