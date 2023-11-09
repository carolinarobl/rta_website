import { component$ } from "@builder.io/qwik";

export const PortabilityIntro = component$(({ data }: { data: any }) => {
  const imgSrc =
    data["pagePortability"]["data"]["attributes"]["IntroImage"]["data"][
      "attributes"
    ]["src"];
  return (
    <div class="flex max-w-[1200px] items-center justify-center max-[800px]:flex-col">
      <div class="flex flex-col items-center justify-center gap-4 px-10 min-[800px]:w-[70%]">
        <div class="max-w-[470px]">
          <img src={imgSrc} alt="intro-portability" width="1230" height="230" />
        </div>
        <div></div>
        <div></div>
      </div>
      <div></div>
    </div>
  );
});
