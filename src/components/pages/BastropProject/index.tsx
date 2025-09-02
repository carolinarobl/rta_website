import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import SectionHero from './SectionHero';
// import SectionNumbers from './SectionNumbers';
import { ListedParagraphs, Paragraph } from '~/components/Paragraph';
import { StrapiAsset } from '~/components/StrapiAsset';

export default component$(({ data }: { data: any }) => {
  const location = useLocation();
  const isES = location.prevUrl?.pathname.includes("/es/");

  const pageData = data['pageBastropP']['data']['attributes'];
  const configuratorRoute = data['pageHome']['data']['attributes']['HeroForm']['ActionButton']['Link'];

// INTRO SECTION
  const headerDekstop = pageData['HeaderDesktop']['data']['attributes'];
  const headerMobile = pageData['HeaderMobile']['data']['attributes'];
  const introPar = pageData['IntroPar'];

// FAQ SECTION
  const faqPar = pageData['FaqPar'];
  const faqList = pageData['FaqList']
  
  const tempOffersPlans = faqList.find((item: { Table: any[]; Paragraph: any; }) => 
    item.Table.length > 0 && (item.Paragraph.includes('plans') || item.Paragraph.includes('planes'))
  );


  const plansTables = tempOffersPlans && tempOffersPlans.Table.filter((item: { ColumnOne: string; }) => !item.ColumnOne.startsWith('**'));

// NUMBERS SECTION
  // const numbersTitle = isES ? 'Brindando oportunidades en Bastrop': 'Bringing Online Opportunities to Bastrop';
  // const numbersParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '

// BOTTOM PARAGRAPHS SECTION
// const contactPar = pageData['ContactPar'];
  const bottomPars = pageData['BottomPars'];

    const QSectionMap = useSignal<any>(null); // Usamos useSignal para guardar el componente


    // Con useVisibleTask$, el código solo se ejecuta una vez que
  // el componente es visible en el navegador (en el cliente).
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    // Importación dinámica
    import('../../../components/pages/BastropProject/SectionMapReact').then((mod) => {
      QSectionMap.value = mod.QSectionMap;
    });

    // Cleanup si es necesario
    cleanup(() => {
      // Código de limpieza
    });
  });



return  <div class="flex flex-col items-center justify-center">

          {headerDekstop &&
            <div class="bg-white w-full !max-h-[250px] min-[600px]:flex hidden">
              <StrapiAsset
                media={headerDekstop}
                width={900}
                height={924}
              />
            </div>
          }
          
          {headerMobile &&
            <div class="bg-white w-full !max-h-[250px] min-[600px]:hidden flex">
              <StrapiAsset
                media={headerMobile}
                width={650}
                height={650}
              />
            </div>
          }
            <div class="max-w-[1200px] flex flex-col text-primary-blue items-center justify-center gap-10">

              <SectionHero
                introPar={introPar}
                faqPar={faqPar}
                faqs={faqList}
                isES={isES}
                confLink={configuratorRoute}
              />

              <div class="flex flex-col w-full">

                <Paragraph
                title={isES ? 'Nuestros planes':'Our Plans'}
                logo={{'url':'/uploads/gig_FAST_Internet_0253314cce.webp'}}
                text={isES?'Dale un vistazo a las ofertas disponibles en esta área':'Take a look of the available offers in this area'}
                backgroundColor='transparent'/>

                <div class="flex justify-evenly gap-4 max-[1400px]:flex-wrap ">
                  {plansTables &&
                  plansTables.map((table:any, i:any) => (
                    <div key={i} class={`relative ${i%2==0 ? 'bg-blue-500' : 'bg-primary-blue'} text-white px-4 py-8 w-48 h-40 rounded-xl overflow-hidden shadow-lg !-z-[10]`}>
                      <div class={`absolute -top-5 -right-5 w-14 h-14 ${i%2==0 ? 'bg-primary-blue' : 'bg-blue-500'} rounded-full`}></div>
                        
                      <h2 class="text-2xl font-bold">{table['ColumnOne']}</h2>
                      
                      <p class="text-sm">{table['ColumnTwo']}</p>
                      <p class="text-xl py-4 font-bold">{table['ColumnThree']}<span class='text-sm font-thin'>/mo</span></p>
                    </div>
                  ))}
                </div>
              </div>
                
              {/* <SectionNumbers
                title={numbersTitle}
                desc={numbersParagraph}
                isES={isES}
              /> */}

              {/* <Paragraph
                backgroundColor='transparent'
                title={contactPar.Title}
                text={contactPar.Paragraph}
                image={contactPar.Media.data.attributes}
              /> */}

            

    </div>

      {QSectionMap.value ? (
        <QSectionMap.value />
      ) : (
        <div>Loading Map...</div>
      )}
    
    <div class="w-full justify-center bg-[#ebf4fc]">
              <ListedParagraphs
              data={bottomPars}
              />
            </div>

  </div>

});

