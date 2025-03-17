import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import SectionHero from './SectionHero';
import SectionNumbers from './SectionNumbers';
import { Paragraph } from '~/components/Paragraph';

export default component$(({ data }: { data: any }) => {
  const location = useLocation();
  const isES = location.prevUrl?.pathname.includes("/es/");

  const pageData = data['pageBastropP']['data']['attributes'];

// INTRO SECTION
  const introPar = pageData['IntroPar'];

// FAQ SECTION
  const faqPar = pageData['FaqPar'];
  const faqList = pageData['FaqList']
  
// NUMBERS SECTION
  const numbersTitle = isES ? 'Brindando oportunidades en Bastrop': 'Bringing Online Opportunities to Bastrop';
  const numbersParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '

// CONTACT SECTION
const contactPar = pageData['ContactPar'];

return  <div class="flex flex-col items-center justify-center">
            
            <div class="max-w-[1200px] flex flex-col px-8 py-10 text-primary-blue items-center justify-center gap-10">
          
              <SectionHero
                introPar={introPar}
                faqPar={faqPar}
                faqs={faqList}
                isES={isES}
                
              />
                
              <SectionNumbers
                title={numbersTitle}
                desc={numbersParagraph}
                isES={isES}
              />

              <Paragraph
                backgroundColor='transparent'
                title={contactPar.Title}
                text={contactPar.Paragraph}
                image={contactPar.Media.data.attributes}
              />

    </div>
  </div>
});