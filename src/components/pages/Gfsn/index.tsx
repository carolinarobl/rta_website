import { component$ } from "@builder.io/qwik";
import { SerializedParagraph } from "~/components/Paragraph";
import { SectionSportsUpdates } from "./SectionSportsUpdates";

export const GfSportsNetwork = component$(({ data }: { data: any }) => {

    const carouselSportsData = data['UpdatesCarousel']
    return <div>
        <SerializedParagraph
            data={data['Introduction']}
            hasPricing={false}
            alt
            reverse={true}
        />
        <SectionSportsUpdates title={data['UpdatesTitle']} carouselData={carouselSportsData}/>
    </div>
});