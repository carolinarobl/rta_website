import { component$ } from '@builder.io/qwik';
import { Markdown } from '~/components/Markdown';
import SearchAddressBox from '~/components/SearchAddressBox';
import { StrapiImage } from '~/components/StrapiImage';
import FaqListing from '../../FaqListing';
import { Button } from '~/components/Button';
import { FaCircleArrowRightSolid } from '@qwikest/icons/font-awesome';



export default component$(({ introPar, faqPar, faqs, isES }: { introPar:any, faqPar: any, faqs: any, isES?: boolean }) => {  
        
  return <div class="md:min-h-[85vh] flex md:flex-row flex-col items-start justify-center w-full bg-white rounded-[30px] gap-4 p-2 z-5">
            
        <section class="flex-1 w-full md:w-1/2 min-w-0 h-full flex flex-col ">
                <div class="rounded-[30px] overflow-hidden flex items-start justify-center relative  ">
                    
                    <StrapiImage
                        media={introPar.Media.data.attributes}
                        clasN="absolute min-w-full min-h-full object-cover pointer-events-none"
                    />

                    <div class="relative w-full h-full grow flex items-start justify-center md:min-h-[85vh]">
   
                    <div class="flex flex-col items-center justify-center h-full grow">
                    
                            <div class="text-center p-10 flex flex-col items-center justify-center gap-4 h-full grow">
                                {introPar.Title &&
                                    <h1 class="text-3xl md:text-6xl font-medium leading-tighter tracking-tighter text-white font-heading max-w-[400px]">
                                        {introPar.Title}
                                    </h1>
                                }
        
                                {introPar.Subtitle &&
                                    <p class="text-l  mb-6 text-white font-thin tracking-[1px]">
                                        {introPar.Subtitle}
                                    </p>
                                }

                                {introPar.Paragraph &&
                                    <div class='max-w-2xl'>
                                        <Markdown
                                            text={introPar.Paragraph}
                                            classN='text-white font-thin text-[12px] md:text-[14px]'
                                        />
                                    </div>
                                }

                                <SearchAddressBox isES={isES}/> 
                                
                                <div class='max-w-2xl'>
                                        <Markdown
                                            text={isES? '* Ingresa tu dirección y selecciona una opción de la lista' : '* Type your address and choose an option from the dropdown list'}
                                            classN='text-white font-extrabold text-[12px] md:text-[14px]'
                                        />
                                    </div>
                            </div>

                        </div>
                </div>
            </div>

            </section>
           
            <section class="flex-1 w-full md:w-1/2 min-w-0 !z-0 flex-col">
                { faqPar &&
                    <div class="px-4 flex flex-col">
                        <Markdown text={faqPar.Title} classN='md:!text-[35px] !text-[20px] mt-4 md:text-start text-center'/>
                        
                        
                    </div>
                }

                <FaqListing faqs={faqs}/>

                { faqPar.Paragraph &&
                    <div class="px-4 flex flex-col">
                        <Markdown text={faqPar.Paragraph} classN=''/>

                        <div class="flex flex-wrap gap-2 py-4">
                        {faqPar.Buttons &&
                            faqPar.Buttons.map((button: any, i: number) => (
                                <Button
                                    key={i}
                                    text={button["Text"]}
                                    link={button["Link"]}
                                    type={button['Link'].startsWith("tel:") ? "action" : "link"}
                                >
                                    <FaCircleArrowRightSolid
                                        color="#13B295"
                                        class="text-[21px] opacity-60"
                                    />
                                </Button>
                            ))}

                        </div>
                       
                    </div>


                }

            </section>
        </div>});