import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const MainLayout = component$(
  ({ data, showHeader = true }: { data: any; showHeader?: boolean }) => {
    return (
      <div class="relative max-h-screen ">
        <div class="absolute left-0 right-0 top-0 -z-10 h-[500px] bg-gradient-to-t from-white to-[#e7eef8]"></div>
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
