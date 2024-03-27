import { $, component$ } from "@builder.io/qwik";
import { setURL, strapiURL } from "~/data/constants";

export const StrapiImage = component$(({
  media,
  width = 150,
  height = 150,
  toWhite = false,
  clasN = "",
}: {
  media: any;
  width?: any;
  height?: any;
  toWhite?: boolean;
  clasN?: string;
}) => {

  return (
    <img
      width={width}
      height={height}
      title={media["caption"]}
      alt={media["alternativeText"]}
      class={
        (toWhite
          ? "brightness-110 contrast-100 hue-rotate-[23deg] invert saturate-[7500%] sepia-0 filter"
          : "") +
        "" +
        clasN
      }
      src={setURL(media.url)}
      srcset={media.formats &&
              media.formats.small &&
              (`${setURL(media.formats.small.url)} 40w, ${setURL(media.url)} 800w`)}
      sizes="(max-width: 600px) 40px, 800px"
      // {`${media.formats &&
      //           media.formats.small &&
      //           ("(max-width: 600px) 40px, 800px")}`}
      // srcset={media.formats && (`${setURL(media.url)} 400w`)}
    />
    // <h1>auida</h1>
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
