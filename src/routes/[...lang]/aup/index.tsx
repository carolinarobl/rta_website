import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { Aup } from '~/components/pages/AUP';
import { headSEO } from '~/data/constants';
import { aupQuery } from '~/data/gql_queries/pages/aup_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req) => {
    const lang = req.params["lang"] == "" ? "en" : "es-419";
    return await getPageData(aupQuery, lang);
  });
  
export default component$(() => {
  const data = usePageData()
  const signalData = data.value
  const pageData = signalData['pageData']['data']['pageAuPolicy']['data']['attributes']['Content'];
  return <>
  <MainLayout data={signalData['layoutData']}>
    <Aup data={pageData}></Aup>
  </MainLayout>
  </>
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData = pageData['pageData']['data']['pageAuPolicy']['data']['attributes']['SEO']

  return headSEO(seoData)
};