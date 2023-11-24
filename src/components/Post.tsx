import { component$ } from "@builder.io/qwik";
import { Button } from "./Button";
import { StrapiImage } from "./StrapiImage";
import { Markdown } from "./Markdown";

export const Post = component$(({ post }: { post: any }) => {
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

  // Wdnesday, May 10, 2023
  function formatDate(date: Date) {
    const day = days[date.getDay()];
    const monthDay = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}, ${month} ${monthDay}, ${year}`;
  }

  return (
    <div class="mb-8 flex max-w-[350px] flex-col">
      <StrapiImage
        width="1184"
        height="894"
        clasN="rounded-2xl self-center"
        url={post["attributes"]["Cover"]["data"]["attributes"]["url"]}
      />
      <span class="px-3 py-1 font-[600] text-primary-blue opacity-70">
        {formatDate(new Date(post["attributes"]["Date"]))}
      </span>
      <span class="max-h-[100px] overflow-hidden px-3 text-primary-blue">
        <Markdown text={post["attributes"]["Description"]} />
      </span>
      <div class="mt-2 self-center">
        <Button text="Read More" />
      </div>
    </div>
  );
});
