import { component$ } from "@builder.io/qwik";
// import { QwikRive } from "qwik-rive";
import { Markdown } from "~/components/Markdown";
import { StrapiImage } from "~/components/StrapiImage";

export const ProsSection = component$(({ data }: { data: any }) => {
  const { prosData, prosPar} = data;
  return (
    <>
      <style>
        {`
          .icon-blue img {
            filter: brightness(0) saturate(100%) invert(25%) sepia(48%) saturate(1744%) hue-rotate(195deg) brightness(95%) contrast(90%);
          }
        `}
      </style>
    <div class="flex justify-center px-4 py-12 md:px-8 md:py-16">
      <div class="flex w-full max-w-[1100px] flex-col items-center">
        {/* Header Section - Todo centrado */}
        <div class="mb-10 max-w-[650px] text-center md:mb-14">
          {/* Título principal con color */}
          <h2 class="mb-3 text-2xl font-bold leading-tight text-primary-blue md:text-3xl lg:text-[38px]">
            <Markdown text={prosPar["Title"]} classN={'!font-bold !text-inherit'} />
          </h2>
          
          {/* Párrafo descriptivo con color */}
          <div class="text-[15px] leading-relaxed md:text-base">
            <Markdown text={prosPar["Paragraph"]}  />
          </div>
        </div>
         
        {/* Grid de pros - Tarjetas azules con texto blanco */}
        <div id='prosList' class="grid w-full gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {prosData.map((pro:any, i:any) => {
            return (
              <div 
                key={i} 
                class="group flex flex-col items-center rounded-3xl bg-primary-blue p-6 text-center shadow-lg shadow-primary-blue/20 transition-all duration-300 hover:-translate-y-2 hover:bg-primary-dark-blue hover:shadow-xl hover:shadow-primary-dark-blue/30 md:p-7"
              >
                {/* Círculos concéntricos con ícono - estilo SectionSugHome */}
                <div class="relative mb-5 inline-block rounded-full bg-white bg-opacity-40 p-2 transition-all duration-300 group-hover:scale-110">
                  <div class="flex items-center justify-center overflow-hidden rounded-full bg-white bg-opacity-60 p-2 shadow-sm">
                    <div class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white bg-opacity-90 shadow-md">
                      <div class="icon-blue">
                        <StrapiImage
                          width={28}
                          height={28}
                          media={pro["Icon"]["data"]["attributes"]}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Punto decorativo flotante */}
                  <div class="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-secondary-red opacity-90 shadow-sm transition-all duration-300 group-hover:scale-125"></div>
                </div>
                
                {/* Título centrado blanco */}
                <h3 class="mb-2.5 text-lg font-bold leading-snug text-white transition-all duration-300 group-hover:scale-105 md:text-xl">
                  <Markdown text={pro["Title"]} classN={'!font-bold !text-inherit'} />
                </h3>
                
                {/* Texto descriptivo blanco */}
                <div class="text-[14px] leading-relaxed text-white opacity-90 md:text-[15px]">
                  <Markdown text={pro["Text"]} classN={'!text-inherit'} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
});
