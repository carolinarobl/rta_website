import { component$ } from "@builder.io/qwik";
import { Markdown } from "../Markdown";
import { setURL } from "~/data/constants";
import { DownloadBox } from "../download-box";
import { DownloadBoxImage } from "../download-box-image";
import { StrapiImage } from "../StrapiImage";


export const GigfastTVSupport = component$(({ data }: { data: any }) => {
    const pageData = data['pageGfTvS']['data']['attributes']
    const sectionChguide = data['sectionChGuide']['data']['attributes']
    return <div class="flex flex-col justify-center items-center">
        <div class="flex flex-col md:flex-row px-8 items-center justify-center gap-5">
            <h1 class="text-2xl text-center font-semibold text-primary-blue">{pageData['IntroText']}</h1>
            <div class="h-[150px] relative w-[350px] flex mb-14">
                <video class="absolute pt-2" src={setURL(pageData['IntroMedia']['data'][1]['attributes']['url'])}
                autoplay
                loop
                muted></video>
                <StrapiImage clasN="absolute z-0" media={pageData['IntroMedia']['data'][0]['attributes']} 
                width="1082" height="786" />
            </div>
        </div>
        <div class="flex my-20 w-full py-10 bg-primary-blue bg-opacity-40">
            <div class="flex w-full py-10 bg-primary-blue bg-opacity-60">
                <div class="flex w-full flex-col py-10 px-8 items-center justify-between bg-primary-blue bg-opacity-80">
                    <h2 class="font-bold text-3xl md:text-4xl my-5 text-white">{pageData['DevicesTitle']}</h2>
                    <div class="flex flex-wrap gap-5 items-center justify-center">
                        {pageData['Devices'].map((device: any, index: any) => (
                            <div key={index} class="h-[300px] w-[300px] p-5 rounded-full bg-white bg-opacity-40">
                                <div class="h-full w-full p-5 rounded-full bg-white bg-opacity-60">
                                    <div class="h-full w-full object-cover flex flex-col p-8 justify-center items-center rounded-full bg-white">
                                        <h2 class="text-center font-semibold text-2xl text-primary-blue">{device['Title']}</h2>
                                        <Markdown classN="text-s text-primary-dark-blue" text={device['Paragraph']}></Markdown>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p class="text-center justify-end my-5 text-white">{pageData['DevicesNote']}</p>

                </div>
            </div>
        </div>
        <div class="flex flex-col justify-center px-8 items-center">
            <div class="w-full md:w-2/3 flex flex-col items-center">
                <h2 class="text-3xl md:text-4xl text-center font-bold text-primary-blue">{pageData['GuidePar']['Title']}</h2>
                <Markdown classN="text-center" text={pageData['GuidePar']['Paragraph']}></Markdown>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-10 my-5">
                {pageData['Guides'].map((guide: any, index: any) => (
                    <DownloadBox key={index} urlDoc={guide['Guide']['data']['attributes']['url']}
                     title={guide['Title']} btnText={guide['BtnText']}
                     nameDoc={guide['Guide']['data']['attributes']['name']}></DownloadBox>
                ))}
            </div>
        </div>
        <div
            class={`flex w-full flex-col items-center justify-center`}
        >
            <div
                class={`my-4 flex max-w-[1200px] items-center justify-center max-[800px]:flex-col`}>
                <div
                    class={`flex min-[800px]:w-[70%] flex-col items-center justify-center gap-4 px-10`}>

                    <div class="max-w-[470px]">
                        <StrapiImage
                            media={sectionChguide['Logo']['data']['attributes']}
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
        </div>
        
    </div>
});

