import { component$ } from "@builder.io/qwik";
import { setURL } from "~/data/constants";

interface Props {
  width?: string;
  height?: string;
  color?: string;
  url: string;
  alt?: string;
}

export const Linking_picture = component$(
  ({
    width = "",
    height = "",
    color = "bg-[#2E5899]",
    url,
    alt = "",
  }: Props) => {
    return (
      <div
        class={`${color} bg-opacity-40 p-6 ${height} ${width} inline-block items-center justify-center rounded-full`}
      >
        <div
          class={`${color} flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-opacity-60 px-6 py-6 shadow-md`}
        >
          <div
            class={`${color} flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-opacity-80 shadow-md`}
          >
            <img
              class="h-full w-full rounded-full object-cover"
              height={250}
              width={250}
              src={setURL(url)}
              alt={alt}
            />
          </div>
        </div>
      </div>
    );
  },
);
