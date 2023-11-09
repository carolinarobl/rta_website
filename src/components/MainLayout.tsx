import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const MainLayout = component$(
  ({ data, showHeader = true }: { data: any; showHeader: bool }) => {
    return (
      <div class="max-h-screen">
        <Navbar data={data["data"]["generalMenu"]["data"]["attributes"]} />
        {showHeader && <div class="h-20 w-20">Header</div>}
        <div>
          <Slot />
          <Footer data={data["data"]["generalFooter"]["data"]["attributes"]} />
        </div>
      </div>
    );
  },
);
