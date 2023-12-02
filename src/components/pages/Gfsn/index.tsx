import { component$ } from "@builder.io/qwik";
import { Markdown } from "~/components/Markdown";
import { setURL } from "~/data/constants";

export const GfSportsNetwork = component$(({ data }: { data: any }) => {
    return <div>
        <div class="flex flex-row items-center justify-center">
            <img src={setURL(data['Introduction']['Media']['data']['attributes']['url'])}
                alt={data['Introduction']['Media']['data']['attributes']['alternativeText']}
                height={270} width={270} />
            <div class="flex flex-col items-center justify-evenly">
                <h1 class="text-center text-4xl font-bold text-primary-blue">{data['Introduction']['Title']}</h1>
                <h2 class="text-center text-2xl text-secondary-red font-semibold">{data['Introduction']['Subtitle']}</h2>
                <Markdown text={data['Introduction']['Paragraph']}></Markdown>
            </div>
        </div>
    </div>
});