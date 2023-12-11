import { component$ } from "@builder.io/qwik";
import {
  BsChatSquareTextFill,
  BsPersonFill,
  BsGeoAltFill,
  BsEnvelopeAtFill,
  BsTelephoneFill,
} from "@qwikest/icons/bootstrap";

export const FormSupport = component$(() => {
  //   const handleSubmit = $();

  return (
    <div class="mx-auto flex max-w-lg flex-col rounded-xl bg-white p-6">
      <form class="mt-2" id="s_form">
        <div class="flex flex-wrap">
          <div class="mb-4 w-full sm:w-2/3">
            <label for="name" class="block font-medium text-[#2e5899]">
              Name <strong class="text-xl font-bold text-red-600">*</strong>{" "}
            </label>
            <div class="flex items-center rounded p-2">
              <div class="mr-2">
                <BsPersonFill style={{ color: "#2e5899" }}></BsPersonFill>
              </div>
              <input
                type="text"
                name="from_name"
                class="w-full rounded-xl border border-[#2e5899] p-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>
          <div class="mb-4 w-2/3 sm:w-1/3">
            <label for="zip_code" class="block font-medium text-[#2e5899]">
              Zip Code <strong class="text-xl font-bold text-red-600">*</strong>{" "}
            </label>
            <div class="flex items-center rounded p-2">
              <div class="mr-2">
                <BsGeoAltFill style={{ color: "#2e5899" }}></BsGeoAltFill>
              </div>
              <input
                type="tel"
                name="zip_code"
                class="w-full rounded-xl border border-[#2e5899] p-2 focus:border-blue-500 focus:outline-none"
                maxLength={5}
                required
              />
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center md:flex-row">
          <div class="mb-4 w-full sm:w-1/2">
            <label for="email" class="block font-medium text-[#2e5899]">
              Email <strong class="font-bold text-red-600">*</strong>
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
                class="w-full rounded-xl border border-[#2e5899] p-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>
          <div class="mb-4 w-full md:w-1/2">
            <label for="tel" class="block font-medium text-[#2e5899]">
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
                class="w-full rounded-xl border border-[#2e5899] p-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div class="mb-4">
          <label for="message" class="block  font-medium text-[#2e5899]">
            Message<strong class="text-xl font-bold text-red-600">*</strong>
          </label>
          <div class="flex items-center rounded p-2">
            <div class="mr-2">
              <BsChatSquareTextFill
                style={{ color: "#2e5899" }}
              ></BsChatSquareTextFill>
            </div>
            <textarea
              name="message"
              class="w-full rounded-xl border border-[#2e5899] p-2 focus:border-blue-500 focus:outline-none"
              rows={4}
              required
            ></textarea>
          </div>
        </div>
        <button
          type="button"
          class="w-full rounded-xl bg-secondary-red px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:outline-none"
          onClick$={() => {
            const formData = new FormData(document.getElementById("s_form"));
            const data = Object.fromEntries(formData);
            data["template_id"] = "template_o9rn4rx";
            console.log(data);
            fetch("/api/emailjs/", {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((res) => console.log(res));
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
});
