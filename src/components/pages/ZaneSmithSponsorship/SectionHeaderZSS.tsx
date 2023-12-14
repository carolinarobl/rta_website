import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Markdown } from "~/components/Markdown";
import { StrapiImage } from "~/components/StrapiImage";
import { YTVideo } from "~/components/YTVideo";

export const SectionHeaderZSS = component$(({ data }: { data: any }) => {
  const screenW = useSignal<number>(1000);

  useVisibleTask$(() => {
    screenW.value = window.innerWidth;

    window.addEventListener("resize", () => {
      screenW.value = window.innerWidth;
    });
  });
  return (
    <div class="flex min-h-[500px] w-full items-center justify-center bg-gradient-radial from-[#3281bb] via-[#2871ac] to-[#185393]">
      <div class="flex max-w-[1200px] flex-col items-center justify-center px-8 py-12">
        <div
          class="grid items-center justify-center gap-6"
          style={{
            gridTemplateColumns:
              screenW.value > 800 ? "250px 1fr 250px" : "1fr",
          }}
        >
          <section class="flex w-full flex-col rounded-[35px] bg-white shadow-lg">
            <div class="flex w-full items-center justify-center rounded-t-[35px] bg-gradient-to-r from-[#4caafd] to-[#1a7ee4] px-6 py-3">
              <StrapiImage
                url={data["LogoSponsor"]["data"]["attributes"]["url"]}
                clasN="h-[16px] w-fit"
              />
            </div>
            <div class="flex flex-col items-center justify-center p-4">
              <YTVideo
                ytURL={data["RaceRepVids"][0]["Link"]}
                // eslint-disable-next-line qwik/no-react-props
                className="rounded-[30px] shadow-lg"
              />
              <Markdown
                text={data["RaceRepVids"][0]["Paragraph"]}
                classN="text-[13px] p-1 mt-2"
              />
              <div class="h-[6px] w-full border-t border-gray-300"></div>
              <div class="h-[6px] w-full border-t border-gray-300"></div>
              <div class="mb-4 h-[6px] w-full border-t border-gray-300"></div>
              <YTVideo
                ytURL={data["RaceRepVids"][1]["Link"]}
                // eslint-disable-next-line qwik/no-react-props
                className="rounded-[30px] shadow-lg"
              />
              <Markdown
                text={data["RaceRepVids"][1]["Paragraph"]}
                classN="text-[13px] p-1 mt-2"
              />
            </div>
          </section>
          <div>center</div>
          <section class="flex w-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg">
            aaa
          </section>
        </div>
      </div>
    </div>
  );
});
