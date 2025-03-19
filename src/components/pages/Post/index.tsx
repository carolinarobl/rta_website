import { component$ } from "@builder.io/qwik";
import { SectionFaq } from "~/components/FaqBox";
import { Markdown } from "~/components/Markdown";
import { StrapiImage } from "~/components/StrapiImage";

export const Post = component$(({ data }: { data: any }) => {

  const isSpanish = data['Slug'].endsWith('-es');

  // FAQ Section
  const faqList = data['FAQ'];

  return (
    <div class="flex  w-full flex-col items-center justify-center px-8 text-primary-blue">
      <div class="flex max-w-[1400px] items-center justify-evenly gap-4 py-16 max-[800px]:flex-col">
        <h1 class="w-[40%] text-center text-[42px] font-[600]  max-sm:text-[28px] leading-10 max-[800px]:w-full">
          {data["Title"]}
        </h1>
        <StrapiImage
          width="833"
          height="539"
          clasN=" rounded-2xl shadow-xl w-[40%] max-[800px]:w-full"
          media={data["Cover"]["data"]["attributes"]}
        />
      </div>
      <div class="mb-8 max-w-[1400px]">
        <Markdown text={data["Description"]} classN={"text-justify"} />
      </div>

      {faqList.length > 0 &&
         <div class="flex w-full flex-col m-4 max-w-[800px]">
         <h3 class="text-center text-[38px] font-[600] leading-10 text-primary-blue max-[800px]:text-[28px]">  
           {isSpanish ? "¿Tienes preguntas?":"Do you have questions?"}
         </h3>
         <h4 class="text-center text-[18px] font-[500] leading-10 text-primary-blue max-[800px]:text-[14px]">  
           {isSpanish ? "Aquí puedes empezar.":"Here is where to start."}
         </h4>
       
         <SectionFaq faqList={faqList}/>
       </div>

      }
    </div>
  );
});
