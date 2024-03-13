import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import { TexasPage } from '~/components/pages/Texas';
import { headSEO } from '~/data/constants';
import { texasQuery } from '~/data/gql_queries/pages/texas';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req) => {
    const lang = req.params["lang"] == "" ? "en" : "es-419";
    return await getPageData(texasQuery, lang)
})

export const useLang = routeLoader$(async (req) => {
    const lang = req.params["lang"] == "" ? "en" : "es-419";
    return lang.toString()
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

  export const head: DocumentHead = ({ resolveValue }) => {
    const lang = resolveValue(useLang);

    const seoData =
      {'MetaTitle': lang == "en" ? "Areas Served | RTA Rural Telecommunications of America" : "Áreas de servicio | RTA Rural Telecommunications of America",
      'MetaDescription': lang == "en" ? "Discover RTA's extensive service areas and expand your connectivity horizons. Explore reliable telecommunications solutions tailored for diverse regions!" : "Descubre áreas de servicio de RTA y expande tus horizontes de conectividad. ¡Explora soluciones de telecomunicaciones confiables para diversas regiones!",
    'Keywords': lang == "en" ? "Service coverage areas, Regional connectivity, Rural broadband solutions" : "Áreas de cobertura de servicios, Conectividad regional, Soluciones de banda ancha rural"}
  
    return headSEO(seoData);
  };
  