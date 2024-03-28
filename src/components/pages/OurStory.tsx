import { component$ } from "@builder.io/qwik";
import { Markdown } from "../Markdown";
import { Linking_picture } from "../linking-picture";
import { Button } from "../Button";

export const OurStory = component$(({ data }: { data: any }) => {
  return <div class="flex flex-col items-center text-primary-blue">
    <h2 class="px-4 md:px-8 text-center font-semibold text-secondary-red text-2xl md:text-3xl">{data['Titles'][0]['Text']}</h2>
    <h3 class="px-4 md:px-8 text-center text-xl md:text-2xl">{data['Titles'][1]['Text']}</h3>
    <div class="flex px-4 md:px-8 mt-5 flex-wrap items-center justify-center">
      <div class="flex flex-col w-full lg:w-3/5 mx-5">
        <h3 class="font-bold my-4 text-2xl md:text-4xl text-center">{data['CommitmentPar']['Title']}</h3>
        <Markdown text={data['CommitmentPar']['Paragraph']} classN="text-justify"></Markdown>
      </div>
      <Linking_picture height="h-[350px]" width="w-[350px]" 
        media={data['CommitmentPar']['Media']['data']['attributes']} ></Linking_picture>
    </div>
    <div class="flex px-8 mt-8 flex-col md:flex-row justify-center md:justify-around items-center md:items-start">
      {data['ColumnsPar'].map((column: any, index: any) => (
        <div key={index} class="flex flex-col my-5 w-full md:w-1/2 justify-center items-center">
          <h2 class="font-bold  text-2xl md:text-4xl text-center">{column['Title']}</h2>
          <Markdown text={column['Paragraph']}></Markdown>
        </div>
      ))}
    </div>
    <h3 class="font-bold text-2xl md:text-4xl mt-8 text-center">{data['SponsorshipsTitle']}</h3>
    <div class="flex items-center justify-center w-full my-4">
      <div class="w-full flex bg-primary-blue bg-opacity-30 my-4 h-[350px] py-10">
        <div class="w-full bg-primary-blue py-10 bg-opacity-60">
          <div class="w-full h-full bg-primary-blue"></div>
        </div>
      </div>
      {data['Sponsorships'].map((sponsorship: any, index: any) => (
        <div key={index} class="h-[350px] px-6 absolute flex flex-col justify-around items-center w-[250px] bg-white rounded-3xl shadow-xl">
          <Linking_picture height="h-[200px]" width="w-[200px]" media={data['Sponsorships'][0]['Media']['data']['attributes']}></Linking_picture>
          <div class="flex flex-col items-center">
            <h3 class="text-secondary-red text-xl font-semibold">{sponsorship['Title']}</h3>
            <h3 class="text-secondary-red text-xl font-semibold">{sponsorship['Subtitle']}</h3>

          </div>
          <Button text={sponsorship['Buttons'][0]['Text']} link={sponsorship['Buttons'][0]['Link']}></Button>
        </div>
      ))}
    </div>
  </div>
});