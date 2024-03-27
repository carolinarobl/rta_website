import { component$ } from "@builder.io/qwik";
import { StrapiImage } from "./StrapiImage";
import { setURL } from "~/data/constants";

export const StrapiAsset = component$(
  ({
    media,
    width,
    height,
    toWhite = false,
    clasN = "",
    autoplay = false,
    controls = false,
    loop = true,
    muted = true,
  }: {
    media: any;
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
    if (media['url'].includes(".mp4")) {
      return (
        <video
          width={width}
          height={height}
          src={setURL(media['url'])}
          autoplay={autoplay}
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
        media={media}
        width={width}
        height={height}
        toWhite={toWhite}
        clasN={clasN}
      ></StrapiImage>
    );
  },
);
