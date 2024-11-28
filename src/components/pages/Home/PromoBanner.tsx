import { component$} from "@builder.io/qwik";
import { BsArrowDownCircleFill} from "@qwikest/icons/bootstrap";
import { Markdown } from "~/components/Markdown";

export const PromoBanner = component$(({ data }: { data: any }) => {
  const promoBanner = data;

  return (
    <>
              {/* BANNER DE PROMOCIÓN */}
              <div class={`${promoBanner['Display'] && promoBanner['Display'] ? 'flex flex-col' : 'hidden'} overflow-hidden bg-black rounded-bl-full rounded-tl-full text-white gap-1  max-[1000px]:w-full min-[1000px]:max-w-[420px] max-[1000px]:rounded-[30px]`}>
               
                <div class="md:block hidden bg-white w-full text-black flex flex-row text-[8px] font-bold tracking-[4px] whitespace-nowrap">PROMO PROMO PROMO PROMO PROMO PROMO PROMO PROMO PROMO PROMO</div>
                
                <div class="flex flex-row items-center">
                  <div class={`animate-[bounce_2s_ease-in-out_infinite] m-2 bg-primary-blue bg-opacity-40 p-2 inline-block items-center justify-center rounded-full`}>
                    <div class={`bg-primary-blue flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-opacity-60 p-2 shadow-md`}>
                      <div class={`bg-blue-500 flex h-[35px] w-[35px] items-center justify-center overflow-hidden rounded-full bg-opacity-80 shadow-md`}>
                        <BsArrowDownCircleFill class="fill-white font-bold text-[20px]" />
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col">
                    <Markdown text={promoBanner['Title']} classN="!text-white"/>
                    <Markdown text={promoBanner['Caption']} classN="!text-[12px] !text-white"/>
                  </div>
                </div>
                
                <div class="md:block hidden bg-white w-full text-black flex flex-row text-[8px] font-bold tracking-[4px] whitespace-nowrap">PROMO PROMO PROMO PROMO PROMO PROMO PROMO PROMO PROMO PROMO</div>
              
              </div>
    </>
  );
});
