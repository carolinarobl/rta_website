import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { GigfastTv } from '~/components/pages/GigfastTv/index';
import { gfTvQuery } from '~/data/gql_queries/pages/gf_tv_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req)=>{
    const lang = req.params['lang']==""?"en":"es-419";
    return await getPageData(gfTvQuery, lang)
})

export default component$(() => {
    const signalData = usePageData();
    const data = signalData.value

  return <>
  <MainLayout data={data['layoutData']}>
    <GigfastTv data={data['pageData']}></GigfastTv>
  </MainLayout>
  </>
});

export const head: DocumentHead = ({ resolveValue }) => {
    const pageData = resolveValue(usePageData);
    const seoData = pageData['pageData']['data']['pageGfTv']['data']['attributes']['SEO']
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