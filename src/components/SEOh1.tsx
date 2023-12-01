import { component$ } from "@builder.io/qwik";

export const SEOh1 = component$(
  ({ SEOdata, customText }: { SEOdata?: any; customText?: string }) => {
    const h1text = customText
      ? customText
      : SEOdata["MetaTitle"].split(" |")[0];
    if (!SEOdata && !customText) return <h1 class="absolute opacity-0">RTA</h1>;
    return <h1 class="absolute opacity-0">{h1text}</h1>;
  },
);
