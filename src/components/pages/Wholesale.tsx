import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Markdown } from "../Markdown";
import { Button } from "../Button";
import { ListedParagraphs, Paragraph } from "../Paragraph";
import { AccordionItem } from "../AccordionItem";
import { StrapiImage } from "../StrapiImage";

export const Wholesale = component$(({ data }: { data: any }) => {
  const pageData = data["data"]["pageWholesale"]["data"]["attributes"];
  const secctionNet = data["data"]["sectionNetwork"]["data"]["attributes"];

  const features = pageData["NetworkDIA"]["Features"];

  const introParagraph = pageData["Introduction"]["Paragraph"] || "";
  const [introTop, introBottom] = introParagraph.split("+++", 2);

  const index = useSignal(0);
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async (taskCtx) => {
    const timer = setInterval(() => {
      index.value = (index.value + 1) % features.length;
    }, 4000);

    taskCtx.cleanup(() => {
      clearInterval(timer);
    });
  });

  return (
    <div class="flex flex-col items-center justify-center">
      
<div class="p-8 flex md:flex-row flex-col w-full max-w-[1200px] items-stretch justify-center gap-8">
  
  {/* Parte 1 del párrafo */}
  <div class='flex flex-col gap-4 md:flex-1 w-full items-center justify-center'>
    <h1 class='text-primary-blue min-[1000px]:text-[45px] text-[30px] !font-bold md:text-start text-center'>{pageData['Introduction']['Title']}</h1>
      <Markdown classN="md:text-start text-center" text={introTop.trim()} />
  </div>

  {/* Parte 2 del párrafo */}
  <div
    class="relative bg-primary-blue border-[30px] border-solid border-blue-500 text-white rounded-full p-2 flex flex-col items-center justify-center w-full md:w-auto md:aspect-square md:h-auto md:min-h-[120px] md:min-w-[120px] gap-4 grow-0"
  >
    <Markdown classN="text-center text-white md:max-w-[350px]" text={introBottom?.trim() || ""} />

    <Button
      text={pageData["Introduction"]["Buttons"][0]["Text"]}
      link={pageData["Introduction"]["Buttons"][0]["Link"]}
      type="action"
    />
  </div>
</div>

      <StrapiImage
        media={pageData["NetworkLogo"]["data"]["attributes"]}
        height={180}
        width={400}
      />
      <div class={`flex w-full flex-col items-center justify-center`}>
        <div
          class={`my-4 flex max-w-[1200px] flex-row-reverse items-center justify-center max-[800px]:flex-col`}
        >
          <div
            class={`flex flex-col items-center justify-center gap-4 px-10 min-[800px]:w-[70%]`}
          >
            <div class={`flex justify-center gap-2 text-primary-blue`}>
              <span class="text-center text-[38px] font-bold max-sm:text-[28px]">
                {pageData["NetworkDIA"]["Title"]}
              </span>
            </div>
            <Markdown
              text={pageData["NetworkDIA"]["Paragraph"]}
              classN={`text-[18px] max-sm:text-[15px] text-primary-blue`}
            ></Markdown>
            <div class="flex flex-col items-center justify-end text-center">
              <h2 class="font-semibold text-primary-blue">
                {pageData["NetworkDIA"]["Subtitle"]}
              </h2>
              <p class="text-2xl font-bold text-primary-blue">
                {pageData["NetworkDIA"]["FeaturesTitle"]}
              </p>
            </div>
            <div class="text-center text-xl font-semibold text-secondary-red">
              <h2 class={`animated-fadein-down animated-fadeout-down`}>
                {features[index.value]["Text"]}
              </h2>
            </div>
          </div>
          <div
            class={`flex w-[300px] items-center justify-center self-center p-4 min-[800px]:w-[${(
              100 - 70
            ).toString()}%]`}
          >
            <StrapiImage
              media={pageData["NetworkDIA"]["Media"]["data"]["attributes"]}
              width="597"
              height="500"
            />
          </div>
        </div>
      </div>

      <Paragraph
        text={pageData["NetworkCircuits"]["Paragraph"]}
        backgroundColor="transparent"
        title={pageData["NetworkCircuits"]["Title"]}
        image={pageData["NetworkCircuits"]["Media"]["data"]["attributes"]}
      ></Paragraph>
      <div class="my-4 flex flex-wrap-reverse items-center justify-center gap-8 px-8 py-6">
        <div
          class="flex items-center justify-center"
          onClick$={() => {
            console.log(pageData);
          }}
        >
          <StrapiImage
           media={
              pageData["NetworkMap"]["data"]["attributes"]["Map"]["MapPicture"]["data"]["attributes"]
            }
            width={500} height={500}
          />
        </div>
        <div class="flex w-full flex-col items-center justify-center md:w-1/2">
          <Markdown
            text={secctionNet["Description"]["Paragraph"]}
            classN="text-primary-blue"
          ></Markdown>
          <AccordionItem
            title={secctionNet["Map"]["ServersTitle"]}
            classContainer="rounded-full bg-white text-primary-blue shadow-xl"
          >
            <div class="flex flex-col rounded-b-2xl bg-white py-4 text-primary-blue">
              {secctionNet["Map"]["Servers"].map((server: any, index: any) => (
                <a
                  key={index}
                  href={server["Link"]}
                  class="text-primary-blue hover:text-secondary-red"
                >
                  {server["Text"]}
                </a>
              ))}
            </div>
          </AccordionItem>
        </div>
      </div>
      <ListedParagraphs data={pageData["GFServices"]}></ListedParagraphs>
    </div>
  );
});
