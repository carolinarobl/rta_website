import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { Wholesale } from '~/components/pages/Wholesale';
import { SEOh1 } from '~/components/SEOh1';
import { wholesaleQuery } from '~/data/gql_queries/pages/wholesale_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req) => {
    const lang = req.params["lang"] == "" ? "en" : "es-419";
    return await getPageData(wholesaleQuery, lang);
  });

export default component$(() => {
    const signalData = usePageData();
    const data = signalData.value;

  return <>
  <MainLayout data={data['layoutData']}>
    <SEOh1 SEOdata={data["pageData"]["data"]["pageWholesale"]["data"]["attributes"]["SEO"]}/>
    <Wholesale data={data['pageData']}></Wholesale>
  </MainLayout>
  </>
});

export const head: DocumentHead =({resolveValue})=>{
    const pageData = resolveValue(usePageData);
    const seoData = pageData['pageData']['data']['pageWholesale']['data']['attributes']['SEO']
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