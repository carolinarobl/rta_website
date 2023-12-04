import { component$, Slot, useSignal } from "@builder.io/qwik";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MenuMobile } from "./MenuMobile";

export const MainLayout = component$(
  ({ data, showHeader = true }: { data: any; showHeader?: boolean }) => {
    const mobMenuOpen = useSignal(false);
    return (
      <div
        class="relative overflow-x-hidden transition-all duration-500"
        style={mobMenuOpen.value ? { perspective: "9000px" } : {}}
      >
        <div class="absolute inset-0 -z-[200] bg-gradient-to-l from-[#2e599a] to-[#182d4d]">
          <MenuMobile
            data={data["data"]["generalMenu"]["data"]["attributes"]}
          />
        </div>
        <div
          class="relative transition-all duration-500"
          style={
            mobMenuOpen.value
              ? {
                  transform:
                    "rotateY(-30deg) translateX(250px) translateY(200px)",
                  transformStyle: "preserve-3d",
                }
              : {}
          }
        >
          <div class="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-[#e2ebf6]"></div>
          <Navbar
            data={data["data"]["generalMenu"]["data"]["attributes"]}
            mobMenuOpen={mobMenuOpen}
          />
          <div class="">
            {showHeader && (
              <div class="flex w-full items-center justify-center">
                <Header
                  data={data["data"]["generalHeader"]["data"]["attributes"]}
                />
              </div>
            )}
            <Slot />
            <Footer
              data={data["data"]["generalFooter"]["data"]["attributes"]}
            />
          </div>
        </div>
      </div>
    );
  },
);
