import { component$ } from "@builder.io/qwik";
import { Button } from "./Button";
import { FaCircleArrowRightSolid } from "@qwikest/icons/font-awesome";

export const Paragraph = component$(
  ({
    logo,
    image,
    title,
    subtitle,
    text,
    button,
    reverse = false,
  }: {
    logo?: string;
    image?: string;
    title: string;
    subtitle?: string;
    text: string;
    button?: string;
    reverse?: bool;
  }) => {
    return (
      <div class={`flex flex-row${reverse ? "-reverse" : ""} max-w-[1200px]`}>
        <div
          class={`flex ${
            image && "w-[70%]"
          }  flex-col items-center justify-center gap-4 px-10`}
        >
          {logo && (
            <div>
              <img src={logo} alt="paragraph-logo" width="310" height="60" />
            </div>
          )}
          <div class="flex  justify-center gap-2">
            <span class="text-[36px] font-bold text-[#2E5899]">{title}</span>
            {subtitle && (
              <span class="text-[20px] font-bold text-[#D20030]">
                {subtitle}
              </span>
            )}
          </div>
          <div class="text-justify text-[20px] text-[#2E5899]">{text}</div>
          <Button text="Watch more">
            <FaCircleArrowRightSolid
              color="#13B295"
              class="text-[18px] opacity-60"
            />
          </Button>
        </div>
        {image && (
          <div class="flex w-[30%] items-center justify-center p-4">
            <img src={image} alt="paragraph-image" width="597" height="743" />
          </div>
        )}
      </div>
    );
  },
);
