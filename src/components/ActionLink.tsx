import { Slot, component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { PopupCall } from "./PopupCall";

export const ActionLink = component$(
  ({ link, classN = "" }: { link: string; classN?: string }) => {
    if (link.startsWith("/") || link.startsWith("http"))
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
    else if (link.includes("=pLogin"))
      return <PopupCall link={link}>
        <div class={`${classN} cursor-pointer`}>
          <Slot></Slot>
        </div>
      </PopupCall>
    else
      return (
        <div class={classN}>
          <Slot></Slot>
        </div>
      );
  },
);
