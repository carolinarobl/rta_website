import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const MainLayout = component$(
  ({ data, showHeader = true }: { data: any; showHeader?: boolean }) => {
    return (
      <div class="relative">
        <div class="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-[#e2ebf6]"></div>
        <Navbar data={data["data"]["generalMenu"]["data"]["attributes"]} />
        <div class="">
          {showHeader && (
            <div class="flex w-full items-center justify-center">
              <Header
                data={data["data"]["generalHeader"]["data"]["attributes"]}
              />
            </div>
          )}
          <Slot />
          <Footer data={data["data"]["generalFooter"]["data"]["attributes"]} />
        </div>
      </div>
    );
  },
);
