import { component$ } from '@builder.io/qwik';
import { Markdown } from '~/components/Markdown';
import SearchAddressBox from '~/components/SearchAddressBox';
import { StrapiImage } from '~/components/StrapiImage';
// import FaqListing from '../../FaqListing';



export default component$(({ banner, introPar, isES, confLink }: { banner: any, introPar:any, isES?: boolean, confLink:string }) => {  
        
  return <div class="flex md:flex-row flex-col items-start justify-center w-full rounded-[30px] gap-4 p-2 ">
            
        <section class="flex-1 w-full md:w-1/2 min-w-0 flex flex-col ">
                <div class="rounded-[30px] overflow-hidden flex items-start justify-center ">
                    
                    {/* <StrapiImage
                        media={introPar.Media.data.attributes}
                        clasN="absolute min-w-full object-cover pointer-events-none opacity-80"
                    /> */}

                    <div class="w-full flex items-start justify-center">
   
                    <div class="flex flex-col items-center justify-center h-full grow">
                    
                            <div class="text-center p-6 flex flex-col items-center justify-center gap-4 h-full grow">
                                    <StrapiImage
                                    media={banner}
                                    clasN=" min-w-full object-fit pointer-events-none opacity-90"
                                    />


                                {/* {introPar.Title &&
                                    <h1 class="text-3xl md:text-[3.5vw] font-medium leading-none tracking-tighter text-white font-heading">
                                        {introPar.Title}
                                    </h1>
                                } */}
        
                                {introPar.Subtitle &&
                                    <p class="text-l  mb-6  font-thin tracking-[1px]">
                                        {introPar.Subtitle}
                                    </p>
                                }

                                {introPar.Paragraph &&
                                    <div class='max-w-2xl'>
                                        <Markdown
                                            text={introPar.Paragraph}
                                            classN=' text-[12px] md:text-[14px] leading-6'
                                        />
                                    </div>
                                }

                                <SearchAddressBox
                                    isES={isES}
                                    confLink={confLink}
                                /> 
                                
                                <div class='max-w-2xl'>
                                        <Markdown
                                            text={isES? '* Ingresa tu dirección y selecciona una opción de la lista' : '* Type your address and choose an option from the dropdown list'}
                                            classN=' font-extrabold text-[12px] md:text-[14px]'
                                        />
                                    </div>
                            </div>

                        </div>
                </div>
            </div>

            </section>
           
            {/* <section class="flex-1 w-full md:w-1/2 min-w-0 !z-0 flex-col">
                { faqPar &&
                    <div class="px-4 flex flex-col">
                        <Markdown text={faqPar.Title} classN='md:!text-[35px] !text-[20px] mt-4 md:text-start text-center'/>
                        
                        
                    </div>
                }

                <FaqListing faqs={faqs} listall={false} analyticsOrigin='bastrop_faq'/>

            </section> */}
        </div>});