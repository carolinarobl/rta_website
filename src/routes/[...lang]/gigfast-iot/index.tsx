import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { MainLayout } from "~/components/MainLayout";
import { GigfastIOT } from "~/components/pages/GigfastIOT";
import { gigfastIOTQuery } from "~/data/gql_queries/pages/gigfast_iot_query";
import { getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
  // console.log(req.params);
  const lang = req.params["lang"] == "" ? "en" : "es-419";
  return await getPageData(gigfastIOTQuery, lang);
});

export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;
  return (
    <MainLayout data={data["layoutData"]}>
      <GigfastIOT data={data["pageData"]["data"]} />
    </MainLayout>
  );
});

export const head: DocumentHead = ({ resolveValue, params }) => {
  const pageData = resolveValue(usePageData);
  const title = "Giving Back";
  return {
    title: title,
  };
};
