import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { MainLayout } from "~/components/MainLayout";
import { Home } from "~/components/pages/Home/index";
import { NotFound } from "~/components/pages/NotFound";
import { Post } from "~/components/pages/Post";
import { headSEO } from "~/data/constants";
import { homeQuery } from "~/data/gql_queries/pages/home_query";
import { postQuery } from "~/data/gql_queries/pages/post_query";
import { getPageCustomData, getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
  const lang =
    req.params["lang"] == "es"
      ? "es-419"
      : req.params["lang"] == ""
        ? "en"
        : req.params["lang"];
  let data: any = {};
  if (lang == "en" || lang == "es-419") {
    data = await getPageData(homeQuery, lang);
    return {
      ...data,
      type: "home",
    };
  }
  const newLang = lang.includes("es/") ? "es-419" : "en";
  const postSlug = lang.includes("es/") ? lang.split("es/")[1] : lang;
  data = await getPageCustomData(postQuery(postSlug, newLang), newLang);
  return {
    ...data,
    type: data["pageData"]["data"]["posts"]["data"].length > 0 ? "post" : "404",
  };
});



export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;

  return (
    <MainLayout data={data["layoutData"]} marqueeData={data['pageData']['data']['generalMarquee']['data']['attributes']} showHeader={false} showMarquee={true}>
      {data.type == "home" && (
        <h1 class="absolute opacity-0">
          Rural Telecommunications of America Inc.
        </h1>
      )}

      {data.type == "home" ? (
        <Home data={data["pageData"]["data"]} />
      ) : data.type == "post" ? (
        <Post
          data={data["pageData"]["data"]["posts"]["data"][0]["attributes"]}
        />
      ) : (
        <NotFound />
      )}
    </MainLayout>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const type = pageData["type"];
  let seoData;
  if (type == "home") {
    seoData =
      pageData["pageData"]["data"]["pageHome"]["data"]["attributes"]["SEO"];
  } else if (type == "post") {
    seoData =
      pageData["pageData"]["data"]["posts"]["data"][0]["attributes"]["SEO"];
    if (!seoData)
      seoData = {
        MetaTitle:
          pageData["pageData"]["data"]["posts"]["data"][0]["attributes"][
            "Title"
          ],
        MetaDescription:
          pageData["pageData"]["data"]["posts"]["data"][0]["attributes"][
            "Description"
          ],
        preventIndexing: true,
        Keywords:
          pageData["pageData"]["data"]["posts"]["data"][0]["attributes"][
            "Title"
          ],
      };
    // meta: [
    //   {
    //     name: "description",
    //     content: SEOdata.MetaDescription,
    //   },
    //   {
    //     name: "robots",
    //     content: SEOdata.preventIndexing ? "noindex" : "index",
    //   },
    //   {
    //     name: "keywords",
    //     content: SEOdata.Keywords,
    //   },
    // ],
  } else seoData = { MetaTitle: "Not found" };
  return headSEO(seoData);
};
