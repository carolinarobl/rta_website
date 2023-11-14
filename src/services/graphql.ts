import { customLocale, gqlURL } from "~/data/constants";
import { layoutQuery } from "~/data/gql_queries/layout_query";

export async function GQLQuery(query: string) {
  const resp = await fetch(gqlURL, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  return await resp.json();
}

export async function getPageData(
  query: any,
  locale: string = "en",
  getLayoutData: boolean = true,
) {
  let layoutData = {};
  if (getLayoutData) {
    layoutData = await GQLQuery(layoutQuery(customLocale(locale)));
  }

  const pageData = await GQLQuery(query(customLocale(locale)));

  return {
    layoutData,
    pageData,
  };
}
