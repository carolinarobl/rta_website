import { component$ } from "@builder.io/qwik";
import { Markdown } from "../Markdown";
import { setURL } from "~/data/constants";
import { Button } from "../Button";

export const Support = component$(({ data }: { data: any }) => {
    const pageData = data['data']['pageSupport']['data']['attributes'];
    const sectionContact = data['data']['sectionContactBoxes']['data'];

    return <div class="flex flex-col px-8 justify-center items-center">
        <div class="h-[100px] p-6 flex flex-row justify-evenly items-center shadow-2xl rounded-full w-[350px] mb-5 bg-blue-100">
            <h2 class="text-primary-blue font-semibold text-xl">{pageData['WTTTitle']}</h2>
            <Button text={pageData['WTTButton']['Text']} link={pageData['WTTButton']['Link']}></Button>
        </div>
        <div class="text-center">
            <h1 class="text-3xl md:text-[40px] my-4 font-bold text-primary-blue">{pageData['Introduction']['Title']}</h1>
            <h2 class="text-secondary-red my-4 text-2xl font-semibold">{pageData['Introduction']['Subtitle']}</h2>
            <Markdown text={pageData['Introduction']['Paragraph']}></Markdown>
        </div>
        <div class="flex flex-col md:flex-row my-4 w-full">
            {sectionContact.map((section: any, i: any) => (
                <div key={i} class="flex flex-col w-full md:w-1/2 items-center px-4 justify-start">
                    {section['attributes']['Title'].map((title: any, index: any) => (
                        <div key={index}>
                            <h2 class="text-center text-2xl text-primary-blue font-semibold">{title['Text']}</h2>
                        </div>
                    ))}
                    {section['attributes']['BoxContent'].map((box: any, index: any) => (
                        <div key={index} class="min-h-[250px] my-4 w-full flex flex-col gap-5 justify-start items-center py-4 rounded-2xl shadow-xl">
                            <div class={`w-full flex justify-center py-2 items-center rounded-t-2xl ${i % 2 == 0 ? "bg-primary-blue" : "bg-secondary-red"}`}>
                                <h2 class="text-center text-2xl text-white font-semibold">{box['Title']}</h2>
                            </div>
                            <Markdown classN="text-center px-4" text={box['Paragraph']}></Markdown>
                            <div class="flex flex-wrap items-center justify-center gap-2">
                                {box['Buttons'].map((button: any, key: any) => (
                                    <Button key={key} text={button['Text']} link={button['Link']} type={button['Link']?.includes("tel:")?"action":"link"}></Button>
                                ))}
                            </div>
                        </div>

                    ))}
                </div>
            ))}
        </div>
        <div class="flex flex-col my-4 md:flex-row gap-5">
            {pageData['SelfSupport'].map((support: any, index: any) => (
                <div key={index} class="h-[290px] w-full md:w-[305px] rounded-3xl shadow-2xl flex p-6 flex-col items-center justify-between">
                    <img src={setURL(support['Media']['data']['attributes']['url'])}
                        alt={support['Media']['data']['attributes']['alternativeText']}
                        title={support['Media']['data']['attributes']['caption']}
                        height={150}
                        width={310} />
                    <h2 class="text-2xl md:text-3xl text-center font-semibold text-primary-blue">{support['Title']}</h2>
                    <Markdown classN="text-center" text={support['Paragraph']}></Markdown>
                    <Button text={support['Buttons'][0]['Text']} link={support['Buttons'][0]['Link']}></Button>
                </div>
            ))}
        </div>
    </div>
});