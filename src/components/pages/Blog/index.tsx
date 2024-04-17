import { component$ } from "@builder.io/qwik";
import { PostHeader } from "~/components/PostHeader";
import { PostLoader } from "~/components/PostLoader";
import { SectionTips } from "./SectionTips";
import { useLocation } from "@builder.io/qwik-city";

export const Blog = component$(({ data }: { data: any }) => {
  const location = useLocation();
  const isES = location.prevUrl?.pathname.includes("/es/");

  const pageData = data["pageBlog"]["data"]["attributes"];
  const firstBlog = pageData["Posts"]["data"][0]["attributes"];

  return (
    <div class="flex flex-col items-center justify-center">

      <SectionTips data={pageData['Tips']}/>
      <PostHeader post={firstBlog} isES={isES}/>
      <div class="my-4"></div>
      <PostLoader posts={pageData["Posts"]["data"]} loadSize={3} type="Blog" isES={isES}/>
    </div>
  );
});
