import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const MainLayout = component$(({ data }) => {
  return (
    <div class="max-h-screen">
      <Navbar data={data["data"]["generalMenu"]["data"]["attributes"]} />
      <div>
        <Slot />
        <Footer data={data["data"]["generalFooter"]["data"]["attributes"]} />
      </div>
    </div>
  );
});
