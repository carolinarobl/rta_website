import { component$ } from "@builder.io/qwik";
import { Markdown } from "~/components/Markdown";

export const SectionACPVideo = component$(
  ({ info, video }: { info: any; video: any }) => {
    return (
      <div class="flex max-w-[1200px] items-center justify-center self-center max-[800px]:flex-col">
        <div class="flex w-[300px] flex-col items-center justify-center self-center p-4 min-[800px]:w-[40%]">
          <iframe
            src={`https://www.youtube.com/embed/${
              video["Link"].split("v=")[1]
            }`}
            height={"250px"}
            width={"100%"}
            class="mb-5 rounded-[30px] shadow-md"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullscreen
          />
          <Markdown
            text={video["Paragraph"]}
            classN={
              "px-3 max-sm:text-[14px] text-[16px] text-primary-blue text-justify"
            }
          />
        </div>
        <div class="flex flex-col items-center justify-center gap-4 px-10 min-[800px]:w-[60%]">
          <h3 class="text-center text-[38px] font-bold text-primary-blue max-sm:text-[28px]">
            {info["Title"]}
          </h3>
          <h4 class="text-center text-[38px] font-bold text-secondary-red max-sm:text-[28px]">
            {info["Subtitle"]}
          </h4>
          <div>
            <Markdown
              classN={"max-sm:text-[15px] text-[18px] text-primary-blue"}
              text={info["Paragraph"]}
            />
          </div>
        </div>
      </div>
    );
  },
);
