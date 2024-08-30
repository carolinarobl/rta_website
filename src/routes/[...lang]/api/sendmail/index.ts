import type { RequestHandler } from "@builder.io/qwik-city";

export const onPost: RequestHandler = async (request) => {
  const body = await request.parseBody() as any;
  const url = "https://supa42.rtatel.com/notifications/api";

  const data = {
    action: "rtaMail",
    template_id: body["template_id"],
    template_params: body,
  };

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  request.json(200, { resp: await resp.text() });
};
