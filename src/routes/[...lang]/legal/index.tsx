import { component$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { Legal } from '~/components/pages/Legal';
import { legalQuery } from '~/data/gql_queries/pages/legal_queryt';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req) => {
    const lang = req.params["lang"] == "" ? "en" : "es-419";
    return await getPageData(legalQuery, lang);
  });
  
export default component$(() => {
  const data = usePageData()
  const signalData = data.value
  const pageData = signalData['pageData']['data']['pageLegal']['data']['attributes']['Content'];
  return <>
  <MainLayout data={signalData['layoutData']}>
    <Legal data={pageData}></Legal>
  </MainLayout>
  </>
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData = pageData['pageData']['data']['pageLegal']['data']['attributes']['SEO']
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