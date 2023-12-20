import { component$ } from "@builder.io/qwik";
import { Markdown } from "~/components/Markdown";
import { BsPlayBtnFill } from "@qwikest/icons/bootstrap"
import { YTVideo } from "~/components/YTVideo";

export const SectionFeatInterview = component$(({ data }: { data: any }) => {
    return <div class="flex flex-col lg:flex-row w-full px-10 items-center justify-center my-8">
        <div class="flex flex-col w-full lg:w-1/2 h-full text-center lg:text-end justify-evenly mr-4 my-4">
            <h2 class="text-2xl font-semibold text-secondary-red">{data['FeatInterview']['Title']}</h2>
            <h3 class="text-2xl font-[350] text-primary-blue">{data['FeatInterview']['Subtitle']}</h3>
            <Markdown classN="my-8 ml-4" text={data['FeatInterview']['Paragraph']}></Markdown>
            <div class="flex justify-center lg:justify-end">
                <a class="text-end" href={data['FeatInterview']['Buttons'][0]['Link']}>
                    <div class="flex px-4 w-fit py-2 justify-evenly items-center rounded-2xl border-2 border-primary-blue">
                        <BsPlayBtnFill class="fill-secondary-red mr-4 h-full"></BsPlayBtnFill>
                        <p>{data['FeatInterview']['Buttons'][0]['Text']}</p>
                    </div>
                </a>
            </div>
        </div>
        <div class="p-8">
            <YTVideo ytURL={data['FeatVideo']} className="rounded-2xl w-[560px] h-[315px]"></YTVideo>
        </div>
    </div>
});