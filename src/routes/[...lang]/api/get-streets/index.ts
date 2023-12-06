import type { RequestHandler } from "@builder.io/qwik-city";
import { searchStreets } from "~/services/address_search";

export const onGet: RequestHandler = async ({ json, query }) => {
  const q = query.get("q");
  if (!q) json(400, { message: "Bad request (need ?q param)" });
  const data = await searchStreets(q, 29.62540053919014, -95.39478748016545);
  json(200, { data: data });
};
