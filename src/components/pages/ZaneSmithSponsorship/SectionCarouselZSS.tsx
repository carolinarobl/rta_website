import { component$ } from "@builder.io/qwik";
import Carousel from "~/components/Carousel";

export const SectionCarouselZSS = component$(({ data }: { data: any }) => {
  return (
    <div class="text-white">
      <span>{data["CarouselTitle"]}</span>
      <Carousel
        slides={data["CarouselContent"].map((slide: any, i: number) => {
          console.log(slide);
          return <div key={i}></div>;
        })}
      />
    </div>
  );
});
