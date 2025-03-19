import { component$ } from "@builder.io/qwik";
import FaqListing from "../FaqListing";

export const Faq = component$(({ data }: { data: any }) => {

  return  <div class="my-8 flex flex-col items-center">
            
            <h1 class="text-center text-xl font-semibold text-primary-blue">{data['Introduction']['Titles'][0]['Text']}</h1>
            <h2 class="text-center text-primary-blue">{data['Introduction']['TextContent']}</h2>
            
            <div class="px-4 md:px-10 bg-white flex flex-col items-center justify-center rounded-[30px] m-8 max-w-[1000px]">
              <FaqListing
                faqs={data['FAQList']}
              />

    </div>
  </div>
});
