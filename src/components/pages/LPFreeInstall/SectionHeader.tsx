import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/Button";
import { Markdown } from "~/components/Markdown";
import { StrapiImage } from "~/components/StrapiImage";
import { Linking_picture } from "~/components/linking-picture";

export const SectionHeader = component$(({ parData }: { parData: any }) => {
    const ballSize="w-[20vw] h-[20vw] min-w-[300px] min-h-[300px]"
     const content= parData;
  
  
    return (
    <div class={`flex md:flex-row flex-col-reverse w-full text-center items-center justify-center md:p-8 md:my-10`}>

    {/* Left Content */}
    <div class="relative">
    <div class={`flex ${ballSize} items-center justify-center`}>
    <div
      class={`bg-[#2E5899] md:h-full h-[285px] md:w-full w-[285px] bg-opacity-40 p-6 inline-block items-center justify-center rounded-full`}
    >
      <div
        class={`bg-[#2E5899] flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-opacity-60 px-6 py-6 shadow-md`}
      >
        <div
          class={`bg-[#2E5899] flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-opacity-80 shadow-md`}
        >
          <div class="flex flex-col items-center gap-5">
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="flex gap-3 flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full items-center justify-center">
    <Markdown text={content['Paragraph']} classN="text-white text-[18px] leading-none md:text-[1.75vw]"/>
            {content['Buttons'] &&
                content['Buttons'].map((button: any, i: number) => (
                  <div key={i} class="z-50">
                    <Button text={button['Text']} link={button['Link']} />
                  </div>
                ))
            }    
    </div>
    </div>

    {/* Center Content */}
    <div class="flex flex-col gap-5 md:px-[30px] px-[12vw] py-5">

      {/* Title / Logo */}
      <div class="flex flex-col justify-center items-center">
        <Markdown text={content['Title']} classN="[&>h1]:text-[28px]"/>
        <StrapiImage
          media={content['Logo']['data']['attributes']}
          width={"400px"} height={"100px"}/>
      </div>

      {/* Pricing */}
      <Markdown text={content['Subtitle']} classN="[&>h2]:text-[18px]"/>
    </div>

    {/* Right Content */}
    <div class={`${ballSize} max-[930px]:hidden flex`}>
      <Linking_picture media={content['Media']['data']['attributes']}/>
    </div>
   
    </div>
  );
});
