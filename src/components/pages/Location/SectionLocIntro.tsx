import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/Button";
import { Markdown } from "~/components/Markdown";

export const SectionLocIntro = component$(({ data }: { data: any }) => {
  const isSpanish =
    data["Slug"].substring(data["Slug"].length - 3, data["Slug"].length) ===
    "-es";

  return (
    <div class="flex max-w-[1200px] gap-5 px-8 py-20 text-primary-blue max-[800px]:flex-col">
      <div class="flex flex-col items-center justify-center gap-1 text-center min-[800px]:w-[40%] md:px-2">
        <h1 class="md:text-[36px] text-[28px] font-[700] leading-10">
          {`gigFAST INTERNET ${isSpanish ? "e" : "i"}n ${data["Name"]}`}
        </h1>
        <span class="text-[24px]">{data["ZipCode"]}, TX</span>
        <span class="text-[28px] font-[600]">
          {isSpanish ? "Llama ahora" : "Call now"}
        </span>
        <Button
            type="action"
            link={data['office']['data']['attributes']["Phone"]['Link']}
            text={data['office']['data']['attributes']["Phone"]['Text']}
          />


        {/* BLOG SECTION */}
        <div class="w-full h-full mt-4">
        <iframe
            src={data["office"]["data"]["attributes"]["Address"]}
            class="h-full w-full rounded-2xl"
            loading="lazy"
        >
    </iframe>
    </div>
        {/* <div class="flex flex-col items-center justify-center bg-[#2e5899] text-white w-full my-7 rounded-[20px] font-light overflow-hidden">
        <p class=" bg-black/20 font-bold text-[16px] py-3 px-5 w-full animate-pulse">
          Explore your community's essence with RTA
        </p>   
        <p class="text-[14px] pt-5 px-5">
          Discover local stories, events, and hidden gems, all powered by technology and innovation.
        </p>
        <div class="p-5">
        <Button
            link={"local-blog/"}
            text="Go Now"
          />
        </div>
        </div> */}
      </div>
      <div class="text-justify text-[16px] max-[800px]:text-[13px] min-[800px]:w-[60%]">
        <Markdown text={data["Description"]} />
      </div>
    </div>
  );
});
