import { component$ } from "@builder.io/qwik";
import { Markdown } from "../Markdown";
import { setURL } from "~/data/constants";
import Carousel from "../Carousel";
import { Image } from '@unpic/qwik';


// import { Stepper } from "../Stepper";

export const Awards = component$(({ data }: { data: any }) => {
    const pageData = data['data']['pageAward']['data']['attributes']

    const AwardCard = component$(({ award }: { award: any }) => {
        return (

            //             <h2 class="text-3xl font-semibold text-primary-blue">{award['Year']}</h2>
            //   </div>
            <div class="text-center">
                <div class={`bg-primary-blue bg-opacity-40 p-6 h-[310px] w-[310px] inline-block items-center justify-center rounded-full`}>
                    <div class={`bg-primary-blue flex h-full w-full items-center justify-center  rounded-full bg-opacity-60 px-6 py-6 shadow-md`}>
                        <div class={`bg-primary-blue flex flex-col h-full w-full items-center justify-around rounded-full shadow-md`}>
                            <div class="flex flex-col items-center">
                                <Image src={setURL(award['Icon']['data']['attributes']['url'])} alt={award['Icon']['data']['attributes']['alternativeText']} title={award['Icon']['data']['attributes']['caption']} height={40} width={40} />

                                <h2 class="text-l text-white font-semibold text-center">{award['Title']}</h2>
                                <p class="text-center text-sm font-light text-white leading-8">{award['Award']}</p>
                            </div>
                            <a class="text-white font-semibold" target="_blank" href={award['Button']['Link']}>{award['Button']['Text']}</a>
                        </div>
                    </div>
                </div>
                <h2 class="text-3xl font-semibold text-primary-blue">{award['Year']}</h2>
            </div>
        );
    });

    const awardsSlides = pageData["Awards"].map(
        (slideContent: any, i: number) => (
            <AwardCard award={slideContent} key={i} />
        ),
    );


    return <div class="flex flex-col items-center justify-center">
        <div class="w-3/4">
            <h1 class="text-center text-4xl font-bold text-primary-blue">{pageData['Title']}</h1>
            <Markdown classN="text-center" text={pageData['Description']}></Markdown>
        </div>
        <div class="w-full h-[500px] relative items-center justify-center overflow-hidden">
            <div class="h-full w-full absolute bg-opacity-50">
                <Image class="object-fill opacity-50" src={setURL(pageData['Background']['data']['attributes']['url'])} height={500} width={1200} alt={pageData['Background']['data']['attributes']['alternativeText']} />
            </div>
            <div class="h-full w-full flex items-center justify-center absolute">
                {/* COMPONENTE CARRUSEL */}

                <Carousel slides={awardsSlides} id={"awardsSlider"} hasPagination={true} duration={3000} />

            </div>
        </div>
    </div>
});