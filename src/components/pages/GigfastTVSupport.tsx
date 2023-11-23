import { component$ } from "@builder.io/qwik";
import { Markdown } from "../Markdown";
import { setURL } from "~/data/constants";
  

export const GigfastTVSupport = component$(({ data }: { data: any }) => {
    return <div class="flex flex-col">
        <div class="flex flex-row px-8 items-center justify-center">
            <h1 class="text-2xl font-semibold text-primary-blue">{data['IntroText']}</h1>
            <div class="h-[150px] w-[300px] bg-primary-blue">Video</div>
        </div>
        <div class="flex my-10 w-full py-10 bg-primary-blue bg-opacity-40">
            <div class="flex w-full py-10 bg-primary-blue bg-opacity-60">
                <div class="flex w-full flex-col py-10 px-8 items-center justify-between bg-primary-blue bg-opacity-80">
                    <h2 class="font-bold text-3xl md:text-4xl my-5 text-white">{data['DevicesTitle']}</h2>
                    <div class="flex flex-wrap gap-5 items-center justify-center">
                        {data['Devices'].map((device: any, index: any) => (
                            <div key={index} class="h-[300px] w-[300px] p-5 rounded-full bg-white bg-opacity-40">
                                <div class="h-full w-full p-5 rounded-full bg-white bg-opacity-60">
                                    <div class="h-full w-full object-cover flex flex-col p-8 justify-center items-center rounded-full bg-white">
                                        <h1 class="text-center font-semibold text-2xl text-primary-blue">{device['Title']}</h1>
                                        <Markdown classN="text-s text-primary-dark-blue" text={device['Paragraph']}></Markdown>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p class="text-center my-5 text-white">{data['DevicesNote']}</p>

                </div>
            </div>
        </div>
        <button onClick$={()=>{
                const fileUrl = setURL(data['Guides'][0]['Guide']['data']['attributes']['url']);
                const link = document.createElement('a');
                link.href = fileUrl;
                link.download = data['Guides'][0]['Guide']['data']['attributes']['name']; // Replace with the desired file name
                link.click();
        }}>Decargar</button>
        {/* <a href={setURL(data['Guides'][0]['Guide']['data']['attributes']['url'])} download={data['Guides'][0]['Guide']['data']['attributes']['name']}>Descargar PDF</a> */}
    </div>
});