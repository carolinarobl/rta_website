import { component$ } from "@builder.io/qwik";

export const DownloadBox = component$(() => {
    return <div class="flex flex-col h-[250px] w-[350px] bg-white rounded-2xl justify-center items-center p-4">
        <h3 class="text-2xl flex text-center font-bold text-[#2E5899]">Título de guía a descargar, texto de ejemplo</h3>
        <button class="bg-white w-[150px] font-bold flex items-center h-10 text-green-500 border-solid rounded-3xl my-4">
            Download
        </button>
    </div>
});