import { component$ } from "@builder.io/qwik";
import { Button } from "./Button";
import { FaCircleArrowRightSolid } from "@qwikest/icons/font-awesome";
import { Markdown } from "./Markdown";

export const Header = component$(({ data }: { data: any }) => {
  console.log(data);
  const slide1 = data["Slide"][0];
  return (
    <div
      class={`relative mb-4 flex w-[40%] min-w-[350px] max-w-[500px] flex-col items-center justify-center overflow-hidden rounded-full rounded-t-none bg-[#0E4FB0] px-8 py-1 text-white max-[400px]:w-[98%] max-[400px]:min-w-[200px] max-[400px]:pb-10 `}
    >
      <div class="absolute z-10 h-[180px] w-[180px] rounded-full bg-white opacity-5 shadow-2xl"></div>

      <div class="absolute z-10 h-[350px] w-[350px] rounded-full bg-white opacity-10 shadow-2xl"></div>

      <div class={`z-20 mb-1 flex flex-col justify-center`}>
        <span class="text-center text-[20px] font-semibold">
          {slide1["Title"]}
        </span>
        <span class="text-[14px] font-light">
          <Markdown classN="text-white" text={slide1["Paragraph"]} />
        </span>
      </div>
      <div class="z-20">
        <Button
          link={slide1["Buttons"][0]["Link"]}
          text={slide1["Buttons"][0]["Text"]}
        />
      </div>
    </div>
  );
});
