import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { MainLayout } from "~/components/MainLayout";
import { GivingBack } from "~/components/pages/GivingBack";
import { headSEO } from "~/data/constants";
import { givingBackQuery } from "~/data/gql_queries/pages/givingback_query";
import { getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
  // console.log(req.params);
  const lang = req.params["lang"] == "" ? "en" : "es-419";
  return await getPageData(givingBackQuery, lang);
});

export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;
  return (
    <MainLayout data={data["layoutData"]}>
      <GivingBack data={data["pageData"]["data"]} />
    </MainLayout>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData =
    pageData["pageData"]["data"]["pageGivingBack"]["data"]["attributes"]["SEO"];

  return headSEO(seoData);
};
