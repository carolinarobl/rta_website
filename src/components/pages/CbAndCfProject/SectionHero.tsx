import { component$ } from '@builder.io/qwik';
import { Markdown } from '~/components/Markdown';
import SearchAddressBox from '~/components/SearchAddressBox';
import { StrapiImage } from '~/components/StrapiImage';

export default component$(({ banner, introPar, isES, confLink }: { banner: any, introPar:any, isES?: boolean, confLink:string }) => {
  return (
    <div class="flex w-full items-start justify-center rounded-[30px] p-2">
      <section class="flex w-full min-w-0 flex-col">
        <div class="flex w-full items-start justify-center rounded-[30px]">
          <div class="flex h-full grow flex-col items-center justify-center">
            <div class="flex h-full grow flex-col items-center justify-center gap-4 p-6 text-center">
              {banner &&
                <StrapiImage
                  media={banner}
                  clasN="min-w-full object-fit pointer-events-none opacity-90"
                />
              }

              {introPar.Title &&
                <Markdown
                  text={introPar.Title}
                  classN='md:!text-[42px] !text-[28px] leading-tight font-semibold'
                />
              }

              {introPar.Subtitle &&
                <p class="mb-6 text-l font-thin tracking-[1px]">
                  {introPar.Subtitle}
                </p>
              }

              {introPar.Paragraph &&
                <div class='max-w-2xl'>
                  <Markdown
                    text={introPar.Paragraph}
                    classN='text-[12px] md:text-[14px] leading-6'
                  />
                </div>
              }

              <SearchAddressBox
                isES={isES}
                confLink={confLink}
              />

              <div class='max-w-2xl'>
                <Markdown
                  text={isES ? '* Ingresa tu dirección y selecciona una opción de la lista' : '* Type your address and choose an option from the dropdown list'}
                  classN='font-extrabold text-[12px] md:text-[14px]'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
