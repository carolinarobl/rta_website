import { component$ } from "@builder.io/qwik";
import { StrapiImage } from "../StrapiImage";
import { Paragraph } from "../Paragraph";
import { Markdown } from "../Markdown";
import { AccordionItem } from "../AccordionItem";

export const GigfastCloud = component$(({data}:{data:any}) => {
    const dataPage=data['pageGfCloud']['data']['attributes']
    const dataSectionNetwork = data['sectionNetwork']['data']['attributes']

  return <div class="flex flex-col items-center justify-center">
    <StrapiImage url={dataPage['GNetworkLogo']['data']['attributes']['url']} alt={dataPage['GNetworkLogo']['data']['attributes']['alternativeText']} title={dataPage['GNetworkLogo']['data']['attributes']['caption']}
    width={500} height={95}></StrapiImage>
    <div class="flex flex-wrap-reverse px-8 py-6 items-center justify-center">
        <div class="h-[450px] w-full md:w-1/2">
        <StrapiImage url={dataSectionNetwork['Map']['MapPicture']['data']['attributes']['url']} alt={dataSectionNetwork['Map']['MapPicture']['data']['attributes']['alternativeText']} title={dataSectionNetwork['Map']['MapPicture']['data']['attributes']['caption']}
    width={500} height={95}></StrapiImage>
        </div>
        <div class="flex flex-col w-full md:w-1/2 items-center justify-center">
            <Markdown text={dataSectionNetwork['Description']['Paragraph']} classN="text-primary-blue"></Markdown>
            <AccordionItem title={dataSectionNetwork['Map']['ServersTitle']} classContainer="rounded-full bg-white text-primary-blue shadow-xl">
                <div class="flex flex-col py-4 text-primary-blue bg-white rounded-b-2xl">
                    {dataSectionNetwork['Map']['Servers'].map((server:any, index:any)=>(
                        <a key={index} href={server['Link']} class="hover:text-secondary-red text-primary-blue">{server['Text']}</a>
                    ))}
                </div>
            </AccordionItem>
        </div>
    </div>
    <Paragraph title={dataPage['GFCloud']['Title']} text={dataPage['GFCloud']['Paragraph']}
    image={dataPage['GFCloud']['Media']['data']['attributes']}
    logo={dataPage['GFCloud']['Logo']['data']['attributes']}
    buttons={dataPage['GFCloud']['Buttons']}></Paragraph>
  </div>
});