import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { MainLayout } from "~/components/MainLayout";
import { SEOh1 } from "~/components/SEOh1";
import { ZaneSmithSponsorship } from "~/components/pages/ZaneSmithSponsorship";
import { headSEO } from "~/data/constants";
import { zaneSmithSponsorshipQuery } from "~/data/gql_queries/pages/zane_smith_query";
import { getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
  const lang = req.params["lang"] == "" ? "en" : "es-419";
  return await getPageData(zaneSmithSponsorshipQuery, lang);
});

export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;
  return (
    <MainLayout data={data["layoutData"]} showHeader={false}>
      <SEOh1
        SEOdata={
          data["pageData"]["data"]["pageZaneSpon"]["data"]["attributes"]["SEO"]
        }
      />
      <ZaneSmithSponsorship data={data["pageData"]["data"]} />
    </MainLayout>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData =
    pageData["pageData"]["data"]["pageZaneSpon"]["data"]["attributes"]["SEO"];

  return headSEO(seoData);
};
