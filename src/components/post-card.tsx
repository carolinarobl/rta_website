import { component$ } from "@builder.io/qwik";

export const PostCard = component$(() => {
  return (
    <div class="justify-between my-8 items-center shadow-lg bg-white flex flex-col px-5 rounded-[35px]">
      <div class="items-center self-center flex w-[287px] max-w-full flex-col mt-8">
        <img
        width={300}
        height={200}
          loading="lazy"
          srcset="..."
          class="aspect-[1.91] object-contain object-center w-full overflow-hidden self-start"
        />
        <div class="items-start flex w-full grow flex-col mt-5 self-start">
          <div class="overflow-hidden text-blue-800 text-ellipsis text-xl font-semibold">
            Este es el título del artículo que está pasando de dos líneas
            <br />
          </div>
          <div class="overflow-hidden text-slate-400 text-ellipsis whitespace-nowrap text-base self-stretch mt-2.5">
            Esta es la previa del cuerpo del artículo. Podrás leer este texto de
            ejemplo hasta la tercer línea.
          </div>
        </div>
      </div>
      <div class="items-start self-center flex w-[287px] max-w-full justify-between mt-16 mb-8 max-md:mt-10">
        <div class="text-slate-400 text-xs mr-0 my-auto">Octubre 19 , 2023</div>
        <div class="text-teal-500 font-bold text-center justify-around items-center shadow bg-white self-stretch flex w-[150px] max-w-full flex-row pl-5 pr-1.5 py-1.5 rounded-[100px] border-2 border-solid border-teal-500 border-opacity-60">
          Leer más
          <div class="text-white text-center text-sm font-black tracking-wide justify-center items-center content-center flex-wrap bg-teal-500 bg-opacity-60 w-[30px] h-[30px] max-w-full p-1 rounded-[100px] self-end whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
});