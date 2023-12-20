import { $, component$, useSignal } from "@builder.io/qwik";
import { setURL } from "~/data/constants";

export const PopupChannelsLineup = component$(
  ({
    data,
    planId,
    channels,
  }: {
    data: any;
    planId?: string;
    channels?: string;
  }) => {
    const uniqueCategories = new Set(
      data.map((pack: any) => pack["attributes"]["Category"]),
    );

    const sportsChannels = data.filter(
      (channel: any) => channel["attributes"]["Category"] === "Sports",
    );
    const moviesChannels = data.filter(
      (channel: any) => channel["attributes"]["Category"] === "Movies",
    );
    const newsChannels = data.filter(
      (channel: any) => channel["attributes"]["Category"] === "News",
    );
    const musicChannels = data.filter(
      (channel: any) => channel["attributes"]["Category"] === "Music",
    );
    const kidsChannels = data.filter(
      (channel: any) => channel["attributes"]["Category"] === "Kids",
    );

    const IdPackage = planId?.slice(0, 2);
    const selectedTab = useSignal(0);

    const channelsPack = (channelsData: any) =>
      channelsData.map((channel: any, index: any) => {
        const include = channel["attributes"]["package_tvs"]["data"].some(
          (pack: any) => pack["attributes"]["package"].includes(IdPackage),
        );
        const commingSoon = channel["attributes"]["package_tvs"]["data"].some(
          (pack: any) => pack["attributes"]["package"].includes("comingSoon"),
        );

        return (
          <div key={index} class="flex flex-col items-center justify-center">
            <div
              class={`h-[40px] w-[40px] md:h-[60px] md:w-[60px] ${
                include ? "" : "opacity-20"
              } flex flex-col rounded-full border-2 p-1`}
            >
              <img
                height={50}
                width={50}
                src={setURL(
                  channel["attributes"]["Image"]["data"]["attributes"]["url"],
                )}
                alt={
                  channel["attributes"]["Image"]["data"]["attributes"][
                    "alterbativeText"
                  ]
                }
              />
            </div>
            {commingSoon ? (
              <div class="rounded-full bg-primary-blue p-0.5 text-center text-xs text-white">
                Coming Soon
              </div>
            ) : null}
            <p class="text-center text-xs text-primary-blue">
              {channel["attributes"]["Channel_name"]}
            </p>
          </div>
        );
      });

    const slides = Array.from(uniqueCategories).map(
      (category: any, key: any) => (
        <div
          key={key}
          class="grid w-full grid-cols-3 gap-4 py-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8"
        >
          {category === "General"
            ? channelsPack(data)
            : category === "Sports"
              ? channelsPack(sportsChannels)
              : category === "News"
                ? channelsPack(newsChannels)
                : category === "Music"
                  ? channelsPack(musicChannels)
                  : category === "Movies"
                    ? channelsPack(moviesChannels)
                    : category === "Kids"
                      ? channelsPack(kidsChannels)
                      : null}
        </div>
      ),
    );

    return (
      <div class="h-[800px] w-full rounded-3xl bg-blue-700 p-5 md:h-[500px] md:w-[800px] md:p-10">
        <div class="flex flex-col content-start items-center justify-start md:flex-row md:justify-between">
          <h1 class="text-2xl font-semibold text-white md:text-4xl">
            {planId}
          </h1>

          <p class="text-xl font-light text-white md:text-2xl">{channels}</p>
        </div>
        <div class="my-1 flex h-fit flex-row items-start justify-start gap-4 overflow-x-auto rounded-t-2xl bg-white px-2 py-2 font-bold text-primary-blue md:items-center md:justify-between md:overflow-clip">
          {Array.from(uniqueCategories).map((category: any, key: any) => (
            <button
              key={key}
              class={`${
                selectedTab.value == key ? "bg-gray-200" : ""
              } rounded-xl p-2`}
              onClick$={$(() => {
                selectedTab.value = key;
              })}
            >
              {category}
            </button>
          ))}
        </div>
        <div class="flex h-3/4 w-full items-center justify-center rounded-b-3xl bg-white p-6">
          {Array.from(uniqueCategories).map((category1: any, key: any) =>
            selectedTab.value == key ? (
              <div
                key={key}
                class={`flex h-full w-full overflow-y-auto overflow-x-hidden rounded-2xl border-2 border-primary-blue bg-white py-4`}
              >
                {slides[key]}
              </div>
            ) : null,
          )}
        </div>
      </div>
    );
  },
);
