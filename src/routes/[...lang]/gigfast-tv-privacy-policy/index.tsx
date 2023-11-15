import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { GigfastTvPrivacyP } from '~/components/pages/GigfastTvPrivacyP';
import { gigfastTvPrivacyPQuery } from '~/data/gql_queries/pages/gigfast_tv_privacy_policy_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req) => {
    const lang = req.params["lang"] == "" ? "en" : "es-419";
    return await getPageData(gigfastTvPrivacyPQuery, lang);
  });
  
export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;
  const dataPage =data['pageData']['data']['pageGfTvPp']['data']['attributes']['Content'];
  
  return <>
  <MainLayout data={data["layoutData"]}>
    <GigfastTvPrivacyP data={dataPage}></GigfastTvPrivacyP>
  </MainLayout>
  </>
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData = pageData['pageData']['data']['pageGfTvPp']['data']['attributes']['SEO']
  const title = `${seoData['MetaTitle']}`;

  return {
    title: title,
    meta: [
      {
        name: "title",
        content: `${title}` 
      },
      {
        name: "description",
        content: `${seoData['MetaDescription']}`,
      },
    ],
  };
};