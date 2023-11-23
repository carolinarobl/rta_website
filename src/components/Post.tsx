import { component$ } from "@builder.io/qwik";
import { Button } from "./Button";
import { StrapiImage } from "./StrapiImage";

export const Post = component$(({ post }: { post: any }) => {
  return (
    <div>
      <StrapiImage />
      <span></span>
      <span></span>
      <Button text="Read More" />
    </div>
  );
});
