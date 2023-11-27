import { component$, useSignal } from "@builder.io/qwik";
import { Post } from "./Post";
import { GQLQuery } from "~/services/graphql";

export const PostLoader = component$(
  ({
    posts,
    loadSize = 6,
    type,
  }: {
    posts: any;
    loadSize: number;
    type: string;
  }) => {
    const sPosts = useSignal(posts.slice(1, loadSize + 1));
    const loading = useSignal(false);
    const page = useSignal(1);
    return (
      <div
        id="postLoader"
        class="grid w-full max-w-[1200px] grid-cols-3 justify-evenly gap-4 max-[800px]:grid-cols-1 [&>*]:justify-self-center"
        document:onscroll$={() => {
          if (loading.value) return;
          console.log(`post-${sPosts.value.length - 1}`);

          const lastPost = document.getElementById(
            `post-${sPosts.value.length - 1}`,
          );

          const rect = lastPost.getBoundingClientRect();
          const viewHeight = Math.max(
            document.documentElement.clientHeight,
            window.innerHeight,
          );

          const lastPostVisible = !(
            rect.bottom < 0 || rect.top - viewHeight >= 0
          );

          console.log(lastPostVisible);

          if (lastPostVisible) {
            loading.value = true;
            const start = (page - 1) * loadSize + 1;
            const paginationString = `{start: ${{ start }}, limit: ${{
              itemsPerLoad,
            }}}`;
            GQLQuery().then((res) => {});
          }
        }}
      >
        {sPosts.value.map((post: any, i: number) => (
          <Post key={i} post={post} id={`post-${i.toString()}`} />
        ))}
      </div>
    );
  },
);
