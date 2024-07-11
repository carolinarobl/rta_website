import { component$ } from '@builder.io/qwik';
import {routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { LPSheridan } from '~/components/pages/LPSheridanBBQ';
import { headSEO } from '~/data/constants';
import { sheridanQuery } from '~/data/gql_queries/pages/sheridan_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req)=>{
    const lang = req.params['lang']==""?"en":"es-419";
    return await getPageData(sheridanQuery, lang)
})


export default component$(() => {
    const signalData = usePageData();
    const data = signalData.value

  return <>
<MainLayout data={data['layoutData']} showMenus={false} showHeader={false}>
    <LPSheridan data={data['pageData']['data']['lpSheridan']['data']['attributes']}></LPSheridan>
</MainLayout>
  </>
});

export const head: DocumentHead = ({ resolveValue }) => {
    const pageData = resolveValue(usePageData);
    const seoData = pageData['pageData']['data']['lpSheridan']['data']['attributes']['SEO']
  
    return headSEO(seoData)
  };