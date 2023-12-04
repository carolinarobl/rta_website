import { component$ } from "@builder.io/qwik";
import { Markdown } from "~/components/Markdown";
import { StrapiImage } from "~/components/StrapiImage";

export const Post = component$(({ data }: { data: any }) => {
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
          url={data["Cover"]["data"]["attributes"]["url"]}
        />
      </div>
      <div class="mb-8 max-w-[1400px]">
        <Markdown text={data["Description"]} classN={"text-justify"} />
      </div>
    </div>
  );
});
