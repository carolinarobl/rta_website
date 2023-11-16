import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { MainLayout } from "~/components/MainLayout";
import { GigfastVoice } from "~/components/pages/GigfastVoice";
import { gigfastVoiceQuery } from "~/data/gql_queries/pages/gigfast_voice_query";
import { getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
  const lang = req.params["lang"] == "" ? "en" : "es-419";
  return await getPageData(gigfastVoiceQuery, lang);
});

export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;
  return (
    <MainLayout data={data["layoutData"]} showHeader={false}>
      <GigfastVoice data={data["pageData"]["data"]} />
    </MainLayout>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const SEO =
    pageData["pageData"]["data"]["pageGfV"]["data"]["attributes"]["SEO"];
  return {
    title: SEO["MetaTitle"],
    description: SEO["MetaDescription"],
    meta: [
      {
        name: "keywords",
        content: SEO["MetaKeywords"],
      },
    ],
  };
};
