import { component$ } from "@builder.io/qwik";
import { strapiURL } from "~/data/constants";

export const StrapiImage = component$(
  ({
    url,
    width,
    height,
    alt = "",
    toWhite = false,
  }: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
    toWhite?: boolean;
  }) => {
    return (
      <img
        width={width}
        height={height}
        src={`${strapiURL}${url}`}
        alt={alt}
        class={
          toWhite
            ? "brightness-110 contrast-100 hue-rotate-[23deg] invert saturate-[7500%] sepia-0 filter"
            : ""
        }
      />
    );
  },
);
