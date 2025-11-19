import { component$ } from "@builder.io/qwik";
import { Markdown } from "../Markdown";
import { Button } from "../Button";
import { StrapiImage } from "../StrapiImage";

export const Support = component$(({ data }: { data: any }) => {
    const pageData = data['data']['pageSupport']['data']['attributes'];
    const sectionContact = data['data']['sectionContactBoxes']['data'];

    return <div class="flex flex-col px-8 justify-center items-center">
            
            <div class="flex flex-row gap-3 p-3 items-center shadow-2xl rounded-full bg-primary-blue">
                <p class="text-white font-semibold text-md">{pageData['WTTTitle']}</p>
                <Button text={pageData['WTTButton']['Text']} link={pageData['WTTButton']['Link']}></Button>
            </div>


        <div class="text-center">
            <h2 class="text-3xl md:text-[40px] my-4 font-bold text-primary-blue">{pageData['Introduction']['Title']}</h2>
            <h3 class="text-secondary-red my-4 text-2xl font-semibold">{pageData['Introduction']['Subtitle']}</h3>
            <Markdown text={pageData['Introduction']['Paragraph']}></Markdown>
        </div>
        <div class="flex flex-col md:flex-row my-4 w-full gap-4 md:gap-6">
            {sectionContact.map((section: any, i: any) => (
                <div key={i} class="flex flex-col flex-1 items-center justify-start">
                    {section['attributes']['Title'].map((title: any, index: any) => (
                        <div key={index} class="mb-4">
                            <p class="text-center text-2xl text-primary-blue font-semibold">{title['Text']}</p>
                        </div>
                    ))}
                    <div class="w-full flex flex-col md:flex-row gap-4">
                        {section['attributes']['BoxContent'].map((box: any, index: any) => (
                            <div key={index} class="flex flex-col gap-5 justify-between py-4 rounded-2xl shadow-xl md:flex-1 md:h-full">
                                <div>
                                    <div class={`w-full flex justify-center py-2 items-center rounded-t-2xl ${i % 2 == 0 ? "bg-primary-blue" : "bg-secondary-red"}`}>
                                        <p class="text-center text-2xl text-white font-semibold">{box['Title']}</p>
                                    </div>
                                    <div class="px-4 py-4">
                                        <Markdown classN="text-center" text={box['Paragraph']}></Markdown>
                                    </div>
                                </div>
                                <div class="flex flex-wrap items-center justify-center gap-2 px-4 pb-4">
                                    {box['Buttons'].map((button: any, key: any) => (
                                        <Button key={key} text={button['Text']} link={button['Link']} type={button['Link']?.includes("tel:")?"action":"link"}></Button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        <div class="flex flex-col my-4 md:flex-row gap-5">
            {pageData['SelfSupport'].map((support: any, index: any) => (
                <div key={index} class="h-[290px] w-full md:w-[305px] rounded-3xl shadow-2xl flex p-6 flex-col items-center justify-between">
                    <StrapiImage media={support['Media']['data']['attributes']}
                        height={150}
                        width={310} />
                    <p class="text-2xl md:text-3xl text-center font-semibold text-primary-blue">{support['Title']}</p>
                    <Markdown classN="text-center" text={support['Paragraph']}></Markdown>
                    <Button text={support['Buttons'][0]['Text']} link={support['Buttons'][0]['Link']}></Button>
                </div>
            ))}
        </div>
    </div>
});