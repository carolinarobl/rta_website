import { component$ } from "@builder.io/qwik";
import { StrapiImage } from "~/components/StrapiImage";

export const SectionCareersOffers = component$(({ data }: { data: any }) => {
  const OfferBox = component$(({ offer }: { offer: any }) => {
    return (
      <div class="flex h-[250px] w-[170px] flex-col items-center justify-start gap-3 rounded-[16px] bg-white p-3 text-center shadow-lg">
        <StrapiImage
          clasN="h-[80px] w-[100%] object-cover rounded-[16px] bg-primary-blue bg-opacity-10"
          url={offer["Media"]["data"]["attributes"]["url"]}
          alt={offer["Media"]["data"]["attributes"]["alternativeText"]}
          title={offer["Media"]["data"]["attributes"]["caption"]}

          width="240"
          height="120"
        />
        <h3 class="text-[18px] font-[600]">{offer["Title"]}</h3>
        <p class="text-[14px] font-[400]">{offer["Paragraph"]}</p>
      </div>
    );
  });
  return (
    <div class="flex w-full justify-center px-8">
      <div class="mt-10 flex max-w-[1400px] items-center justify-center gap-8 px-8 text-center text-primary-blue max-[1000px]:flex-col">
        <div class="flex w-[50%] flex-col max-[1000px]:w-[100%]">
          <h3 class="mt-3 text-[40px] font-[700]">{data["BeliefsTitle"]}</h3>
          <span class="text-[28px] font-[600]">{data["BeliefsSubtitle"]}</span>
          <span class="text-[26px] font-[600] text-secondary-red">
            {data["Beliefs"][0]["Text"]}
          </span>
          <p class="mt-3 text-[20px]">{data["BeliefsDescription"]}</p>
        </div>
        <div class="flex w-[50%] flex-col items-center justify-center max-[1000px]:w-[100%]">
          <h4 class="text-[40px] font-[700]">{data["OfferingTitle"]}</h4>
          <div class="mt-4 flex flex-wrap justify-center gap-6">
            {data["Offerings"].map((offer: any, i: number) => {
              return <OfferBox key={i} offer={offer}></OfferBox>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
});
