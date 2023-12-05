import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { SEOh1 } from '~/components/SEOh1';
import { Support } from '~/components/pages/Support';
import { headSEO } from '~/data/constants';
import { supportQuery } from '~/data/gql_queries/pages/support_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req) => {
  const lang = req.params["lang"] == "" ? "en" : "es-419";
  return await getPageData(supportQuery, lang);
});

export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;

  return <>
    <MainLayout data={data['layoutData']}>
    <SEOh1 SEOdata={data["pageData"]["data"]["pageSupport"]["data"]["attributes"]["SEO"]}/>
      <Support data={data['pageData']}></Support>
    </MainLayout>
  </>
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData = pageData['pageData']['data']['pageSupport']['data']['attributes']['SEO']

  return headSEO(seoData)
}