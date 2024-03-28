import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const ServiceGlobal = component$(() => {
    return (
        <div class="justify-between items-center shadow-lg bg-white flex flex-col px-5 rounded-[35px]">
            <div class="items-center self-center flex w-[306px] max-w-full flex-col mt-8">
                <div class="justify-center items-center self-center flex w-full flex-col">
                    <div class="text-blue-800 text-center text-2xl font-bold leading-6 self-center mt-6 whitespace-nowrap">
                        Nombre Paquete
                    </div>
                </div>
                <div class="text-blue-800 text-center text-base leading-4 tracking-tighter mt-5">
                    <span class="font-light text-rose-700">$</span>
                    <span class="font-light text-blue-800">100</span>
                    <span class=" text-blue-800">/month</span>
                </div>
                <div class="text-blue-800 text-center text-base mt-5">
                    Descripción de prueba para la versión sencilla del pricing table.
                </div>
                <div class="self-stretch w-full h-px mt-5"></div>
                <div class="text-blue-800 text-base mt-5">
                    <span class="">eye </span>
                    <span class="">
                        {" "}
                        Feature 1<br />
                    </span>
                    <span class="">eye </span>
                    <span class="">
                        {" "}
                        Feature 2<br />
                    </span>
                    <span class="">eye </span>
                    <span class=""> Feature 3</span>
                </div>
            </div>
            <Link href="#">
                <div class="justify-center items-center self-center shadow bg-white flex w-[306px] max-w-full flex-col mt-64 mb-8 px-5 py-1.5 rounded-[100px] border-2 border-solid border-teal-500 border-opacity-60 max-md:mt-10">
                    <div class="self-center flex w-full justify-around items-center gap-2">
                        <div class="text-teal-500 text-base text-center font-bold tracking-wide my-auto">
                            Comprar ahora
                        </div>
                        <div class="text-white text-center text-sm font-black tracking-wide self-stretch justify-center items-center content-center flex bg-teal-500 bg-opacity-60 w-[30px] h-[30px] max-w-full p-1 rounded-[100px] whitespace-nowrap">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clip-rule="evenodd" />
                            </svg>

                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
});