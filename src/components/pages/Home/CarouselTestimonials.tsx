import { component$ } from "@builder.io/qwik";
import Carousel from "~/components/Carousel";

export const CarouselTestimonials = component$(({ testimonials, isMobile=false }: { testimonials: any, isMobile?:boolean }) => {

    const ElementTestimonials = component$(({ name, testimonial, index }: { name: string, testimonial: string, index: number }) => {
        return <div class="flex flex-col w-full items-center justify-around">
            <h2 class="text-secondary-red font-bold text-lg">{name}</h2>
            <p class="text-primary-blue font-semibold text-center">{testimonial}</p>
        </div>
    });

    const itemsTestimonials = testimonials.map((testimonial:any, index:number)=>(
        <ElementTestimonials key={index} index={index} name={testimonial['Name']} testimonial={testimonial['Text']}/>
    ))

    
    return <div class="relative w-full h-[150px] flex items-center justify-center py-5">
        <div class="md:w-1/2 sm:w-[80%] w-full h-full flex items-center bg-white rounded-full">

            {/* AQUI VA EL CARRUSEL */}
                <Carousel slides={itemsTestimonials} hasPagination={false} 
                slidesQty={1}
                id={`header_Carousel_testimonials_${isMobile?"mobile":"desk"}`}/>
        </div>
    </div>
});