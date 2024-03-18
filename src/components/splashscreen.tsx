import { component$ } from "@builder.io/qwik";
import { Spinner } from "./Spinner";
import { Image } from '@unpic/qwik';

export const Splashscreen = component$(() => {
  return <div class="flex absolute flex-col items-center justify-center m-auto gap-2 h-full w-full bg-gradient-radial from-white via-slate-200 to-slate-300">
    <Image
        src="https://strapi.rtatel.com/uploads/RTA_db22afd96e.webp"
        alt="RTA image loading"
        width={250}
        height={200}
      />
      <Spinner size="150px"></Spinner>
  </div>
});