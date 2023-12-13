import { component$ } from "@builder.io/qwik";
import { Paragraph } from "~/components/Paragraph";

export const SectionFeactures = component$(({ data }: { data: any }) => {
    return <div class="gap-10 w-ful flex flex-col">
        {data.map((feature: any, key: any) => (
            (key % 2 == 0 ? <div key={key} class="bg-primary-blue bg-opacity-40 py-10">
                <div class="bg-primary-blue bg-opacity-60 py-10">
                    <div class="bg-primary-blue">
                        <Paragraph key={key} color="white" reverse={true} text={feature['Paragraph']}
                            image={feature['Media']['data']['attributes']}
                            title={feature['Title'] != null ? feature['Title'] : ""}
                            textPercentage={50}
                            backgroundColor={"primary-blue"}></Paragraph>
                    </div>
                </div>
            </div>
                : <Paragraph key={key} reverse={false} text={feature['Paragraph']}
                    image={feature['Media']['data']['attributes']}
                    textPercentage={50}
                    title={feature['Title'] != null ? feature['Title'] : ""}></Paragraph>)

        ))}
    </div>
});