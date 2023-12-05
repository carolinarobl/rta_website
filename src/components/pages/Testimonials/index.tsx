import { component$ } from "@builder.io/qwik";
import { setURL } from "~/data/constants";
import { FaCommentDotsSolid } from "@qwikest/icons/font-awesome";
import { Markdown } from "~/components/Markdown";
import Carousel from "~/components/Carousel";

export const Testimonials = component$(({ data }: { data: any }) => {
  const pageData = data["pageTestimon"]["data"]["attributes"];
  const TestimonialCard = component$(
    ({ testimonial }: { testimonial: any }) => {
      return (
        <div class="flex h-[190px]  max-w-[350px] flex-col items-center justify-center rounded-[20px] bg-white p-6 m-2 text-primary-blue">
          <FaCommentDotsSolid class="text-[28px] text-secondary-red" />
          <span class="text-[17px] font-[600]">{testimonial["Title"]}</span>
          <Markdown
            classN="text-[12px] text-center"
            text={testimonial["Text"]}
          />
        </div>
      );
    },
  );

  const testimonialsSlides = pageData['Testimonials'].map((slideContent: any, i:number) => (
    <TestimonialCard testimonial={slideContent} key={i}/>
  ));

  return (
    <div
      onClick$={() => {
      }}
      class="flex w-full items-center justify-center px-8"
    >
      <div class="my-16 flex max-w-[1400px] items-center justify-center max-[800px]:flex-col">
        <div class="flex w-[60%] flex-col items-center justify-center gap-2 max-[800px]:w-full">
          <h2 class="text-[36px] max-[800px]:text-[20px] font-[600] text-primary-dark-blue">
            {pageData["VideoTitle"]}
          </h2>
          <video
            class="rounded-[30px] max-[800px]:max-w-[400px]"
            src={setURL(pageData["Video"]["data"]["attributes"]["url"])}
            controls
            controlsList="nodownload"
          ></video>
        </div>
        <div class="items-center w-[40%] flex-col px-1 justify-center max-[800px]:w-full max-h-[500px]  ">
          <Carousel slides={testimonialsSlides} id={'carTestimonials'} hasArrows={false} hasPagination={true} slidesQty={1}  />
        </div>
      </div>
    </div>
  );
});
