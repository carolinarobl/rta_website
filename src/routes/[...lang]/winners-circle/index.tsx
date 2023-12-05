import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { MainLayout } from "~/components/MainLayout";
import { SEOh1 } from "~/components/SEOh1";
import { WinnersCircle } from "~/components/pages/WinnersCircle";
import { headSEO } from "~/data/constants";
import { winnersCircleQuery } from "~/data/gql_queries/pages/winners_circle_query";
import { getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
  const lang = req.params["lang"] == "" ? "en" : "es-419";
  return await getPageData(winnersCircleQuery, lang);
});

export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;
  return (
    <MainLayout data={data["layoutData"]}>
      <SEOh1
        SEOdata={
          data["pageData"]["data"]["pageWinnersC"]["data"]["attributes"]["SEO"]
        }
      />
      <WinnersCircle data={data["pageData"]["data"]} />
    </MainLayout>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData =
    pageData["pageData"]["data"]["pageWinnersC"]["data"]["attributes"]["SEO"];

  return headSEO(seoData);
};
