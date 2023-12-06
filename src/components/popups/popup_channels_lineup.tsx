import { $, component$, useSignal } from "@builder.io/qwik";
import { JSX } from "@builder.io/qwik/jsx-runtime";
import { channel } from "diagnostics_channel";
import { includes } from "valibot";
import { setURL } from "~/data/constants";
import news from "~/routes/[...lang]/news";

export const PopupChannelsLineup = component$(({ data, planId, channels }: { data: any, planId?: string, channels?: string }) => {
    const uniqueCategories = new Set(data.map((pack: any) => pack['attributes']['Category']));

    var sportsChannels: Array<any> = []
    var moviesChannels: Array<any> = []
    var newsChannels: Array<any> = []
    var musicChannels: Array<any> = []
    var kidsChannels: Array<any> = []

    const IdPackage = planId?.slice(0, 2)

    var movil = false;

    window.onresize = () => {
        const width = window.innerWidth;
        console.log(width)
        if (width < 500)
            movil = true
    };



    const selectedTab = useSignal(0);

    const category = data.map((channel: any, index: any) => {
        if (channel['attributes']['Category'] == "Sports") {
            sportsChannels.push(channel)
        }
        if (channel['attributes']['Category'] == "Movies") {
            moviesChannels.push(channel)
        }
        if (channel['attributes']['Category'] == "News") {
            newsChannels.push(channel)
        } if (channel['attributes']['Category'] == "Music") {
            musicChannels.push(channel)
        } if (channel['attributes']['Category'] == "Kids") {
            kidsChannels.push(channel)
        }
    })

    const channelsPack = (data: any) => (data.map((channel: any, index: any) => {
        var include = false;
        var commingSoon = false;

        channel['attributes']['package_tvs']['data'].map((pack: any) => {
            if (pack['attributes']['package'].includes(IdPackage)) {
                include = true;
            }
            else if (pack['attributes']['package'].includes("comingSoon")) {
                commingSoon = true;
            }
        })

        return <div key={index} class="flex flex-col items-center justify-center">
            <div class={`h-[50px] md:h-[80px] w-[50px] md:w-[80px] ${include ? "" : "opacity-20"} border-2 p-1 rounded-full flex flex-col`}>
                <img height={80} width={80} src={setURL(channel['attributes']['Image']['data']['attributes']['url'])}
                    alt={channel['attributes']['Image']['data']['attributes']['alterbativeText']}
                />
            </div>
            {commingSoon ? <div class="bg-primary-blue text-center p-0.5 text-xs text-white rounded-full">
                Coomig Soon
            </div> : null}
            <p class="text-xs text-center text-primary-blue">{channel['attributes']['Channel_name']}</p>
        </div>
    }))

    const slides = Array.from(uniqueCategories).map((category: any, key: any) => {
        return <div key={key} class={`grid grid-cols-3 py-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 gap-2`}>
            {category == "General"
                ? channelsPack(data)
                : category == "Sports" ? channelsPack(sportsChannels)
                    : category == "News" ? channelsPack(newsChannels)
                        : category == "Music" ? channelsPack(musicChannels)
                            : category == "Movies" ? channelsPack(moviesChannels)
                                : category == "Kids" ? channelsPack(kidsChannels) : null}

        </div>
    })


    return <div class="h-full md:h-[500px] p-5 md:p-10 w-full md:w-3/4 rounded-3xl bg-blue-700">
        <div class="flex flex-col md:flex-row items-center justify-start md:justify-between">
            <h1 class="text-white font-semibold text-2xl md:text-4xl">{planId}</h1>

            <p class="text-white font-light text-xl md:text-2xl">{channels}</p>

        </div>
        <div class="flex flex-row md:overflow-clip overflow-x-auto gap-4 bg-white text-primary-blue font-bold h-fit my-1 rounded-t-2xl py-2 px-2 md:items-center items-start md:justify-between justify-start">
            {Array.from(uniqueCategories).map((category: any, key: any) => (
                <button key={key} class={`${selectedTab.value == key?"bg-gray-200":""} p-2 rounded-xl`} onClick$={$(() => {
                    selectedTab.value = key;
                })}>{category}</button>
            ))}
        </div>
        <div class="flex h-3/4 w-full items-center justify-center p-6 bg-white rounded-b-3xl">
            {Array.from(uniqueCategories).map((category1: any, key: any) => (
                selectedTab.value == key ? (
                    <div key={key} class={`flex h-full py-4 w-full bg-white overflow-y-auto border-2 rounded-2xl border-primary-blue`}>
                        {slides[key]}
                    </div>) : null
            ))}
        </div>
    </div>
});