import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { MainLayout } from "~/components/MainLayout";
import { SEOh1 } from "~/components/SEOh1";
import { ACP } from "~/components/pages/ACP";
import { headSEO } from "~/data/constants";
import { acpQuery } from "~/data/gql_queries/pages/acp_query";
import { getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
  // console.log(req.params);
  const lang = req.params["lang"] == "" ? "en" : "es-419";
  return await getPageData(acpQuery, lang);
});

export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;
  return (
    <MainLayout data={data["layoutData"]}>
      <SEOh1
        SEOdata={
          data["pageData"]["data"]["pageAcp"]["data"]["attributes"]["SEO"]
        }
      />
      <ACP data={data["pageData"]["data"]} />
    </MainLayout>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData =
    pageData["pageData"]["data"]["pageAcp"]["data"]["attributes"]["SEO"];

  return headSEO(seoData);
};
