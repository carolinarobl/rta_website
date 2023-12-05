import { $,component$ } from "@builder.io/qwik";
// import { Button } from "./Button";
import { setURL } from "~/data/constants";
import { BsDownload } from "@qwikest/icons/bootstrap";
import { downloadPDF } from "./download-box";

interface Props {
    title: string;
    btnText: string;
    image: any;
    urlDoc:string;
    nameDoc:string;
}

export const DownloadBoxImage = component$(({ title, btnText, image, urlDoc, nameDoc }: Props) => {
    const handleClick = $(() => {
        downloadPDF(urlDoc, nameDoc);
      });
      
    return <div class="h-[370px] w-[400px] py-8 px-4 bg-white rounded-2xl pb-2 flex flex-col items-center justify-between shadow-2xl">
        <div class="relative flex w-full h-1/2 overflow-hidden">
            <img class="object-fill w-full h-full rounded-t-2xl" width="2076" height="1500" src={setURL(image['url'])} alt={image['alternativeText']} title={image['caption']} />
        </div>
        <h2 class="text-2xl flex text-center font-bold text-[#2E5899]">{title}</h2>
        <div onClick$={handleClick} class="flex w-fit items-center font-semibold justify-center gap-2 rounded-full border-2 border-teal-500 bg-white p-1 text-btn-green opacity-80 shadow-md transition-all hover:cursor-pointer hover:border-transparent hover:bg-teal-500 hover:text-white">
            <div class="flex flex-row gap-2 items-center font-semibold text-center justify-center">
                {btnText}
                <div class="h-[25px] w-[25px] flex items-center justify-center font-bold text-white bg-teal-500 hover:text-teal-500 hover:bg-white rounded-full">
                    <BsDownload class="stroke-current"></BsDownload>
                </div>
            </div>
        </div>
    </div>
});