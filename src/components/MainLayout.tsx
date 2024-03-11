import { component$, Slot, useSignal } from "@builder.io/qwik";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MenuMobile } from "./MenuMobile";

export const MainLayout = component$(
  ({ data, showMenus = true, showHeader=true }: { data: any; showMenus?: boolean; showHeader?: boolean;}) => {
    const mobMenuOpen = useSignal(false);

    return (
      <div
        class={`relative overflow-hidden transition-all duration-500 ${
          mobMenuOpen.value ? "overflow-y-hidden" : "z-50"
        }`}
        style={mobMenuOpen.value ? { perspective: "9000px" } : {}}
      >
        <div
          class={`absolute inset-0 ${
            mobMenuOpen.value ? "bg-gradient-to-l from-[#2e599a] to-[#182d4d] " : "bg-white !important"
          }   ${
            mobMenuOpen.value ? "overflow-y-hidden" : "z-50"
          }`}
        >
          <MenuMobile
            data={data["data"]["generalMenu"]["data"]["attributes"]}
          />
        </div>
        <div
          class={`relative transition-all duration-500 ${
            mobMenuOpen.value ? "overflow-y-hidden" : "z-50"
          }`}
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
          <div class="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-gradient-to-l from-[#FFFFFF] to-[#C8D8ED]"></div>
          {showMenus &&
          <Navbar
            data={data["data"]["generalMenu"]["data"]["attributes"]}
            mobMenuOpen={mobMenuOpen}
          />
          }

          <div class={`${mobMenuOpen.value ? "overflow-y-hidden" : ""}`}>
            {showHeader &&
            (
              <div class="flex w-full items-center justify-center">
                <Header
                  data={data["data"]["generalHeader"]["data"]["attributes"]}
                />
              </div>
            )}
            <div class="relative">
            <Slot />
            </div>
            {showMenus &&
            <Footer
              data={data["data"]["generalFooter"]["data"]["attributes"]}
            />
            }
          </div>
        </div>
      </div>
    );
  },
);
