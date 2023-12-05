import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { ContactUs } from '~/components/pages/ContactUs';
import { headSEO } from '~/data/constants';
import { contactUsQuery } from '~/data/gql_queries/pages/contact_us_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req) => {
    const lang = req.params["lang"] == "" ? "en" : "es-419";
    return await getPageData(contactUsQuery, lang);
  });
  
export default component$(() => {
  const signalData = usePageData()
  const data = signalData.value
  const dataPage = data['pageData']['data']['pageContact']['data']['attributes'];

  return <>
  <MainLayout data={data['layoutData']}>
    <ContactUs data={dataPage}/>
  </MainLayout>
  </>
});

export const head: DocumentHead = ({ resolveValue }) => {
    const pageData = resolveValue(usePageData);
    const seoData = pageData['pageData']['data']['pageContact']['data']['attributes']['SEO']
  
    return headSEO(seoData)
  };