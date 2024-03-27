import { component$ } from "@builder.io/qwik";
import Carousel from "~/components/Carousel";
import { StrapiImage } from "~/components/StrapiImage";
import { formatDate, setURL } from "~/data/constants";

export const WinnersCircle = component$(({ data }: { data: any }) => {
  const pageData = data["pageWinnersC"]["data"]["attributes"];
  const winnersSlidesData = pageData['Winners']['data'].reverse();

  const WinnerCard = component$(({ slide }: { slide: any }) => {
    return (
        <div
          class={`h-[350px] my-5 w-[280px] overflow-hidden rounded-[10px] bg-contain bg-no-repeat bg-center`}
          style={{
            backgroundImage: `url(${setURL(
              slide["attributes"]["url"],
            )})`,
          }}
        ></div>
    );
  });

  const winnersSlides = winnersSlidesData.map((slideContent: any, i: number) => (
    <WinnerCard slide={slideContent} key={i} />
  ));

  return (
    <div
      onClick$={() => {
      }}
      class="relative flex flex-col items-center justify-center"
    >
      <div class="relative flex w-full items-center justify-center overflow-hidden">
        <StrapiImage
          width="1024"
          height="603"
          clasN="max-w-[1000px] w-fit z-10 object-cover"
          media={pageData["WinnersBG"]["data"]["attributes"]}
        />
        <div class="absolute z-20 mb-[160px]  w-[290px] overflow-hidden  rounded-[10px] border border-gray-500 bg-[#171f2a] p-2">
        <Carousel slides={winnersSlides} id={"carouselWinners"} slidesQty={1} hasArrows={false} addSpace={false} />
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-[30%] bg-black"></div>
      </div>
      
    
      {/* Inicia sección inferior */}
      <div class="flex w-full overflow-hidden bg-cover pt-16 bg-black justify-center">
      <div class="flex max-w-[1200px] gap-4  max-[1000px]:flex-col  justify-center items-center">
        <div class="flex w-[30%] flex-col ">
          <h2 class="text-center text-[36px] font-[600] leading-[36px] text-secondary-red">
            {pageData["GiveawayCarTitle"]}
          </h2>
          <br/>
          <div class="mb-6 flex items-center justify-center rounded-xl bg-white p-2">
            <Carousel
              id={"giveAnswers"}
              hasPagination={false}
              slidesQty={1}
              duration={5000}
              addSpace={false}
              hasArrows={true}
              slides={pageData["GiveawayAnswers"].reverse().map((ans: any, i: number) => {
                return (
                  <div
                    class="flex flex-col items-center justify-center gap-1.5 max-w-[180px]"
                    key={i}
                  >
                    <p class="text-center text-[15px] text-primary-blue">
                      This question was answered on{" "}
                      <br/>
                      {formatDate(ans["AnswerDate"], false)}
                    </p>
                    <iframe
                      src={`https://www.youtube.com/embed/${ans["QuestionVideos"].split("v=")[1]
                        }`}
                      class="rounded-[20px] shadow-xl"
                      frameBorder="0"
                      height={270}
                      width={160}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullscreen
                    />
                    <span class="text-secondary-red">Answer:</span>
                    <span class="text-primary-blue">{ans["Answer"]}</span>
                  </div>
                );
              })}
            />
          </div>
        </div>
    
        <div class="flex md:w-[60%] w-[30%] h-full flex-col justify-center  overflow-hidden">
          <h3 class="text-center text-[28px] font-[500] leading-[30px] text-primary-blue">
            {pageData["TwitterFeedTitle"]}
          </h3>
          <br/>
          <iframe
            class="h-full"
            srcdoc={pageData["TwitterFeedLink"]}
            height={"100%"}
            width={"100%"}
          ></iframe>
        </div>
      </div>
      </div>
    </div>
  );
});