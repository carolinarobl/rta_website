import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Form, globalAction$ } from "@builder.io/qwik-city";
import { BsGeoAltFill } from "@qwikest/icons/bootstrap";
import { loginPopupQuery } from "~/data/gql_queries/popups_queries/login_popup_query";
import { getPageCustomData } from "~/services/graphql";

export const useSubmitFormZip = globalAction$(
    async (data) => {
        let portalUrl =null;
        const office = await getPageCustomData(loginPopupQuery(data['zip-code'].toString()))
        
        if (office.pageData['data']['offices']['data'].length > 0) {
            portalUrl = await office.pageData['data']['offices']['data'][0]['attributes']['InstanceLink']
            console.log(portalUrl)
        }

        console.log(portalUrl)
        return (portalUrl)
    });


export const PopupLoginForm = component$(() => {
    const submitForm = useSubmitFormZip()
    const urlPortal = submitForm.value
    console.log(urlPortal)

    return <div class="w-1/2 min-h-[300px] rounded-full p-6 flex flex-col gap-4 bg-blue-100 items-center justify-center">
        <h1 class="text-center text-primary-blue font-bold text-4xl">Login into the portal of your area</h1>
        <p class="font-light">Just enter your zip code</p>
        <Form class="w-full" action={submitForm}>
            <div class="px-4 flex flex-row items-center justify-center gap-4">
                <div class="flex items-center p-2 rounded">
                    <div class="mr-2">
                        <BsGeoAltFill style={{ color: '#2e5899' }}></BsGeoAltFill>
                    </div>
                    <input type="text" maxLength={5} name="zip-code" placeholder="Zip-code"
                        required class="border border-gray-300 placeholder:text-primary-blue p-2 rounded-full focus:outline-none focus:border-blue-500" />
                </div>
                <button class="py-2 w-1/4 border-2 text-teal-500 px-4 bg-white font-bold border-teal-500 rounded-full hover:cursor-pointer hover:border-transparent hover:bg-teal-500 hover:text-white" 
                type="submit">
                    Send
                </button>
            </div>
        </Form>
        {urlPortal!=null?<div class="flex flex-col">
            <p>Portal found</p>
            <a href={urlPortal.toString()}>
                <button class="py-2 w-full border-2 text-teal-500 px-4 bg-white font-bold border-teal-500 rounded-full hover:cursor-pointer hover:border-transparent hover:bg-teal-500 hover:text-white">
                Go to portal
            </button></a>
        </div>:null}
    </div>
});