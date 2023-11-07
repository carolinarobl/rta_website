import { component$ } from "@builder.io/qwik";
import { Form, globalAction$ } from "@builder.io/qwik-city";
import {
    BsChatSquareTextFill, BsUpload, BsPersonFill, BsGeoAltFill, BsEnvelopeAtFill,
    BsTelephoneFill
} from "@qwikest/icons/bootstrap"

export const useSubmitForm = globalAction$(async (data) => {
    console.log('Submitted:', data)

    return { success: true };
});

export const FormPosition = component$(() => {
    const SubmitForm = useSubmitForm();
    
    return <div class="flex flex-col max-w-lg mx-auto rounded-xl p-6">
        <Form class='mt-2' action={SubmitForm}>
            <div class='flex flex-wrap items-center'>
                <div class="mb-4 w-full sm:w-2/3">
                    <label for="name" class="block font-medium text-color-Primary">Name <strong class='font-bold text-red-600 text-xl'>*</strong> </label>
                    <div class="flex items-center p-2 rounded">
                        <div class="mr-2">
                            <BsPersonFill style={{ color: '#2e5899' }}></BsPersonFill>
                        </div>
                        <input type="text" name="name"
                            class="w-full border border-color-Primary p-2 rounded-xl focus:outline-none focus:border-blue-500"
                            required />
                    </div>
                </div>
                <div class="w-2/3 sm:w-1/3 mb-4">
                    <label for="zip-code" class="block font-medium text-color-Primary">Zip Code <strong class='font-bold text-red-600 text-xl'>*</strong> </label>
                    <div class="flex items-center p-2 rounded">
                        <div class="mr-2">
                            <BsGeoAltFill style={{ color: '#2e5899' }}></BsGeoAltFill>
                        </div>
                        <input type="tel" name="zip_code" class="w-full border border-color-Primary p-2 rounded-xl focus:outline-none focus:border-blue-500" maxLength={5} required />
                    </div>
                </div>
            </div>
            <div class='flex flex-wrap items-center justify-around'>
                <div class="mb-4 w-full sm:w-1/2 ">
                    <label for="email" class="block font-medium text-color-Primary">Email <strong class='font-bold text-red-600'>*</strong></label>
                    <div class="flex items-center p-2 rounded">
                        <div class="mr-2">
                            <BsEnvelopeAtFill style={{ color: '#2e5899' }}></BsEnvelopeAtFill>
                        </div>
                        <input type="email" name="email" class="w-full border border-color-Primary p-2 rounded-xl focus:outline-none focus:border-blue-500" required />
                    </div>
                </div>
                <div class="w-2/3 md:w-1/2 mb-4 items-center">
                    <label for="phone" class="block font-medium text-color-Primary">Phone</label>
                    <div class="flex items-center p-2 rounded">
                        <div class="mr-2">
                            <BsTelephoneFill style={{ color: '#2e5899' }}></BsTelephoneFill>
                        </div>
                        <input type="tel" name="phone1" id="phone1"
                            maxLength={14}
                            pattern="\([0-9]{3}\) [0-9]{2}-[0-9]{3}"
                            class="w-full border border-color-Primary p-2 rounded-xl focus:outline-none focus:border-blue-500" />
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <label for="message" class="block  font-medium text-color-Primary">Message<strong class='font-bold text-red-600 text-xl'>*</strong></label>
                <div class="flex items-center p-2 rounded">
                    <div class="mr-2">
                        <BsChatSquareTextFill style={{ color: '#2e5899' }}></BsChatSquareTextFill>
                    </div>
                    <textarea name="message" class="w-full border border-color-Primary p-2 rounded-xl focus:outline-none focus:border-blue-500" rows={4} required></textarea>
                </div>
            </div>
            <label for='file' class="flex w-[200px] text-color-Primary font-medium justify-evenly p-2 rounded-md">
                Attach Resume
                <BsUpload></BsUpload>
            </label>

            <input
                type="file"
                lang='en'
                accept='.pdf, .doc'
                name='file'
            />
            <button type="submit" class="mt-4 bg-secondary-red text-white w-full font-semibold px-4 py-2 rounded-xl hover:bg-blue-600 focus:outline-none">
                Submit
            </button>
        </Form>
    </div>
});