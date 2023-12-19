import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Markdown } from "~/components/Markdown";
import { StrapiImage } from "~/components/StrapiImage";
import { YTVideo } from "~/components/YTVideo";
import { BsZoomIn } from "@qwikest/icons/bootstrap";
import { LocalizedText } from "~/components/LocalizedText";
import { Modal } from "~/components/Modal";
import { Button } from "~/components/Button";

export const SectionHeaderZSS = component$(({ data }: { data: any }) => {
  const imgModalSignal = useSignal<boolean>(false);
  const screenW = useSignal<number>(1000);

  useVisibleTask$(() => {
    screenW.value = window.innerWidth;

    window.addEventListener("resize", () => {
      screenW.value = window.innerWidth;
    });
  });
  return (
    <div class="flex min-h-[500px] w-full items-center justify-center bg-gradient-radial from-[#3281bb] via-[#2871ac] to-[#185393]">
      <div class="flex max-w-[1200px] flex-col items-center justify-center px-8 pt-12">
        <div
          class="grid items-start justify-center gap-6 max-[900px]:items-center"
          style={{
            gridTemplateColumns:
              screenW.value > 900 ? "250px 1fr 250px" : "1fr",
          }}
        >
          <div class="flex max-w-[400px] flex-col items-center">
            <section class="flex h-fit w-full flex-col rounded-[35px] bg-white text-center shadow-lg">
              <div class="flex w-full items-center justify-center rounded-t-[35px] bg-gradient-to-r from-[#4caafd] to-[#1a7ee4] px-6 py-3 text-center">
                <StrapiImage
                  url={data["RaceRepLogo"]["data"]["attributes"]["url"]}
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
            <a
              href={data["HeaderButtons"][0]["Link"]}
              target="_blank"
              class="mt-8 w-full rounded-full border-[6px] border-[#e7758f] bg-secondary-red px-8 py-1 text-center text-[14px] font-[600] leading-[18px] text-white shadow-lg"
            >
              {data["HeaderButtons"][0]["Text"]}
            </a>
            <Modal showSignal={imgModalSignal}>
              <StrapiImage
                url={data["NascarSchedule"]["data"]["attributes"]["url"]}
                clasN="w-fit h-[90%] object-contain"
              />
            </Modal>
            <div class="flex h-[380px] w-full flex-col items-center justify-center rounded-xl px-4 transition-all  ">
              <div
                onClick$={() => {
                  imgModalSignal.value = true;
                }}
              >
                <StrapiImage
                  clasN="rounded-2xl hover:mb-4 shadow-lg transition-all transform hover:scale-[102%] hover:shadow-2xl hover:cursor-pointer"
                  url={data["NascarSchedule"]["data"]["attributes"]["url"]}
                />
              </div>
              <div class="mt-2 flex items-center justify-center gap-1">
                <BsZoomIn class="text-white" />
                <span class="text-[13px] text-white">
                  <LocalizedText
                    esText="Clic para hacer zoom"
                    enText="Tap to zoom in"
                  />
                </span>
              </div>
            </div>
          </div>
          <div class="flex h-fit max-w-[600px] flex-col items-center justify-center  text-center text-white">
            <StrapiImage
              url={data["LogoCorp"]["data"]["attributes"]["url"]}
              clasN="h-[80px] w-fit"
            />
            <span class="mb-4 text-[46px] font-[500] leading-[50px]">
              {data["Title"]}
            </span>
            <StrapiImage
              url={data["LogoSponsor"]["data"]["attributes"]["url"]}
            />
            <span class="my-4 rounded-full bg-white px-4 text-[15px] font-[400] tracking-widest text-primary-blue">
              {data["Subtitle"].toUpperCase()}
            </span>
            <StrapiImage
              url={data["HeaderPictures"]["data"][0]["attributes"]["url"]}
              clasN="w-full h-fit px-4 pt-4"
            />
          </div>
          <div class="flex max-w-[400px] flex-col items-center">
            <section class="flex h-fit w-full flex-col items-center justify-center rounded-[35px] bg-white p-4 text-center shadow-lg">
              <div class="h-[420px]">
                <YTVideo
                  ytURL={data["GiveawayBox"][0]["Video"]["Link"]}
                  // eslint-disable-next-line qwik/no-react-props
                  className="rounded-[30px] shadow-lg"
                />
              </div>
              <Markdown
                text={data["GiveawayBox"][0]["Video"]["Paragraph"]}
                classN="text-[13px] p-1 mt-2"
              />
              <Button
                text={data["GiveawayBox"][0]["Button"]["Text"]}
                link={data["GiveawayBox"][0]["Button"]["Link"]}
              />
            </section>
            <a
              href={data["HeaderButtons"][1]["Link"]}
              class="mt-8 w-full rounded-full border-[6px] border-[#e7758f] bg-secondary-red px-8 py-1 text-center text-[14px] font-[600] leading-[18px] text-white shadow-lg"
            >
              {data["HeaderButtons"][1]["Text"]}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});
