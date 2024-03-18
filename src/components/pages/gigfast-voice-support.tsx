import { component$ } from "@builder.io/qwik";
import { Markdown } from "../Markdown";
import { DownloadBox } from "../download-box";
import { Paragraph } from "../Paragraph";
import { StrapiImage } from "../StrapiImage";

export const GigfastVoiceSupport = component$(({ data }: { data: any }) => {
    const dataPage = data['pageGfVS']['data']['attributes'];
    const secctionPort = data['sectionPortGfv']['data']['attributes']['Portability']
    return <div class="flex flex-col items-center">
        <div class="relative w-full md:w-2/3 h-[210px] md:h-[150px] bg-blue-200 flex flex-row justify-end items-center rounded-full">
            <div class="h-full absolute rounded-full w-3/4 bg-blue-300"></div>
            <div class="h-full absolute rounded-full w-2/4 bg-blue-400"></div>
            <div class="h-full absolute rounded-full w-1/4 bg-blue-600"></div>
            <div class="absolute w-full h-full flex flex-row p-5 justify-between items-center" >
                <h1 class="text-primary-blue lg:text-3xl md:text-2xl font-bold text-center text-xl">{dataPage['Introduction']['Paragraph']}</h1>
                <StrapiImage url={dataPage['Introduction']['Media']['data']['attributes']['url']} width={200} height={150} alt={dataPage['Introduction']['Media']['data']['attributes']['alternativeText']} title={dataPage['Introduction']['Media']['data']['attributes']['caption']} />

            </div>
        </div>
        <div class="flex flex-col mt-10 justify-center px-8 items-center">
            <div class="w-full md:w-2/3 flex flex-col items-center">
                <h2 class="text-3xl md:text-4xl text-center font-bold text-primary-blue">{dataPage['GuidesPar']['Title']}</h2>
                <Markdown classN="text-center" text={dataPage['GuidesPar']['Paragraph']}></Markdown>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-10 my-5">
                {dataPage['Guides'].map((guide: any, index: any) => (
                    <DownloadBox key={index} urlDoc={guide['Guide']['data']['attributes']['url']}
                        title={guide['Title']} btnText={guide['BtnText']}
                        nameDoc={guide['Guide']['data']['attributes']['name']}></DownloadBox>
                ))}
            </div>
        </div>
        <div>
            <Paragraph title={secctionPort['Title']} text={secctionPort['Paragraph']}
                logo={secctionPort['Logo']['data']['attributes']}
                image={secctionPort['Media']['data']['attributes']}
                backgroundColor="transparent"
                buttons={secctionPort['Buttons']}></Paragraph>
        </div>
    </div>
});