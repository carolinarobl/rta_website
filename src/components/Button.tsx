import { $, component$ } from "@builder.io/qwik";
import { PopupCall } from "./PopupCall";
export const Button = component$(
  ({
    type = "link",
    text,
    link,
    // color = "#13B295",
    onClick, // Icon,
  } // subtext,
  : {
    type?: "link" | "action";
    text: string;
    link?: string;
    // color?: string;
    onClick?: void;
    // Icon?: any;
    // subtext?: string;
  }) => {
    const handleClick = $(() => {
      if (link) {
        console.log(`Link: ${link}`);
        window.location.href = link;
      }
      (onClick ?? (() => {}))();
    });
    if (type === "link") {
      if (link?.startsWith("=") && link) {
        return <PopupCall link={link} text={text}></PopupCall>;
      } else {
        return (
          <div
            onClick$={handleClick}
            class={`flex w-fit items-center justify-center gap-2 rounded-full border-2 border-teal-500 bg-white p-1 px-7 text-btn-green opacity-80 shadow-md transition-all hover:cursor-pointer hover:border-transparent hover:bg-teal-500 hover:text-white`}
          >
            <span class="text-[15px] font-[600] max-md:text-[14px] max-sm:text-[13px] ">
              {text}
            </span>
            {/* <Slot /> */}
            {/* <Icon color="#13B295" size={23} class="opacity-60" /> */}
          </div>
        );
      }
    } else
      return (
        <div
          onClick$={handleClick}
          class="flex w-fit items-center justify-center gap-2 rounded-full bg-button-green p-1 pl-2 text-white hover:cursor-pointer"
        >
          <span class="text-[16px]">{text}</span>
          {/* <Icon size={23} class="opacity-60" /> */}
        </div>
      );
    return <div>Button</div>;
  },
);
