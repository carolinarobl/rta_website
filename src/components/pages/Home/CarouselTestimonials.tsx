import { component$ } from "@builder.io/qwik";
import Carousel from "~/components/Carousel";
import { BsStarFill, BsStarHalf } from "@qwikest/icons/bootstrap";

export const CarouselTestimonials = component$(({ testimonials, isMobile=false }: { testimonials: any, isMobile?:boolean }) => {

    const ElementTestimonials = component$(({ name, testimonial, rating }: { name: string, testimonial: string, index: number, rating: number }) => {
        
        const renderHiDivs = (rating: number) => {
            const stars = [];
            const intRating = Math.floor(rating); // Convert rating to an integer


            for (let i = 0; i < intRating; i++) {
                stars.push(<BsStarFill/>);
            }
            return stars;
        };
        
        return <div class="flex flex-col w-full items-center justify-around mx-10">
            <div class="flex flex-row gap-3 items-center justify-center">

                <p class="text-secondary-red font-bold text-[16px]">{name}</p>   
                <div class="text-yellow-500 flex flex-row">
                    {renderHiDivs(rating)}

                    {
                    rating % 1 != 0 &&
                    <BsStarHalf/>
                    }
                </div>
            </div> 
            <p class="text-primary-blue font-semibold  text-[14px] text-center">{testimonial}</p>
        </div>
    });

    const itemsTestimonials = testimonials.map((testimonial:any, index:number)=>(
        <ElementTestimonials key={index} index={index} name={testimonial['Name']} testimonial={testimonial['Text']} rating={testimonial['Rating']}/>
    ))

    
    return <div class="relative w-full flex items-center justify-center">
        <div class="my-5 sm:w-[80%] md:w-[60%] w-full flex items-center bg-white/80 backdrop-blur-sm rounded-full p-2 overflow-hidden">

            {/* AQUI VA EL CARRUSEL */}
                <Carousel slides={itemsTestimonials} hasPagination={false} 
                slidesQty={1}
                addSpace={false}
                id={`header_Carousel_testimonials_${isMobile?"mobile":"desk"}`}/>
        </div>
    </div>
});