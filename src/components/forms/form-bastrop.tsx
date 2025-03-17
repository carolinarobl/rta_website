import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import {
  BsPersonFill,
  BsEnvelopeAtFill,
  BsTelephoneFill,
} from "@qwikest/icons/bootstrap";
// import { sendMail } from "~/routes/[...lang]/api/sendmail";
import { Spinner } from "../Spinner";
import { Markdown } from "../Markdown";
import { supabase } from "~/utils/supabase";

export const FormBastrop = component$(({ lang, bastrop_address }: {lang: string, bastrop_address:string}) => {

  console.log(bastrop_address);
  const isSpanish = (lang == 'es');
  
  const emailState = useSignal<"NONE" | "LOADING" | "ERROR" | "SUCCESS">(
    "NONE",
  );
  const formId="bastrop_form";
  
  const validatePhone = /^\(\d{3}\) \d{3}-\d{4}$/;
  const validateEmail = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9_.]+\.[a-zA-Z]{2,}$/;
  
  const correctPhone = useSignal(false);
  const isFocusPhone = useSignal(false);
  const isFocusEmail = useSignal(false);
  const correctEmail = useSignal(false);

  const handlePhoneInput = $((e: any) => {
    const value = e.target.value.replace(/\D/g, "");
    let formattedValue = "";

    if (value.length > 0) {
      formattedValue = "(" + value.substring(0, 3);
    }
    if (value.length >= 3) {
      formattedValue += ") " + value.substring(3, 6);
    }
    if (value.length >= 7) {
      formattedValue += "-" + value.substring(6, 10);
    }
    e.target.value = formattedValue;

    correctPhone.value = validatePhone.test(formattedValue);
  });

  
  // eslint-disable-next-line qwik/no-use-visible-task
  const handleSubmit = useVisibleTask$(() => {
    const formulario = document.getElementById(formId);
    
    const formInputs: Array <any> = [];

    const inputPhone = document.getElementById("tel");
    const inputEmail = document.getElementById("from_email");

    // FUNCIÓN | Validación de formulario
    const validarForm = (e: any) => {
      switch (e.target.name) {
        case "tel":
          correctPhone.value = validatePhone.test(e.target.value);
          break;
        case "from_email":
          correctEmail.value = validateEmail.test(e.target.value);
          break;
        default:
          break;
      }
    };

    inputPhone?.addEventListener("keyup", validarForm);
    inputPhone?.addEventListener("input", handlePhoneInput);
    inputPhone?.addEventListener("focus", () => {
      isFocusPhone.value = true;
    });


    inputEmail?.addEventListener("keyup", validarForm);
    inputEmail?.addEventListener("focus", () => {
      isFocusEmail.value = true;
    });

    // SEARCH ADDRESS SECTION
    
    // FUNCIÓN | Consulta para guardar los datos del usuario
    const registerUser = $(async (first_name: string, last_name: string, address: string, email: string, phone_number: string, receive_txt: any) => {
      const { data, error } = await supabase
        .schema('rta_surveys')
        .from('bastrop_users')
        .insert([
          {
            created_at: new Date().toISOString(),
            first_name,
            last_name,
            address,
            email,
            phone_number,
            receive_txt
          }
        ]);
    
      if (error) {
        console.error("Error en registerUser:", error);
        return false;
      }
    
      console.log("Usuario registrado en Supabase:", data);
      return true;
    });
    
    // FUNCIÓN | Submit Form
    formulario?.addEventListener("submit", async (e) => {  
      e.preventDefault();
      emailState.value = "LOADING";
      const formData = new FormData(formulario as HTMLFormElement);
    
      if (correctEmail.value && correctPhone.value) {
        console.log("Sending");
    
        formData.forEach((value, key) => {
          formInputs.push({ name: key, value: key.includes('accept_sms') ? value : value.toString() });
        });
    
        const first_name = formInputs.find(field => field.name === 'from_first_name')?.value || '';
        const last_name = formInputs.find(field => field.name === 'from_last_name')?.value || '';
        const address = bastrop_address;
        const email = formInputs.find(field => field.name === 'from_email')?.value || '';
        const phone_number = formInputs.find(field => field.name === 'tel')?.value || '';
        const receive_txt = formInputs.find(field => field.name === 'accept_sms')?.value == 'on' || false;
    
        const submitted = await registerUser(
          first_name,
          last_name,
          address,
          email,
          phone_number,
          receive_txt
        );
    
        if (submitted) {
          alert(isSpanish ? "¡Información guardada con éxito!" : "Information saved successfully!");
          location.reload(); // Recargar página
        } else {
          alert(isSpanish ? "Error al guardar la información. Intenta nuevamente." : "Error saving information. Please try again.");
        }
    
        emailState.value = "NONE"; // Resetear el estado
      } else {
        console.log("Error validaciones");
      }
    });
    
    
  
  });
  const title= isSpanish ? '¡Buenas noticias!':"Great News!"

  const paragraph = isSpanish ? `Tu dirección podrá recibir _**gigFAST INTERNET®**_.

Únete a la red de fibra gigFAST registrándote a continuación. Te mantendremos informado cuando estemos en tu zona.`
  :
  `Your address will be able to receive _**gigFAST INTERNET®**_.
  
  Join the gigFAST Fiber Network by pre-registering below. We will keep you up to date when we are going to be in your neighborhood.`;

  return (
    <div class="flex flex-col rounded-3xl bg-white p-6 text-start  md:w-full w-[90vw] md:m-0">
    <Markdown text={title} classN="md:text-[45px] text-[28px] font-bold"/>
    <Markdown text={paragraph} classN="!max-w-[500px]"/>

    <form
      class="mt-2 "
      id={formId}
      preventdefault:submit
      onSubmit$={() => {
        handleSubmit;
      }}
    >
      <div class="flex flex-col md:flex-row md:gap-4">
        <div class="mb-4 w-full">
          <label
            for="from_first_name"
            class="block py-1 font-regular tracking-[0.5px] text-[14px]"
          >
            {isSpanish ? "Primer Nombre": "First Name"} <span class="text-red-300">*</span>{" "}
          </label>
          <div class="flex items-center p-2 gap-1 bg-white rounded-full border border-[#2e5899] border-opacity-40">
              <BsPersonFill style={{ color: "#2e5899", opacity:"0.5", width:"14px" }}/>
            <input
              type="text"
              name="from_first_name"
              class="w-full focus:outline-none text-[13px] "
              placeholder={isSpanish ? "Tu primer nombre": "Your first name"}
              required
            />
          </div>
        </div>
        <div class="mb-4 w-full">
          <label
            for="from_last_name"
            class="block py-1 font-regular tracking-[0.5px] text-[14px]"
          >
            {isSpanish ? "Apellido": "Last Name"} <span class="text-red-300">*</span>{" "}
          </label>
          <div class="flex items-center p-2 gap-1 bg-white rounded-full border border-[#2e5899] border-opacity-40">
              <BsPersonFill style={{ color: "#2e5899", opacity:"0.5", width:"14px" }}/>
            <input
              type="text"
              name="from_last_name"
              class="w-full focus:outline-none text-[13px] "
              placeholder={isSpanish ? "Tu apellido": "Your last name"}
              required
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center gap-2">
        <div class="mb-4 w-full">
          <label
            for="from_email"
            class="block py-1 font-regular tracking-[0.5px] text-[14px]"
          >
           {isSpanish ? "Correo electrónico": "E-mail"} <span class="text-red-300">*</span>
          </label>
          <div class="flex items-center p-2 bg-white rounded-full border border-[#2e5899] border-opacity-40">
            <div class="mr-2">
              <BsEnvelopeAtFill
                style={{ color: "#2e5899", opacity:"0.5", width:"14px" }}
              ></BsEnvelopeAtFill>
            </div>
            <input
              type="email"
              name="from_email"
              id="from_email"
              class="w-full focus:outline-none text-[13px]"
              required
              placeholder={isSpanish ? "tu@correo.com": "your@mail.com"}
            />
          </div>
          <label
            class={`text-xs text-red-300 ${correctEmail.value == false && isFocusEmail.value == true ? "flex" : "hidden"} bg-transparent`}
          >
            {isSpanish ? "Por favor, usa un correo electrónico válido.": "Please, use a valid email address."}
          </label>
        </div>
        <div class="mb-4 w-full">
          <label for="tel" class="block py-1 font-regular tracking-[0.5px] text-[14px]">
          {isSpanish ? "Número de teléfono": "Mobile Phone Number"}
          </label>
          <div class="flex items-center p-2 bg-white rounded-full border border-[#2e5899] border-opacity-40">
            <div class="mr-2">
              <BsTelephoneFill style={{ color: "#2e5899", opacity:"0.5", width:"14px" }}></BsTelephoneFill>
            </div>
            <input
              type="tel"
              name="tel"
              id="tel"
              class="w-full focus:outline-none text-[13px]"
              placeholder= {isSpanish ? "ejemplo: (555) 000-0000": "example: (555) 000-0000"}
            />
          </div>
          <label
            class={`text-xs text-red-300 ${correctPhone.value == false && isFocusPhone.value == true ? "flex" : "hidden"} bg-transparent`}
          >
            {isSpanish ? "Por favor, usa un número de teléfono válido.": "Please, use a valid phone number."}
          </label>
        </div>

        <div class="mb-4 w-full flex items-start">
  <input
    type="checkbox"
    id="accept_sms"
    name="accept_sms"
    class="mt-1 cursor-pointer"
    required
  />
  <label for="accept_sms" class="ml-2 text-sm">
    {isSpanish
      ? "Acepto recibir mensajes de texto de la empresa."
      : "I agree to receive text messages from the company."}
  </label>
</div>

      </div>

      <button
        type="submit"
        disabled={
          emailState.value === "LOADING" || emailState.value === "SUCCESS"
        }
        class={`flex w-full items-center justify-center rounded-full px-4 py-2 text-base font-semibold border border-primary-blue hover:bg-opacity-95 ${
          emailState.value === "LOADING"
            ? "cursor-wait bg-primary-blue"
            : emailState.value === "SUCCESS"
              ? "bg-teal-500"
              : ""
        } focus:outline-none`}
        // onClick$={}
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
  );
});

