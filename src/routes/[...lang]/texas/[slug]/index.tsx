import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { MainLayout } from "~/components/MainLayout";
import { Home } from "~/components/pages/Home/index";
import { Location } from "~/components/pages/Location";
import { customLocale, headSEO } from "~/data/constants";
import { homeQuery } from "~/data/gql_queries/pages/home_query";
import { locationQuery } from "~/data/gql_queries/pages/local_page_query";
import { getPageCustomData, getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
  const lang =
    req.params["lang"] == "es"
      ? "es-419"
      : req.params["lang"] == ""
        ? "en"
        : req.params["lang"];
  const slug = req.params["slug"];
  return await getPageCustomData(locationQuery(customLocale(lang), slug), lang);
});

export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;
  const found = data["pageData"]["data"]["locations"]["data"].length > 0;

  const pageContent = !found ? (
    <div>Not Found</div>
  ) : (
    <Location data={data["pageData"]["data"]} />
  );
  return (
    <MainLayout data={data["layoutData"]} showHeader={false}>
      {pageContent}
      {/* <Home data={data["pageData"]["data"]} /> */}
    </MainLayout>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  if (pageData["pageData"]["data"]["locations"]["data"].length == 0) {
    return headSEO({
      MetaTitle: "Not Found",
      MetaDescription: "Error 404, location not found",
    });
  }
  const seoData =
    pageData["pageData"]["data"]["locations"]["data"][0]["attributes"]["SEO"];
  return headSEO(seoData);
};
