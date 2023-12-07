import { $, component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { StrapiImage } from "./StrapiImage";

export const LangSwitch = component$(({ data }: { data: any }) => {
  const location = useLocation();
  const isES = location.prevUrl?.pathname.includes("/es/");
  const handleClick = $(() => {
    let newPath = "";
    if (isES) {
      newPath = "/" + window.location.pathname.split("/es/")[1];
    } else {
      newPath = "/es" + window.location.pathname;
    }
    window.location.pathname = newPath;
  });

  return (
    // <label class="switch" onClick$={handleClick}>
    //   <input
    //     type="checkbox"
    //     checked={location.prevUrl?.pathname.includes("/es/")}
    //   />
    //   <span class="slider round"></span>
    // </label>
    <div
      class="relative flex cursor-pointer items-center justify-center self-center rounded-full bg-gray-100 shadow-sm"
      onClick$={handleClick}
    >
      <StrapiImage
        url={data[0]["Icon"]["data"]["attributes"]["url"]}
        clasN={`h-[36px] w-[36px] m-1 rounded-full ${
          !isES
            ? "border-2 border-primary-blue border-opacity-50"
            : "opacity-30"
        }`}
      />
      <StrapiImage
        url={data[1]["Icon"]["data"]["attributes"]["url"]}
        clasN={`h-[36px] w-[36px] m-1 rounded-full ${
          isES ? "border-2 border-primary-blue border-opacity-50" : "opacity-30"
        }  `}
      />
    </div>
  );
});
