import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { MainLayout } from "~/components/MainLayout";
import { GigfastVoiceSupport } from "~/components/pages/gigfast-voice-support";
import { headSEO } from "~/data/constants";
import { gfVoicesupportQuery } from "~/data/gql_queries/pages/gigfast_voice_support_query";
import { getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
  const lang = req.params["lang"] == "" ? "en" : "es-419";
  return await getPageData(gfVoicesupportQuery, lang);
});

export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;

  return (
    <>
      <MainLayout data={data["layoutData"]}>
        <GigfastVoiceSupport
          data={data["pageData"]["data"]}
        ></GigfastVoiceSupport>
      </MainLayout>
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData =
    pageData["pageData"]["data"]["pageGfVS"]["data"]["attributes"]["SEO"];
  return headSEO(seoData);
};
