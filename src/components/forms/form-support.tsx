import { component$ } from "@builder.io/qwik";
import {BsChatSquareTextFill, BsPersonFill, BsGeoAltFill, BsEnvelopeAtFill,
BsTelephoneFill} from "@qwikest/icons/bootstrap"

export const FormSupport = component$(() => {
  return <div class="flex flex-col max-w-lg mx-auto rounded-xl p-6">
  <form class='mt-2'>
      <div class='flex flex-wrap'>
          <div class="mb-4 w-full sm:w-2/3">
              <label for="name" class="block font-medium text-[#2e5899]">Name <strong class='font-bold text-red-600 text-xl'>*</strong> </label>
              <div class="flex items-center p-2 rounded">
                  <div class="mr-2">
                    <BsPersonFill style={{color: '#2e5899'}}></BsPersonFill>
                  </div>
                  <input type="text" id="name"
                      class="w-full border border-[#2e5899] p-2 rounded-xl focus:outline-none focus:border-blue-500"
                      required />
              </div>
          </div>
          <div class="w-2/3 sm:w-1/3 mb-4">
              <label for="zip-code" class="block font-medium text-[#2e5899]">Zip Code <strong class='font-bold text-red-600 text-xl'>*</strong> </label>
              <div class="flex items-center p-2 rounded">
                  <div class="mr-2">
                    <BsGeoAltFill style={{color: '#2e5899'}}></BsGeoAltFill>
                  </div>
                  <input type="tel" id="zip-code" class="w-full border border-[#2e5899] p-2 rounded-xl focus:outline-none focus:border-blue-500" maxLength={5} required />
              </div>
          </div>
      </div>
      <div class='flex flex-wrap md:flex-row items-center'>
          <div class="mb-4 w-full sm:w-1/2">
              <label for="email" class="block font-medium text-[#2e5899]">Email <strong class='font-bold text-red-600'>*</strong></label>
              <div class="flex items-center p-2 rounded">
                  <div class="mr-2">
                    <BsEnvelopeAtFill style={{color: '#2e5899'}}></BsEnvelopeAtFill>
                  </div>
                  <input type="email" id="email" class="w-full border border-[#2e5899] p-2 rounded-xl focus:outline-none focus:border-blue-500" required />
              </div>
          </div>
          <div class="w-full md:w-1/2 mb-4">
              <label for="phone" class="block font-medium text-[#2e5899]">Phone</label>
              <div class="flex items-center p-2 rounded">
                  <div class="mr-2">
                    <BsTelephoneFill style={{color: '#2e5899'}}></BsTelephoneFill>
                  </div>
                  <input type="tel" id="phoneSupport"
                  maxLength={14}
                  class="w-full border border-[#2e5899] p-2 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
          </div>
      </div>
      <div class="mb-4">
          <label for="message" class="block  font-medium text-[#2e5899]">Message<strong class='font-bold text-red-600 text-xl'>*</strong></label>
          <div class="flex items-center p-2 rounded">
              <div class="mr-2">
                <BsChatSquareTextFill style={{color: '#2e5899'}}></BsChatSquareTextFill>
              </div>
              <textarea id="message" class="w-full border border-[#2e5899] p-2 rounded-xl focus:outline-none focus:border-blue-500" rows={4} required></textarea>
          </div>
      </div>
      <button type="submit" class="bg-secondary-red text-white w-full font-semibold px-4 py-2 rounded-xl hover:bg-blue-600 focus:outline-none">
          Submit
      </button>
  </form>
</div>
});