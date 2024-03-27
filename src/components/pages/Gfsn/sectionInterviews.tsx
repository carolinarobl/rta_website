import { component$ } from "@builder.io/qwik";
import Carousel from "~/components/Carousel";
import { StrapiImage } from "~/components/StrapiImage";

const ytLogo = {"url": "/uploads/youtube_67497ef97d.svg", "alternativeText":"A vector of Youtube logo", "caption":"Youtube logo icon | RTA"};

export const SectionInterviews = component$(({ data }: { data: any }) => {
    const slides = data.map((slide: any, index: any) => {
        return <div key={index} class="relative z-0 w-350 h-150 rounded-2xl">
            <StrapiImage clasN="rounded-2xl" media={slide['Picture']['data']['attributes']}
                width={350}
                height={150} />
            <a href={slide['Link']} class="absolute inset-0 h-full w-full flex items-center justify-center">
                <StrapiImage media={ytLogo} toWhite={true} height={50} width={50}></StrapiImage>
            </a>
        </div>
    })


    return <div class="w-full flex items-center justify-center">
        <Carousel slides={slides} id="InterviewCarousel" duration={5000} hasPagination={false}></Carousel>
    </div>
});