import { component$ } from "@builder.io/qwik";
import { Markdown } from "~/components/Markdown";

export const SectionRating = component$(({ parData }: { parData: any }) => {
    const content= parData;
  
    return (
    <div class={`flex md:flex-row flex-col-reverse w-full text-center items-center justify-center md:py-8 py-2 `}>
        <iframe
            src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1736.3807968615524!2d-96.67390131916709!3d29.49415252000683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8643c6852e7d344b%3A0x50f1f549eff32e39!2sSheridan%20Community%20Center!5e0!3m2!1sen!2smx!4v1720731455582!5m2!1sen!2smx"}
            class=" md:min-w-[400px] md:h-[300px] h-full rounded-2xl shadow-xl"
            loading="lazy"
        ></iframe>       
        <div class="mx-5 ">
        <Markdown text={`## ${content['Title']}`} classN="text-center [&>h2]:text-[36px] font-bold max-sm:text-[28px]"/>
        <Markdown text={`### ${content['Subtitle']}`}   classN="text-center text-[38px] text-secondary-red font-bold max-sm:text-[28px]"/>
        <Markdown text={content['Paragraph']}/>
        </div>


    </div>
  );
});
