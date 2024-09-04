import { component$ } from "@builder.io/qwik";
import { SectionCareersHeader } from "./SectionCareersHeader";
import { SectionCareersOffers } from "./SectionCareersOffers";
import { Markdown } from "~/components/Markdown";
import { SectionOpenPositions } from "./SectionOpenPositions";

export const Careers = component$(({ data }: { data: any }) => {
  const pageData = data["pageCareers"]["data"]["attributes"];
  return (
    <div
      onClick$={() => {
      }}
    >
      <SectionCareersHeader
        data={{
          HeaderLogo: data["pageCareers"]["data"]["attributes"]["HeaderLogo"],
          HeaderTitle: data["pageCareers"]["data"]["attributes"]["HeaderTitle"],
          HeaderPictures:
            data["pageCareers"]["data"]["attributes"]["HeaderPictures"],
        }}
      />
      <SectionCareersOffers
        data={{
          Beliefs: data["pageCareers"]["data"]["attributes"]["Beliefs"],
          BeliefsDescription:
            data["pageCareers"]["data"]["attributes"]["BeliefsDescription"],
          BeliefsSubtitle:
            data["pageCareers"]["data"]["attributes"]["BeliefsSubtitle"],
          BeliefsTitle:
            data["pageCareers"]["data"]["attributes"]["BeliefsTitle"],
          Offerings: data["pageCareers"]["data"]["attributes"]["Offerings"],
          OfferingTitle:
            data["pageCareers"]["data"]["attributes"]["OfferingTitle"],
        }}
      />
      <div class="flex w-full justify-center px-8">
        <div class="max-w-[1200px] text-center text-primary-blue">
          <h3 class="mb-4 mt-16 text-[38px] font-[800]">
            {pageData["FormParagraph"]["Title"]}
          </h3>
          <Markdown
            text={pageData["FormParagraph"]["Paragraph"]}
            classN="text-[18px] font-[400]"
          />
        </div>
      </div>
      <SectionOpenPositions
        data={{
          Positions: pageData["Positions"]["data"],
          PositionsTitle: pageData["PositionsTitle"],
          FormInfo: pageData["FormParagraph"]["Buttons"][0]['Link']
        }}
      />
    </div>
  );
});
