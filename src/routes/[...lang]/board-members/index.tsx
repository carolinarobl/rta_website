import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { MainLayout } from "~/components/MainLayout";
import { SEOh1 } from "~/components/SEOh1";
import { LeadershipTeam } from "~/components/pages/LeadershipTeam";
import { boardDirectorsQuery } from "~/data/gql_queries/pages/board_of_directors_query";
import { getPageData } from "~/services/graphql";

export const usePageData = routeLoader$(async (req) => {
  // console.log(req.params);
  const lang = req.params["lang"] == "" ? "en" : "es-419";
  return await getPageData(boardDirectorsQuery, lang);
});

export default component$(() => {
  const signalData = usePageData();
  const data = signalData.value;
  const dataPage =
    data["pageData"]["data"]["pageBDirectors"]["data"]["attributes"];
  return (
    <>
      <MainLayout data={data["layoutData"]} showHeader>
        <SEOh1
          SEOdata={
            data["pageData"]["data"]["pageBDirectors"]["data"]["attributes"][
              "SEO"
            ]
          }
        />
        <LeadershipTeam data={dataPage} />
      </MainLayout>
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const pageData = resolveValue(usePageData);
  const seoData =
    pageData["pageData"]["data"]["pageBDirectors"]["data"]["attributes"]["SEO"];
  const title = `${seoData["MetaTitle"]}`;

  return {
    title: title,
    meta: [
      {
        name: "title",
        content: `${title}`,
      },
      {
        name: "description",
        content: `${seoData["MetaDescription"]}`,
      },
    ],
  };
};
