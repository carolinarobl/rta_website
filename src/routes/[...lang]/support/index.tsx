import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { Support } from '~/components/pages/Support';
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
      <Support data={data['pageData']}></Support>
    </MainLayout>
  </>
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData = pageData['pageData']['data']['pageSupport']['data']['attributes']['SEO']
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
}