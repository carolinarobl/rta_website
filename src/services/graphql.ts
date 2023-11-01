import { gqlURL } from "~/data/constants";

export async function GQLQuery(query: String) {
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
