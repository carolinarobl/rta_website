import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import AllBroadbandLabels from '~/components/pages/AllBroadbandLabels';
import { SEOh1 } from '~/components/SEOh1';
import { headSEO } from '~/data/constants';
import { allBroadbandLabelsQuery } from '~/data/gql_queries/pages/all_broadbandlabels_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req) => {
    const lang = req.params["lang"] == "" ? "en" : "es-419";

    return await getPageData(allBroadbandLabelsQuery, lang)
})

export const useAllBroadbandLabels = routeLoader$(async () => {
    const resp = await fetch('https://cblsrvr1.rtatel.com/planbuilder/api', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "apikey": "3cBEFVR4qQleIRO2yWu0FcOCDdyZbuaU",
            "action": "productsBroadbanLabels"
        })
    })

    const data = await resp.json();

    const { gigfastInternet, gigfastVoice } = data.result.reduce(
        (acc: any, item: any) => {
            if (item.family === "gigFastInternet" && item.values.networkType) {
                acc.gigfastInternet.push(item);
            } else if (item.family === "gigFastVoice" && item.groups.length == 0) {
                acc.gigfastVoice.push(item);
            }
            return acc;
        },
        { gigfastInternet: [], gigfastVoice: [] }
    )


    return {
        'gigfastVoice': gigfastVoice,
        'gigfastInternet': gigfastInternet
    }
})

export default component$(() => {
    const signalData = usePageData();
    const data = signalData.value;


    const dataBroadbandLabels = useAllBroadbandLabels();
    const dataGigfastVoice = dataBroadbandLabels.value.gigfastVoice;
    const dataGigfastInternet = dataBroadbandLabels.value.gigfastInternet;



    return <>
        <MainLayout data={data['layoutData']}>
            <SEOh1 SEOdata={data['pageData']['data']['pageAllBroadbandlabel']['data']['attributes']['SEO']}>
            </SEOh1>
            <AllBroadbandLabels pageData={data['pageData']['data']['pageAllBroadbandlabel']}
                braodbandlabelVoice={dataGigfastVoice}
                broadbandlabelnternet={dataGigfastInternet} />
        </MainLayout>
    </>
});

export const head: DocumentHead = ({ resolveValue }) => {
    const pageData = resolveValue(usePageData);
    const seoData = pageData['pageData']['data']['pageAllBroadbandlabel']['data']['attributes']['SEO'];

    return headSEO(seoData)
}