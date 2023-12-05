import { $, component$, useSignal } from "@builder.io/qwik";
import { setURL } from "~/data/constants";

export const PopupChannelsLineup = component$(({ data, planId, channels }: { data: any, planId?: string, channels?: string }) => {
    const uniqueCategories = new Set(data.map((pack: any) => pack['attributes']['Category']));
    console.log(data.length)

    const slides = Array.from(uniqueCategories).map((slide: any, key: any) => {
        <div>{slide}</div>
    })

    var sportsChannels: Array<any>
    var sportsChannels: Array<any>
    var sportsChannels: Array<any>
    var sportsChannels: Array<any>

    const selectedTab = useSignal(0);
    // const sportsChannels = data.map((channel:any)=>{
    // })

    return <div class="h-[500px] p-10 w-full md:w-3/4 rounded-3xl bg-blue-700">
        <div class="flex flex-row items-center justify-between">
            <h1 class="text-white font-semibold text-4xl">{planId}</h1>

            <p class="text-white font-light text-2xl">{channels}</p>

        </div>
        <div class="flex flex-row bg-white text-primary-blue font-bold my-4 rounded-t-2xl py-4 items-center justify-around">
            {Array.from(uniqueCategories).map((category: any, key: any) => (
                <button key={category} onClick$={$(() => {
                    selectedTab.value = key;
                })}>{category}</button>
            ))}
        </div>
        <div class="flex h-3/4 w-full p-6 bg-white rounded-b-3xl">
            {Array.from(uniqueCategories).map((category: any, key: any) => (
                <div class={`grid grid-cols-8 h-full ${selectedTab.value == key ? "" : "hidden"} py-4 w-full bg-white overflow-y-auto gap-3 border-2 rounded-2xl border-primary-blue`}>
                    {data.map((channel: any, key: any) => (
                        <div key={key} class={`flex flex-col items-center justify-center`}>
                            <div class="h-[80px] w-[80px] border-2 p-1 rounded-full flex flex-col">
                                <img height={80} width={80} src={setURL(channel['attributes']['Image']['data']['attributes']['url'])} alt={channel['attributes']['Image']['data']['attributes']['alterbativeText']} />
                            </div>
                            <p class="text-xs text-center text-primary-blue">{channel['attributes']['Channel_name']}</p>

                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
});