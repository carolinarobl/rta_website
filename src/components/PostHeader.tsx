import { component$ } from "@builder.io/qwik";
import { Markdown } from "./Markdown";
import { StrapiImage } from "./StrapiImage";
import { Button } from "./Button";

export const PostHeader = component$(({ post }: { post: any }) => {
  return (
    <div class="flex max-w-[1200px] flex-row-reverse items-center justify-center self-center px-8 py-4 max-[800px]:flex-col-reverse">
      <div class="flex  flex-col items-center justify-start  gap-4 px-10 min-[800px]:w-[60%]">
        <div class="max-h-[300px] overflow-hidden">
          <div class="text-[32px] font-[600] leading-10 text-[#2E5899] max-sm:text-[24px] max-sm:leading-7">
            {post["Title"]}
          </div>
          <div>
            <Markdown
              classN={"max-sm:text-[13px] text-[16px] text-[#2E5899] "}
              text={post["Description"]}
            />
          </div>
        </div>
        <Button text={"Read More"} link={`/${post["Slug"]}/`} />
      </div>
      <div class="flex w-full items-center justify-center self-center p-4 min-[800px]:w-[40%]">
        <StrapiImage
          url={post["Cover"]["data"]["attributes"]["url"]}
          clasN="rounded-[50px] shadow-2xl"
          width="1184"
          height="894"
        />
      </div>
    </div>
  );
});
