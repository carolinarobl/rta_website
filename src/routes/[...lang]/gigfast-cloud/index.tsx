import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { GigfastCloud } from '~/components/pages/GigfastCloud';
import { gfCloudQuery } from '~/data/gql_queries/pages/gf_cloud_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req)=>{
    const lang = req.params['lang']==""?"en":"es-419";
    return await getPageData(gfCloudQuery, lang)
})

export default component$(() => {
    const signalData = usePageData();
    const data = signalData.value;
    const dataPage = data['pageData']['data']
  return <>
  <MainLayout data={data['layoutData']}>
    <GigfastCloud data={dataPage}></GigfastCloud>
  </MainLayout>
  </>
});

export const head: DocumentHead = ({ resolveValue }) => {
    const pageData = resolveValue(usePageData);
    const seoData = pageData['pageData']['data']['pageGfCloud']['data']['attributes']['SEO']
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