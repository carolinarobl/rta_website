import { component$ } from "@builder.io/qwik";
import { StrapiImage } from "~/components/StrapiImage";

export const SectionCareersHeader = component$(({ data }: { data: any }) => {
  return (
    <div class="relative flex w-full items-center justify-center z-0">
      <div
        class="absolute bottom-0 left-0 right-0 top-0 z-10 grid"
        style={{
          gridTemplateRows: "35px 35px 1fr 35px 35px",
          gridTemplateColumns: "100%",
        }}
      >
        <div class="bg-white opacity-50" />
        <div class="bg-white opacity-80" />
        <div class="bg-white " />
        <div class="bg-white opacity-80" />
        <div class="bg-white opacity-50" />
      </div>
      {/* CONTENT */}
      <div class="z-10 flex flex-wrap items-center justify-center px-8 text-center text-[30px] font-[700] text-primary-blue">
        <StrapiImage
          clasN="w-[300px] max-[1000px]:hidden"
          media={data["HeaderPictures"]["data"][0]["attributes"]}
        />
        <div class="flex flex-col">
          <span>Join the</span>
          <StrapiImage
            clasN="w-[200px]"
            media={data["HeaderLogo"]["data"]["attributes"]}
          />
          <span>Family</span>
        </div>
        <StrapiImage
          clasN="w-[300px]"
          media={data["HeaderPictures"]["data"][1]["attributes"]}
        />
      </div>
    </div>
  );
});
