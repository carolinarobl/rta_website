import { component$ } from "@builder.io/qwik";
import { Form, globalAction$ } from "@builder.io/qwik-city";
import { BsGeoAltFill } from "@qwikest/icons/bootstrap";

export const useSubmitFormZip = globalAction$(
    async (data) => {
        // console.log(data)
        return data
    });

export const PopupLoginForm = component$(() => {
    const submitForm = useSubmitFormZip()
    console.log(submitForm.formData?.get('zip-code'))
    const zipcode = submitForm.formData?.get('zip-code')?.toString()

    return <div class="w-1/2 min-h-[300px] rounded-full p-6 flex flex-col gap-4 bg-blue-100 items-center justify-center">
        <h1 class="text-center text-primary-blue font-bold text-4xl">Login into the portal of your area</h1>
        <p class="font-light">Just enter your zip code</p>
        <Form class="w-full" action={submitForm}>
            <div class="px-4 flex flex-row items-center justify-center gap-4">
                <div class="flex items-center p-2 rounded">
                    <div class="mr-2">
                        <BsGeoAltFill style={{ color: '#2e5899' }}></BsGeoAltFill>
                    </div>
                    <input type="text" name="zip-code" placeholder="Zip-code"
                        required class="border border-gray-300 placeholder:text-primary-blue p-2 rounded-full focus:outline-none focus:border-blue-500" />
                </div>
                <button class="py-2 w-1/4 border-2 text-teal-500 px-4 bg-white font-bold border-teal-500 rounded-full" type="submit">
                    Send
                </button>
            </div>
        </Form>
        {zipcode != null ? <p>{zipcode}</p> : null}
    </div>
});