import { component$ } from "@builder.io/qwik";
import { strapiURL } from "~/data/constants";
import { Image } from '@unpic/qwik';

export const StrapiImage = component$(
  ({
    url,
    width=300,
    height=300,
    alt = "",
    title= "",
    toWhite = false,
    clasN = "",
  }: {
    url: string;
    width?: any;
    height?: any;
    alt?: string;
    title?:string;
    toWhite?: boolean;
    clasN?: string;
  }) => {
    return (
      <Image
        width={width}
        height={height}
        src={`${strapiURL}${url}`}
        alt={alt}
        title={title}
        class={
          (toWhite
            ? "brightness-110 contrast-100 hue-rotate-[23deg] invert saturate-[7500%] sepia-0 filter"
            : "") +
          " " +
          clasN
        }
      />
    );
  },
);
