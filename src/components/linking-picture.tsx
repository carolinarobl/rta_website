import { component$ } from "@builder.io/qwik";
import { setURL } from "~/data/constants";

interface Props {
  size?: string;
  color?: string;
  url: string;
  alt: string;
}

export const Linking_picture = component$(
  ({ size = "250px", color = "bg-[#2E5899]", url, alt }: Props) => {
    return (
      <div
        class={`${color} relative overflow-hidden bg-opacity-40 p-7 h-[${size}] w-[${size}] flex items-center justify-center rounded-full`}
      >
        <div
          class={`${color} h-full w-full rounded-full bg-opacity-70 p-7 shadow-sm`}
        >
          <div class={`${color} h-full w-full rounded-full shadow-sm`}></div>
        </div>

        <img
          class="absolute rounded-full"
          height={size}
          width={size}
          src={setURL(url)}
          alt={alt}
        />
      </div>
    );
  },
);
