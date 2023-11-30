import { component$ } from "@builder.io/qwik";
import { setURL } from "~/data/constants";
import { SectionFeactures } from "./section-feactures";
import { Markdown } from "~/components/Markdown";
import { DownloadBoxImage } from "~/components/download-box-image";
import { SectionChpack } from "./section-chpack";

export const GigfastTv = component$(({ data }: { data: any }) => {
    const pageData = data['data']['pageGfTv']['data']['attributes']
    const sectionChguide = data['data']['sectionChGuide']['data']['attributes']

    return <div class="flex flex-col">
        <div class="flex flex-col my-6 items-center justify-center gap-4">
            <img src={setURL(pageData['Logo']['data']['attributes']['url'])} alt={pageData['Logo']['data']['attributes']['alternativeText']}
                height={200} width={500} />
            <h2 class="text-[40px] font-semibold text-center text-primary-blue">{pageData['Titles'][0]['Text']}</h2>
            <h2 class="text-[40px] font-semibold text-center text-secondary-red">{pageData['Titles'][1]['Text']}</h2>
        </div>
        <SectionFeactures data={pageData["Features"]}></SectionFeactures>
        
        <SectionChpack data={pageData}></SectionChpack>

        <div class={`flex w-full flex-col items-center justify-center`}>
            <div
                class={`my-4 flex max-w-[1200px] items-center justify-center max-[800px]:flex-col`}>
                <div
                    class={`flex min-[800px]:w-[70%] flex-col items-center justify-center gap-4 px-10`}>

                    <div class="max-w-[470px]">
                        <img
                            src={setURL(sectionChguide['Logo']['data']['attributes']['url'])}
                            alt="paragraph-logo"
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
                        image={sectionChguide['Picture']['data']['attributes']['url']} title={sectionChguide['GuideBox']['Title']} btnText={sectionChguide['GuideBox']['BtnText']}></DownloadBoxImage>
                </div>
            </div></div>
    </div>
});