import type { RequestHandler } from "@builder.io/qwik-city";

export const onPost: RequestHandler = async (request) => {
  const body = await request.parseBody();
  const url = "https://api.emailjs.com/api/v1.0/email/send/";
  console.log(body);

  const cred = {
    service_id: "service_3c06k96",
    user_id: "IYZz-W8oLRewKg_p0",
    accessToken: "6I-rPRtBvWRubnBm_GLdd",
  };

  const data = {
    ...cred,
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
