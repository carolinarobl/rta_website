import { component$ } from "@builder.io/qwik";
import { Button } from "./Button";
import { StrapiImage } from "./StrapiImage";
import { parse } from "marked";

export const Post = component$(({ post, id }: { post: any; id: string }) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function formatDate(date: Date) {
    const day = days[date.getDay()];
    const monthDay = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}, ${month} ${monthDay}, ${year}`;
  }

  const limitText = (text: string, limit: number) => {
    return text.slice(0, limit) + "...";
  };
  const limit = 120;

  return (
    <div id={id} class="mb-8 flex max-w-[300px] flex-col">
      <StrapiImage
        width="1184"
        height="894"
        clasN="rounded-2xl self-center object-cover h-[200px] w-[300px]"
        media={post["attributes"]["Cover"]["data"]["attributes"]}
      />
      <h3 class="px-3 py-1 font-[600] text-[15px] text-primary-blue ">  {limitText(post["attributes"]["Title"], 60)}
</h3>
      <span class="px-3 text-[12px] font-[700]  text-primary-blue opacity-70">
        {formatDate(new Date(post["attributes"]["Date"]))}
      </span>
      <span class="px-3 text-primary-blue">
     
          <div
        dangerouslySetInnerHTML={parse(limitText(post["attributes"]["Description"], limit))}
        class={`flex list-inside flex-col gap-3 text-justify text-[14px]`}
      ></div>
      </span>
      <div class="mt-2 self-center">
        <Button text="Read More" link={`/${[post["attributes"]["Slug"]]}`} />
      </div>
    </div>
  );
});
