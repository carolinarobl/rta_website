import { component$ } from '@builder.io/qwik';
import {routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { LPGoldsmith } from '~/components/pages/LPGoldsmith';
import { headSEO } from '~/data/constants';
import { goldsmithQuery } from '~/data/gql_queries/pages/goldsmith_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req)=>{
    const lang = req.params['lang']==""?"en":"es-419";
    return await getPageData(goldsmithQuery, lang)
})


export default component$(() => {
    const signalData = usePageData();
    const data = signalData.value

  return <>
<MainLayout data={data['layoutData']} showMenus={false} showHeader={false}>
    <LPGoldsmith data={data['pageData']['data']['lpGoldsmith']['data']['attributes']}></LPGoldsmith>
</MainLayout>
  </>
});

export const head: DocumentHead = ({ resolveValue }) => {
    const pageData = resolveValue(usePageData);
    const seoData = pageData['pageData']['data']['lpGoldsmith']['data']['attributes']['SEO']
  
    return headSEO(seoData)
  };