import { component$ } from "@builder.io/qwik";
import { BsCheckCircleFill, } from "@qwikest/icons/bootstrap";
import { setURL } from "~/data/constants";
import { PopupCall } from "../PopupCall";
import { Image } from '@unpic/qwik';

interface Props {
  logo: any;
  title: string;
  subtitle: string;
  price: string;
  priceTime: string;
  description: string;
  channels: Array<any>;
  btnSeeMoreText: string;
  btnSeeMoreLink: string;
  features: Array<any>;
  btnText: string;
  btnLink: string;
  dataChannels: any;
}

export const ServiceTv = component$(({
  logo,
  title,
  subtitle,
  price,
  priceTime,
  description,
  channels,
  btnSeeMoreLink,
  btnSeeMoreText,
  features,
  btnText,
  btnLink,
  dataChannels
}: Props) => {

  return (
    <div class="justify-between min-h-[670px] w-[300px] items-center shadow-lg bg-white flex flex-col px-5 pb-4 rounded-[35px]">
      <div class="items-center self-center flex w-[310px] max-w-full flex-col mt-8">
        <div class="items-start self-center flex w-full gap-5">
          <Image
            width={80}
            height={80}
            loading="lazy"
            src={setURL(logo['url'])}
            alt={setURL(logo['alternativeText'])}
            title={setURL(logo['caption'])}

            class="aspect-square object-contain object-center w-[70px] justify-center items-center overflow-hidden self-stretch max-w-full"
          />
          <div class="self-center flex flex-col my-auto">
            <div class="text-blue-800 text-2xl font-bold leading-6 self-start whitespace-nowrap">
              {title}
            </div>
            <div class="justify-center text-rose-700 text-xl mt-2">
              {subtitle}
            </div>
          </div>
        </div>
        <div class="text-blue-800 flex flex-row mt-5">
          <span class="font-light text-3xl text-rose-700">$</span>
          <span class="font-light text-3xl text-blue-800">{price}</span>
          <span class=" text-blue-800">/{priceTime}</span>
        </div>
        <div class="items-start self-stretch flex flex-col mt-5">
          <div class="justify-between items-start self-stretch flex w-full gap-5">
            <div class="text-blue-800 text-center text-base">
              {description}
            </div>
            <PopupCall link={btnSeeMoreLink} 
            dataChannels={dataChannels}
            planId={title} 
            channels={subtitle}
            text={btnSeeMoreText}></PopupCall>
          </div>
          <div class="justify-center items-start self-stretch flex gap-2.5 mt-2.5">
            {channels.map((channel: any, index: any) => (
              <Image
                key={index}
                width={50}
                height={50}
                loading="lazy"
                src={setURL(channel['attributes']['url'])}
                alt={setURL(channel['attributes']['alternativeText'])}
                title={setURL(channel['attributes']['caption'])}
                class="aspect-square object-contain object-center w-full overflow-hidden flex-1"
              />
            ))}
          </div>
        </div>
        <div class="border-gary-500 h-[1px] w-full border-t-2"></div>

        <div class="self-stretch w-full h-px mt-5 max-md:mx-0.5"></div>
        <div class="text-blue-800 text-base mt-5">
          {features.map((feature: any, key: any) => (
            <span
              key={key}
              class="my-1 flex flex-row items-center justify-start"
            >
              <div><BsCheckCircleFill class="mx-2 h-[20px] w-[20px] fill-primary-blue text-primary-blue"></BsCheckCircleFill></div>
              
              <h3 key={key} class="text-sm font-light">
                {feature["Text"]}
              </h3>
            </span>
          ))}
        </div>
      </div>

      <PopupCall link={btnLink} text={btnText}></PopupCall>

    </div>
  );
});