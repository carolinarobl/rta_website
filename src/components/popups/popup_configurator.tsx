import {  component$ } from "@builder.io/qwik";

export const PopupConfigurator = component$(({ route }: { route: string}) => {

    return <div
    class={`fixed bottom-0 left-0 right-0 bg-white top-${
       "0 z-[200]" 
    }  transition-all duration-1000 ease-in-out`}
  >
   
    <iframe
      src={route}
      class="h-full w-full"
      frameBorder="0"
    ></iframe>
  </div>
});