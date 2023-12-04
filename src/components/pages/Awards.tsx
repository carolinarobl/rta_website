import { component$ } from "@builder.io/qwik";
import { Markdown } from "../Markdown";
import { setURL } from "~/data/constants";
import Carousel from "../Carousel";

// import { Stepper } from "../Stepper";

export const Awards = component$(({ data }: { data: any }) => {
    const pageData = data['data']['pageAward']['data']['attributes']

    const AwardCard = component$(({ award }: { award: any }) => {
        return (
          <div class="">
              <div class="w-full relative flex h-4/5">
                        <img class="object-contain w-full h-full" src={setURL(award['Background']['data']['attributes']['url'])}
                            alt={award['Background']['data']['attributes']['alternativeText']}
                            width="200" height="200" />
                        <div class="h-full w-full absolute flex flex-col items-center px-10 justify-around">
                            <img src={setURL(award['Icon']['data']['attributes']['url'])} alt={award['Icon']['data']['attributes']['alternativeText']}
                                height={60} width={60} />
                            <div class="flex flex-col items-center">
                                <h2 class="text-xl text-white font-semibold text-center">{award['Title']}</h2>
                                <p class="text-center text-white">{award['Award']}</p>
                            </div>
                            <a class="text-white font-semibold" target="_blank" href={award['Button']['Link']}>{award['Button']['Text']}</a>
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
                <img class="object-fill opacity-50" src={setURL(pageData['Background']['data']['attributes']['url'])} height={500} width={1200} alt={pageData['Background']['data']['attributes']['alternativeText']} />
            </div>
            <div class="h-full w-full flex items-center justify-center absolute">
                {/* COMPONENTE CARRUSEL */}
             
                <Carousel slides={awardsSlides} id={"awardsSlider"} slidesQty={3} hasPagination={true} duration={3000}/>

            </div>
        </div>
    </div>
});