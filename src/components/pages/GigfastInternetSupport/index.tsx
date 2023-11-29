import { component$ } from "@builder.io/qwik";
import { SectionSupportTips } from "./SectionSupportTips";
import { SectionInternetInfo } from "./SectionInternetInfo";
import { Paragraph, SerializedParagraph } from "~/components/Paragraph";
import { setURL } from "~/data/constants";
import { Stepper } from "~/components/Stepper";

export const GigfastInternetSupport = component$(({ data }: { data: any }) => {
  const pageData = data["pageGfIS"]["data"]["attributes"];

  // wifi paragraph text
  let wifiText = "";
  pageData["WiFiListing"]["Bullets"].forEach((bullet: any) => {
    wifiText += "- " + bullet["Text"] + "\n";
  });
  return (
    <div
      onClick$={() => {
        console.log(data);
      }}
      class="flex w-full flex-col items-center justify-center"
    >
      <h1 class="max-w-[800px] px-8 text-center text-[42px] font-[600] text-primary-blue max-[600px]:text-[32px]">
        {pageData["Introduction"]["Paragraph"]}
      </h1>
      <SectionSupportTips data={pageData["Tips"]} />
      <SectionInternetInfo data={pageData["InternetInfo"]} />
      <div class="flex max-w-[1200px] items-start justify-center gap-4 p-8 max-[800px]:flex-col">
        <p class="w-[60%] text-[15px] text-primary-blue max-[800px]:w-full">
          {pageData["InternetExample"][0]["Text"]}
        </p>
        <p class="w-[40%] text-[15px] font-[600] text-primary-blue max-[800px]:w-full">
          {pageData["InternetExample"][1]["Text"]}
        </p>
      </div>
      <Paragraph
        title={pageData["WiFiListing"]["Title"]}
        text={wifiText}
        image={setURL(pageData["WiFiPicture"]["data"]["attributes"]["url"])}
        textPercentage={50}
        reverse
      />
      <SerializedParagraph data={pageData["TestPar"]} textPercentage={60} />
      <Stepper
        steps={pageData["TestStepss"].map((step: any) => {
          return "**" + step["Title"] + "**\n\n" + step["Text"];
        })}
      />
      <Paragraph
        text={pageData["TestGlossary"]["Paragraph"]}
        image={setURL(
          pageData["TestGlossary"]["Media"]["data"]["attributes"]["url"],
        )}
        textPercentage={60}
      />
      {/* TROUBLESHOOTING */}
      <h3 class="text-[40px] font-[600] text-primary-blue">
        {pageData["TroubleSteps"]["Title"]}
      </h3>
      <p class="my-4 text-primary-blue">{pageData["TroubleDescription"]}</p>
      <div class="max-w-[1200px]  px-8">
        <Stepper
          steps={pageData["TroubleSteps"]["Bullets"].map((step: any) => {
            return step["Title"]
              ? "**" +
                  step["Title"] +
                  "**\n" +
                  step["Text"].replaceAll("\n\n", "\n")
              : "**" + step["Text"].replaceAll("\n\n", "\n") + "**";
          })}
        />
      </div>
    </div>
  );
});
