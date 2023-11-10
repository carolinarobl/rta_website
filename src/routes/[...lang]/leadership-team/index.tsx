import { component$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { LeadershipTeam } from '~/components/pages/LeadershipTeam';
import { LeadershipQuery } from '~/data/gql_queries/pages/leadership_team_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req) => {
    // console.log(req.params);
    const lang = req.params["lang"] == "" ? "en" : "es-419";
    return await getPageData(LeadershipQuery, lang);
  });

export default component$(() => {
const signalData = usePageData();
const data = signalData.value
const dataPage = data['pageData']['data']['pageLeadershipT']['data']['attributes']
    return <>
        <MainLayout data={data['layoutData']}>
            <LeadershipTeam data={dataPage} />
        </MainLayout>
    </>
});

export const head: DocumentHead = ({ resolveValue }) => {
    const pageData = resolveValue(usePageData);
    const seoData = pageData['pageData']['data']['pageLeadershipT']['data']['attributes']['SEO']
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