import { component$ } from "@builder.io/qwik";
import { setURL } from "~/data/constants";
import { Button } from "../Button";
import { BsCheckCircleFill, BsTagFill } from "@qwikest/icons/bootstrap"

interface Props {
    logo: string
    title: string
    price: string
    priceTime: string
    description: string
    features: Array<string>
    btnLink: string
    btnText: string
}
export const SimpleTable = component$(({ logo, title, price, priceTime, description, features, btnLink, btnText }: Props) => {
    return (
        <div class="justify-between items-center shadow-lg bg-white h-[650px] flex flex-col px-5 rounded-[35px]">
            <div class="items-center self-center flex w-[306px] max-w-full flex-col mt-8">
                <div class="items-start self-center flex w-full gap-5">
                    <img
                        loading="lazy"
                        src={setURL(logo)}
                        height={100}
                        width={100}
                        class="aspect-square object-contain object-center w-[70px] justify-center items-center overflow-hidden self-stretch max-w-full"
                    />
                    <div class="self-center flex flex-col my-auto">
                        <div class="text-blue-800 text-2xl font-bold leading-6 self-start whitespace-nowrap">
                            {title}
                        </div>
                        {/* <div class="justify-center text-rose-700 text-xl font-semibold mt-2">
                            {description}
                        </div> */}
                    </div>
                </div>
                <div class="text-blue-800 text-center text-base leading-4 tracking-tighter mt-5">
                    <span class="font-light text-2xl text-rose-700">$</span>
                    <span class="font-light text-2xl text-blue-800">{price}</span>
                    <span class=" text-blue-800 text-2xl">/{priceTime}</span>
                </div>
                <div class="text-blue-800 text-center text-base mt-5">
                    {description}
                </div>
                <div class="my-4 border-t-2 w-full h-[1px] border-gary-500"></div>
                <div class="text-blue-800 text-base mt-5">
                    {features.map((item: any, index: any) => (
                        <span key={index} class="flex my-1 flex-row justify-start items-center">
                            <BsCheckCircleFill class="text-primary-blue h-[20px] mx-2 w-[20px] fill-primary-blue"></BsCheckCircleFill>
                            <h3 key={index} class="font-light text-sm">{item['Title']}</h3>
                        </span>
                    ))}
                </div>
            </div>

            <div class="my-4 w-full flex flex-col justify-center h-[80px] items-center">
                <div class="my-4 border-t-2 w-full h-[1px] border-gary-500"></div>
                <a href={btnLink} class="w-full">
                <div class="w-full h-[50px] flex flex-row justify-center items-center rounded-full border-2 border-teal-500 bg-transparent p-1 px-6 text-btn-green hover:bg-teal-500 hover:text-white">
                    <p class="font-bold mx-4">{btnText}</p>
                    <div class="w-[25px] h-[25px] rounded-full justify-center items-center flex bg-teal-500 ">
                        <BsTagFill class="fill-white"/>
                    </div>
                    </div>
                </a>
            </div>
        </div>
    );
});