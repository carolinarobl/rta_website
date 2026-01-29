import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { setURL } from "~/data/constants";
import { Header } from "~/components/Header";

export const HeroSection = component$(({ data, headerData }: { data: any; headerData: any }) => {
  const screenW = useSignal<number>(1000);
  
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    screenW.value = window.innerWidth;
    window.addEventListener("resize", () => {
      screenW.value = window.innerWidth;
    });
  });

  return (
    <div class="relative flex min-h-screen w-full flex-col items-center overflow-hidden p-4">
      {/* Video de fondo con overlay - Con márgenes sutiles y bordes redondeados */}
      <div class="relative h-[calc(100vh-2rem)] w-full overflow-hidden rounded-[2.5rem]">
        <video
          class="h-full w-full object-cover"
          poster={setURL(
            data['VideoBGDesktop']?.["data"]?.["attributes"]?.["caption"] || ""
          )}
          preload='auto'
          autoplay
          playsInline
          loop
          muted
        >
          <source 
            src={setURL(
              data[screenW.value <= 800 ? "VideoBGMobile" : "VideoBGDesktop"]?.["data"]?.["attributes"]?.["url"] || ""
            ) + "#t=0.1"} 
            type="video/mp4"
          />
        </video>
        
        {/* Overlay degradado */}
        <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
      </div>

      {/* Formulario Header - Posicionado en la parte superior sobre el video */}
      <div class="absolute left-0 right-0 top-4 z-[2] w-full animate-slide-in-right px-4 md:top-6 md:px-6">
        {headerData && <Header data={headerData} isHeroMode={true} />}
      </div>

      {/* Título hero - Posicionado en el centro-superior */}
      {data?.['HeroTitle'] && (
        <div class="absolute left-0 right-0 top-[30%] z-[1] animate-fade-in px-4 text-center">
          <h1 class="mb-4 text-4xl font-bold leading-tight text-white drop-shadow-2xl md:text-5xl lg:text-6xl">
            {data['HeroTitle']}
          </h1>
          {data?.['HeroSubtitle'] && (
            <p class="text-lg font-medium text-white/95 drop-shadow-lg md:text-xl lg:text-2xl">
              {data['HeroSubtitle']}
            </p>
          )}
        </div>
      )}

      {/* Features badges en la parte inferior */}
      {data?.['HeroFeatures'] && Array.isArray(data['HeroFeatures']) && (
        <div class="absolute bottom-8 left-0 right-0 z-[1] flex flex-wrap items-center justify-center gap-4 px-4 md:bottom-12 md:gap-6">
          {data['HeroFeatures'].map((feature: any, i: number) => (
            <div 
              key={i} 
              class="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 backdrop-blur-md transition-all hover:bg-white/20"
            >
              <span class="text-xl md:text-2xl">{feature.icon}</span>
              <span class="text-sm font-semibold text-white md:text-base">{feature.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
