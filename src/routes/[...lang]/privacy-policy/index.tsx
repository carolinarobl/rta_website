import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { MainLayout } from "~/components/MainLayout";
import { PrivacyPolicy } from "~/components/pages/Privacy_policy";
import { headSEO } from "~/data/constants";
import { PrivacyPQuery } from "~/data/gql_queries/pages/privacy_policy_query";
import { getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
    const lang = req.params["lang"] == "" ? "en" : "es-419";
    return await getPageData(PrivacyPQuery, lang);
  });
  
  export default component$(()=> {
    const signalData = usePageData();
    const data = signalData.value;
    const dataPage =data['pageData']['data']['pagePrivacyP']['data']['attributes']['Content'];
    return (
      <MainLayout data={data["layoutData"]}>
        <PrivacyPolicy data={dataPage}/>
      </MainLayout>
    );
  });
  
  export const head: DocumentHead = ({ resolveValue}) => {
    const pageData = resolveValue(usePageData);
    const seoData = pageData['pageData']['data']['pagePrivacyP']['data']['attributes']['SEO']

    return headSEO(seoData)
  };