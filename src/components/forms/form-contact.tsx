import { component$, useSignal } from "@builder.io/qwik";
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
  return (
    <div class="mx-auto flex max-w-lg flex-col rounded-3xl bg-white p-6">
      <form
        class="mt-2"
        id="s_form"
        preventdefault:submit
        onSubmit$={() => {
          emailState.value = "LOADING";
          const formData = new FormData(
            document.getElementById("s_form") as HTMLFormElement,
          );
          const data = Object.fromEntries(formData);
          data["template_id"] = templateID;
          console.log(data);
          // fetch("/api/emailjs/", {
          //   method: "POST",
          //   body: JSON.stringify(data),
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          // })
          //   .then((res) => res.json())
          //   .then((res) => {
          //     if (res["resp"] === "OK") {
          //       emailState.value = "SUCCESS";
          //     } else {
          //       emailState.value = "ERROR";
          //     }
          //   })
          //   .catch((err) => {
          //     console.error(err);
          //     emailState.value = "ERROR";
          //   });
        }}
      >
        <div class="flex flex-wrap">
          <div class="mb-4 w-full sm:w-2/3">
            <label for="name" class="block font-medium text-base text-[#2e5899]">
              Name <span class="text-red-600">*</span>{" "}
            </label>
            <div class="flex items-center rounded p-2">
              <div class="mr-2">
                <BsPersonFill style={{ color: "#2e5899" }}></BsPersonFill>
              </div>
              <input
                type="text"
                name="from_name"
                class="w-full border border-[#2e5899] rounded-full border-opacity-40 p-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>
          <div class="mb-4 w-2/3 sm:w-1/3">
            <label for="zip_code" class="block font-medium text-base text-[#2e5899]">
              Zip Code <span class="text-red-600">*</span>{" "}
            </label>
            <div class="flex items-center rounded p-2">
              <div class="mr-2">
                <BsGeoAltFill style={{ color: "#2e5899" }}></BsGeoAltFill>
              </div>
              <input
                type="number"
                name="zip_code"
                class="w-full rounded-full border-opacity-40 border border-[#2e5899] p-2 focus:border-blue-500 focus:outline-none"
                minLength={5}
                maxLength={5}
                required
              />
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center md:flex-row">
          <div class="mb-4 w-full sm:w-1/2">
            <label for="email" class="block font-medium text-base text-[#2e5899]">
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
                class="w-full rounded-full border-opacity-40 border border-[#2e5899] p-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>
          <div class="mb-4 w-full md:w-1/2">
            <label for="tel" class="block font-medium text-base text-[#2e5899]">
              Phone
            </label>
            <div class="flex items-center rounded p-2">
              <div class="mr-2">
                <BsTelephoneFill style={{ color: "#2e5899" }}></BsTelephoneFill>
              </div>
              <input
                type="tel"
                name="tel"
                maxLength={14}
                class="w-full rounded-full border-opacity-40 border border-[#2e5899] p-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div class="mb-4">
          <label for="message" class="block text-base font-medium text-[#2e5899]">
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
              class="w-full rounded-3xl border-opacity-40 border border-[#2e5899] p-2 focus:border-blue-500 focus:outline-none"
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
          class={`flex w-full items-center text-base justify-center rounded-full bg-secondary-red px-4 py-2 font-semibold text-white hover:bg-opacity-95 ${
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
