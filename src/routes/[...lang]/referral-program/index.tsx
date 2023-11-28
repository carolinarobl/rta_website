import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { MainLayout } from "~/components/MainLayout";
import { ReferralProgram } from "~/components/pages/ReferralProgram";
import { headSEO } from "~/data/constants";
import { referralQuery } from "~/data/gql_queries/pages/referral_query";
import { getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
  // console.log(req.params);
  const lang = req.params["lang"] == "" ? "en" : "es-419";
  return await getPageData(referralQuery, lang);
});

export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;
  return (
    <MainLayout data={data["layoutData"]}>
      <ReferralProgram data={data["pageData"]["data"]} />
    </MainLayout>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData =
    pageData["pageData"]["data"]["pageReferralP"]["data"]["attributes"]["SEO"];

  return headSEO(seoData);
};
