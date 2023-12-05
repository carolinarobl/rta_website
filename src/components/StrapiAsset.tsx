import { component$ } from "@builder.io/qwik";
import { StrapiImage } from "./StrapiImage";
import { setURL } from "~/data/constants";

export const StrapiAsset = component$(
  ({
    url,
    width,
    height,
    alt = "",
    title="",
    toWhite = false,
    clasN = "",
    autoplay = false,
    controls = false,
    loop = true,
    muted = true,
  }: {
    url: string;
    width?: any;
    height?: any;
    alt?: string;
    title?:string;
    toWhite?: boolean;
    clasN?: string;
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
  }) => {
    if (url.includes(".mp4")) {
      return (
        <video
          width={width}
          height={height}
          src={setURL(url)}
          autoPlay={autoplay}
          controls={controls}
          loop={loop}
          muted={muted}
          class={
            (toWhite
              ? "brightness-110 contrast-100 hue-rotate-[23deg] invert saturate-[7500%] sepia-0 filter"
              : "") +
            " " +
            clasN
          }
        />
      );
    }

    return (
      <StrapiImage
        url={url}
        width={width}
        height={height}
        alt={alt}
        title={title}
        toWhite={toWhite}
        clasN={clasN}
      ></StrapiImage>
    );
  },
);
