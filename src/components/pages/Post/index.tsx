import { component$ } from "@builder.io/qwik";
import { Markdown } from "~/components/Markdown";
import { StrapiImage } from "~/components/StrapiImage";

export const Post = component$(({ data }: { data: any }) => {
  return (
    <div class="flex  w-full flex-col items-center justify-center px-8 text-primary-blue">
      <div class="flex max-w-[1400px] items-center justify-evenly gap-4 py-16">
        <span class="w-[40%] text-[42px] font-[600] leading-10">
          {data["Title"]}
        </span>
        <StrapiImage
          width="833"
          height="539"
          clasN="rounded-2xl shadow-xl w-[40%]"
          url={data["Cover"]["data"]["attributes"]["url"]}
        />
      </div>
      <div class="mb-8 max-w-[1400px]">
        <Markdown text={data["Description"]} />
      </div>
    </div>
  );
});
