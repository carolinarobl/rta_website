import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { MainLayout } from "~/components/MainLayout";
import { Location } from "~/components/pages/Location";
import { NotFound } from "~/components/pages/NotFound";
import CbAndCfProject from '~/components/pages/CbAndCfProject';

import { customLocale, headSEO } from "~/data/constants";
import { locationQuery } from "~/data/gql_queries/pages/local_page_query";
import { cbAndCfProjectQuery } from "~/data/gql_queries/pages/cb_and_cf_project_query";
import { getPageCustomData, getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
  const lang =
    req.params["lang"] == "es"
      ? "es-419"
      : req.params["lang"] == ""
        ? "en"
        : req.params["lang"];

  const slug = req.params["slug"];

  if (slug === 'crystal-beach-chambers-fiber') {
    const pageData = await getPageData(cbAndCfProjectQuery, lang);
    return {
      type: 'cb-and-cf',
      layoutData: pageData.layoutData,
      pageData: pageData.pageData
    };
  }

  const pageData = await getPageCustomData(locationQuery(customLocale(lang), slug), lang);
  return {
    type: 'location',
    layoutData: pageData.layoutData,
    pageData: pageData.pageData
  };
});

export default component$(() => {
  const signalData = usePageData();
  const { type, layoutData, pageData } = signalData.value;

  if (type === 'cb-and-cf') {
    return (
      <MainLayout data={layoutData} showHeader={false}>
        <CbAndCfProject data={pageData.data} />
      </MainLayout>
    );
  }

  const found = pageData.data.locations.data.length > 0;
  const pageContent = !found ? (
    <NotFound />
  ) : (
    <Location data={pageData.data} />
  );

  return (
    <MainLayout data={layoutData} showHeader={true}>
      {pageContent}
    </MainLayout>
  );
});

// Adaptamos el <head> también
export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(usePageData);

  if (data.type === 'cb-and-cf') {
    const seoData = data.pageData.data.pageCbAndCf.data.attributes.SEO;
    return headSEO(seoData);
  }

  if (data.pageData.data.locations.data.length === 0) {
    return headSEO({
      MetaTitle: "Not Found",
      MetaDescription: "Error 404, location not found",
    });
  }

  const seoData =
    data.pageData.data.locations.data[0].attributes.SEO;

  seoData.schema =
    data.pageData.data.locations.data[0].attributes.office.data.attributes.Schema;

  return headSEO(seoData);
};
