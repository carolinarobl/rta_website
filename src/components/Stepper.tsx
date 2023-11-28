import { component$ } from "@builder.io/qwik";
import { Markdown } from "./Markdown";

export const Stepper = component$(
  ({
    steps,
    align = "start",
    direction = "vertical",
  }: {
    steps: string[];
    align: "start" | "center" | "end";
    direction: "horizontal" | "vertical";
  }) => {
    const BulletCircle = component$(
      ({
        caption,
        isFirst = false,
        isLast = false,
      }: {
        caption: string;
        isFirst: bool;
        isLast: bool;
      }) => {
        console.log(isFirst, isLast);
        return (
          <div class="relative flex h-full w-full items-center justify-center overflow-hidden">
            {!isFirst && (
              <div class="absolute bottom-[calc(50%+20px)] top-0 border-l-2 border-secondary-red"></div>
            )}
            {!isLast && (
              <div class="absolute bottom-0 top-[calc(50%+20px)] border-l-2 border-secondary-red"></div>
            )}
            <div class="flex h-[36px] w-[36px] items-center justify-center self-center rounded-full border border-secondary-red bg-transparent">
              <div class="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-secondary-red text-white">
                {caption}
              </div>
            </div>
          </div>
        );
      },
    );

    if (direction === "vertical")
      return (
        <div
          class={`grid w-fit items-center justify-around`}
          style={{
            gridTemplateColumns:
              align === "center"
                ? "1fr 60px 1fr"
                : align === "end"
                  ? "1fr 60px"
                  : "60px 1fr",
          }}
        >
          {steps.map((step, i) => (
            <>
              {align !== "center" && (
                <>
                  {align === "start" && (
                    <BulletCircle
                      caption={(i + 1).toString()}
                      isFirst={i === 0}
                      isLast={i === steps.length - 1}
                    />
                  )}
                  <div
                    key={i}
                    class={`my-[20px] ${
                      align === "end" && "ml-auto"
                    } flex w-fit flex-row items-center rounded-[50px] p-6 shadow-xl`}
                  >
                    <Markdown text={step} />
                  </div>

                  {align === "end" && (
                    <BulletCircle
                      caption={(i + 1).toString()}
                      isFirst={i === 0}
                      isLast={i === steps.length - 1}
                    />
                  )}
                </>
              )}
              {align === "center" && (
                <>
                  <div
                    key={i}
                    class="flex w-fit flex-row items-center rounded-[50px] px-6 py-10 shadow-lg"
                  >
                    <Markdown text={step} />
                  </div>
                  {i % 2 === 0 ? (
                    <>
                      <BulletCircle
                        caption={(i + 1).toString()}
                        isFirst={i === 0}
                        isLast={i === steps.length - 1}
                      />
                      <div />
                      <div />
                      {i + 1 < steps.length && (
                        <BulletCircle
                          caption={(i + 2).toString()}
                          isLast={i === steps.length}
                        />
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          ))}
        </div>
      );
    else
      return (
        <div class="flex flex-row justify-between">
          {steps.map((step) => (
            <div class="flex flex-col items-center">
              <div class="h-2 w-2 rounded-full bg-primary-blue"></div>
              <div class="text-primary-blue">{step}</div>
            </div>
          ))}
        </div>
      );
  },
);
