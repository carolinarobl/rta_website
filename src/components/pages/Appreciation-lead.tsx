import { component$ } from "@builder.io/qwik";
import { setURL } from "~/data/constants";
import { Button } from "../Button";
import { StrapiImage } from "../StrapiImage";

export const AppreciationLead = component$(({ data }: { data: any }) => {
    const pageData = data['data']['pageAprLead']['data']['attributes']

    return <div class="flex flex-wrap px-8 items-center justify-center">
        <div class="flex flex-col items-center justify-center w-full md:w-1/2">
            <div class="relative h-[600px] w-[80%] flex flex-col items-center justify-center">
                <img class="" src={setURL(pageData['zane_lead']['bg_pic']['data']['attributes']['url'])} alt=""
                    width="650" height="650" />
                <img class="absolute flex rounded-full h-3/4 w-auto" src={setURL(pageData['zane_lead']['zane_pic']['data']['attributes']['url'])}
                    height={250}
                    width={250}
                    alt={pageData['zane_lead']['zane_pic']['data']['attributes']['alternativeText']} />
                <img class="absolute h-[10%] w-auto top-20 right-10" src={setURL(pageData['zane_lead']['tv_pic']['data']['attributes']['url'])}
                    alt=""
                    height="50"
                    width="50" />
                <img class="absolute bottom-10 h-[10%] w-auto left-5" src={setURL(pageData['zane_lead']['wifi_pic']['data']['attributes']['url'])}
                    alt=""
                    height="50"
                    width="50" />
                <img class="absolute top-10 left-10 h-[10%] w-auto" src={setURL(pageData['zane_lead']['phone_pic']['data']['attributes']['url'])}
                    alt=""
                    height="50"
                    width="50" />
                <div class="absolute left-1/2 top-5 flex flex-row text-primary-blue bg-white items-center justify-center p-2 rounded-full">

                    <div class="h-fit w-fit rounded-full  bg-secondary-red p-1">
                        <StrapiImage
                            toWhite
                            width={20}
                            height={20}
                            url={pageData['zane_lead']['give_pic']['data']['attributes']['url']}
                        />
                    </div >
                    Price
                </div>
                <div class="absolute w-fit h-fit bottom-0 left-1/2 flex flex-row text-primary-blue bg-white items-center justify-evenly p-2 rounded-full">

                    <div class="h-fit w-fit rounded-full  bg-secondary-red p-1">
                        <StrapiImage
                            toWhite
                            width={20}
                            height={20}
                            url={pageData['zane_lead']['auto_pic']['data']['attributes']['url']}
                        />
                    </div >
                    Live Events
                </div>
                <div class="absolute w-fit h-fit flex flex-row left-3/4 bottom-1/4 text-primary-blue bg-white items-center justify-evenly p-2 rounded-full">

                    <div class="h-[25px] w-[25px] rounded-full  bg-secondary-red p-1">
                        <StrapiImage
                            toWhite
                            width={20}
                            height={20}
                            url={pageData['zane_lead']['cota_pic']['data']['attributes']['url']}
                        />
                    </div >
                    Discounts
                </div>
                <div class="absolute w-fit h-fit flex flex-row justify-evenly left-0  text-primary-blue bg-white items-center p-2 rounded-full">

                    <div class="h-fit w-fit rounded-full  bg-secondary-red p-1">
                        <StrapiImage
                            toWhite
                            width={20}
                            height={20}
                            url={pageData['zane_lead']['auto_pic']['data']['attributes']['url']}
                        />
                    </div >
                    Live Events
                </div>
            </div>
            <div class="flex flex-col items-center justify-center">
                <p class="text-xl text-center font-medium text-primary-blue">{pageData['zane_description']}</p>
                <img src={setURL(pageData['zane_banner']['banner_pic']['data']['attributes']['url'])}
                    alt=""
                    width="400" height="78"
                />
                <div class="flex flex-row items-center gap-5 justify-evenly my-5">
                    <div class="bg-primary-blue text-white flex flex-col rounded-full items-center justify-center w-fit px-10 py-2">
                        <h2 class="text-sm text-center font-bold">{pageData['date_race']['Text']}</h2>
                        <p class="text-sm text-center">{pageData['date_race']['Link']}</p>
                    </div>
                    <Button text={pageData['button_promo']['text']} link={pageData['button_promo']['link']}></Button>
                </div>
            </div>
        </div>
        <div class="w-full md:w-2/6 shadow-2xl rounded-2xl h-[500px]">
            <iframe loading="lazy" class="w-full  rounded-2xl h-full" src={pageData['iFrame_link']}></iframe>
        </div>
    </div>
});