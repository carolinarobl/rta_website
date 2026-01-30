import { component$ } from "@builder.io/qwik";
import { HeroSection } from "./HeroSection";
import { ListedParagraphs} from "~/components/Paragraph";
import { ProsSection } from "./ProsSection";

import { SectionGFInternetHome } from "./SectionGFInternetHome";
import { SectionSugHome } from "./SectionSugHome";

export const Home = component$(({ data, layoutData }: { data: any; layoutData?: any }) => {
  // full data
  const pageData = data["pageHome"]["data"]["attributes"];

  // Races
  // const racesData = data["zaneRaces"]["data"];

  // Pros Section
  const prosData = data["sectionProsRta"]["data"]["attributes"]["Pros"];

  const prosMap = pageData["ProsPicture"]["data"]["attributes"]

  // const promoBannerData = data['generalPromoBanner']?.['data']?.['attributes'];

  // Header data para el formulario - viene del layoutData
  const headerData = layoutData?.["data"]?.["generalHeader"]?.["data"]?.["attributes"];


  // const prosMap =
  //   data["sectionNetwork"]["data"]["attributes"]["Map"]["MapPicture"]["data"][
  //     "attributes"
  //   ]["url"];

  return (
    <div
      class="relative"
      onClick$={() => {
      }}
    >
      {/* Nuevo Hero Section con video de fondo y formulario integrado */}
      <HeroSection data={pageData} headerData={headerData} />
      
      {/* Hero anterior comentado por si se necesita referencia */}
      {/* <HomeHeader data={pageData} bannerData={promoBannerData}/> */}
      <ProsSection
        data={{
          prosPar: pageData["ProsPar"],
          prosData,
          prosMap,
        }}
      />
      {/* <SerializedParagraph
        data={pageData["ParACP"]}
        reverse
        textPercentage={60}
      />
       */}
      <div class="flex w-full justify-center py-10">
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
      <div class="mx-4 my-8 rounded-3xl bg-primary-blue shadow-xl shadow-primary-blue/30 ">
        <SectionSugHome data={pageData["SugsPages"]} />
      </div>
    </div>
  );
});