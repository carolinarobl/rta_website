import { component$ } from "@builder.io/qwik";
import { HomeHeader } from "./HomeHeader";
import { ListedParagraphs, SerializedParagraph } from "~/components/Paragraph";
import { ProsSection } from "./ProsSection";

import { SectionGFInternetHome } from "./SectionGFInternetHome";
import { SectionSugHome } from "./SectionSugHome";

export const Home = component$(({ data }: { data: any }) => {
  // full data
  const pageData = data["pageHome"]["data"]["attributes"];

  // Races
  // const racesData = data["zaneRaces"]["data"];

  // Pros Section
  const prosData = data["sectionProsRta"]["data"]["attributes"]["Pros"];

  const prosMap = pageData["ProsPicture"]["data"]["attributes"]

  const promoBannerData = data['generalPromoBanner']['data']['attributes'];


  // const prosMap =
  //   data["sectionNetwork"]["data"]["attributes"]["Map"]["MapPicture"]["data"][
  //     "attributes"
  //   ]["url"];

  return (
    <div
      class="relative "
      onClick$={() => {
      }}
    >
      <div class="absolute bottom-0 left-0 right-0 top-[100vh] -z-10 bg-white" />
      <HomeHeader data={pageData} bannerData={promoBannerData}/>
      <ProsSection
        data={{
          prosPar: pageData["ProsPar"],
          prosData,
          prosMap,
        }}
      />
      <SerializedParagraph
        data={pageData["ParACP"]}
        reverse
        textPercentage={60}
      />
      
      <div class="flex w-full justify-center bg-[#ebf4fc]">
        <SectionGFInternetHome
          data={pageData["ParGFServices"][0]}
          parGFIPlans={pageData["ParGFIPlans"]}
        />
      </div>
      <ListedParagraphs
        data={pageData["ParGFServices"].slice(
          1,
          pageData["ParGFServices"].length,
        )}
      />
      <div class="bg-[#ebf4fc]">
      <SectionSugHome data={pageData["SugsPages"]} />
      </div>
    </div>
  );
});
