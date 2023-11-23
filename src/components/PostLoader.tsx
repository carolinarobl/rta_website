import { component$, useSignal } from "@builder.io/qwik";
import { Post } from "./Post";

export const PostLoader = component$(
  ({ posts, loadSize = 6 }: { posts: any; loadSize: number }) => {
    const sPosts = useSignal(posts.slice(0, loadSize));
    return (
      <div
        id="postLoader"
        class="grid w-full max-w-[1200px] grid-cols-3 justify-evenly gap-4 max-[800px]:grid-cols-1 [&>*]:justify-self-center"
        document:onscroll$={(e) => {
          const postLoader = document.getElementById("postLoader");
          const footer = document.getElementById("footer");

          console.log(window.scrollY, footer?.scrollHeight);
          // console.log(
          //   postLoader.getBoundingClientRect().bottom - 900,
          //   footer.getBoundingClientRect().top,
          // );
        }}
      >
        {sPosts.value.map((post: any, i: number) => (
          <Post key={i} post={post} />
        ))}
      </div>
    );
  },
);
