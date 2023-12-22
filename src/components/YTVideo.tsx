import { component$ } from "@builder.io/qwik";

export const YTVideo = component$(
  ({ ytURL, classN }: { ytURL: string; classN: string }) => {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${ytURL.split("v=")[1]}`}
        class={`h-full w-full ${classN}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  },
);
