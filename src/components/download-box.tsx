import { $, component$ } from "@builder.io/qwik";
import { BsDownload } from "@qwikest/icons/bootstrap"
import { setURL } from "~/data/constants";

interface Props {
    title: string;
    btnText: string;
    urlDoc: string;
    nameDoc:string;
}

export const downloadPDF = $(async (urlDoc:string,nameDoc:string): Promise<void> => {
    const url = setURL(urlDoc)
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error al descargar el archivo desde ${url}. Estado: ${response.status}`);
        }

        const data = await response.arrayBuffer();

        const blob = new Blob([data], { type: 'application/pdf' });
        const urlBlob = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = urlBlob;

        a.download = nameDoc;
        a.click();

        window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
        console.error(error);
    }
});

export const DownloadBox = component$(({ title, btnText, urlDoc, nameDoc }: Props) => {
    const handleClick = $(() => {
        downloadPDF(urlDoc, nameDoc);
      });

    return <div class="flex flex-col h-[250px] w-[300px] bg-white shadow-2xl rounded-3xl justify-evenly items-center p-4">
        <h3 class="text-2xl flex text-center font-bold text-[#2E5899]">{title}</h3>
            <div class="flex w-fit items-center font-semibold justify-center gap-2 rounded-full border-2 border-teal-500 bg-white p-1 px-7 text-btn-green opacity-80 shadow-md transition-all hover:cursor-pointer hover:border-transparent hover:bg-teal-500 hover:text-white"
            onClick$={handleClick}>
                <div class="flex flex-row gap-2 items-center font-semibold text-center justify-center">
                    {btnText}
                    <div class="h-[25px] w-[25px] flex items-center justify-center font-bold text-white bg-teal-500 hover:text-teal-500 hover:bg-white rounded-full">
                        <BsDownload class="stroke-current"></BsDownload>
                    </div>
                </div>
            </div>

    </div>
});