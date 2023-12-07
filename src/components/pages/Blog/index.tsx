import { component$ } from "@builder.io/qwik";
import { PostHeader } from "~/components/PostHeader";
import { PostLoader } from "~/components/PostLoader";
import { SectionTips } from "./SectionTips";

export const Blog = component$(({ data }: { data: any }) => {
  const pageData = data["pageBlog"]["data"]["attributes"];
  const firstBlog = pageData["Posts"]["data"][0]["attributes"];

  return (
    <div class="flex flex-col items-center justify-center">

      <SectionTips data={pageData['Tips']}/>
      <PostHeader post={firstBlog} />
      <div class="my-4"></div>
      <PostLoader posts={pageData["Posts"]["data"]} loadSize={3} type="Blog" />
    </div>
  );
});
