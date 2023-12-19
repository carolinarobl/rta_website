import { $, component$, useSignal } from "@builder.io/qwik";
import { setURL } from "~/data/constants";

export const PopupChannelsLineup = component$(({ data, planId, channels }: { data: any, planId?: string, channels?: string }) => {
    const uniqueCategories = new Set(data.map((pack: any) => pack['attributes']['Category']));

    const sportsChannels = data.filter((channel: any) => channel['attributes']['Category'] === "Sports");
    const moviesChannels = data.filter((channel: any) => channel['attributes']['Category'] === "Movies");
    const newsChannels = data.filter((channel: any) => channel['attributes']['Category'] === "News");
    const musicChannels = data.filter((channel: any) => channel['attributes']['Category'] === "Music");
    const kidsChannels = data.filter((channel: any) => channel['attributes']['Category'] === "Kids");


    const IdPackage = planId?.slice(0, 2)
    const selectedTab = useSignal(0);

    const channelsPack = (channelsData: any) => (
        channelsData.map((channel: any, index: any) => {
            const include = channel['attributes']['package_tvs']['data'].some((pack: any) => pack['attributes']['package'].includes(IdPackage));
            const commingSoon = channel['attributes']['package_tvs']['data'].some((pack: any) => pack['attributes']['package'].includes("comingSoon"));

            return (
                <div key={index} class="flex flex-col items-center justify-center">
                    <div class={`h-[40px] md:h-[60px] w-[40px] md:w-[60px] ${include ? "" : "opacity-20"} border-2 p-1 rounded-full flex flex-col`}>
                        <img height={50} width={50} src={setURL(channel['attributes']['Image']['data']['attributes']['url'])}
                            alt={channel['attributes']['Image']['data']['attributes']['alterbativeText']}
                        />
                    </div>
                    {commingSoon ? <div class="bg-primary-blue text-center p-0.5 text-xs text-white rounded-full">
                        Coming Soon
                    </div> : null}
                    <p class="text-xs text-center text-primary-blue">{channel['attributes']['Channel_name']}</p>
                </div>
            );
        })
    );

    const slides = Array.from(uniqueCategories).map((category: any, key: any) => (
        <div key={key} class="grid grid-cols-3 py-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 w-full gap-4">
            {category === "General"
                ? channelsPack(data)
                : category === "Sports" ? channelsPack(sportsChannels)
                    : category === "News" ? channelsPack(newsChannels)
                        : category === "Music" ? channelsPack(musicChannels)
                            : category === "Movies" ? channelsPack(moviesChannels)
                                : category === "Kids" ? channelsPack(kidsChannels) : null}
        </div>
    ));

    return <div class="h-[800px] md:h-[500px] p-5 md:p-10 w-full md:w-[800px] rounded-3xl bg-blue-700">
        <div class="flex flex-col md:flex-row items-center content-start justify-start md:justify-between">
            <h1 class="text-white font-semibold text-2xl md:text-4xl">{planId}</h1>

            <p class="text-white font-light text-xl md:text-2xl">{channels}</p>

        </div>
        <div class="flex flex-row md:overflow-clip overflow-x-auto gap-4 bg-white text-primary-blue font-bold h-fit my-1 rounded-t-2xl py-2 px-2 md:items-center items-start md:justify-between justify-start">
            {Array.from(uniqueCategories).map((category: any, key: any) => (
                <button key={key} class={`${selectedTab.value == key ? "bg-gray-200" : ""} p-2 rounded-xl`} onClick$={$(() => {
                    selectedTab.value = key;
                })}>{category}</button>
            ))}
        </div>
        <div class="h-3/4 w-full flex items-center justify-center p-6 bg-white rounded-b-3xl">
            {Array.from(uniqueCategories).map((category1: any, key: any) => (
                selectedTab.value == key ? (
                    <div key={key} class={`flex h-full py-4 w-full bg-white overflow-y-auto border-2 rounded-2xl border-primary-blue`}>
                        {slides[key]}
                    </div>) : null
            ))}
        </div>
    </div>
});