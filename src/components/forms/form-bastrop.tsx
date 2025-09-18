import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import {
  BsPersonFill,
  BsEnvelopeAtFill,
  BsTelephoneFill,
} from "@qwikest/icons/bootstrap";
import { Spinner } from "../Spinner";
import { Markdown } from "../Markdown";
import { supabase } from "~/utils/supabase";
import { generateLead } from "~/routes/[...lang]/api/createpwlead";

export const FormBastrop = component$(({ lat, long, lang, bastrop_address, section, service_type }: {lat: string, long: string, lang: string, bastrop_address:string, section: string, service_type: string}) => {

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

  const checkMailState = useSignal(false);
  const checkPhoneState = useSignal(false);

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
    const checkPhone = document.getElementById("accept_sms")  as HTMLInputElement;
    const checkEmail = document.getElementById("accept_mail")  as HTMLInputElement;

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

    checkPhone.addEventListener("change", () => {
      checkPhoneState.value = checkPhone.checked;
    });

    checkEmail.addEventListener("change", () => {
      checkMailState.value = checkEmail.checked;
    });

    checkEmail.addEventListener('invalid', (event) => {
      const target = event.target as HTMLInputElement;
      if (!target.validity.valid) {
        if (target.validity.valueMissing) {
          target.setCustomValidity(isSpanish ? 'Por favor, selecciona al menos una de las opciones': 'Please, check at least one of the boxes to proceed');
        } else {
          target.setCustomValidity('');
        }
      }
    });

    // SEARCH ADDRESS SECTION

    // FUNCIÓN | Obtención del id de la sección para su guardado en la base de datos 
    const getSectionAndQuadrantInfo = $(async (sectionName: string) => {
      
      const { data: sectionData, error: sectionError } = await supabase
        .schema('rta_surveys')
        .from('section')
        .select('id, quadrant_id')
        .ilike('code', sectionName)      
        .maybeSingle();              

      if (sectionError) {
        console.error('Error section:', sectionError);
        return { sectionId: null, quadrantCode: null, quadrantNumber: null };
      }

      if (!sectionData) {
        console.log('No section were found with the following code:', sectionName);
        return { sectionId: null, quadrantCode: null, quadrantNumber: null };
      }

      const { id: sectionId, quadrant_id } = sectionData;

    // Get associated quadrant info
    const { data: quadrantData, error: quadrantError } = await supabase
      .schema('rta_surveys')
      .from('quadrant')
      .select('code, number')
      .eq('id', quadrant_id)
      .maybeSingle();            

    if (quadrantError) {
      console.error('Error quadrant:', quadrantError);
      return { sectionId, quadrantCode: null, quadrantNumber: null };
    }

    const quadrantCode = quadrantData?.code ?? null;
    const quadrantNumber = quadrantData?.number ?? null;

  return {
    sectionId,
    quadrantCode,
    quadrantNumber,
  };
});

    
    // FUNCIÓN | Consulta para guardar los datos del usuario
    const registerUser = $(async (first_name: string, last_name: string, address: string, email: string, phone_number: string, receive_txt: boolean, receive_mail: boolean, has_service: any, lat: string, long: string) => {

      const { error } = await supabase
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
            receive_txt,
            receive_mail,
            has_service,
            lat,
            long,
            section_fk: (await getSectionAndQuadrantInfo(section)).sectionId,
          }
        ]);
    
      if (error) {
        console.error("Error en registerUser:", error);
        return false;
      }
    
      console.log("Successfully saved");
      return true;
    });

    // FUNCIÓN | Generación de lead en Powercode
    //   const generatePWLead = $(async (
    //       first_name: string,
    //       last_name: string,
    //       email:string,
    //       phone_number:string,
    //       receive_txt:boolean,
    //       receive_mail:boolean,
    //     ) => {

    //     const { quadrantCode, quadrantNumber } = await getSectionAndQuadrantInfo(section);

    //     const service = (service_type == 'bastrop_elegible') ? 'Served' : 'No Served';
    //     const customerNotes = service === "Served"
    //       ? `${service} ${section} ${quadrantCode}-${quadrantNumber}`
    //       : `${service}`;
    //     const splitAddress = bastrop_address.split(',').map((e) => e.trim());

    //     const body = {
    //         "apiKey": "3cBEFVR4qQleIRO2yWu0FcOCDdyZbuaU",
    //         "action": "createServiceOrder",
    //         "customerType": "residential",
    //         "networkType": "fiber",
    //         "locationGroup": "bas",
    //         "customer": {
    //             "firstName": first_name,
    //             "lastName": last_name,
    //             "emailAddress": email,
    //             "phone": phone_number ? [{ "Type": "Mobile", "Number": phone_number }] : [],
    //             "customerNotes": customerNotes,
    //             "physicalStreet": splitAddress[0],
    //             "physicalCity": splitAddress[1],
    //             "physicalState": splitAddress[2].split(' ')[0],
    //             "physicalZip": splitAddress[2].split(' ')[1],
    //             "physicalLatitude": lat,
    //             "physicalLongitude": long
    //         },
    //         "contactPreference": {
    //             "phone": receive_txt,
    //             "email": receive_mail,
    //             "rangeTime": "Any time",
    //             "promoInfobyEmail": false,
    //             "promoInfobySMS": false
    //         },
    //         "services": [],
    //         "additionalServices": [],
    //         "devices": [],
    //         "fees": [],
    //         "discounts": [],
    //         "engageOption": ""
    //     };

    //     try {
    //         const response = await fetch('https://apps.cblsrv42.rtatel.com/planbuilder/api', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(body),
    //         });
    //         if (!response.ok) {
    //             console.error('Error al llamar a la API externa:', response.status);
    //         }
    //     } catch (error) {
    //         console.error('Error en la llamada a la API externa:', error);
    //     }
    // });
    
      const generatePWLead = $(async (
          first_name: string,
          last_name: string,
          email:string,
          phone_number:string,
          receive_txt:boolean,
          receive_mail:boolean,
        ) => {

        const { quadrantCode, quadrantNumber } = await getSectionAndQuadrantInfo(section);

        const service = (service_type == 'bastrop_elegible') ? 'Served' : 'No Served';
        const customerNotes = service === "Served"
          ? `${service} ${section} ${quadrantCode}-${quadrantNumber}`
          : `${service}`;
        const splitAddress = bastrop_address.split(',').map((e) => e.trim());

        generateLead(
          first_name,
          last_name,
          email,
          phone_number,
          receive_txt,
          receive_mail,
          lat,
          long,
          customerNotes,
          splitAddress
        );

        // await fetch('/api/createpwlead', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     first_name: first_name,
        //     last_name: last_name,
        //     email: email,
        //     phone_number: phone_number,
        //     receive_txt: receive_txt,
        //     receive_mail: receive_mail,
        //     lat,
        //     long,
        //     splitAddress,
        //     customerNotes
        //   }),
        // });
    });

    // FUNCIÓN | Submit Form
    formulario?.addEventListener("submit", async (e) => {  
      e.preventDefault();
      emailState.value = "LOADING";

      const formData = new FormData(formulario as HTMLFormElement);
      const mailCheckbox = checkMailState.value;
      const phoneCheckbox = checkPhoneState.value;
      
      // if ( correctEmail.value && correctPhone.value) {
      if((mailCheckbox || phoneCheckbox)){
        console.log("Sending");
    
        formData.forEach((value, key) => {
          formInputs.push({ name: key, value: value  });
        });
    
        const first_name = formInputs.find(field => field.name === 'from_first_name')?.value || '';
        const last_name = formInputs.find(field => field.name === 'from_last_name')?.value || '';
        const address = bastrop_address;
        const email = formInputs.find(field => field.name === 'from_email')?.value || '';
        const phone_number = formInputs.find(field => field.name === 'tel')?.value || '';
        const receive_txt = formInputs.find(field => field.name === 'accept_sms')?.value == 'on';
        const receive_mail = formInputs.find(field => field.name === 'accept_mail')?.value == 'on';
        const service_available = service_type;

        const submitted = await registerUser(
          first_name,
          last_name,
          address,
          email,
          phone_number,
          receive_txt,
          receive_mail,
          service_available,
          lat,
          long
        );
    
        if (submitted) {
          
          await generatePWLead(
            first_name,
            last_name,
            email,
            phone_number,
            receive_txt,
            receive_mail
          ).then(() => {alert(isSpanish ? "¡Información guardada con éxito!" : "Information saved successfully!");})

          location.reload(); // Recargar página
        } else {
          alert(isSpanish ? "Error al guardar la información. Intenta nuevamente." : "Error saving information. Please try again.");
        }
    
        emailState.value = "NONE"; // Resetear el estado
      } else {
        alert('Seems that there is some data you need to validate. Please, try again.');
        emailState.value = "ERROR"; // Resetear el estado

      }
    });
    
    
  
  });


  const messages = [
    {
      serviceType: 'bastrop_elegible',
      title: isSpanish ? '¡Instalación gratuita!' : 'Free Installation!',
      paragraph: isSpanish
        ? `Tu dirección es elegible para recibir _**gigFAST INTERNET®**_ con instalación gratuita. 
  Regístrate ahora y te mantendremos informado cuando estemos listos para conectarte.`
        : `Your address is eligible to receive _**gigFAST INTERNET®**_ with free installation. 
  Sign up now and we’ll keep you informed when we’re ready to connect you.`
    },
    {
      serviceType: 'bastrop_nofiber',
      title: isSpanish ? '¡Buenas noticias!' : 'Great News!',
      paragraph: isSpanish
        ? `Estamos expandiendo la red _**gigFAST INTERNET®**_ cerca de tu zona.
  Regístrate hoy y te mantendremos informado cuando comencemos el despliegue en tu vecindario.`
        : `We’re expanding the _**gigFAST INTERNET®**_ network near your area.
  Sign up today and we’ll keep you informed when we begin deploying in your neighborhood.`
    },
    {
      serviceType: 'bastrop_nocoverage',
      title: isSpanish ? 'Gracias por contactarnos' : 'Thank You for Contacting Us',
      paragraph: isSpanish
        ? `Tu dirección está en el Condado de Bastrop, pero aún no está en nuestra red.
  Nos pondremos en contacto contigo para informarte si podremos ofrecerte servicio.`
        : `Your address is in Bastrop County, but not yet on our network.
  We will reach out to let you know if and when we will be able to offer service.`
    },
    {
      serviceType: 'notbastrop',
      title: isSpanish ? 'Dirección fuera de cobertura' : 'Out of Coverage Area',
      paragraph: isSpanish
        ? `Lo sentimos, esta dirección no aparece dentro del Condado de Bastrop, Texas.
  Si crees que esto es un error, intenta ingresar tu dirección nuevamente o llama a nuestra oficina para verificar la cobertura.`
        : `Sorry, this address does not appear to be in Bastrop County, Texas.
  If you believe this is an error, please try entering your address again or call our office to verify service availability.`
    }
  ];



  const foundMessage = messages.find((msg) => msg.serviceType === service_type);

  const { title, paragraph } = foundMessage ?? {
    title: isSpanish ? '¡Gracias!' : `Thank You! service type: ${service_type}`,
    paragraph: isSpanish
      ? 'Gracias por tu interés en gigFAST INTERNET®.'
      : 'Thank you for your interest in gigFAST INTERNET®.'
  };
  
  return (
    <div class="flex flex-col rounded-3xl bg-white p-6 text-start  md:w-full w-[90vw] md:m-0 max-h-[90vh] overflow-y-auto ">
    <Markdown text={title} classN="md:text-[38px] text-[22px] font-bold"/>
    <Markdown text={paragraph} classN="!max-w-[600px] text-[12px] md:!text-[14px]"/>

    <form
      class="mt-2 "
      id={formId}
      preventdefault:submit
      onSubmit$={() => {
        handleSubmit;
      }}
    >
            <div class="mb-4 w-full">
          <label
            for="from_address"
            class="block py-1 font-regular tracking-[0.5px] text-[14px]"
          >
           {isSpanish ? "Dirección": "Address"} <span class="text-red-300">*</span>
          </label>
          <div class="flex items-center p-2 bg-white rounded-full border border-[#2e5899] border-opacity-40">
            <div class="mr-2">
              <BsEnvelopeAtFill
                style={{ color: "#2e5899", opacity:"0.5", width:"14px" }}
              ></BsEnvelopeAtFill>
            </div>
            <input
              type="text"
              name="from_address"
              id="from_address"
              class="w-full focus:outline-none text-[13px]"
              required
              // placeholder={isSpanish ? "tu@correo.com": "your@mail.com"}
              value={bastrop_address}
            />
          </div>
        </div>
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

        <div class="flex flex-col md:flex-row md:gap-4 w-full">
        <div class="mb-4 w-full">
          <label
            for="from_email"
            class="flex flex-row py-1 font-regular tracking-[0.5px] text-[14px] gap-2"
          >
           {isSpanish ? "Correo electrónico": "E-mail"} <span class={`text-red-300 ${checkMailState.value ? 'flex':'hidden'}`}>*</span>
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
              required={checkMailState.value}
              placeholder={isSpanish ? "tu@correo.com": "your@mail.com"}
            />
          </div>
          <label
            class={`text-xs text-red-300 ${!correctEmail.value && isFocusEmail.value && checkMailState.value ? "flex" : "hidden"} bg-transparent`}
          >
            {isSpanish ? "Por favor, usa un correo electrónico válido.": "Please, use a valid email address."} <span class={`text-red-300 ${checkPhoneState.value ? 'flex':'hidden'}`}>*</span>
          </label>
        </div>

        <div class="mb-4 w-full">
          <label for="tel"
            class="flex flex-row py-1 font-regular tracking-[0.5px] text-[14px] gap-2"
          >
          {isSpanish ? "Número de teléfono": "Mobile Phone Number"} <span class={`text-red-300 ${checkPhoneState.value ? 'flex':'hidden'}`}>*</span>
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
              required={checkPhoneState.value}
              placeholder= {isSpanish ? "ejemplo: (555) 000-0000": "example: (555) 000-0000"}
            />
          </div>
          <label
            class={`text-xs text-red-300 ${!correctPhone.value && isFocusPhone.value && checkPhoneState.value ? "flex" : "hidden"} bg-transparent`}
          >
            {isSpanish ? "Por favor, usa un número de teléfono válido.": "Please, use a valid phone number."}
          </label>
        </div>
        </div>
       


        <div class=" w-full flex items-start"> 
        <label
            class={`text-xs text-red-300 ${!checkPhoneState.value && !checkMailState.value  ? "flex" : "hidden"} bg-transparent`}
          >
            {isSpanish ? "Selecciona por lo menos un método para contactarte, por favor.": "Please, select at least one contact method."}
          </label>
        </div>

        <div class=" w-full flex items-start">
          <input
            type="checkbox"
            id="accept_mail"
            name="accept_mail"
            class="mt-1 cursor-pointer"
            required={!checkPhoneState.value}
          />
  
          <label for="accept_mail" class="ml-2 text-sm">
            {isSpanish
              ? "Acepto recibir correos electrónicos de la empresa."
            : "I agree to receive e-mails from the company."}
          </label>
        </div>

        <div class="mb-4 w-full flex items-start">
          <input
            type="checkbox"
            id="accept_sms"
            name="accept_sms"
            class="mt-1 cursor-pointer"
            required={!checkMailState.value}
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

