import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { InternetTransparency } from '~/components/pages/InternetTransparency';
import { headSEO } from '~/data/constants';
import { transparencyQuery } from '~/data/gql_queries/pages/internet_transparency_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req) => {
    const lang = req.params["lang"] == "" ? "en" : "es-419";
    return await getPageData(transparencyQuery, lang);
  });
  
export default component$(() => {
  const data = usePageData()
  const signalData = data.value
  const pageData = signalData['pageData']['data']['pageTransparency']['data']['attributes']['Content'];
  return <>
  <MainLayout data={signalData['layoutData']}>
    <InternetTransparency data={pageData}></InternetTransparency>
  </MainLayout>
  </>
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData = pageData['pageData']['data']['pageTransparency']['data']['attributes']['SEO']

  return headSEO(seoData)
};