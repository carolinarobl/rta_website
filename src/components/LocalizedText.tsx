import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export const LocalizedText = component$(
  ({ enText, esText }: { enText: string; esText: string }) => {
    const location = useLocation();
    const isEs = location.prevUrl?.pathname.includes("/es/");
    return <>{isEs ? esText : enText}</>;
  },
);
