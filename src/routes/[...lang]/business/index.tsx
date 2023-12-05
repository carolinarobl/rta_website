import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { MainLayout } from "~/components/MainLayout";
import { SEOh1 } from "~/components/SEOh1";
import { Business } from "~/components/pages/Business";
import { headSEO } from "~/data/constants";
import { businessQuery } from "~/data/gql_queries/pages/business_query";
import { getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
  const lang = req.params["lang"] == "" ? "en" : "es-419";
  return await getPageData(businessQuery, lang);
});

export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;
  return (
    <MainLayout data={data["layoutData"]}>
       <SEOh1
          SEOdata={
            data["pageData"]["data"]["pageBusiness"]["data"]["attributes"][
              "SEO"
            ]
          }
        />
      <Business data={data["pageData"]["data"]} />
    </MainLayout>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData =
    pageData["pageData"]["data"]["pageBusiness"]["data"]["attributes"]["SEO"];

  return headSEO(seoData);
};
