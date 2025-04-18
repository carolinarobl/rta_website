import { $, component$ } from "@builder.io/qwik";
import { PopupCall } from "./PopupCall";
import { BsArrowRightShort, BsTelephoneFill} from "@qwikest/icons/bootstrap";
export const Button = component$(
  ({
    type = "link",
    text,
    link,
    style = 'default',
    // color = "#13B295",
    onClick, // Icon,
  } // subtext,
  : {
    type?: "link" | "action";
    text: string;
    link?: string;
    style?: 'default' | 'basic';
    // color?: string;
    onClick?: any | void;
    // Icon?: any;
    // subtext?: string;
  }) => {
    const handleClick = $(() => {
      if (link) {
        if (link.includes("http")) return window.open(link, "_blank");
        window.location.href = link;
      }
      (onClick ?? (() => {}))();
    });

    if (type === "link") {
      if (link?.startsWith("=") && link) {
        return <PopupCall link={link} text={text}></PopupCall>;
      } else {
        //Estilo de botón general
        return (
          <div
            onClick$={() => handleClick()}
            class={`flex w-fit items-center justify-center rounded-full border-2 ${style == 'default' ? ' border-teal-500 border-opacity-70 bg-white opacity-90 shadow-md' : 'border-black bg-transparent'} p-0.5 px-1 transition-all delay-150 ease-in-out hover:cursor-pointer hover:border-transparent hover:bg-teal-500 !hover:text-white`}
          >

            <p class={` ${style == 'default' ? 'text-btn-green font-[600]':'text-black'} min-sm:text-[13px] mx-2 text-[15px]  tracking-wide max-md:text-[14px]`}>
              {text}
            </p>

            <div class={`${style == 'default' ? 'bg-teal-500 p-0 opacity-70 text-white h-[30px] min-h-[30px] w-[30px] min-w-[30px]':'bg-black text-white'} flex items-center justify-center rounded-full transition-transform duration-300`}>
              <BsArrowRightShort
                class={`text-3xl transition-colors duration-300 text-white`}
                style={{
                  width: "24px",
                  height: "24px"
                }}
              />
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
          class="flex w-fit items-center justify-center  rounded-full bg-teal-500 p-1 px-1 opacity-90 shadow-md transition-all  delay-150  ease-in-out hover:cursor-pointer hover:bg-teal-600"
        >
          <p class="min-sm:text-[13px] mx-2 text-[15px] font-[600] tracking-wide  text-white max-md:text-[14px] ">
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