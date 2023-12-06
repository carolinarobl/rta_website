import { type Signal, component$ } from "@builder.io/qwik";
import { StrapiImage } from "./StrapiImage";
import { FaBarsSolid } from "@qwikest/icons/font-awesome";
import { MenuSuboptions } from "./MenuSuboptions";
import { LangSwitch } from "./LangSwitch";
import { ActionLink } from "./ActionLink";

export const Navbar = component$(
  ({ data, mobMenuOpen }: { data: any; mobMenuOpen: Signal<boolean> }) => {
    return (
      <div class="sticky top-0 z-30 shadow-[0_5px_40px_-25px_rgba(0,0,0,0.2)]">
        <div class="flex h-[28px] flex-row items-center justify-end gap-4 bg-primary-blue px-5 py-[4px] text-[12px] font-bold text-white max-sm:justify-evenly max-sm:text-[10px] max-sm:font-normal max-[400px]:text-[9px]">
          {data["TopOptions"].map((e: any, i: any) => {
            // TEMP FIX
            // TEMP FIX
            // TEMP FIX
            if (e["Link"].includes("=p")) {
              e["Link"] = "";
            }

            return (
              <ActionLink key={i} link={e["Link"]}>
                <div class="flex flex-row items-center gap-2">
                  <div class="w-[12px]">
                    <StrapiImage
                      url={e["Icon"]["data"]["attributes"]["url"]}
                      alt={e["Icon"]["data"]["attributes"]["alternativeText"]}
                      title={e["Icon"]["data"]["attributes"]["caption"]}
                      toWhite={true}
                      width="16"
                      height="16"
                    />
                  </div>
                  {e["Text"]}
                </div>
              </ActionLink>
            );
          })}
        </div>
        <div class="grid grid-cols-3 items-center justify-evenly bg-white py-1 min-[1200px]:flex">
          <div class="flex items-center justify-center min-[1200px]:hidden">
            <FaBarsSolid
              class="min-[1200px]:hidden"
              onClick$={() => {
                mobMenuOpen.value = !mobMenuOpen.value;
              }}
            />
          </div>
          <div class="flex items-center justify-center">
            <div class="w-[125px] py-1">
              <ActionLink link="/">
                <StrapiImage
                  url={data["MainMenu"]["Logo"]["data"]["attributes"]["url"]}
                  alt={data["MainMenu"]["Logo"]["data"]["attributes"]["alternativeText"]}
                  title={data["MainMenu"]["Logo"]["data"]["attributes"]["caption"]}
                  width={774}
                  height={282}
                />
              </ActionLink>
            </div>
          </div>
          {/* Main options */}
          <div class="flex items-center justify-center gap-4 max-[1200px]:hidden">
            {data["MainOptions"].map(function (e: any, i: any) {
              const hasSubOptions = e["SubOption"].length > 0;
              if (hasSubOptions) {
                //
              }

              return (
                <div key={i} class="text-[15px] font-bold text-primary-blue ">
                  {!hasSubOptions ? (
                    <ActionLink classN="text-primary-blue" link={e["Link"]}>
                      {e["Text"]}
                    </ActionLink>
                  ) : (
                    <MenuSuboptions
                      // classContainer="w-[200px] h-[50px] text-"
                      title={e["Text"]}
                    >
                      <div class="flex flex-col gap-2 rounded-md bg-white p-3 font-[600] text-primary-blue shadow-md">
                        {e["SubOption"].map((el: any, i: number) => {
                          const subOpt = el["MenuOption"]["data"];
                          return !subOpt ? (
                            <ActionLink
                              classN="text-primary-blue"
                              key={i}
                              link={el["Link"]}
                            >
                              {el["Text"]}
                            </ActionLink>
                          ) : (
                            <MenuSuboptions title={el["Text"]}>
                              <div class="flex flex-col gap-2 rounded-md bg-white p-3 font-[600] text-primary-blue shadow-md">
                                {subOpt["attributes"]["SubOption"].map(
                                  (sub: any, i: number) => {
                                    return (
                                      <ActionLink key={i} link={sub["Link"]}>
                                        {sub["Text"]}
                                      </ActionLink>
                                    );
                                  },
                                )}
                              </div>
                            </MenuSuboptions>
                          );
                        })}
                      </div>
                    </MenuSuboptions>
                  )}
                </div>
              );
            })}
          </div>

          <div class="flex items-center justify-center">
            <LangSwitch data={data["MainMenu"]["Switcher"]} />
          </div>
        </div>
        <div class="flex h-[32px] flex-row items-center justify-center gap-6 bg-secondary-red py-[2px] text-[14px] font-semibold tracking-[1px] text-white max-sm:text-[11px]">
          {data["ClientOptions"].map((e: any, i: any) => (
            <ActionLink key={i} link={e["Link"]}>
              {e["Text"]}
            </ActionLink>
          ))}
        </div>
        <div class="flex flex-row items-center justify-evenly bg-white py-1 max-[1200px]:hidden">
          {data["gigfastOptions"].map((e: any, i: any) => (
            <ActionLink key={i} link={e["Link"]}>
              <div class="w-[130px] rounded-md p-1 hover:bg-slate-50">
                <StrapiImage
                  url={e["Icon"]["data"]["attributes"]["url"]}
                  alt={e["Icon"]["data"]["attributes"]["alternativeText"]}
                  title={e["Icon"]["data"]["attributes"]["caption"]}

                  width="311"
                  height="60"
                />
              </div>
            </ActionLink>
          ))}
        </div>
      </div>
    );
  },
);
