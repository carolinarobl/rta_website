import { component$ } from "@builder.io/qwik";
import { HomeHeader } from "./HomeHeader";
import { ListedParagraphs } from "~/components/Paragraph";
import { ProsSection } from "./ProsSection";

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
    <div>
      <HomeHeader data={pageData} />
      <ProsSection
        data={{
          prosPar: pageData["ProsPar"],
          prosData,
          prosMap,
        }}
      />
      <ListedParagraphs data={pageData["ParGFServices"]} />
    </div>
  );
});
