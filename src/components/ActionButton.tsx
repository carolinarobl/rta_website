import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const ActionButton = component$(
  ({ link, text }: { link: string; text: string }) => {
    if (link.includes("tel:")) {
      return (
        <Link href={link}>
          <div class="flex h-10 w-40 items-center justify-center rounded-2xl bg-green-700 font-bold text-white">
            {text}
          </div>
        </Link>
      );
    }

    return <div class="bg-red-600 text-white">{text}</div>;
  },
);
