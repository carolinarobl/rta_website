import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
// import { MainLayout } from "~/components/MainLayout";
// import { headSEO } from "~/data/constants";
import { homeQuery } from "~/data/gql_queries/pages/home_query";
import { getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
  console.log(req.params);
  const lang =
    req.params["lang"] == "es"
      ? "es-419"
      : req.params["lang"] == ""
        ? "en"
        : req.params["lang"];
  console.log(lang);
  return await getPageData(homeQuery, lang);
});

export default component$(() => {
  // const signalData = usePageData();
  // const data = signalData.value;
  return (
    <div>a</div>
    // <MainLayout data={data["layoutData"]} showHeader={false}>
    //   <div>HOLA </div>
    // </MainLayout>
  );
});

// export const head: DocumentHead = ({ resolveValue }) => {
//   const pageData = resolveValue(usePageData);
//   const seoData =
//     pageData["pageData"]["data"]["pageHome"]["data"]["attributes"]["SEO"];
//   return headSEO(seoData);
// };
