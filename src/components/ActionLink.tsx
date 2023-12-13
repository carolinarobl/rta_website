import {Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { PopupCall } from "./PopupCall";

export const ActionLink = component$(
  ({ link, text = "", classN = "", hasStyle = true }: { link: string, text?: string; classN?: string; hasStyle?: boolean }) => {


    if (link.startsWith("/") || link.startsWith("http") || link.startsWith("tel:"))
      return (
        <Link
          class={classN}
          href={link}
          prefetch={true}
          target={link.startsWith("https") ? "_blank" : "_self"}
        >
          <Slot />
        </Link>
      );
    else if (link.startsWith("=") && link) {
      return <PopupCall link={link} text={text} hasStyle={hasStyle} >  <div class={`${classN} cursor-pointer`}>
        <Slot></Slot>
      </div></PopupCall>;
    }
    else
      return (
        <div class={classN}>
          <Slot></Slot>
        </div>
      );
  },
);
