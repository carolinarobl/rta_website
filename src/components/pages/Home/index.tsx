import { component$ } from "@builder.io/qwik";
import { HomeHeader } from "./HomeHeader";
import {
  ListedParagraphs,
  Paragraph,
  SerializedParagraph,
} from "~/components/Paragraph";
import { ProsSection } from "./ProsSection";
import { setURL } from "~/data/constants";
import { SectionGFInternetHome } from "./SectionGFInternetHome";
import { SectionSugHome } from "./SectionSugHome";

export const Home = component$(({ data }: { data: any }) => {
  // full data
  const pageData = data["pageHome"]["data"]["attributes"];

  // Races
  // const racesData = data["zaneRaces"]["data"];

  // Pros Section
  const prosData = data["sectionProsRta"]["data"]["attributes"]["Pros"];

  const prosMap = pageData["ProsPicture"]["data"]["attributes"]["url"];

  // const prosMap =
  //   data["sectionNetwork"]["data"]["attributes"]["Map"]["MapPicture"]["data"][
  //     "attributes"
  //   ]["url"];

  return (
    <div
      class="relative"
      onClick$={() => {
        console.log(pageData);
      }}
    >
      <div class="absolute bottom-0 left-0 right-0 top-[100vh] -z-10 bg-white" />
      <HomeHeader data={pageData} />
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
      <SectionGFInternetHome
        data={pageData["ParGFServices"][0]}
        parGFIPlans={pageData["ParGFIPlans"]}
      />
      <ListedParagraphs
        data={pageData["ParGFServices"].slice(
          1,
          pageData["ParGFServices"].length,
        )}
      />
      <SectionSugHome data={pageData["SugsPages"]} />
    </div>
  );
});
