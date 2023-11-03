import { component$ } from "@builder.io/qwik";
import { AccordionItem } from "./AccordionItem";
import { StrapiImage } from "./StrapiImage";
import { ActionButton } from "./ActionButton";
import { Link } from "@builder.io/qwik-city";

export const Footer = component$(({ data }: { data: any }) => {
  return (
    <div class="">
      <div class="flex flex-col items-center bg-primary-blue px-4 py-3 text-white">
        <h3 class="text-[22px] font-semibold">
          {data["SupportSection"]["Title"]}
        </h3>
        <p class="text-s lm:w-1/2 text-center sm:w-3/4">
          {data["SupportSection"]["Paragraph"]}
        </p>
      </div>
      <div class="flex flex-col flex-wrap justify-around bg-primary-dark-blue px-3 py-3 text-white lg:flex-row">
        <div class="flex flex-col items-center justify-center">
          <div class="mb-4 w-[180px]">
            <StrapiImage
              url={data["CorpInfo"]["Media"]["data"]["attributes"]["url"]}
              alt={
                data["CorpInfo"]["Media"]["data"]["attributes"][
                  "alternativeText"
                ]
              }
            />
          </div>
          <p class="mb-4 max-w-sm text-center">
            {data["CorpInfo"]["Paragraph"]}
          </p>
          <ActionButton
            link={data["CorpInfo"]["Buttons"][0]["Link"]}
            text={data["CorpInfo"]["Buttons"][0]["Text"]}
          />
        </div>
        <div class="container sm:hidden">
          {data["Menus"].map((menu, i) => (
            <AccordionItem key={i} title={menu["Text"]}>
              {menu["SubOption"].map((subOption, index) => (
                <Link
                  key={index}
                  href={subOption["Link"]}
                  class="mb-4 hover:text-blue-600"
                >
                  <h3>{subOption["Text"]}</h3>
                </Link>
              ))}
            </AccordionItem>
          ))}
        </div>

        <div class="flex justify-around">
          {data["Menus"].map((menu, i) => (
            <div key={i} class="hidden w-1/4 sm:block">
              <h2 class="text-xl font-bold">{menu["Text"]}</h2>
              {menu["SubOption"].map((subOption, index) => (
                <Link
                  key={index}
                  href={subOption["Link"]}
                  class="hover:text-blue-600"
                >
                  <h3>{subOption["Text"]}</h3>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div class="flex flex-col items-center gap-2 bg-primary-dark-blue px-4 py-4 text-white">
        <p class="text-[14px]">{data["SocialMedia"]["Text"]}</p>
        <div class="flex flex-row gap-4">
          {data["SocialMedia"]["SubOption"].map((item, index) => (
            <Link key={index} href={item["Link"]}>
              {item["Link"].includes("facebook") && (
                <div class="flex h-7 w-7 items-center justify-center rounded-full bg-primary-blue p-2">
                  <StrapiImage
                    url={item["Icon"]["data"]["attributes"]["url"]}
                    toWhite={true}
                  />
                </div>
              )}
              {!item["Link"].includes("facebook") && (
                <div class="flex h-7 w-7 items-center justify-center rounded-full bg-primary-blue p-1">
                  <StrapiImage
                    url={item["Icon"]["data"]["attributes"]["url"]}
                    toWhite={true}
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});
