import { $, component$ } from "@builder.io/qwik";
import { PopupCall } from "./PopupCall";
import { BsArrowRightShort, BsFileEarmarkArrowDownFill, BsTelephoneFill} from "@qwikest/icons/bootstrap";
import { setURL } from "~/data/constants";
export const Button = component$(
  ({
    type = "link",
    text,
    link,
    style = 'default',
    fullWidth = false,
    // color = "#13B295",
    onClick, // Icon,
  } // subtext,
  : {
    type?: "link" | "action";
    text: string;
    link?: string;
    style?: 'default' | 'basic' | 'full';
    fullWidth?: boolean;
    // color?: string;
    onClick?: any | void;
    // subtext?: string;
  }) => {
    const downloadPrefix = "=download=";
    const isDownloadLink = !!link?.startsWith(downloadPrefix);
    const cleanLink = isDownloadLink ? link?.replace(downloadPrefix, "") : link;

    const downloadFile = $(async (url: string) => {
      const downloadUrl = url.startsWith("http")
        ? url
        : url.startsWith("/")
          ? setURL(url)
          : url;
      const filename = downloadUrl.split("?")[0].split("#")[0].split("/").pop() || "download";

      try {
        const response = await fetch(downloadUrl);

        if (!response.ok) {
          throw new Error(`Download failed with status ${response.status}`);
        }

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");

        anchor.href = blobUrl;
        anchor.download = filename;
        anchor.click();

        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error(error);
        window.open(downloadUrl, "_blank");
      }
    });

    const handleClick = $(() => {
      if (cleanLink) {
        if (isDownloadLink) return downloadFile(cleanLink);
        if (cleanLink.includes("http")) return window.open(cleanLink, "_blank");
        window.location.href = cleanLink;
      }
      (onClick ?? (() => {}))();
    });

    if (type === "link") {
      if (!isDownloadLink && link?.startsWith("=") && link) {
        return <PopupCall link={link} text={text}></PopupCall>;
      } else {
        //Estilo de botón general
        return (
          <div
            onClick$={() => handleClick()}
            class={`flex ${fullWidth ? 'w-full' : 'w-fit'} items-center justify-center rounded-full outline ${style == 'default' ? ' outline-teal-500 bg-white text-btn-green font-[600]' : style == 'full' ? 'bg-teal-500 text-white outline-teal-500': 'outline-black bg-transparent text-black hover:!bg-black'} p-1 transition-all delay-150 ease-in-out hover:cursor-pointer hover:outline-transparent hover:bg-teal-500 hover:!text-white`}
          >

            <p class={` ${style == 'default' ? '' : ''} ${fullWidth ? 'flex-1 text-center' : 'whitespace-nowrap'} min-sm:text-[13px] mx-2 text-[15px] font-[600] max-md:text-[14px]`}>
              {text}
            </p>

            <div class={`${style == 'default' ? 'bg-teal-500 p-0 h-[28px] min-h-[28px] w-[28px] min-w-[28px]': style=='full' ? 'bg-teal-500 h-[30px] min-h-[30px] w-[30px] min-w-[30px]' :'bg-black'} text-white flex items-center justify-center rounded-full transition-transform duration-300`}>
              {isDownloadLink ? (
                <BsFileEarmarkArrowDownFill
                  class={`transition-colors duration-300 text-white`}
                  style={{
                    width: "16px",
                    height: "16px"
                  }}
                />
              ) : (
                <BsArrowRightShort
                  class={`text-3xl transition-colors duration-300 text-white`}
                  style={{
                    width: "24px",
                    height: "24px"
                  }}
                />
              )}
            </div>
          </div>
        );
      }
    }
    // Estilo de botón para llamada
    else
      return (
        <div
          onClick$={() => handleClick()}
          class={`flex ${fullWidth ? 'w-full' : 'w-fit'} items-center justify-center  rounded-full bg-teal-500 p-1 px-1 opacity-90 transition-all  delay-150  ease-in-out hover:cursor-pointer hover:bg-teal-600`}
        >
          <p class={`min-sm:text-[13px] mx-2 text-[15px] font-[600] tracking-wide text-white max-md:text-[14px] ${fullWidth ? 'flex-1 text-center' : ''}`}>
            {text}
          </p>
          <div class="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white p-0 opacity-70 text-btn-green">
          <BsTelephoneFill />
          </div>
        </div>
      );
    return <div>Button</div>;
  },
);
