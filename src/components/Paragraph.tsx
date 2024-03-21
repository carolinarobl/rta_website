import { component$ } from "@builder.io/qwik";
import { Button } from "./Button";
import { FaCircleArrowRightSolid } from "@qwikest/icons/font-awesome";
import { Markdown } from "./Markdown";
import { StrapiImage } from "./StrapiImage";

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
    color = "primary-blue",
    hasPricing = true,
    textPercentage = 70,
    customComponent,
    backgroundColor,
    imageLink,
  }: {
    logo?: any;
    image?: any;
    title?: string;
    subtitle?: string;
    text: string;
    buttons?: Array<any>;
    reverse?: boolean;
    alt?: boolean;
    color?: string;
    hasPricing?: boolean;
    textPercentage?: number;
    customComponent?: any;
    backgroundColor?: string;
    imageLink?: string;
  }) => {
    return (
      <div
        class={`flex w-full flex-col items-center justify-center ${ alt ? "bg-white" : "bg-[#e2eefa]" }
        ${backgroundColor && `bg-${backgroundColor}` }`}
      >
        {alt && (
          <>
            <div class="h-8 w-full bg-[#ebf4fc]"></div>
            <div class="h-8 w-full bg-[#f7fafe]"></div>
          </>
        )}
        <div
          class={`my-4 flex ${
            reverse ? "flex-row-reverse" : ""
          } max-w-[1200px] items-center justify-center max-[800px]:flex-col`}
        >
          <div
            class={`flex ${
              image && `min-[800px]:w-[${textPercentage.toString()}%]`
            }  flex-col items-center justify-center gap-4 px-10`}
          >
            {logo && (
              <div class="max-w-[470px]">
                <StrapiImage
                  url={logo["formats"]['small']['url']}
                  alt={logo["alternativeText"]}
                  title={logo["caption"]}
                  width="1230"
                  height="230"
                />
              </div>
            )}
            <div
              class={`flex ${
                !hasPricing && "flex-col"
              } justify-center gap-2 text-${color}`}
            >
              {title && (
                <h2 class="text-center text-[38px]  font-bold max-sm:text-[28px]">
                  {title}
                </h2>
              )}
              {subtitle && (
                <h3
                  class={`text-[28px] font-bold
                  ${ backgroundColor && backgroundColor.trim() !== ("" || "transparent")  ? "text-white": "text-secondary-red"}
                  ${ hasPricing ? "" : "text-center "} max-sm:text-[20px]`}
                >
                  {subtitle}
                </h3>
              )}
            </div>
            <Markdown
              text={text}
              classN={`text-[18px] max-sm:text-[15px] text-${color}`}
            ></Markdown>
            <div class="flex gap-4">
              {buttons &&
                buttons.map((button: any, i: number) => (
                  <Button
                  key={i}
                  text={button["Text"]}
                  link={button["Link"]}
                  type={button['Link'].startsWith("tel:") ? "action" : "link"}
                  >
                    <FaCircleArrowRightSolid
                      color="#13B295"
                      class="text-[21px] opacity-60"
                    />
                  </Button>
                ))}
            </div>
          </div>
          {image && (
            <div
              class={`flex w-[300px] items-center justify-center self-center p-4 min-[800px]:w-[${(
                100 - textPercentage
              ).toString()}%] ${imageLink && "cursor-pointer"}`}
              onClick$={() => {
                if (imageLink) {
                  window.open(imageLink, "_blank");
                }
              }}
            >
              <StrapiImage url={image["formats"]['small']['url']} alt={image["alternativeText"]} title={image["caption"]}
 width="597" height="300" />
            </div>
          )}
          {customComponent && (
            <div
              class={`flex w-[300px] items-center justify-center self-center p-4 min-[800px]:w-[${(
                100 - textPercentage
              ).toString()}%]`}
            >
              {customComponent}
            </div>
          )}
        </div>
        {alt && (
          <>
            <div class="h-8 w-full bg-[#f7fafe]"></div>
            <div class="h-8 w-full bg-[#ebf4fc]"></div>
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
    color = "primary-blue",
    hasPricing = true,
    textPercentage = 70,
    customComponent,
    backgroundColor,
    imageLink,
  }: {
    data: any;
    reverse?: boolean;
    alt?: boolean;
    color?: string;
    hasPricing?: boolean;
    textPercentage?: number;
    customComponent?: any;
    backgroundColor?: string;
    imageLink?: string;
  }) => {
    return (
      <Paragraph
        logo={
          data["Logo"] &&
          data["Logo"]["data"] &&
          data["Logo"]["data"]["attributes"]
        }
        image={
          data["Media"] &&
          data["Media"]["data"] &&
          data["Media"]["data"]["attributes"]
        }
        title={data["Title"]}
        subtitle={data["Subtitle"]}
        text={data["Paragraph"]}
        buttons={data["Buttons"]}
        reverse={reverse}
        color={color}
        alt={alt}
        hasPricing={hasPricing}
        textPercentage={textPercentage}
        customComponent={customComponent}
        backgroundColor={backgroundColor}
        imageLink={
          data["Media"] &&
          data["Media"]["data"] &&
          data["Media"]["data"]["attributes"]["caption"].includes("http")
            ? data["Media"]["data"]["attributes"]["caption"]
            : imageLink
        }
      />
    );
  },
);

export const ListedParagraphs = component$(
  ({ data, color = "primary-blue" }: { data: any; color?: string }) => {
    return (
      <>
        {data.map((paragraph: any, i: number) => (
          <SerializedParagraph
            key={i}
            data={paragraph}
            reverse={i % 2 === 0}
            alt={i % 2 === 0}
            color={color}
          />
        ))}
      </>
    );
  },
);
