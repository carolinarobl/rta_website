import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import {
  BsChatSquareTextFill,
  BsPersonFill,
  BsGeoAltFill,
  BsEnvelopeAtFill,
  BsTelephoneFill,
} from "@qwikest/icons/bootstrap";
import { Spinner } from "../Spinner";

export const FormContact = component$(({ templateID }: { templateID: any }) => {
  const emailState = useSignal<"NONE" | "LOADING" | "ERROR" | "SUCCESS">(
    "NONE",
  );

  const validatePhone = /^\d{10}$/;
  const validateEmail = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9_.]+\.[a-zA-Z]{2,}$/;
  const correctPhone = useSignal(false);
  const isFocusPhone = useSignal(false);
  const isFocusEmail = useSignal(false);
  const correctEmail = useSignal(false);

  const sendEmail = $(() => {
    emailState.value = "LOADING";
    const formData = new FormData(
      document.getElementById("s_form") as HTMLFormElement,
    );
    const data = Object.fromEntries(formData);

    data["template_id"] = templateID;
    console.log(data);
    fetch("/api/emailjs/", {
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
          emailState.value = "ERROR";
        }
      })
      .catch((err) => {
        console.error(err);
        emailState.value = "ERROR";
      });
  });
  // eslint-disable-next-line qwik/no-use-visible-task
  const handleSubmit = useVisibleTask$(() => {
    const formulario = document.getElementById("s_form");
    const inputPhone = document.getElementById("tel");
    const inputEmail = document.getElementById("from_email");
    console.log(formulario);

    const validarForm = (e: any) => {
      switch (e.target.name) {
        case "tel":
          if (validatePhone.test(e.target.value)) {
            correctPhone.value = true;
            isFocusPhone.value = false;
          } else {
            correctPhone.value = false;
          }
          break;
        case "from_email":
          if (validateEmail.test(e.target.value)) {
            correctEmail.value = true;
          } else {
            correctEmail.value = false;
          }

          break;
        default:
          break;
      }
    };

    inputPhone?.addEventListener("keyup", validarForm);
    inputPhone?.addEventListener("keydown", (e: any) => {
      console.log(e.target.value);
    });
    inputPhone?.addEventListener("focus", () => {
      isFocusPhone.value = true;
    });

    inputEmail?.addEventListener("keyup", validarForm);
    inputEmail?.addEventListener("focus", () => {
      isFocusEmail.value = true;
    });

    formulario?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (correctEmail.value && correctPhone.value) {
        console.log("Enviando");
        sendEmail();
      } else {
        console.log("Error validaciones");
      }
    });
  });

  return (
    <div class="mx-auto flex max-w-lg flex-col rounded-3xl bg-white p-6">
      <form
        class="mt-2"
        id="s_form"
        preventdefault:submit
        onSubmit$={() => {
          handleSubmit;
        }}
      >
        <div class="flex flex-wrap">
          <div class="mb-4 w-full sm:w-2/3">
            <label
              for="name"
              class="block text-base font-medium text-[#2e5899]"
            >
              Name <span class="text-red-600">*</span>{" "}
            </label>
            <div class="flex items-center rounded p-2">
              <div class="mr-2">
                <BsPersonFill style={{ color: "#2e5899" }}></BsPersonFill>
              </div>
              <input
                type="text"
                name="from_name"
                class="w-full rounded-full border border-[#2e5899] border-opacity-40 p-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>
          <div class="mb-4 w-2/3 sm:w-1/3">
            <label
              for="zip_code"
              class="block text-base font-medium text-[#2e5899]"
            >
              Zip Code <span class="text-red-600">*</span>{" "}
            </label>
            <div class="flex items-center rounded p-2">
              <div class="mr-2">
                <BsGeoAltFill style={{ color: "#2e5899" }}></BsGeoAltFill>
              </div>
              <input
                type="number"
                name="zip_code"
                class="w-full rounded-full border border-[#2e5899] border-opacity-40 p-2 focus:border-blue-500 focus:outline-none"
                minLength={5}
                maxLength={5}
                required
              />
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center md:flex-row">
          <div class="mb-4 w-full sm:w-1/2">
            <label
              for="email"
              class="block text-base font-medium text-[#2e5899]"
            >
              Email <span class="text-red-600">*</span>
            </label>
            <div class="flex items-center rounded p-2">
              <div class="mr-2">
                <BsEnvelopeAtFill
                  style={{ color: "#2e5899" }}
                ></BsEnvelopeAtFill>
              </div>
              <input
                type="email"
                name="from_email"
                id="from_email"
                class="w-full rounded-full border border-[#2e5899] border-opacity-40 p-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <label
              class={`text-xs text-red-600 ${correctEmail.value == false && isFocusEmail.value == true ? "flex" : "hidden"} bg-transparent`}
            >
              email is invalid
            </label>
          </div>
          <div class="mb-4 w-full md:w-1/2">
            <label for="tel" class="block text-base font-medium text-[#2e5899]">
              Phone
            </label>
            <div class="flex items-center rounded p-2">
              <div class="mr-2">
                <BsTelephoneFill style={{ color: "#2e5899" }}></BsTelephoneFill>
              </div>
              <input
                type="tel"
                name="tel"
                id="tel"
                maxLength={10}
                class="w-full rounded-full border border-[#2e5899] border-opacity-40 p-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <label
              class={`text-xs text-red-600 ${correctPhone.value == false && isFocusPhone.value == true ? "flex" : "hidden"} bg-transparent`}
            >
              phone number is invalid
            </label>
          </div>
        </div>
        <div class="mb-4">
          <label
            for="message"
            class="block text-base font-medium text-[#2e5899]"
          >
            Message<span class="text-red-600">*</span>
          </label>
          <div class="flex items-center rounded p-2">
            <div class="mr-2">
              <BsChatSquareTextFill
                style={{ color: "#2e5899" }}
              ></BsChatSquareTextFill>
            </div>
            <textarea
              name="message"
              class="w-full rounded-3xl border border-[#2e5899] border-opacity-40 p-2 focus:border-blue-500 focus:outline-none"
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
          class={`flex w-full items-center justify-center rounded-full bg-secondary-red px-4 py-2 text-base font-semibold text-white hover:bg-opacity-95 ${
            emailState.value === "LOADING"
              ? "cursor-wait bg-primary-blue"
              : emailState.value === "SUCCESS"
                ? "bg-teal-500"
                : ""
          } focus:outline-none`}
          // onClick$={}
        >
          {emailState.value === "NONE" ? (
            "Submit"
          ) : emailState.value === "LOADING" ? (
            <Spinner size="28px"></Spinner>
          ) : emailState.value === "ERROR" ? (
            "Error"
          ) : (
            "Email Sent!"
          )}
        </button>
      </form>
    </div>
  );
});
