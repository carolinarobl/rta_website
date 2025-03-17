import { component$ } from '@builder.io/qwik';
import { Markdown } from '~/components/Markdown';
import { FormContact } from '~/components/forms/form-contact';


export default component$(({ faqList, paragraph, formTitle, lang }: { faqList: any, paragraph:string, formTitle: string, lang?: string }) => {  

  return <div class="flex max-[800px]:flex-col items-center justify-center my-4">
            
            <section class="min-[800px]:w-1/2 flex flex-col gap-4">
                <Markdown
                text={paragraph}
                />

                <FormContact
                    templateID={'contact_template'}
                    mailto='carolinaroblero8@gmail.com'
                    subject='Bastrop Test'
                    lang={lang ?? 'en'}
                />

            </section>

            {/* <section class="flex flex-col md:items-start items-center justify-center gap-1 text-center min-[800px]:w-1/2 md:px-2">
                <SectionFaq
                    faqList={faqList}    
                />
            </section> */}

        </div>
});