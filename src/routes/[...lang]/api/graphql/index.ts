import type { RequestHandler } from "@builder.io/qwik-city";
import { GQLQuery } from "~/services/graphql";

export const onPost: RequestHandler = async (request) => {
  const body = (await request.parseBody()) as any;
  const resp = await GQLQuery(body.query);

  request.json(200, resp);
};
