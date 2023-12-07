import { component$ } from "@builder.io/qwik";
import { setURL } from "~/data/constants";
import { BsCheckCircleFill } from "@qwikest/icons/bootstrap";
import { Markdown } from "../Markdown";
import { Button } from "../Button";

interface Props {
  logo: any;
  title: string;
  price: string;
  priceTime: string;
  description: string;
  features: Array<any>;
  btnLink: string;
  btnText: string;
}
export const SimpleTable = component$(
  ({
    logo,
    title,
    price,
    priceTime,
    description,
    features,
    btnLink,
    btnText,
  }: Props) => {
    return (
      <div class="flex h-fit w-fit max-w-[300px] flex-col items-center justify-between rounded-[35px] bg-white px-5">
        <div class="mt-8 flex w-fit max-w-full flex-col items-center self-center">
          <div class="flex w-full items-start gap-5 self-center">
            <img
              loading="lazy"
              src={setURL(logo['url'])}
              alt={logo['alternativeText']}
              title={logo['caption']}
              height={100}
              width={100}
              class="aspect-square w-[70px] max-w-full items-center justify-center self-stretch overflow-hidden object-contain object-center"
            />
            <div class="my-auto flex flex-col self-center">
              <div class="self-start whitespace-nowrap text-2xl font-bold leading-6 text-primary-blue">
                {title}
              </div>
              {/* <div class="justify-center text-secondary-red text-xl font-semibold mt-2">
                            {description}
                        </div> */}
            </div>
          </div>
          <div class="mt-5 text-center text-base leading-4 tracking-tighter text-primary-blue">
            <span class="text-2xl font-light text-secondary-red">$</span>
            <span class="text-2xl font-light text-primary-blue">{price}</span>
            <span class=" text-2xl text-primary-blue">{priceTime}</span>
          </div>
          <div class="mt-5 text-center text-base text-primary-blue">
            <Markdown text={description} />
          </div>
          <div class="border-gary-500 my-4 h-[1px] w-full border-t-2"></div>
          <div class="mt-5 text-base text-primary-blue">
            {features.map((item: any, index: any) => (
              <span
                key={index}
                class="my-1 flex flex-row items-center justify-start"
              >
                <div>
                <BsCheckCircleFill class="mx-2 h-[20px] w-[20px] fill-primary-blue text-primary-blue"></BsCheckCircleFill>
                </div>
                
                <h3 key={index} class="text-sm font-light">
                  {item["Text"]}
                </h3>
              </span>
            ))}
          </div>
        </div>

        <div class="my-4 flex h-[80px] w-full flex-col items-center justify-center">
          <div class="border-gary-500 my-4 h-[1px] w-full border-t-2"></div>
          <Button text={btnText} link={btnLink}/>
          {/* <a href={btnLink} class="w-full">
            <div class="flex h-[50px] w-full flex-row items-center justify-center rounded-full border-2 border-teal-500 bg-transparent p-1 px-6 text-btn-green hover:bg-teal-500 hover:text-white">
              <p class="mx-4 font-bold">{btnText}</p>
              <div class="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-teal-500 ">
                <BsTagFill class="fill-white" />
              </div>
            </div>
          </a> */}
        </div>
      </div>
    );
  },
);
