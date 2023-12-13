import { component$, useSignal } from "@builder.io/qwik";
import { Form, globalAction$, useLocation } from "@builder.io/qwik-city";
import { BsGeoAltFill } from "@qwikest/icons/bootstrap";
import { loginPopupQuery } from "~/data/gql_queries/popups_queries/login_popup_query";
import { getPageCustomData } from "~/services/graphql";
import { Spinner } from "../Spinner";
import { telPopupQuery } from "~/data/gql_queries/popups_queries/tel_popup_query";

export const useSubmitFormZip = globalAction$(
    async (data) => {
        let portalUrl = null;
        const office = await getPageCustomData(loginPopupQuery(data['zip-code'].toString()))

        if (office.pageData['data']['offices']['data'].length > 0) {
            portalUrl = await office.pageData['data']['offices']['data'][0]['attributes']['InstanceLink']
        }

        return (portalUrl)
    });

export const useSubmitFormTel = globalAction$(
    async (data) => {
        let tel = null;
        // let location = null;
        const office = await getPageCustomData(telPopupQuery(data['zip-code'].toString()))

        if (office.pageData['data']['offices']['data'].length > 0) {
            tel = await office.pageData['data']['offices']['data'][0]['attributes']
            // location = await office.pageData['data']['offices']['data'][0]['attributes']
        }

        return tel
    });


interface Props {
    title: string;
    description: string;
    btnText: string;
    popup: "login" | "location",
    notFountText?:string
}

export const PopupLoginForm = component$(({ title, description, btnText, popup, notFountText }: Props) => {
    const submitForm = useSubmitFormTel()
    const urlPortal = submitForm.value
    const getData = useSignal(false);
    const location = useLocation();
    const isES = location.prevUrl?.pathname.includes("/es/");


    return <div class=" w-[600px] h-fit rounded-full p-8 flex flex-col gap-4 bg-blue-100 items-center justify-center z-[800]">
        <h1 class="text-center text-primary-blue font-bold text-4xl">{title}</h1>
        <p class="font-light">{description}</p>
        <Form class="w-full" action={submitForm} onSubmit$={() => { }}>
            <div class="px-4 flex flex-row items-center justify-center gap-4">
                <div class="flex items-center p-2 rounded">
                    <div class="mr-2">
                        <BsGeoAltFill style={{ color: '#2e5899' }}></BsGeoAltFill>
                    </div>
                    <input type="text" maxLength={5} name="zip-code" placeholder="Zip-code"
                        required class="border border-gray-300 placeholder:text-primary-blue p-2 rounded-full focus:outline-none focus:border-blue-500" />
                </div>
                <button class="py-2 w-1/4 border-2 text-teal-500 px-4 bg-white font-bold border-teal-500 rounded-full hover:cursor-pointer hover:border-transparent hover:bg-teal-500 hover:text-white"
                    type="submit"
                    onClick$={() => { if (submitForm.isRunning) { getData.value = true } }}>
                    {btnText}
                </button>
            </div>
        </Form>
        {
            popup == "login" ? submitForm.isRunning ? <Spinner size="50px"></Spinner> : urlPortal != null ? <div class="flex flex-col items-center justify-center">
                <p>Portal found</p>
                <a href={urlPortal.toString()}>
                    <button class="py-2 w-full border-2 text-teal-500 px-4 bg-white font-bold border-teal-500 rounded-full hover:cursor-pointer hover:border-transparent hover:bg-teal-500 hover:text-white">
                        {isES?"Ir al portal":"Go to portal"}
                    </button></a>
                </div> :urlPortal == null && submitForm.isRunning == false && getData.value ? <p class="text-2xl text-secondary-red">{isES?"Portal no encontrado":"Portal not found"}</p> : null
                : submitForm.isRunning ? <Spinner size="50px"></Spinner> : urlPortal != null ? <div class="flex flex-col items-center justify-center">
                    <p>{urlPortal['Location'].toString()}</p>
                    <a href={urlPortal['Phone']['Link'].toString()}>
                        <button class="py-2 w-full border-2 text-teal-500 px-4 bg-white font-bold border-teal-500 rounded-full hover:cursor-pointer hover:border-transparent hover:bg-teal-500 hover:text-white">
                            {urlPortal['Phone']['Text']}
                        </button></a>
                </div> : urlPortal == null && submitForm.isRunning == false && getData.value ? <p class="text-xs text-primary-blue">{notFountText}</p> : null

        }
    </div>
});