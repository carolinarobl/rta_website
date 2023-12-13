import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Form, globalAction$ } from "@builder.io/qwik-city";
import { BsGeoAltFill } from "@qwikest/icons/bootstrap";
import { loginPopupQuery } from "~/data/gql_queries/popups_queries/login_popup_query";
import { getPageCustomData } from "~/services/graphql";
import { Spinner } from "../Spinner";
import { telPopupQuery } from "~/data/gql_queries/popups_queries/tel_popup_query";

export const useSubmitFormZip = globalAction$(async (data) => {
  let portalUrl = null;
  const office = await getPageCustomData(
    loginPopupQuery(data["zip-code"].toString()),
  );

  if (office.pageData["data"]["offices"]["data"].length > 0) {
    portalUrl =
      await office.pageData["data"]["offices"]["data"][0]["attributes"][
        "InstanceLink"
      ];
  }

  return portalUrl;
});

export const useSubmitFormTel = globalAction$(async (data) => {
  let tel = null;
  let location = null;
  const office = await getPageCustomData(
    telPopupQuery(data["zip-code"].toString()),
  );

  if (office.pageData["data"]["offices"]["data"].length > 0) {
    tel = await office.pageData["data"]["offices"]["data"][0]["attributes"];
    location =
      await office.pageData["data"]["offices"]["data"][0]["attributes"];
  }

  return tel;
});

interface Props {
  title: string;
  description: string;
  btnText: string;
  popup: "login" | "location";
  notFountText?: string;
}

export const PopupLoginForm = component$(
  ({ title, description, btnText, popup, notFountText }: Props) => {
    const submitForm = useSubmitFormTel();
    const urlPortal = submitForm.value;
    let getData = useSignal(false);

    return (
      <div class="flex h-fit w-1/2 flex-col items-center justify-center gap-4 rounded-full bg-blue-100 p-8">
        <h1 class="text-center text-4xl font-bold text-primary-blue">
          {title}
        </h1>
        <p class="font-light">{description}</p>
        <Form class="w-full" action={submitForm} onSubmit$={() => {}}>
          <div class="flex flex-row items-center justify-center gap-4 px-4">
            <div class="flex items-center rounded p-2">
              <div class="mr-2">
                <BsGeoAltFill style={{ color: "#2e5899" }}></BsGeoAltFill>
              </div>
              <input
                type="text"
                maxLength={5}
                name="zip-code"
                placeholder="Zip-code"
                required
                class="rounded-full border border-gray-300 p-2 placeholder:text-primary-blue focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button
              class="w-1/4 rounded-full border-2 border-teal-500 bg-white px-4 py-2 font-bold text-teal-500 hover:cursor-pointer hover:border-transparent hover:bg-teal-500 hover:text-white"
              type="submit"
              onClick$={() => {
                if (submitForm.isRunning) {
                  getData.value = true;
                }
              }}
            >
              {btnText}
            </button>
          </div>
        </Form>
        {popup == "login" ? (
          submitForm.isRunning ? (
            <Spinner size="50px"></Spinner>
          ) : urlPortal != null ? (
            <div class="flex flex-col items-center justify-center">
              <p>Portal found</p>
              <a href={urlPortal.toString()}>
                <button class="w-full rounded-full border-2 border-teal-500 bg-white px-4 py-2 font-bold text-teal-500 hover:cursor-pointer hover:border-transparent hover:bg-teal-500 hover:text-white">
                  Go to portal
                </button>
              </a>
            </div>
          ) : urlPortal == null &&
            submitForm.isRunning == false &&
            getData.value ? (
            <p class="text-2xl text-secondary-red">Portal not found</p>
          ) : null
        ) : submitForm.isRunning ? (
          <Spinner size="50px"></Spinner>
        ) : urlPortal != null ? (
          <div class="flex flex-col items-center justify-center">
            <p>{urlPortal["Location"].toString()}</p>
            <a href={urlPortal["Phone"]["Link"].toString()}>
              <button class="w-full rounded-full border-2 border-teal-500 bg-white px-4 py-2 font-bold text-teal-500 hover:cursor-pointer hover:border-transparent hover:bg-teal-500 hover:text-white">
                {urlPortal["Phone"]["Text"]}
              </button>
            </a>
          </div>
        ) : urlPortal == null &&
          submitForm.isRunning == false &&
          getData.value ? (
          <p class="text-xs text-primary-blue">{notFountText}</p>
        ) : null}
      </div>
    );
  },
);
