import { component$ } from "@builder.io/qwik";
import { NewsHeader } from "./NewsHeader";
import { PostHeader } from "~/components/PostHeader";
import { PostLoader } from "~/components/PostLoader";

export const News = component$(({ data }: { data: any }) => {
  const pageData = data["pageNews"]["data"]["attributes"];
  const firstNews = pageData["Posts"]["data"][0]["attributes"];
  return (
    <div
      onClick$={() => {
        console.log(data);
      }}
      class="flex flex-col items-center justify-center"
    >
      <PostHeader post={firstNews} />
      <PostLoader posts={pageData["Posts"]["data"]} />
    </div>
  );
});
