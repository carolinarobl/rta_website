import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/Button";
import { setURL } from "~/data/constants";

export const HomeHeader = component$(({ data }: { data: any }) => {
  return (
    <div
      onLoad$={() => {
        console.log(data);
      }}
      class="relative -z-10 flex max-h-[750px] items-center"
    >
      <video
        src={setURL(data["VideoBGDesktop"]["data"]["attributes"]["url"])}
        autoPlay
        loop
        onPlay$={() => {
          console.log(data);
        }}
        muted
      ></video>
      <div class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-between">
        <div class="relative flex h-[250px] w-[400px] items-center justify-center rounded-br-full rounded-tr-full bg-white bg-opacity-60">
          <div class="box"></div>
          <div class="carrousel absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            <span class="h-2 w-2 rounded-full bg-primary-blue"></span>
            <span class="h-2 w-2 rounded-full bg-primary-blue opacity-70"></span>
            <span class="h-2 w-2 rounded-full bg-primary-blue opacity-70"></span>
            <span class="h-2 w-2 rounded-full bg-primary-blue opacity-70"></span>
            <span class="h-2 w-2 rounded-full bg-primary-blue opacity-70"></span>
          </div>
        </div>
        <div class="flex h-[250px] w-[400px] flex-col items-center justify-center gap-5 rounded-bl-full rounded-tl-full bg-white bg-opacity-60">
          <div>{data["HeroForm"]["Title"]}</div>
          <div class="flex gap-4">
            <input
              class="w-[140px] rounded-full px-3 py-2 placeholder-primary-blue"
              placeholder="Address Search"
              type="text"
            />
            <input
              class="w-[140px] rounded-full px-3 py-2 placeholder-primary-blue"
              placeholder="Zip Code"
              type="text"
            />
          </div>
          <Button
            text={data["HeroForm"]["ActionButton"]["Text"]}
            link={data["HeroForm"]["ActionButton"]["Link"]}
          />
        </div>
      </div>
    </div>
  );
});
