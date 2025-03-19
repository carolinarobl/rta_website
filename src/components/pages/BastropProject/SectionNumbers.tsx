import { component$ } from '@builder.io/qwik';
import NumberCounter from './NumberCounter';
import { Paragraph } from '~/components/Paragraph';

export default component$(({ title, desc, isES}: { title: string, desc: string, isES?:boolean}) => {  

    const counterBoxStyle= 'bg-white max-w-[150px] min-w-[70px] rounded-[15px] p-3 md:max-w-full flex items-center justify-center grow';

  return    <div class="flex max-[800px]:flex-col-reverse w-full gap-4">
                <section class="flex flex-col items-center justify-center min-[800px]:w-1/2 gap-4 ">
                                        
                    <div class="w-full flex flex-wrap gap-3 items-center justify-center" >
    
                        <div class={`${counterBoxStyle}`}>
                            <div class="max-w-[130px]">
                                <NumberCounter
                                    title={isES ? 'Millas de ruta de fibra':'Fiber Route Miles'}
                                    totalData={110000}
                                    progressData={33200}
                                    color='#ffd251'
                                />
                            </div>
                        </div>
  
                        <div class={`${counterBoxStyle}`}>
                            <div class="max-w-[130px]">
                                <NumberCounter
                                    title={isES ? 'Ubicaciones sin servicio':'Unserved Locations'}
                                    totalData={10471}
                                    progressData={1200}
                                    color='#8098f0'
                                />
                            </div>
                        </div>
  
                        <div class={`${counterBoxStyle}`}>
                            <div class="max-w-[130px]">
                                <NumberCounter
                                    title={isES ? 'Ubicaciones pasadas':'Total Locations Passed'}
                                    totalData={5324}
                                    progressData={200}
                                    color='#ff9f69'
                                />
                            </div>
                        </div>
                  
                    </div>

                </section>
  
  
                <section class="flex flex-col items-center justify-start gap-1 text-center min-[800px]:w-1/2 md:px-2">
                    {/* <div class="min-[800px]:text-justify text-[16px] max-[800px]:text-[13px]">
                        <Markdown text={title} />
                    </div>   
                    {
                        desc &&
                        <Markdown text={desc} />

                    } */}
                    <Paragraph
                        title={title}
                        text={desc}
                        backgroundColor='transparent'
                    />
                </section>
                    
            </div>
  
});