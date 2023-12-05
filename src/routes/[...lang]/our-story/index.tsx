import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { SEOh1 } from '~/components/SEOh1';
import { OurStory } from '~/components/pages/OurStory';
import { headSEO } from '~/data/constants';
import { ourStoryQuery } from '~/data/gql_queries/pages/our_story_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req) => {
    const lang = req.params["lang"] == "" ? "en" : "es-419";
    return await getPageData(ourStoryQuery, lang);
  });

export default component$(() => {
    const data = usePageData()
    const signalData = data.value
    const pageData = signalData['pageData']['data']['pageOurStory']['data']['attributes']
    return <>
    <MainLayout data={signalData['layoutData']}>
    <SEOh1 SEOdata={pageData["SEO"]}/>
        <OurStory data={pageData}></OurStory>
    </MainLayout>
    </>
});

export const head: DocumentHead = ({ resolveValue }) => {
    const pageData = resolveValue(usePageData);
    const seoData = pageData['pageData']['data']['pageOurStory']['data']['attributes']['SEO']
  
    return headSEO(seoData)
  };