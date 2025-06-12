import { component$ } from "@builder.io/qwik";
import { AccordionItem } from "./AccordionItem";
import { StrapiImage } from "./StrapiImage";
import { Link } from "@builder.io/qwik-city";
import { Button } from "./Button";
import { Markdown } from "./Markdown";

export const Footer = component$(({ data }: { data: any }) => {
  return (
    <div id="footer" class="">
      <div class="flex flex-col items-center bg-primary-blue px-4 py-3 text-white">
        <p class="text-[22px] font-semibold">
          {data["SupportSection"]["Title"]}
        </p>
        <p class="text-s lm:w-1/2 text-center sm:w-3/4">
          {data["SupportSection"]["Paragraph"]}
        </p>
      </div>
      <div class="flex flex-col flex-wrap justify-around bg-primary-dark-blue px-3 py-3 text-white lg:flex-row">
        <div class="flex flex-col items-center justify-center">
          <div class="mb-4 w-[180px]">
            <StrapiImage
              width={970}
              height={359}
              media={data["CorpInfo"]["Media"]["data"]["attributes"]}
            />
          </div>
          <Markdown text={data["CorpInfo"]["Paragraph"]} classN={"text-white font-extralight mb-4 max-w-sm text-center text-[14px]"}/>
          <Button
            type="action"
            link={data["CorpInfo"]["Buttons"][0]["Link"]}
            text={data["CorpInfo"]["Buttons"][0]["Text"]}
          />
        </div>
        <div class="container sm:hidden">
          {data["Menus"].map((menu: any, i: any) => (
            <AccordionItem key={i} inFooter={true} title={menu["Text"]} classContainer="text-md text-primary-light-blue font-semibold border-b-2 border-t-2 border-primary-light-blue">
              {menu["SubOption"].map((subOption: any, index: any) => (
                <Link
                  key={index}
                  href={subOption["Link"]}
                  class="mb-4 hover:text-blue-600"
                >
                  <p class="font-light text-[14px]">{subOption["Text"]}</p>
                </Link>
              ))}
            </AccordionItem>
          ))}
        </div>

        <div class="flex justify-around gap-6">
          {data["Menus"].map((menu: any, i: any) => (
            <div key={i} class="hidden w-1/4 sm:block">
              <p class="text-2xl text-primary-light-blue font-semibold">{menu["Text"]}</p>
              {menu["SubOption"].map((subOption: any, index: any) => (
                <Link
                  key={index}
                  href={subOption["Link"]}
                  class="hover:text-blue-600"
                >
                  <p class="font-light text-[14px] py-1">{subOption["Text"]}</p>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div class="flex flex-col items-center gap-2 bg-primary-dark-blue px-4 py-4 text-white">
        <p class="text-[14px]">{data["SocialMedia"]["Text"]}</p>
        <div class="flex flex-row gap-4">
          {data["SocialMedia"]["SubOption"].map((item: any, index: any) => (
            <Link key={index} href={item["Link"]}>
              {item["Link"].includes("facebook") && (
                <div class="flex h-7 w-7 items-center justify-center rounded-full bg-primary-blue p-2">
                  <StrapiImage
                    height={20}
                    width={20}
                    media={item["Icon"]["data"]["attributes"]}
                    toWhite={true}
                  />
                </div>
              )}
              {!item["Link"].includes("facebook") && (
                <div class="flex h-7 w-7 items-center justify-center rounded-full bg-primary-blue p-1">
                  <StrapiImage
                    height={20}
                    width={20}
                    media={item["Icon"]["data"]["attributes"]}
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
