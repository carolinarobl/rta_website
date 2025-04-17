import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import {
  BsPersonFill,
  BsGeoAltFill,
  BsEnvelopeAtFill,
  BsTelephoneFill,
} from "@qwikest/icons/bootstrap";
import { sendMail } from "~/routes/[...lang]/api/sendmail";
import { Spinner } from "../Spinner";
import { Markdown } from "../Markdown";

export const FormContact = component$(({ templateID, mailto, subject, lang }: { templateID: any, subject: string, mailto: string, lang: string}) => {

  const location = useLocation();
  const isSpanish = location.prevUrl?.pathname.includes("/es/");
  
  const emailState = useSignal<"NONE" | "LOADING" | "ERROR" | "SUCCESS">(
    "NONE",
  );
  const formId="contact_form";
  
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

    // FUNCIÓN | Submit form
    formulario?.addEventListener("submit", (e) => {  
      e.preventDefault();
      emailState.value = "LOADING";
      const formData = new FormData(formulario as HTMLFormElement);

      if (correctEmail.value && correctPhone.value) {
        console.log("Sending");

        formData.forEach((value, key)=>{
          formInputs.push({name:key, value: value.toString()})
        })

        sendMail(templateID, subject, mailto, 
          formInputs, lang);
      } else {
        console.log("Error validaciones");
      }
    });

  
  });

  const paragraph = isSpanish ? `### **¿Tienes alguna pregunta o necesitas ayuda?**
Rellena el formulario y nos pondremos en contacto contigo lo antes posible.`
  :
   `### **Have a question or need help?**
Fill out the form and we'll get back to you as soon as possible.`

  return (
    <div class="flex flex-col rounded-3xl bg-white p-6 text-start  md:w-full w-[90vw] md:m-0">
    <form
      class="mt-2 "
      id={formId}
      preventdefault:submit
      onSubmit$={() => {
        handleSubmit;
      }}
    >
      <div class="flex flex-col mb-4">
        <div class="w-full">
          <Markdown text= {paragraph}  classN="!text-center items-center leading-none "/>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 !z-[9999]">

        <div class="mb-4 w-full">
          <label
            for="from_name"
            class="block py-1 font-regular tracking-[0.5px] text-[14px]"
          >
            {isSpanish ? "Nombre": "Name"} <span class="text-red-300">*</span>{" "}
          </label>
          <div class="flex items-center p-2 gap-1 bg-white rounded-full border border-[#2e5899] border-opacity-40">
              <BsPersonFill style={{ color: "#2e5899", opacity:"0.5", width:"14px" }}/>
            <input
              type="text"
              name="from_name"
              class="w-full focus:outline-none text-[13px] "
              placeholder={isSpanish ? "Tu nombre": "Your name"}
              required
            />
          </div>
        </div>
        <div class="mb-4 w-full  md:w-2/3">
          <label
            for="from_zip_code"
            class="block py-1 font-regular tracking-[0.5px] text-[14px]"
          >
           {isSpanish ? "Código Postal": "Zip Code"} <span class="text-red-300">*</span>{" "}
          </label>
          <div class="flex items-center gap-1 p-2 bg-white rounded-full border border-[#2e5899] border-opacity-40">
              <BsGeoAltFill style={{ color: "#2e5899", opacity:"0.5", width:"14px" }}></BsGeoAltFill>

            <input
              type="number"
              name="zip_code"
              class="w-full focus:outline-none text-[13px]"
              placeholder={isSpanish ? "Código Postal": "Zip Code"}
              minLength={5}
              maxLength={5}
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
          {isSpanish ? "Número de teléfono": "Phone Number"}
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
      </div>
      <div class="mb-4">
        <label
          for="message"
          class="block py-1 font-regular tracking-[0.5px] text-[14px]"
        >
          {isSpanish ? "Mensaje": "Message"} <span class="text-red-300">*</span>
        </label>
        <div class="flex items-center rounded">
          <textarea
            name="message"
            class="w-full rounded-2xl border border-[#2e5899] text-[14px] border-opacity-40 p-2 focus:border-blue-500 focus:outline-none"
            rows={4}
            required
          ></textarea>
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
