import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { BsUpload } from "@qwikest/icons/bootstrap";

export const FormCareers = component$(() => {
    const templateID = "template_gwyyy7d";

    const emailState = useSignal<"NONE" | "LOADING" | "ERROR" | "SUCCESS">(
        "NONE",
    );

    const validatePhone = /^\d{10}$/
    const validateEmail = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9_.]+\.[a-zA-Z]{2,}$/

    const correctPhone = useSignal(false);
    const isFocusPhone = useSignal(false);
    const isFocusEmail = useSignal(false);
    const correctEmail = useSignal(false);

    const sendEmail = $(() => {
        emailState.value = "LOADING";
        const formData = new FormData(
            document.getElementById("form_careers") as HTMLFormElement,
        );

        const reader = new FileReader()
        const resumeFile = formData.get('resume') as File;

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (resumeFile) {
            reader.readAsDataURL(resumeFile);
        } else {
            console.error('No se encontró el archivo adjunto');
        }

        reader.onload = async (event) => {
            if (event.target && event.target.result) {
                const result = await event.target.result;
                const data = await {
                    "from_name": formData.get('from_name'),
                    "tel": formData.get("tel"),
                    "from_email": formData.get("from_email"),
                    "message": formData.get("message"),
                    "resume1": result as string,
                    "template_id": templateID
                }

                await fetch("/api/emailjs/", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((res) => {
                        if (res["resp"] === "OK") {
                            emailState.value = "SUCCESS";
                        } else {
                            console.log(res["resp"])
                            emailState.value = "ERROR";
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        emailState.value = "ERROR";
                    });
            } else {
                console.error('Error al obtener los datos Base64 del archivo.');
            }
        };
    })
    // eslint-disable-next-line qwik/no-use-visible-task
    const handlesubmit = useVisibleTask$(() => {
        const formulario = document.getElementById('form_careers')
        const inputPhone = document.getElementById('tel')
        const inputEmail = document.getElementById('from_email')

        const validarForm = (e: any) => {
            switch (e.target.name) {
                case "tel":
                    if (validatePhone.test(e.target.value)) {
                        correctPhone.value = true
                        isFocusPhone.value = false
                    }
                    else {
                        correctPhone.value = false
                    }
                    break;
                case "from_email":
                    if (validateEmail.test(e.target.value)) {
                        correctEmail.value = true
                    } else {
                        correctEmail.value = false
                    }

                    break;
                default:
                    break;
            }
        }

        inputPhone?.addEventListener('keyup', validarForm)
        inputPhone?.addEventListener('keydown', (e:any) => {
            console.log(e.target.value)
        })
        inputPhone?.addEventListener('focus', () => { isFocusPhone.value = true })

        inputEmail?.addEventListener('keyup', validarForm)
        inputEmail?.addEventListener('focus', () => { isFocusEmail.value = true })

        formulario?.addEventListener('submit', (e) => {
            e.preventDefault();
            if (correctEmail.value && correctPhone.value) {
                console.log("Enviando")
                sendEmail()
            }
            else {
                console.log("Error validaciones")
            }
        })
    })

    return <div class="flex flex-col w-full md:w-1/2 h-[560px] bg-blue-100 rounded-2xl p-4">
        <p class='text-center font-medium text-color-Primary'>Fill out the form below and attach your resume to contact us today</p>
        <form id="form_careers" class='mt-2 overflow-y-auto'
            onSubmit$={() => { handlesubmit }}>
            <div class='flex-col sm:flex-row flex justify-between'>
                <div class="mb-4 gap-2 w-full flex flex-col mr-0 md:mr-4">
                    <label for="from_name" class="block font-medium text-color-Primary">Name</label>
                    <input type="text" id="from_name" name="from_name"
                        class="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:border-blue-500" />
                </div>
                <div class="mb-4 gap-2 w-full flex flex-col">
                    <label for="tel" class="block font-medium text-color-Primary">Phone</label>
                    <input type="tel" id="tel" name="tel"
                        maxLength={14}
                        class="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:border-blue-500" />
                    <label class={`text-xs text-red-600 ${correctPhone.value == false && isFocusPhone.value == true ? "flex" : "hidden"} bg-transparent`}>phone number is invalid</label>
                </div>
            </div>
            <div class="mb-4 gap-2 flex flex-col">
                <label for="from_email" class="block font-medium text-color-Primary">Email</label>
                <input type="email" id="from_email" name="from_email" class="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:border-blue-500" required />
                <label class={`text-xs text-red-600 ${correctEmail.value == false && isFocusEmail.value == true ? "flex" : "hidden"} bg-transparent`}>email is invalid</label>
            </div>
            <div class="mb-4 gap-2 flex flex-col">
                <label for="message" class="block  font-medium text-color-Primary">Message</label>
                <textarea id="message" name="message" rows={4}
                    class="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:border-blue-500" required></textarea>
            </div>
            <label for="resume" class="flex w-[200px] text-color-Primary p-2 justify-evenly rounded-md font-medium">
                Upload resume
                <BsUpload class="text-center font-bold" />
            </label>

            <input
                type="file"
                required
                accept='.pdf'
                id="resume"
                name='resume'
                class="w-full"
            />
            <button type="submit" class="mt-4 bg-secondary-red text-white w-full font-semibold px-4 py-2 rounded-xl hover:bg-blue-600 focus:outline-none">
                Submit
            </button>
        </form>
    </div>
});