import { component$ } from "@builder.io/qwik";
import { Markdown } from "../Markdown";
import { setURL } from "~/data/constants";
import { Stepper } from "../Stepper";

export const Awards = component$(({ data }: { data: any }) => {
    const pageData = data['data']['pageAward']['data']['attributes']
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
                <div class="w-[350px] h-[350px] flex flex-col items-center justify-between">
                    <div class="w-full relative flex h-4/5">
                        <img class="object-contain w-full h-full" src={setURL(pageData['Awards'][0]['Background']['data']['attributes']['url'])}
                            alt={pageData['Awards'][0]['Background']['data']['attributes']['alternativeText']}
                            width="200" height="200" />
                        <div class="h-full w-full absolute flex flex-col items-center px-10 justify-around">
                            <img src={setURL(pageData['Awards'][0]['Icon']['data']['attributes']['url'])} alt={pageData['Awards'][0]['Icon']['data']['attributes']['alternativeText']}
                                height={60} width={60} />
                            <div class="flex flex-col items-center">
                                <h2 class="text-xl text-white font-semibold text-center">{pageData['Awards'][0]['Title']}</h2>
                                <p class="text-center text-white">{pageData['Awards'][0]['Award']}</p>
                            </div>
                            <a class="text-white font-semibold" href={pageData['Awards'][0]['Button']['Link']}>{pageData['Awards'][0]['Button']['Text']}</a>
                        </div>
                    </div>
                    <h2 class="text-3xl font-semibold text-primary-blue">{pageData['Awards'][0]['Year']}</h2>
                </div>
            </div>
        </div>
    </div>
});