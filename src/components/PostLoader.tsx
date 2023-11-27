import { component$, useSignal } from "@builder.io/qwik";
import { Post } from "./Post";
import { GQLQuery } from "~/services/graphql";
import { useLocation } from "@builder.io/qwik-city";

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
    // get route
    const route = useLocation();
    const lang = route.prevUrl?.pathname.includes("/es/") ? "es-419" : "en";

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
            const start = page.value * loadSize + 1;
            const paginationString = `{start: ${start}, limit: ${loadSize}}`;
            GQLQuery(`
            query {
              page${type} (locale: "${lang}") {
                data {
                  attributes {
                    Posts (sort: "Date:desc", pagination: ${paginationString}) {
                      data {
                        attributes {
                          Title
                          Date
                          Cover {
                            data {
                              attributes {
                                url
                                caption
                                alternativeText
                              }
                            }
                          }
                          Gallery {
                            data {
                              attributes {
                                url
                                caption
                                alternativeText
                              }
                            }
                          }
                          Description
                          Slug
                          VideoLink
                        }
                      }
                    }
                  }
                }
              }
            }
            `).then((res) => {
              const newPosts =
                res["data"]["page" + type]["data"]["attributes"]["Posts"][
                  "data"
                ];
              if (newPosts.length === 0) {
                return;
              }
              page.value++;
              sPosts.value = sPosts.value.concat(newPosts);
              loading.value = false;
            });
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
