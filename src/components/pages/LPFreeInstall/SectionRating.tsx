import { component$ } from "@builder.io/qwik";
import { Paragraph } from "~/components/Paragraph";

export const SectionRating = component$(({ parData }: { parData: any }) => {
    const content= parData;
  
    return (
    <div class={`flex md:flex-row flex-col-reverse w-full text-center items-center justify-center md:py-8 py-2`}>
        <Paragraph
            hasPricing={false}
            reverse={true}
            text={content['Paragraph']}
            backgroundColor={'transparent'}
            title={content['Title']}
            subtitle={content['Subtitle']} 
            image={content['Media']['data']['attributes']}
            buttons={content['Buttons']}
        />


    </div>
  );
});
