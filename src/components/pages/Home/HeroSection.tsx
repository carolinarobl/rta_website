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
    <div class="relative flex min-h-[85vh] w-full flex-col items-center justify-end overflow-hidden">
      {/* Video de fondo con overlay */}
      <div class="absolute inset-0 z-0">
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
        
        {/* Overlay degradado - más oscuro abajo para contraste con el form */}
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60"></div>
      </div>

      {/* Título hero - Posicionado en la parte superior */}
      {data?.['HeroTitle'] && (
        <div class="absolute left-0 right-0 top-12 z-[1] animate-fade-in px-4 text-center md:top-20">
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

      {/* Contenido principal - Posicionado en la parte inferior para no tapar el video */}
      <div class="relative z-[1] flex w-full flex-col items-center gap-6 pb-8 md:pb-12">
        
        {/* Features badges arriba del form */}
        {data?.['HeroFeatures'] && Array.isArray(data['HeroFeatures']) && (
          <div class="flex flex-wrap items-center justify-center gap-4 px-4 md:gap-6">
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

        {/* Formulario Header - En la parte inferior, sin tapar el video */}
        <div class="w-full animate-slide-in-right">
          {headerData && <Header data={headerData} isHeroMode={true} />}
        </div>
      </div>
    </div>
  );
});
