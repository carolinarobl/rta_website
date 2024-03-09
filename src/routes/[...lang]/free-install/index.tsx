import { component$ } from '@builder.io/qwik';
import {routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { SEOh1 } from '~/components/SEOh1';
import { LPFreeInstall } from '~/components/pages/LPFreeInstall';
import { headSEO } from '~/data/constants';
import { freeInstallQuery } from '~/data/gql_queries/pages/free_install_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req)=>{
    const lang = req.params['lang']==""?"en":"es-419";
    return await getPageData(freeInstallQuery, lang)
})


export default component$(() => {
    const signalData = usePageData();
    const data = signalData.value

  return <>
<MainLayout data={data['layoutData']} showMenus={false} showHeader={false}>
    <LPFreeInstall data={data['pageData']['data']['lpNeighbor']['data']['attributes']}></LPFreeInstall>
</MainLayout>
  </>
});

export const head: DocumentHead = ({ resolveValue }) => {
    const pageData = resolveValue(usePageData);
    const seoData = pageData['pageData']['data']['lpNeighbor']['data']['attributes']['SEO']
  
    return headSEO(seoData)
  };