import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { Cookies } from '~/components/pages/cookies';
import { cookiesQuery } from '~/data/gql_queries/pages/cookies_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req) => {
    const lang = req.params["lang"] == "" ? "en" : "es-419";
    return await getPageData(cookiesQuery, lang);
  });
  
export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;
  const dataPage =data['pageData']['data']['pageCookies']['data']['attributes']['Content'];
  return <>
  <MainLayout data={data["layoutData"]}>
  <Cookies data={dataPage}></Cookies>
  </MainLayout>
  </>
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData = pageData['pageData']['data']['pageCookies']['data']['attributes']['SEO']
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