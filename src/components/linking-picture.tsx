import { component$ } from "@builder.io/qwik";
import { setURL } from "~/data/constants";

interface Props {
  width: string;
  height: string
  color?: string;
  url: string;
  alt: string;
}

export const Linking_picture = component$(({ width, height, color = "bg-[#2E5899]", url, alt }: Props) => {
  return <div class={`${color} bg-opacity-40 p-6 ${height} ${width} rounded-full inline-block items-center justify-center`}>
    <div class={`${color} py-6 px-6 flex items-center bg-opacity-60 justify-center rounded-full overflow-hidden shadow-md w-full h-full`}>
      <div class={`${color} flex items-center bg-opacity-80 justify-center rounded-full overflow-hidden shadow-md w-full h-full`}>

        <img class="object-cover h-full w-full rounded-full" height={250} width={250} src={setURL(url)} alt={alt} />
      </div>

    </div>
  </div>
});