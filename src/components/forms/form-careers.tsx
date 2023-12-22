import { component$ } from "@builder.io/qwik";
import { Form, globalAction$ } from "@builder.io/qwik-city";
import { BsUpload } from "@qwikest/icons/bootstrap";


export const useSubmitFormCarrers = globalAction$(
    async (data) => {
        console.log(data)
        return {
            success: true,
        };
    });

export const FormCareers = component$(() => {
    const submitForm = useSubmitFormCarrers();

    return <div class="flex flex-col w-full md:w-1/2 h-[560px] bg-blue-100 rounded-2xl p-4">
        <p class='text-center font-medium text-color-Primary'>Fill out the form below and attach your resume to contact us today</p>
        <Form class='mt-2 overflow-y-auto' action={submitForm}>
            <div class='flex-col sm:flex-row flex justify-between'>
                <div class="mb-4 gap-2 w-full flex flex-col mr-0 md:mr-4">
                    <label for="name" class="block font-medium text-color-Primary">Name</label>
                    <input type="text" id="name" name="name"
                        class="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:border-blue-500" />
                </div>
                <div class="mb-4 gap-2 w-full flex flex-col">
                    <label for="phone" class="block font-medium text-color-Primary">Phone</label>
                    <input type="tel" id="phone" name="phone"
                        maxLength={10}
                        class="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:border-blue-500" />
                </div>
            </div>
            <div class="mb-4 gap-2 flex flex-col">
                <label for="email" class="block font-medium text-color-Primary">Email</label>
                <input type="email" id="email" name="email" class="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:border-blue-500" required />
            </div>
            <div class="mb-4 gap-2 flex flex-col">
                <label for="message" class="block  font-medium text-color-Primary">Message</label>
                <textarea id="message" name="message" rows={4}
                    class="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:border-blue-500" required></textarea>
            </div>
            <label for="file" class="flex w-[200px] text-color-Primary p-2 justify-evenly rounded-md font-medium">
                Upload resume
                <BsUpload class="text-center font-bold" />
            </label>

            <input
                type="file"
                required
                accept='.pdf, .doc'
                id="file"
                name='file'
                class="w-full"
            />
            <button type="submit" class="mt-4 bg-secondary-red text-white w-full font-semibold px-4 py-2 rounded-xl hover:bg-blue-600 focus:outline-none">
                Submit
            </button>
        </Form>
    </div>
});