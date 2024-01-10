import { component$ } from "@builder.io/qwik";

interface Props {
    color?:string
}

export const PrimaryInner = component$(({color="bg-blue-800"}:Props) => {
    return (
        <div class="flex w-[400px] flex-col">
          <div class={`shadow-2xl ${color}  bg-opacity-30 self-stretch flex w-full grow flex-col px-5 py-10 rounded-[50%]`}>
            <div class={`${color} bg-opacity-50 self-center flex w-80 max-w-full flex-col px-5 py-10 rounded-[50%]`}>
              <img
              width={450}
              height={450}
                loading="lazy"
                srcset="..."
                class="aspect-square object-contain object-center w-60 overflow-hidden self-center max-w-full"
              />
            </div>
          </div>
        </div>
      );
});