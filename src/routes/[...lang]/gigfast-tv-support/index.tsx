import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { GigfastTVSupport } from '~/components/pages/GigfastTVSupport';
import { gfTvsQuery } from '~/data/gql_queries/pages/gftvs_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req) => {
    const lang = req.params["lang"] == "" ? "en" : "es-419";
    return await getPageData(gfTvsQuery, lang);
  });

export default component$(() => {
    const data = usePageData()
    const signalData = data.value
    const pageData = signalData['pageData']['data']

  return <>
  <MainLayout data={signalData['layoutData']}>
    <GigfastTVSupport data={pageData}></GigfastTVSupport>
  </MainLayout>
  </>
});

export const head: DocumentHead = ({resolveValue})=>{
  const pageData = resolveValue(usePageData);
  const seoData = pageData['pageData']['data']['pageGfTvS']['data']['attributes']['SEO']

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