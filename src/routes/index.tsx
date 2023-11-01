import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const signTest = useSignal("test");
  return (
    <>
      <h1 class="text-red-400">Signal: {signTest.value}</h1>
      <button onClick$={()=>{
        signTest.value += "!";
      }}>Añadir "!"</button>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
