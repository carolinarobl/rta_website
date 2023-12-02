import { component$ } from '@builder.io/qwik';
import {routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { GfSportsNetwork } from '~/components/pages/Gfsn';
import { gfSportsNetworkQuery } from '~/data/gql_queries/pages/gfsn_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req)=>{
    const lang = req.params['lang']==""?"en":"es-419";
    return await getPageData(gfSportsNetworkQuery, lang)
})

export default component$(() => {
    const signalData = usePageData();
    const data = signalData.value
  return <>
<MainLayout data={data['layoutData']}>
    <GfSportsNetwork data={data['pageData']['data']['pageGfSports']['data']['attributes']}></GfSportsNetwork>

</MainLayout>
  </>
});

export const head: DocumentHead = ({ resolveValue }) => {
    const pageData = resolveValue(usePageData);
    const seoData = pageData['pageData']['data']['pageGfSports']['data']['attributes']['SEO']
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