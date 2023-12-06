import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const ActionLink = component$(
  ({ link, classN="" }: { link: string; classN?: string }) => {
    if (link.startsWith("/") || link.startsWith("http"))
      return (
        <Link
          class={classN}
          href={link}
          prefetch
          target={link.startsWith("https") ? "_blank" : "_self"}
        >
          <Slot />
        </Link>
      );
    else
      return (
        <div class={classN}>
          <Slot></Slot>
        </div>
      );
  },
);
