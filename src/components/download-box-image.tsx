import { component$ } from "@builder.io/qwik";
import { Button } from "./Button";

export const DownloadBoxImage = component$(() => {
    return <div class="h-[250px] w-[250px] bg-white rounded-2xl pb-2 flex flex-col items-center justify-between shadow-2xl">
        <div class="relative flex w-full h-1/2 overflow-hidden">
            <img class="object-cover w-full h-full rounded-t-2xl" src="https://images.unsplash.com/photo-1699306610682-986e479a5b39?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

            <div class="before:absolute before:inset-0 before:bg-gradient-to-t before:from-white before:via-transparent before:h-full before:w-full before:rounded-t-2xl before:bottom-0"></div>
        </div>
        <h2 class="text-center">Título de guía a descargar, texto de ejemplo</h2>
        <Button text="Descargar"></Button>
    </div>
});