import { $, component$ } from "@builder.io/qwik";
import { PopupCall } from "./PopupCall";
import { BsArrowRightShort, BsTelephoneFill } from "@qwikest/icons/bootstrap";
export const Button = component$(
  ({
    type = "link",
    text,
    link,
    // color = "#13B295",
    onClick, // Icon,
    // subtext,
  }: {
    type?: "link" | "action";
    text: string;
    link?: string;
    // color?: string;
    onClick?: any | void;
    // Icon?: any;
    // subtext?: string;
  }) => {
    const handleClick = $(() => {
      if (link) {
        window.location.href = link;
      }
      (onClick ?? (() => { }))();
    });

    if (type === "link") {
      if (link?.startsWith("=") && link) {
        return <PopupCall link={link} text={text}></PopupCall>;
      } else {
        //Estilo de botón general
        return (
          <div
            onClick$={() => handleClick()}
            class={`flex w-fit items-center justify-center rounded-full border-2 border-teal-500 border-opacity-70 bg-white p-0.5 px-1 text-btn-green opacity-90 shadow-md transition-all hover:cursor-pointer hover:border-transparent hover:bg-teal-500 hover:text-white transition ease-in-out delay-150`}
          >
            <p class="mx-2 tracking-wide text-[15px] font-[600] max-md:text-[14px] min-sm:text-[13px] ">
              {text}
            </p>
            <div class="flex h-[25px] w-[25px] items-center p-0 justify-center rounded-full opacity-70 bg-teal-500 ">
              <BsArrowRightShort class="fill-white font-bold" />
            </div>
          </div>
        );
      }
    } else
      // Estilo de botón para llamada
      return (
        <div
          onClick$={() => handleClick()}
          class="flex w-fit items-center justify-center rounded-full  bg-teal-500 p-1 px-1 text-btn-white opacity-90 shadow-md transition-all hover:cursor-pointer  hover:bg-teal-600  transition ease-in-out delay-150"
        >
          <p class="mx-2 tracking-wide text-[15px] font-[600] text-white  max-md:text-[14px] min-sm:text-[13px] ">
              {text}
            </p>
            <div class="flex h-[25px] w-[25px] items-center p-0 justify-center rounded-full opacity-70 bg-white opacity-60 ">
              <BsTelephoneFill class="fill-teal-500 w-[12px]" />
            </div>
        </div>
      );
    return <div>Button</div>;
  },
);
