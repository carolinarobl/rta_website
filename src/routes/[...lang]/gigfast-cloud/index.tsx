import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { SEOh1 } from '~/components/SEOh1';
import { GigfastCloud } from '~/components/pages/GigfastCloud';
import { headSEO } from '~/data/constants';
import { gfCloudQuery } from '~/data/gql_queries/pages/gf_cloud_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req) => {
  const lang = req.params['lang'] == "" ? "en" : "es-419";
  return await getPageData(gfCloudQuery, lang)
})

export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;
  const dataPage = data['pageData']['data']
  return <>
    <MainLayout data={data['layoutData']}>
      <SEOh1 SEOdata={data["pageData"]["data"]["pageGfCloud"]["data"]["attributes"]["SEO"]} />
      <GigfastCloud data={dataPage}></GigfastCloud>
    </MainLayout>
  </>
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData = pageData['pageData']['data']['pageGfCloud']['data']['attributes']['SEO']

  return headSEO(seoData)
};