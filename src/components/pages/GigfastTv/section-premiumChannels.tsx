import { JSXChildren, component$ } from "@builder.io/qwik";
import { AccordionItem } from "~/components/AccordionItem";
import { BsCheck } from "@qwikest/icons/bootstrap"
import { JSX } from "@builder.io/qwik/jsx-runtime";

export const SectionPremiumChannels = component$(({ data, title }: { data: any, title: string }) => {
    var listChannels: Array<JSX.Element> = []

    return <div class="flex flex-col items-center justify-center">
        <h2 class="text-3xl text-center md:text-5xl my-3 font-semibold text-primary-blue">{title}</h2>
        <div class="flex flex-wrap items-start justify-center my-6 gap-5">
            {data.map((channel: any, key: any) => (
                <div key={key} class="w-[290px] min-h-[300px] py-6 px-2 flex-col items-center justify-center flex rounded-3xl bg-primary-blue">
                    <h1 class="text-3xl font-semibold text-white">{channel['Title']}</h1>
                    <div class="flex flex-row">
                        <h2 class="text-white text-2xl">$ {channel['Price']}</h2>
                        <p class="text-white"> {channel['Pricetime']}</p>
                    </div>
                    <div class="flex flex-col bg-white w-full rounded-2xl mt-4 p-4">
                        {channel['Features'].map((feature: any, key: any) => {
                            if (key < 3) {
                                listChannels=[]
                                return (
                                    <div key={key} class="flex flex-row gap-2 p-1 border-b-2">
                                        <BsCheck class="text-secondary-red"></BsCheck>
                                        <p class="text-primary-blue">{feature['Title']}</p>
                                    </div>

                                );
                            } else if (key >= 3) {
                                listChannels.push(<div key={key} class="flex flex-row gap-2 p-1 border-b-2">
                                    <BsCheck class="text-secondary-red"></BsCheck>
                                    <p class="text-primary-blue">{feature['Title']}</p>
                                </div>);
                                if(key==3) return <AccordionItem title={`Show all channels`}>{listChannels}</AccordionItem>;
                            } 

                        })}
                    </div>
                </div>
            ))}
        </div>
    </div>
});