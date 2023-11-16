import { component$ } from "@builder.io/qwik";
import { StrapiImage } from "../StrapiImage";
import { Paragraph } from "../Paragraph";
import { setURL } from "~/data/constants";
import { Markdown } from "../Markdown";
import { AccordionItem } from "../AccordionItem";

export const GigfastCloud = component$(({data}:{data:any}) => {
    const dataPage=data['pageGfCloud']['data']['attributes']
    const dataSecctionNetwork = data['sectionNetwork']['data']['attributes']
  return <div class="flex flex-col items-center justify-center">
    <StrapiImage url={dataPage['GNetworkLogo']['data']['attributes']['url']}
    width={500} height={95}></StrapiImage>
    <div class="flex flex-wrap-reverse px-8 py-6 items-center justify-center">
        <div class="h-[450px] w-full md:w-1/2"></div>
        <div class="flex flex-col w-full md:w-1/2 items-center justify-center">
            <Markdown text={dataSecctionNetwork['Description']['Paragraph']} classN="text-primary-blue"></Markdown>
            <AccordionItem title={dataSecctionNetwork['Map']['ServersTitle']} classContainer="rounded-full bg-white text-primary-blue shadow-xl">
                <div class="flex flex-col m-[-20px] py-4 text-primary-blue bg-white rounded-b-2xl">
                    {dataSecctionNetwork['Map']['Servers'].map((server:any, index:any)=>(
                        <a key={index} href={server['Link']} class="hover:text-secondary-red text-primary-blue">{server['Text']}</a>
                    ))}
                </div>
            </AccordionItem>
        </div>
    </div>
    <Paragraph title={dataPage['GFCloud']['Title']} text={dataPage['GFCloud']['Paragraph']}
    image={setURL(dataPage['GFCloud']['Media']['data']['attributes']['url'])}
    logo={setURL(dataPage['GFCloud']['Logo']['data']['attributes']['url'])}
    buttons={dataPage['GFCloud']['Buttons']}></Paragraph>
  </div>
});