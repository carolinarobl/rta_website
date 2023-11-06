import { $, component$, useSignal } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { Field, minLength, required } from "@modular-forms/qwik";
import { BsUpload } from "@qwikest/icons/bootstrap";


export const FormCarrers = component$(() => {
    const name = useSignal('')

    return <div class="flex flex-col max-w-lg mx-auto bg-blue-100 rounded-xl p-6">
        <p class='text-center font-medium text-color-Primary'>Fill out the form below and attach your resume to contact us today</p>
        <Form class='mt-2' onSubmit$={()=>console.log(name.value)}>
            <div class='flex-row flex justify-between'>
                
                <div class="mb-4 gap-2 flex flex-col">
                    <label for="phone" class="block font-medium text-color-Primary">Phone</label>
                    <input type="tel" id="phone"
                        maxLength={14}
                        class="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:border-blue-500" />
                </div>
            </div>
            <div class="mb-4 gap-2 flex flex-col">
                <label for="email" class="block font-medium text-color-Primary">Email</label>
                <input type="email" id="email" class="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:border-blue-500" required />
            </div>
            <div class="mb-4 gap-2 flex flex-col">
                <label for="message" class="block  font-medium text-color-Primary">Message</label>
                <textarea id="message" rows={4}
                class="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:border-blue-500" required></textarea>
            </div>
            <label for="file" class="flex w-[200px] text-color-Primary p-2 justify-evenly rounded-md font-medium">
                Upload resume
                <BsUpload class="text-center font-bold" />
            </label>

            <input
                type="file"
                accept='.pdf, .doc'
                id='file'
            />
            {/* <FileUpload id="load_file"/> */}
            <button type="submit" class="mt-4 bg-secondary-red text-white w-full font-semibold px-4 py-2 rounded-xl hover:bg-blue-600 focus:outline-none">
                Submit
            </button>
        </Form>
    </div>
});