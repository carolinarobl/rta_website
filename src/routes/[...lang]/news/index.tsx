import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { MainLayout } from "~/components/MainLayout";
import { SEOh1 } from "~/components/SEOh1";
import { News } from "~/components/pages/News";
import { headSEO } from "~/data/constants";
import { newsQuery } from "~/data/gql_queries/pages/news_query";
import { getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
  const lang = req.params["lang"] == "" ? "en" : "es-419";
  return await getPageData(newsQuery, lang);
});

export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;
  return (
    <MainLayout data={data["layoutData"]}>
     <SEOh1
        SEOdata={
          data["pageData"]["data"]["pageNews"]["data"]["attributes"]["SEO"]
        }
      />
      <News data={data["pageData"]["data"]} />
    </MainLayout>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData =
    pageData["pageData"]["data"]["pageNews"]["data"]["attributes"]["SEO"];

  return headSEO(seoData);
};
