import { component$ } from "@builder.io/qwik";
import Carousel from "~/components/Carousel";
import { StrapiImage } from "~/components/StrapiImage";
import { formatDate, setURL } from "~/data/constants";

export const WinnersCircle = component$(({ data }: { data: any }) => {
  const pageData = data["pageWinnersC"]["data"]["attributes"];

  return (
    <div
      onClick$={() => {
      }}
      class="relative flex w-full flex-col items-center justify-center"
    >
      <div class="relative flex w-full items-center justify-center overflow-hidden">
        <StrapiImage
          width="1024"
          height="603"
          clasN="max-w-[1000px] w-fit z-10 object-cover"
          url={pageData["WinnersBG"]["data"]["attributes"]["url"]}
          alt={pageData["WinnersBG"]["data"]["attributes"]["alternativeText"]}
          title={pageData["WinnersBG"]["data"]["attributes"]["caption"]}


        />
        <div class="absolute z-20 mb-[160px] h-[370px] w-[290px] overflow-hidden  rounded-[10px] border border-gray-500 bg-gray-900 p-2">
          <div
            class={`h-full w-full overflow-hidden rounded-[10px] bg-cover `}
            style={{
              backgroundImage: `url(${setURL(
                pageData["Winners"]["data"][1]["attributes"]["url"],
              )})`,
            }}
          ></div>
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-[30%] bg-black"></div>
      </div>
      <div class="flex max-w-[1200px] gap-4 pt-16 max-[1000px]:flex-col">
        <div class="flex w-[30%] flex-col gap-4">
          <h2 class="text-center text-[36px] font-[600] leading-[36px] text-secondary-red">
            {pageData["GiveawayCarTitle"]}
          </h2>
          <div class="mb-6 flex items-center justify-center rounded-xl bg-white p-2">
            <Carousel
              id={"giveAnswers"}
              hasPagination={false}
              slidesQty={1}
              duration={5000}
              addSpace={true}
              hasArrows={false}
              slides={pageData["GiveawayAnswers"].map((ans: any, i: number) => {
                return (
                  <div
                    class="flex flex-col items-center justify-center gap-2"
                    key={i}
                  >
                    <p class="text-center text-[15px] text-primary-blue">
                      This giveaway question was answered on{" "}
                      {formatDate(ans["AnswerDate"], false)}
                    </p>
                    <iframe
                      src={`https://www.youtube.com/embed/${
                        ans["QuestionVideos"].split("v=")[1]
                      }`}
                      class="rounded-[30px] shadow-md"
                      frameBorder="0"
                      height={280}
                      width={160}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                    <span class="text-secondary-red">Answer:</span>
                    <span class="text-primary-blue">{ans["Answer"]}</span>
                  </div>
                );
              })}
            />
          </div>
        </div>
        <div class="flex w-[70%] flex-col gap-4">
          <h3 class="text-center text-[28px] font-[500] leading-[30px] text-primary-blue">
            {pageData["TwitterFeedTitle"]}
          </h3>
          <iframe
            class="h-[500px]"
            srcDoc={pageData["TwitterFeedLink"]}
            width={"100%"}
            height={"100%"}
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
});