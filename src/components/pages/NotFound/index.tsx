import { component$ } from "@builder.io/qwik";

export const NotFound = component$(() => {
  return (
    <div class="flex w-full items-center justify-center px-8 py-12 text-center text-primary-dark-blue">
      <div class="flex max-w-[1000px] flex-col items-center justify-center">
        <span class="text-[50px] font-[300]">Oops!</span>
        <span class="text-[18px] font-[400]">
          The page you are looking for does not exist.
        </span>
        <h1 class="text-[150px] font-[700] max-[400px]:text-[100px]">404</h1>
        <span class="text-[30px] font-[500] text-secondary-red">
          Something went wrong.
        </span>
      </div>
    </div>
  );
});
