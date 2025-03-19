import { component$ } from "@builder.io/qwik";
import { SectionLocIntro } from "./SectionLocIntro";
import { SectionLocOffers } from "./SectionLocOffers";
import { ProsSection } from "../Home/ProsSection";
import { Post } from "~/components/Post";
import { Button } from "~/components/Button";

export const Location = component$(({ data }: { data: any }) => {

  const pageData = data['locations']['data'][0]['attributes'];
  const slug= pageData['Slug'];
  const isSpanish =
  slug.substring(slug.length - 3, slug.length) ===
  "-es";

    // Pros Section
    const prosData = data["sectionProsRta"]["data"]["attributes"]["Pros"];
    const prosHome = data['pageHome']['data']['attributes'];
    const prosMap = prosHome["ProsPicture"]["data"]["attributes"];
    const prosPar = prosHome['ProsPar'];
    
    const lastPosts= pageData['posts']['data'].slice(0, 3);

  return (
    <div class="flex flex-col items-center justify-center">
      <SectionLocIntro data={data["locations"]["data"][0]["attributes"]} />
      {/* <SectionLocMap data={data["locations"]["data"][0]["attributes"]} /> */}
     
      <ProsSection
        data={{
          prosPar: prosPar,
          prosData,
          prosMap,
        }}
      />
      <div class="flex flex-col items-center justify-center my-5">
        <h3 class="text-center text-[38px] font-[600] leading-10 text-primary-blue max-[800px]:text-[28px]">  
            {isSpanish ? "Explora la esencia de tu comunidad con RTA":"Explore your community's essence with RTA"}
        </h3>
        
        <div class="flex flex-wrap w-full items-top justify-center gap-10 my-5">
          {lastPosts.map((post: any, i:number) => (<div class="m-4"><Post key={i} post={post} id={`post-${i.toString()}`} /></div>))}
        </div>

        <p class="p-4 text-center text-[16px] text-primary-blue max-[800px]:text-[13px]">
          {isSpanish ? "Descubre historias locales, eventos y joyas ocultas, todo impulsado por la tecnología y la innovación." : "Discover local stories, events, and hidden gems, all powered by technology and innovation."}
        </p>

        <Button
            link={"local-blog/"}
            text={isSpanish ? "Ver más posts" : "See more posts"}
          />
      </div>
      <SectionLocOffers data={data} />

    </div>
  );
});
