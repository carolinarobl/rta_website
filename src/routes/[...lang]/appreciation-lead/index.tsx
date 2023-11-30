import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { MainLayout } from "~/components/MainLayout";
import { SEOh1 } from "~/components/SEOh1";
import { AppreciationLead } from "~/components/pages/Appreciation-lead";
import { appreciationLeadQuery } from "~/data/gql_queries/pages/appreciation_lead_query";
import { getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
  const lang = req.params["lang"] == "" ? "en" : "es-419";
  return await getPageData(appreciationLeadQuery, lang);
});

export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;
  return (
    <>
      <MainLayout data={data["layoutData"]}>
        <SEOh1
          SEOdata={
            data["pageData"]["data"]["pageAprLead"]["data"]["attributes"]["SEO"]
          }
        ></SEOh1>
        <AppreciationLead data={data["pageData"]}></AppreciationLead>
      </MainLayout>
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData =
    pageData["pageData"]["data"]["pageAprLead"]["data"]["attributes"]["SEO"];
  const title = `${seoData["MetaTitle"]}`;

  return {
    title: title,
    meta: [
      {
        name: "title",
        content: `${title}`,
      },
      {
        name: "description",
        content: `${seoData["MetaDescription"]}`,
      },
    ],
  };
};
