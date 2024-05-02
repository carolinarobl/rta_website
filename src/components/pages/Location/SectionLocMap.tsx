import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/Button";
import { Markdown } from "~/components/Markdown";

export const SectionLocMap = component$(({ data }: { data: any }) => {
  const isSpanish =
    data["Slug"].substring(data["Slug"].length - 3, data["Slug"].length) ===
    "-es";

  return (
    <div class="flex items-center justify-center text-primary-blue md:px-0 px-5 w-full md:mb-10 mb-5 ">
        <div class="flex grow max-w-[1200px] max-h-[800px] flex flex-row  max-[800px]:flex-col gap-5">
        {/* BLOG SECTION */}
        <div class="flex grow flex-col items-center justify-center bg-[#2e5899] text-center text-white h-full w-full rounded-[20px] font-light overflow-hidden ">
        <p class=" bg-black/20 font-bold text-[16px] py-3 px-5 w-full animate-pulse">
          {isSpanish ? "Explora la esencia de tu comunidad con RTA" : "Explore your community's essence with RTA"}

        </p>   
        <p class="h-full text-[14px] pt-5 px-5 grow">
          {isSpanish ? "Descubre historias, eventos y joyas ocultas locales, todo ello impulsado por la tecnología y la innovación." : "Discover local stories, events, and hidden gems, all powered by technology and innovation."}
        </p>
        <div class="p-5">
        <Button
            link={"local-blog/"}
            text= {isSpanish ? "Ir ahora" : "Go Now"}
          />
        </div>
        </div>
    <div class="w-full">
        <iframe
            src={data["office"]["data"]["attributes"]["Address"]}
            class="h-full w-full rounded-2xl"
            loading="lazy"
        >
    </iframe>
    </div>
    </div>
    </div>
  );
});
