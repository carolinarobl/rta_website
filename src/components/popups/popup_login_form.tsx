import { component$, useSignal, type Signal } from "@builder.io/qwik";
import { Form, globalAction$, useLocation } from "@builder.io/qwik-city";
import { BsGeoAltFill } from "@qwikest/icons/bootstrap";
import { loginPopupQuery } from "~/data/gql_queries/popups_queries/login_popup_query";
import { getPageCustomData } from "~/services/graphql";
import { getLocationDataByZipCode } from "~/services/locationApi";
import { Spinner } from "../Spinner";
import { telPopupQuery } from "~/data/gql_queries/popups_queries/tel_popup_query";

interface FormResponse {
  success: boolean;
  data?: any;
  locationInfo?: {
    location: string;
    phone: string;
  };
  error?: string;
}

export const useSubmitFormZip = globalAction$(async (data): Promise<FormResponse> => {
  try {
    const zipCode = data["zip-code"].toString();

    // Step 1: Get complete location data from external API
    const locationData = await getLocationDataByZipCode(zipCode);

    if (!locationData || !locationData.siteid) {
      return {
        success: false,
        error: "location_not_found"
      };
    }

    const locationKey = locationData.siteid;

    // Step 2: Query Strapi using LocationKey
    const office = await getPageCustomData(loginPopupQuery(locationKey));

    if (office.pageData["data"]["offices"]["data"].length > 0) {
      const portalUrl = office.pageData["data"]["offices"]["data"][0]["attributes"]["InstanceLink"];
      return {
        success: true,
        data: portalUrl,
        locationInfo: {
          location: locationData.location,
          phone: locationData.phone
        }
      };
    }

    return {
      success: false,
      error: "portal_not_found"
    };
  } catch (error) {
    console.error("Error in useSubmitFormZip:", error);
    return {
      success: false,
      error: "server_error"
    };
  }
});

export const useSubmitFormTel = globalAction$(async (data): Promise<FormResponse> => {
  try {
    const zipCode = data["zip-code"].toString();

    // Step 1: Get complete location data from external API
    const locationData = await getLocationDataByZipCode(zipCode);

    if (!locationData || !locationData.siteid) {
      return {
        success: false,
        error: "location_not_found"
      };
    }

    const locationKey = locationData.siteid;

    // Step 2: Query Strapi using LocationKey
    const office = await getPageCustomData(telPopupQuery(locationKey));

    if (office.pageData["data"]["offices"]["data"].length > 0) {
      const officeData = office.pageData["data"]["offices"]["data"][0]["attributes"];
      return {
        success: true,
        data: officeData,
        locationInfo: {
          location: locationData.location,
          phone: locationData.phone
        }
      };
    }

    return {
      success: false,
      error: "portal_not_found"
    };
  } catch (error) {
    console.error("Error in useSubmitFormTel:", error);
    return {
      success: false,
      error: "server_error"
    };
  }
});

interface Props {
  title: string;
  description: string;
  btnText: string;
  popup: "login" | "location";
  notFountText?: string;
  showModal?: Signal<boolean>;
}

