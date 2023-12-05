import { $, component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export const LangSwitch = component$((
  { data }: { data: any }
  ) => {
    console.log(data);
  const location = useLocation();
  const handleClick = $(() => {
    const isES = window.location.pathname.includes("/es/");
    let newPath = "";
    if (isES) {
      newPath = "/" + window.location.pathname.split("/es/")[1];
    } else {
      newPath = "/es" + window.location.pathname;
    }
    window.location.pathname = newPath;
  });

  return (
    <label class="switch" onClick$={handleClick}>
      <input
        type="checkbox"
        checked={location.prevUrl?.pathname.includes("/es/")}
      />
      <span class="slider round"></span>
    </label>
  );
});
