import { $, component$ } from "@builder.io/qwik";
import { strapiURL } from "~/data/constants";
import { Image, type ImageTransformerProps, useImageProvider } from 'qwik-image';

export const StrapiImage = component$(({
  url,
  width = 150,
  height = 150,
  alt = "",
  title = "",
  toWhite = false,
  clasN = "",
}: {
  url: string;
  width?: any;
  height?: any;
  alt?: string;
  title?: string;
  toWhite?: boolean;
  clasN?: string;
}) => {
  const imageTransformer$ = $(
    ({src}: ImageTransformerProps): string => {
        return `${strapiURL}${src}`;
    }
  );

  useImageProvider({
    resolutions: [640, 960, 1280, 1920, 3840],
    imageTransformer$
  });

  return (
    <Image
      layout="constrained"
      objectFit="contain"
      width={width}
      height={height}
      title={title}
      alt={alt}
      class={
        (toWhite
          ? "brightness-110 contrast-100 hue-rotate-[23deg] invert saturate-[7500%] sepia-0 filter"
          : "") +
        "" +
        clasN
      }
      src={`${url}`}
    />
  );
});

// export const StrapiImage = component$(
//   ({
//     url,
//     width = 300,
//     height = 300,
//     alt = "",
//     title = "",
//     toWhite = false,
//     clasN = "",
//   }: {
//     url: string;
//     width?: any;
//     height?: any;
//     alt?: string;
//     title?: string;
//     toWhite?: boolean;
//     clasN?: string;
//   }) => {
//     return (
//       <Image
//         layout="constrained"
//         width={width}
//         height={height}
//         src={`${strapiURL}${url}`}
//         alt={alt}
//         title={title}
//         class={
//           (toWhite
//             ? "brightness-110 contrast-100 hue-rotate-[23deg] invert saturate-[7500%] sepia-0 filter"
//             : "") +
//           "" +
//           clasN
//         }
//       />
//     );
//   },
// );
