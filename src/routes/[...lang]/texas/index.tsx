import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { TexasPage } from '~/components/pages/Texas';
import { texasQuery } from '~/data/gql_queries/pages/texas';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req) => {
    const lang = req.params["lang"] == "" ? "en" : "es-419";
    return await getPageData(texasQuery, lang)
})

export default component$(() => {
    const signalData = usePageData();
    const data = signalData.value;
    const dataPage = data['pageData']['data']['locations']['data']
    return <>
        <MainLayout data={data['layoutData']}>
            <TexasPage data={dataPage}></TexasPage>
        </MainLayout>
    </>
});

//SE AGREGO title ESTATICO YA QUE NO SE ENCUENTRA EN STRAPI
export const head: DocumentHead={
    title:'Texas Locations'
}
