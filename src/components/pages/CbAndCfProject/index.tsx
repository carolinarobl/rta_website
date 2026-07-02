import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { ListedParagraphs, Paragraph } from '~/components/Paragraph';
import { Markdown } from '~/components/Markdown';
import FaqListing from '~/components/FaqListing';
import SectionHero from './SectionHero';

export default component$(({ data }: { data: any }) => {
  const location = useLocation();
  const isES = location.prevUrl?.pathname.includes("/es/");

  const pageData = data['pageCbAndCf']['data']['attributes'];
  const configuratorRoute = data['pageHome']['data']['attributes']['HeroForm']['ActionButton']['Link'];

  const headerDekstop = pageData['HeaderDesktop']['data']['attributes'];
  const introPar = pageData['IntroPar'];
  const showMap = pageData['showMap'];

  const faqPar = pageData['FaqPar'];
  const faqList = pageData['FaqList'];
  const bottomPars = pageData['MorePar'];

  const tempOffersPlans = faqList.find((item: { Table?: any[]; }) => 
    item.Table?.some((row: { ColumnOne?: string; ColumnTwo?: string; ColumnThree?: string; }) =>
      row.ColumnOne &&
      row.ColumnTwo &&
      row.ColumnThree &&
      !row.ColumnThree.includes('Title') &&
      !row.ColumnThree.includes('Column')
    )
  );

  const plansTables = tempOffersPlans?.Table?.filter((item: { ColumnOne?: string; ColumnThree?: string; }) =>
    item.ColumnOne &&
    item.ColumnThree &&
    !item.ColumnOne.startsWith('**') &&
    !item.ColumnThree.includes('Title') &&
    !item.ColumnThree.includes('Column')
  );

  const QSectionMap = useSignal<any>(null);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    import('../../../components/pages/BastropProject/SectionMapReact').then((mod) => {
      QSectionMap.value = mod.QSectionMap;
    });

    cleanup(() => {});
  });

  return  <div class="flex flex-col items-center justify-center">
    <div class="max-w-[1200px] flex flex-col text-primary-blue items-center justify-center gap-10">
      <div class="relative flex w-full flex-col items-start justify-center gap-4 md:flex-row">
        <div class={`${showMap ? 'flex-1' : ''}`}>
          <SectionHero
            banner={headerDekstop}
            introPar={introPar}
            isES={isES}
            confLink={configuratorRoute}
          />
        </div>

        <div class={`${showMap ? 'relative z-0 w-full flex-1':'hidden'}`}>
          {QSectionMap.value ? (
            <div class="mb-12 h-[380px] w-full overflow-hidden rounded-[16px] md:mb-6 md:h-[80vh] md:overflow-visible">
              <QSectionMap.value />
            </div>
          ) : (
            <div>Loading Map...</div>
          )}
        </div>
      </div>

      <section class="relative z-0 flex w-full flex-col items-start justify-center gap-2 md:flex-row">
        <div class="flex-1 w-full md:w-1/2 min-w-0 flex-col bg-white rounded-[30px]">
          {faqPar &&
            <div class="px-4 flex flex-col">
              <Markdown text={faqPar.Title} classN='md:!text-[35px] !text-[20px] mt-4 md:text-start text-center'/>        
            </div>
          }

          <FaqListing faqs={faqList} listall={false} analyticsOrigin='cb_and_cf_faq'/>
        </div>

        <div class="flex-1 w-full md:w-1/2 min-w-0 flex-col">
          <Paragraph
            title={isES ? 'Nuestros planes':'Our Plans'}
            text={isES?'Dale un vistazo a las ofertas disponibles en esta área':'Take a look of the available offers in this area'}
            backgroundColor='transparent'
          />

          <div class="flex justify-evenly gap-4 flex-col mx-4 ">
            {plansTables &&
              plansTables.map((table:any, i:any) => (
                <div key={i} class={` ${i%2==0 ? 'bg-blue-500' : 'bg-primary-blue'} text-white p-3 w-full rounded-full overflow-hidden shadow-lg flex flex-row items-center justify-between`}>
                  <div class="flex flex-col gap-1">
                    <h2 class="text-2xl font-bold">{table['ColumnOne']}</h2>
                    <p class="text-sm">{table['ColumnTwo']}</p>
                  </div>

                  <div class={`${i%2==0 ? 'bg-primary-blue' : 'bg-blue-500'} rounded-full flex items-center justify-center p-2`}>
                    <p class="text-xl py-4 font-bold">{table['ColumnThree']}<span class='text-sm font-thin'>/mo</span></p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

    </div>

    {bottomPars &&
      <div class="w-full justify-center bg-[#ebf4fc]">
        <ListedParagraphs
          data={bottomPars}
          
        />
      </div>
    }
  </div>
});
