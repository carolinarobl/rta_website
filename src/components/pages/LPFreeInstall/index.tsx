import { component$ } from "@builder.io/qwik";
import { SectionHeader } from "./SectionHeader";
import { SectionSpeed } from "./SectionSpeed";
import { SectionRating } from "./SectionRating";
import { StrapiImage } from "~/components/StrapiImage";
import { Link } from "@builder.io/qwik-city";


export const LPFreeInstall = component$(({ data }: { data: any }) => {

  const logoData = data['Logo']['data']['attributes'];
  const sectionHeadData = data['SectionHead'];

  const speedList = data['SpeedBullets'];
  const sectionSpeedData = data['SectionSpeed'];
  
  const sectionRatingData = data['SectionRating'];

  const footer =data['Footer'];
  
  return (
    <div class="min-h-screen w-full flex flex-col items-center">

      <StrapiImage width={"200px"} url={logoData['url']} alt={logoData['alternativeText']} clasN={"p-5"}/>

      {/* HEADER SECTION*/}
      <SectionHeader parData={sectionHeadData}/>

      {/* SPEED SECTION*/}
      <SectionSpeed parData={sectionSpeedData} speedList={speedList}/>

      {/* RATING SECTION*/}
      <SectionRating parData={sectionRatingData}/>

      <div class="w-full bg-white  flex md:flex-row flex-col items-center justify-between">
        <div class=" flex flex-row gap-5 p-1">
          {footer &&
            footer.map((button: any, i: number) => (
              <Link
                key={i}
                href={button["Link"]}
                class=" hover:text-primary-blue/60 text-primary-blue font-bold"
              >
              {button['Text']}
              </Link>
            ))
            }
          </div>
          <div class="text-primary-blue text-center">
          © 2024 Rural Telecommunications of America, Inc. All rights reserved.
            </div>       
      </div>
    </div>
  );
});
