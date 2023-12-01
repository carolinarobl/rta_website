import { component$ } from "@builder.io/qwik";
import { StrapiImage } from "~/components/StrapiImage";
import { setURL } from "~/data/constants";

export const WinnersCircle = component$(({ data }: { data: any }) => {
  const pageData = data["pageWinnersC"]["data"]["attributes"];
  return (
    <div
      onClick$={() => {
        console.log(pageData);
      }}
      class="relative flex w-full items-center justify-center"
    >
      <div class="relative flex w-full items-center justify-center">
        <StrapiImage
          width="1024"
          height="603"
          clasN="max-w-[1000px] w-fit z-10 object-cover"
          url={pageData["WinnersBG"]["data"]["attributes"]["url"]}
        />
        <div class="absolute z-20 mb-[160px] h-[370px] w-[290px]  rounded-[10px] border border-gray-500 bg-gray-900 p-2">
          <div
            class={`h-full w-full overflow-hidden rounded-[10px] bg-cover `}
            style={{
              backgroundImage: `url(${setURL(
                pageData["Winners"]["data"][1]["attributes"]["url"],
              )})`,
            }}
          >
            {/* <StrapiImage
              clasN="object-fill"
              url={}
            /> */}
          </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-[30%] bg-black"></div>
      </div>
    </div>
  );
});
