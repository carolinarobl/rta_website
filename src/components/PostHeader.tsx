import { component$ } from "@builder.io/qwik";
import { Markdown } from "./Markdown";
import { StrapiImage } from "./StrapiImage";
import { Button } from "./Button";

export const PostHeader = component$(({ post, isES }: { post: any, isES: any}) => {
  const limitText = (text: string, limit: number) => {
    return text.slice(0, limit) + "...";
  };
  const limit = 500;
  return (
    <div class="flex max-w-[1200px] flex-row-reverse items-center justify-center self-center px-8 py-4 max-[800px]:flex-col-reverse">
      <div class="flex  flex-col items-center justify-start  gap-4 px-10 min-[800px]:w-[60%]">
        <div class="">
          <div class="my-4 text-[32px] font-[600] leading-10 text-[#2E5899] max-sm:text-[24px] max-sm:leading-7">
            {post["Title"]}
          </div>
          <div>
            <Markdown
              classN={"max-sm:text-[13px] text-[15px] text-[#2E5899] text-justify [&>h1]:text-[15px] [&>h1]:font-[600] [&>h2]:text-[15px] [&>h2]:font-[600] [&>h3]:text-[15px] [&>h3]:font-[600]"}
              text={limitText(post["Description"], limit)}
            />
          </div>
        </div>
        <Button text={ isES ? 'Leer Más': "Read More"} link={`/${isES ? `es/${[post["Slug"].replace("-es", "")]}` :[post["Slug"]]}`} />

      </div>
      <div class="flex w-full items-center justify-center self-center p-4 min-[800px]:w-[40%]">
        <StrapiImage
          media={post["Cover"]["data"]["attributes"]}
          clasN="rounded-[50px] shadow-2xl"
          width="1184"
          height="894"
        />
      </div>
    </div>
  );
});