export const PopupLoginForm = component$(
  ({ title, description, btnText, popup, notFountText, showModal }: Props) => {
    const submitForm = useSubmitFormZip();
    const getData = useSignal(false);
    const location = useLocation();
    const isES = location.prevUrl?.pathname.includes("/es/");

    // Helper function to get error message
    const getErrorMessage = (error: string | undefined) => {
      if (!error) return null;
      
      const messages: Record<string, { es: string; en: string }> = {
        location_not_found: {
          es: "No se encontró información para este código postal",
          en: "No information found for this zip code"
        },
        portal_not_found: {
          es: "Lo sentimos, no hay un portal disponible para su ubicación",
          en: "Sorry, there is no portal available for your location"
        },
        server_error: {
          es: "Error del servidor. Por favor, intente nuevamente",
          en: "Server error. Please try again"
        }
      };

      const message = messages[error];
      return message ? (isES ? message.es : message.en) : (notFountText || (isES ? "No encontrado" : "Not found"));
    };

    return (
      <div class="z-[800] relative flex h-fit w-full max-w-[550px] mx-4 flex-col items-center bg-white rounded-3xl shadow-2xl">
        {/* Header con gradiente azul */}
        <div class="relative w-full bg-gradient-to-r from-primary-blue to-primary-light-blue px-6 md:px-8 pt-8 pb-6 rounded-t-3xl">
          {/* Botón cerrar DENTRO del header */}
          {showModal && (
            <button
              type="button"
              onClick$={() => (showModal.value = false)}
              class="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-all hover:bg-white/30 hover:scale-110 active:scale-95"
              aria-label="Cerrar"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          )}
          
          <div class="flex flex-col items-center gap-3 text-center">
            <div class="flex items-center justify-center rounded-full bg-white shadow-xl p-2">
              <BsGeoAltFill class="text-primary-blue" />
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
              {title}
            </h2>
            <p class="text-sm md:text-base text-white/90 max-w-md">{description}</p>
          </div>
        </div>

        {/* Content */}
        <div class="w-full px-6 md:px-8 py-6 flex flex-col gap-6">
          {/* Form */}
          <Form class="w-full" action={submitForm} onSubmit$={() => {
            getData.value = true;
          }}>
            <div class="flex flex-col gap-4 w-full">
              {/* Input Group */}
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                  <BsGeoAltFill class="h-5 w-5 text-primary-blue" />
                </div>
                <input
                  type="text"
                  maxLength={5}
                  name="zip-code"
                  placeholder={isES ? "Ingresa tu código postal" : "Enter your zip code"}
                  required
                  class="w-full rounded-full border-2 border-gray-200 bg-gray-50 py-3.5 pl-14 pr-6 text-base text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary-blue focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-blue/10"
                />
              </div>

              {/* Submit Button */}
              <button
                class="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-btn-green to-teal-500 px-6 py-4 font-semibold text-base text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={submitForm.isRunning}
              >
                <span class="relative z-10">{btnText}</span>
                <div class="absolute inset-0 -z-0 bg-gradient-to-r from-teal-600 to-btn-green opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </button>
            </div>
          </Form>

          {/* Loading state */}
          {submitForm.isRunning && (
          <div class="flex flex-col items-center gap-3 py-4">
            <Spinner size="50px"></Spinner>
            <p class="text-sm text-gray-500">
              {isES ? "Buscando..." : "Searching..."}
            </p>
          </div>
        )}

        {/* Success state for login popup */}
        {popup === "login" && !submitForm.isRunning && submitForm.value?.success && submitForm.value.data && (
          <div class="flex w-full flex-col items-center gap-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 border-2 border-green-200">
            <div class="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div class="flex flex-col items-center gap-2 text-center">
              <p class="text-xl font-bold text-green-700">
                {isES ? "¡Portal encontrado!" : "Portal found!"}
              </p>
              {submitForm.value.locationInfo && (
                <div class="flex flex-col gap-1">
                  <p class="text-sm font-medium text-gray-500">
                    {isES ? "Zona de servicio:" : "Service area:"}
                  </p>
                  <p class="text-base font-semibold text-primary-blue">
                    {submitForm.value.locationInfo.location}
                  </p>
                </div>
              )}
            </div>
            <a 
              href={submitForm.value.data.toString()}
              target="_blank"
              rel="noopener noreferrer"
              class="w-full"
            >
              <button class="w-full rounded-full bg-primary-blue px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:bg-primary-dark-blue hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                {isES ? "Acceder al portal →" : "Access portal →"}
              </button>
            </a>
          </div>
        )}

        {/* Success state for location popup */}
        {popup === "location" && !submitForm.isRunning && submitForm.value?.success && submitForm.value.data && (
          <div class="flex w-full flex-col items-center gap-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 border-2 border-blue-200">
            <div class="flex h-14 w-14 items-center justify-center rounded-full bg-primary-blue shadow-lg">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <div class="flex flex-col items-center gap-2 text-center">
              <p class="text-lg font-semibold text-gray-700">
                {submitForm.value.data["Location"]?.toString()}
              </p>
              {submitForm.value.locationInfo && (
                <div class="flex flex-col gap-1">
                  <p class="text-sm font-medium text-gray-500">
                    {isES ? "Zona de servicio:" : "Service area:"}
                  </p>
                  <p class="text-base font-semibold text-primary-blue">
                    {submitForm.value.locationInfo.location}
                  </p>
                </div>
              )}
            </div>
            <a 
              href={submitForm.value.data["Phone"]["Link"]?.toString()}
              target="_blank"
              rel="noopener noreferrer"
              class="w-full"
            >
              <button class="w-full rounded-full bg-gradient-to-r from-btn-green to-teal-500 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                {submitForm.value.data["Phone"]["Text"]}
              </button>
            </a>
          </div>
        )}

        {/* Error state */}
        {!submitForm.isRunning && getData.value && submitForm.value && !submitForm.value.success && (
          <div class="flex w-full flex-col items-center gap-3 rounded-2xl bg-red-50 p-6 border-2 border-red-200">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-red shadow-lg">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <p class="text-center text-base font-medium text-red-700">
              {getErrorMessage(submitForm.value.error)}
            </p>
          </div>
        )}
        </div>
      </div>
    );
  },
);
