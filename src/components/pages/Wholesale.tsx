import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Markdown } from "../Markdown";
import { Button } from "../Button";
import { setURL } from "~/data/constants";
import { ListedParagraphs, Paragraph } from "../Paragraph";
import { AccordionItem } from "../AccordionItem";

export const Wholesale = component$(({ data }: { data: any }) => {
  const pageData = data['data']['pageWholesale']['data']['attributes']
  const secctionNet = data['data']['sectionNetwork']['data']['attributes']

  const features = pageData['NetworkDIA']['Features'];

  const index = useSignal(0);

  useVisibleTask$(async (taskCtx) => {
    const timer = setInterval(() => {
      index.value = (index.value + 1) % features.length;
    }, 4000);

    taskCtx.cleanup(() => {
      clearInterval(timer);
    });
  });

  return <div class="flex flex-col items-center justify-center">
    <div class="w-full md:w-1/2 flex flex-col items-center px-4 my-8 justify-center">
      <Markdown classN="text-center my-4" text={pageData['Introduction']['Paragraph']}></Markdown>
      <Button text={pageData['Introduction']['Buttons'][0]['Text']} link={pageData['Introduction']['Buttons'][0]['Link']}
        type="action"></Button>
    </div>
    <img src={setURL(pageData['NetworkLogo']['data']['attributes']['url'])} alt={pageData['NetworkLogo']['data']['attributes']['alternativeText']}
      height={180}
      width={400} />
    <div
      class={`flex w-full flex-col items-center justify-center`}
    >
      <div
        class={`my-4 flex max-w-[1200px] items-center flex-row-reverse justify-center max-[800px]:flex-col`}>
        <div
          class={`flex min-[800px]:w-[70%] flex-col items-center justify-center gap-4 px-10`}>
          <div class={`flex justify-center gap-2 text-primary-blue`}>
            <span class="text-center text-[38px] font-bold max-sm:text-[28px]">
              {pageData['NetworkDIA']['Title']}
            </span>
          </div>
          <Markdown
            text={pageData['NetworkDIA']['Paragraph']}
            classN={`text-[18px] max-sm:text-[15px] text-primary-blue`}
          ></Markdown>
          <div class="flex flex-col text-center items-center justify-end">
            <h2 class="text-primary-blue font-semibold">{pageData['NetworkDIA']['Subtitle']}</h2>
            <p class="text-primary-blue font-bold text-2xl">{pageData['NetworkDIA']['FeaturesTitle']}</p>
          </div>
          <div class="text-secondary-red text-center text-xl font-semibold">
            <h2 class={`animated-fadein-down animated-fadeout-down`}>{features[index.value]['Text']}</h2>
          </div>

        </div>
        <div
          class={`flex w-[300px] items-center justify-center self-center p-4 min-[800px]:w-[${(
            100 - 70
          ).toString()}%]`}
        >
          <img src={setURL(pageData['NetworkDIA']['Media']['data']['attributes']['url'])} alt="paragraph-image" width="597" height="300" />
        </div>
      </div>
    </div>

    <Paragraph text={pageData['NetworkCircuits']['Paragraph']}
    backgroundColor="transparent"
      title={pageData['NetworkCircuits']['Title']}
      image={pageData['NetworkCircuits']['Media']['data']['attributes']}></Paragraph>
    <div class="flex flex-wrap-reverse px-8 py-6 my-4 items-center justify-center">
      <div class="h-[450px] w-full md:w-1/2"></div>
      <div class="flex flex-col w-full md:w-1/2 items-center justify-center">
        <Markdown text={secctionNet['Description']['Paragraph']} classN="text-primary-blue"></Markdown>
        <AccordionItem title={secctionNet['Map']['ServersTitle']} classContainer="rounded-full bg-white text-primary-blue shadow-xl">
          <div class="flex flex-col py-4 text-primary-blue bg-white rounded-b-2xl">
            {secctionNet['Map']['Servers'].map((server: any, index: any) => (
              <a key={index} href={server['Link']} class="hover:text-secondary-red text-primary-blue">{server['Text']}</a>
            ))}
          </div>
        </AccordionItem>
      </div>
    </div>
    <ListedParagraphs data={pageData['GFServices']}></ListedParagraphs>
  </div>
});