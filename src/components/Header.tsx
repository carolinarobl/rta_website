import { component$ } from "@builder.io/qwik";
import { Button } from "./Button";
// import { FaCircleArrowRightSolid } from "@qwikest/icons/font-awesome";
import { Markdown } from "./Markdown";
import Carousel from "./Carousel";


export const Header = component$(({ data }: { data: any }) => {

  const SlideElement = component$(({ slide }: { slide: any }) => {
    return (
      <div class="flex flex-col items-center justify-between">
        <div class={`z-20 mb-1 flex flex-col justify-center`}>
        <span class="text-center text-[20px] font-semibold">
          {slide["Title"]}
        </span>
        <span class="text-[14px] font-light">
          <Markdown classN="text-white" text={slide["Paragraph"]} />
        </span>
      </div>
        <Button
          link={slide["Buttons"][0]["Link"]}
          text={slide["Buttons"][0]["Text"]}
        />
      </div>
    );
  });

  const headerSlides = data["Slide"].map((slideContent: any, i: number) => (
    <SlideElement slide={slideContent} key={i}/>
  ));

  return (
    <div
      class={`mb-4 flex w-[40%] min-w-[350px] max-w-[500px] flex-col items-center justify-center overflow-hidden rounded-full rounded-t-none bg-[#0E4FB0] px-8 py-1 text-white max-[400px]:w-[98%] max-[400px]:min-w-[200px] max-[400px]:pb-10 `}
    >
   

      <Carousel slides= {headerSlides}  hasPagination = {false} addSpace={false} duration={4000} id={"headerCarousel"} slidesQty={1}/>
    </div>
  );
});
