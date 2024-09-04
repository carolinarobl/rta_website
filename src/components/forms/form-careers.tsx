import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { BsUpload } from "@qwikest/icons/bootstrap";
import { sendMail } from "~/routes/[...lang]/api/sendmail";
import { Spinner } from "../Spinner";

export const FormCareers = component$(({ templateID, mailto, subject, lang, position }: { templateID: any, subject: string, mailto: string, lang: string, position: string}) => {

    const location = useLocation();
    const isSpanish = location.prevUrl?.pathname.includes("/es/");
    
    const emailState = useSignal<"NONE" | "LOADING" | "ERROR" | "SUCCESS">(
        "NONE",
      );

    const formId="form_careers";

    const validatePhone = /^\d{10}$/
    const validateEmail = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9_.]+\.[a-zA-Z]{2,}$/

    const correctPhone = useSignal(false);
    const isFocusPhone = useSignal(false);
    const isFocusEmail = useSignal(false);
    const correctEmail = useSignal(false);

    // eslint-disable-next-line qwik/no-use-visible-task
    const handlesubmit = useVisibleTask$(() => {
        const formulario = document.getElementById(formId)

        const formInputs: Array <any> = [];

        const inputPhone = document.getElementById('tel')
        const inputEmail = document.getElementById('from_email')

    // FUNCIÓN | Validación de formulario
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

    // FUNCIÓN | Submit form
        formulario?.addEventListener('submit', (e) => {
            e.preventDefault();
            emailState.value = "LOADING";
            const formData = new FormData(formulario as HTMLFormElement);

            if (correctEmail.value && correctPhone.value) {
                console.log("Sending")

                const reader = new FileReader()
                const resumeFile = formData.get('resume') as File;
                
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                resumeFile ? reader.readAsDataURL(resumeFile) : console.error('No se encontró el archivo adjunto');
                
                reader.onload = async (event) => {
                    if (event.target && event.target.result) {
                        const result = await event.target.result;
                        formData.forEach((value, key)=>{
                            formInputs.push({name:key, value: value.toString()})
                          })

                          formInputs.push({name:'position', value: position})
                        sendMail(templateID, subject, mailto, formInputs, lang, result as string );
                    } else {
                        console.error('Error al obtener los datos Base64 del archivo.');
                    }
                };

                
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
            <button
            type="submit"
            disabled={
                emailState.value === "LOADING" || emailState.value === "SUCCESS"
              }
              class={`flex flex-row items-center justify-center mt-4 bg-secondary-red text-white w-full font-semibold px-4 py-2 rounded-xl hover:bg-blue-600 focus:outline-none ${
                emailState.value === "LOADING"
                  ? "cursor-wait bg-primary-blue"
                  : emailState.value === "SUCCESS"
                    ? "bg-teal-500"
                    : ""
              } focus:outline-none`}
            >
               {emailState.value === "NONE" ? (
            isSpanish ? "Enviar": "Send"
          ) : emailState.value === "LOADING" ? (
            <Spinner size="28px"></Spinner>
          ) : emailState.value === "ERROR" ? (
            "Error"
          ) : (
            isSpanish ? "¡Mensaje enviado!": "Email Sent!"
          )}
            </button>
        </form>
    </div>
});