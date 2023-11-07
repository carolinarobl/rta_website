import { component$ } from "@builder.io/qwik";
import { Button } from "./Button";
import { FaCircleArrowRightSolid } from "@qwikest/icons/font-awesome";
import { setURL } from "~/data/constants";

export const Paragraph = component$(
  ({
    logo,
    image,
    title,
    subtitle,
    text,
    buttons,
    reverse = false,
    alt = false,
  }: {
    logo?: string;
    image?: string;
    title: string;
    subtitle?: string;
    text: string;
    buttons?: Array<any>;
    reverse?: bool;
    alt?: bool;
  }) => {
    return (
      <div
        class={`flex min-h-[500px] w-full flex-col items-center justify-center ${
          alt ? "bg-[#e2eefa]" : ""
        }`}
      >
        {alt && (
          <>
            <div class="h-8 w-full bg-[#f7fafe]"></div>
            <div class="h-8 w-full bg-[#ebf4fc]"></div>
          </>
        )}
        <div
          class={`flex ${
            reverse ? "flex-row-reverse" : ""
          } max-w-[1200px] items-center justify-center max-[800px]:flex-col`}
        >
          <div
            class={`flex ${
              image && "min-[800px]:w-[70%]"
            }  flex-col items-center justify-center gap-4 px-10`}
          >
            {logo && (
              <div class="w-[70%]">
                <img src={logo} alt="paragraph-logo" />
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
            <div class="text-justify text-[22px] text-[#2E5899]">{text}</div>
            {buttons &&
              buttons.map((button, i) => (
                <Button key={i} text={button["Text"]} link={button["Link"]}>
                  <FaCircleArrowRightSolid
                    color="#13B295"
                    class="text-[21px] opacity-60"
                  />
                </Button>
              ))}
          </div>
          {image && (
            <div class="flex w-[300px] items-center justify-center self-center p-4 min-[800px]:w-[30%]">
              <img src={image} alt="paragraph-image" width="597" height="743" />
            </div>
          )}
        </div>
        {alt && (
          <>
            <div class="h-8 w-full bg-[#ebf4fc]"></div>
            <div class="h-8 w-full bg-[#f7fafe]"></div>
          </>
        )}
      </div>
    );
  },
);

export const SerializedParagraph = component$(
  ({
    data,
    reverse = false,
    alt = false,
  }: {
    data: any;
    reverse: bool;
    alt: bool;
  }) => {
    return (
      <Paragraph
        logo={
          data["Logo"]["data"]["attributes"]["url"] &&
          setURL(data["Logo"]["data"]["attributes"]["url"])
        }
        image={
          data["Media"]["data"]["attributes"]["url"] &&
          setURL(data["Media"]["data"]["attributes"]["url"])
        }
        title={data["Title"]}
        subtitle={data["Subtitle"]}
        text={data["Paragraph"]}
        buttons={data["Buttons"]}
        reverse={reverse}
        alt={alt}
      />
    );
  },
);

export const ListedParagraphs = component$(({ data }: { data: any }) => {
  return (
    <>
      {data.map((paragraph: any, i: number) => (
        <SerializedParagraph
          key={i}
          data={paragraph}
          reverse={i % 2 === 0}
          alt={i % 2 === 1}
        />
      ))}
    </>
  );
});
