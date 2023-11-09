import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { cookiesQuery } from '~/data/gql_queries/pages/cookies_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req) => {
    // console.log(req.params);
    const lang = req.params["lang"] == "" ? "en" : "es-419";
    return await getPageData(cookiesQuery, lang);
  });
  
export default component$(() => {
  return <>
  <MainLayout>

  </MainLayout>
  </>
});