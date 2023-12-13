import { component$ } from "@builder.io/qwik";
import { setURL } from "~/data/constants";
import { SectionFeactures } from "./section-feactures";
import { Markdown } from "~/components/Markdown";
import { DownloadBoxImage } from "~/components/download-box-image";
import { SectionChpack } from "./section-chpack";
import { SectionAdditionalOptions } from "./section_additionalOptions";
import { SectionPremiumChannels } from "./section-premiumChannels";

export const GigfastTv = component$(({ data }: { data: any}) => {
    const pageData = data['data']['pageGfTv']['data']['attributes']
    const sectionChguide = data['data']['sectionChGuide']['data']['attributes']
    const sectionChLineup = data['data']['channelLineups']['data']

    return <div class="flex flex-col justify-around">
        <div class="flex flex-col my-6 items-center justify-center gap-4">
            <img src={setURL(pageData['Logo']['data']['attributes']['url'])} alt={pageData['Logo']['data']['attributes']['alternativeText']} title={pageData['Logo']['data']['attributes']['caption']}
                height={200} width={500} />
            <h2 class="text-[50px] font-bold text-center text-primary-blue">{pageData['Titles'][0]['Text']}</h2>
            <h2 class="text-[50px] font-bold text-center text-secondary-red">{pageData['Titles'][1]['Text']}</h2>
        </div>

        <SectionFeactures data={pageData["Features"]}></SectionFeactures>

        <div class="flex flex-col text-center p-4 items-center justify-center my-8">
            <h2 class="text-3xl md:text-5xl font-semibold text-primary-blue my-6">{pageData['Feature']['Title']}</h2>
            <Markdown text={pageData['Feature']['Paragraph']}></Markdown>
        </div>

        <SectionChpack 
        dataChannels={sectionChLineup} 
        data={pageData['ChPackTables']} title={pageData['ChPackTitle']}></SectionChpack>

        <SectionPremiumChannels data={pageData['PremiumTables']} title={pageData['PremiumTitle']}></SectionPremiumChannels>

        <div class={`flex w-full flex-col items-center justify-center`}>
            <div
                class={`my-4 flex max-w-[1200px] items-center justify-center max-[800px]:flex-col`}>
                <div
                    class={`flex min-[800px]:w-[70%] flex-col items-center justify-center gap-4 px-10`}>

                    <div class="max-w-[470px]">
                        <img
                            src={setURL(sectionChguide['Logo']['data']['attributes']['url'])}
                            alt={sectionChguide['Logo']['data']['attributes']['alternativeText']}
                            title={sectionChguide['Logo']['data']['attributes']['caption']}
                            width="1230"
                            height="230"
                        />
                    </div>
                    <div class={`flex justify-center gap-2 text-primary-blue`}>
                        <span class="text-center text-[38px] font-bold max-sm:text-[28px]">
                            {sectionChguide['Title']}
                        </span>
                    </div>
                    <Markdown
                        text={sectionChguide['Paragraph']}
                        classN={`text-[18px] max-sm:text-[15px] text-primary-blue`}
                    ></Markdown>
                </div>
                <div class="flex w-[300px] items-center justify-center self-center p-4 min-[800px]:w-[30%]">
                    <DownloadBoxImage
                        nameDoc={sectionChguide['GuideBox']['Guide']['data']['attributes']['name']}
                        urlDoc={sectionChguide['GuideBox']['Guide']['data']['attributes']['url']}
                        image={sectionChguide['Picture']['data']['attributes']} title={sectionChguide['GuideBox']['Title']} btnText={sectionChguide['GuideBox']['BtnText']}></DownloadBoxImage>
                </div>
            </div>
            <SectionAdditionalOptions data={pageData['Additionals']} disclaimers={pageData['Disclaimers']} title={pageData['AdditionalsTitle']}></SectionAdditionalOptions>
        </div>
    </div>
});