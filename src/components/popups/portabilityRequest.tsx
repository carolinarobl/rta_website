import { component$ } from "@builder.io/qwik";

export const PortabilityRequest = component$(({ link }: { link: string }) => {
    console.log(link)
    return <div class="bg-blue-900 h-[550px] w-full sm:w-4/5 flex flex-col justify-between items-center p-6 rounded-2xl">
        <h2 class="text-white font-bold text-xl md:text-4xl mb-2">Get in contact with us</h2>
        <iframe class="w-full h-full overflow-x-visible overflow-y-visible" src={link}></iframe>
    </div>
});