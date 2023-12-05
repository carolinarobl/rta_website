import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { SEOh1 } from '~/components/SEOh1';
import { GigfastInternet } from '~/components/pages/GigfastInternet';
import { headSEO } from '~/data/constants';
import { gfInternetQuery } from '~/data/gql_queries/pages/gf_internet_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req)=>{
    const lang =req.params['lang']==""?"en":"es-419";
    return await getPageData(gfInternetQuery, lang)
})

export default component$(() => {
    const signalData = usePageData();
    const data = signalData.value;
    const dataPage = data['pageData']['data']['pageGfInternet']['data']['attributes']

  return <>
    <MainLayout data={data["layoutData"]}>
    <SEOh1 SEOdata={data["pageData"]["data"]["pageGfInternet"]["data"]["attributes"]["SEO"]}/>
        <GigfastInternet data={dataPage}></GigfastInternet>
    </MainLayout>
  </>
});

export const head: DocumentHead = ({ resolveValue }) => {
    const pageData = resolveValue(usePageData);
    const seoData = pageData['pageData']['data']['pageGfInternet']['data']['attributes']['SEO']
  
    return headSEO(seoData)
  };