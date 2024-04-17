import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { PostHeader } from '~/components/PostHeader';
import { PostLoader } from '~/components/PostLoader';
import { customLocale, headSEO } from '~/data/constants';
import { locationQuery } from '~/data/gql_queries/pages/local_page_query';
import { getPageCustomData } from '~/services/graphql';


export const usePageData = routeLoader$(async (req) => {
    const lang =
        req.params["lang"] == "es"
            ? "es-419"
            : req.params["lang"] == ""
                ? "en"
                : req.params["lang"];
    const slug = req.params["slug"];
    return await getPageCustomData(locationQuery(customLocale(lang), slug), lang);
});


export const useLang = routeLoader$(async (req) => {
    const lang = req.params["lang"] == "" ? "en" : "es-419";
    return lang.toString()
})


export default component$(() => {
    const signalData = usePageData();
    const data = signalData.value;
    const pageData = data['pageData']['data']['locations']['data'][0]['attributes'];
    const firstBlog = pageData["posts"]["data"];
    const location = useLocation();
    const isES = location.prevUrl?.pathname.includes("/es/");


    return <MainLayout data={data['layoutData']}>
        {
            firstBlog.length == 0
                ? <div class="h-full w-full flex items-center justify-center">
                    <h2 class="font-bold text-2xl text-primary-blue p-[25px] text-center">{isES == false ? "More news about this location coming soon. Stay tuned!" : "Próximamente más noticias sobre esta localidad. ¡Mantente al tanto!"}</h2>
                </div>
                : <div class="flex flex-col items-center justify-center">

                    {/* <SectionTips data={pageData['Tips']} /> */}
                    <PostHeader post={firstBlog[0]["attributes"]} isES={isES} />
                    <div class="my-4"></div>
                    <PostLoader posts={pageData["posts"]["data"]} loadSize={3} type="locations" isLocalBlog isES={isES} />
                </div>
        }

    </MainLayout>
});


export const head: DocumentHead = ({ resolveValue }) => {
    const lang = resolveValue(useLang);
    const getPageData = resolveValue(usePageData);
    const pageData = getPageData['pageData']['data']['locations']['data'][0]['attributes'];
    const locationName = pageData['Name'];

    console.log("el valor que se obtiene de las páginas es ", pageData);

    const seoData =
    {
        'MetaTitle': lang == "en" ? `${locationName} Local Blog | RTA Telecommunications` : `Blog Local en ${locationName} | RTA Telecommunications`,
        'MetaDescription': lang == "en" ? `Explore the most recent and relevant news in ${locationName}. Stay informed about events, updates, and local news that impact your community.` : `Explora las noticias más recientes y relevantes en ${locationName}. Mantente informado sobre eventos y noticias locales que impactan tu comunidad.`,
        'Keywords': lang == "en" ? "Technology news, Tech updates, Digital trends, Innovation insights, RTA, local blog" : "Noticias de tecnología, Actualizaciones tecnológicas, Tendencias digitales, Novedades en innovación, RTA, blog local"
    }

    return headSEO(seoData);
};