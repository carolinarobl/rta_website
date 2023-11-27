import { component$ } from "@builder.io/qwik";
import { Button } from "./Button";
import { StrapiImage } from "./StrapiImage";
import { Markdown } from "./Markdown";

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
        clasN="rounded-2xl self-center"
        url={post["attributes"]["Cover"]["data"]["attributes"]["url"]}
      />
      <span class="px-3 py-1 font-[600] text-primary-blue opacity-70">
        {formatDate(new Date(post["attributes"]["Date"]))}
      </span>
      <span class="px-3 text-primary-blue">
        <Markdown
          classN="[&>h1]:text-[16px] [&>h2]:text-[16px] [&>h3]:text-[16px]"
          text={limitText(post["attributes"]["Description"], limit)}
        />
      </span>
      <div class="mt-2 self-center">
        <Button text="Read More" link={`/${[post["attributes"]["Slug"]]}`} />
      </div>
    </div>
  );
});
