import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { Faq } from '~/components/pages/Faq';
import { faqQuery } from '~/data/gql_queries/pages/faq_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req)=>{
    const lang = req.params['lang']==""?"en":"es-419";
    return await getPageData(faqQuery, lang);

})

export default component$(() => {
    const signalData = usePageData();
    const data = signalData.value;
    const datapage = data['pageData']['data']['pageFaq']['data']['attributes']
  return <>
    <MainLayout data={data['layoutData']}>
      <Faq data={datapage}></Faq>
    </MainLayout>
  </>
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData = pageData['pageData']['data']['pageFaq']['data']['attributes']['SEO']
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