import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { StrapiImage } from "./StrapiImage";
import { FaBarsSolid } from "@qwikest/icons/font-awesome";

export const Navbar = component$(({ data }:{data:any}) => {
  return (
    <div class="sticky top-0 shadow-[0_5px_40px_-25px_rgba(0,0,0,0.2)]">
      <div class="flex h-[28px] flex-row items-center justify-end gap-4 bg-primary-blue px-5 py-[4px] text-[12px] font-bold text-white max-sm:justify-evenly max-sm:text-[10px] max-sm:font-normal max-[400px]:text-[9px]">
        {data["TopOptions"].map((e:any, i:any) => (
          <Link key={i} href={e["Link"]}>
            <div class="flex flex-row items-center gap-2">
              <div class="w-[12px]">
                <StrapiImage
                  url={e["Icon"]["data"]["attributes"]["url"]}
                  toWhite={true}
                  width={12}
                  height={12}
                />
              </div>
              {e["Text"]}
            </div>
          </Link>
        ))}
      </div>
      <div class="grid grid-cols-3 items-center justify-evenly bg-white py-1 min-[1200px]:flex">
        <div class="flex items-center justify-center min-[1200px]:hidden">
          <FaBarsSolid class="min-[1200px]:hidden" />
        </div>
        <div class="flex items-center justify-center">
          <div class="w-[125px] py-1">
            <StrapiImage
              url={data["MainMenu"]["Logo"]["data"]["attributes"]["url"]}
              width={774}
              height={282}
            />
          </div>
        </div>
        {/* Main options */}
        <div class="flex items-center justify-center gap-4 max-[1200px]:hidden">
          {data["MainOptions"].map(function (e:any, i:any) {
            const hasSubOptions = e["SubOption"].length > 0;
            if (hasSubOptions) {
              //
            }

            return (
              <div
                key={i}
                class="bg-primary-blue bg-clip-text text-[15px] font-bold text-transparent"
              >
                {!hasSubOptions ? (
                  <Link href={e["Link"]}>{e["Text"]}</Link>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>

        <div class="flex items-center justify-center">
          {/* <LangSwitch data={data["MainMenu"]["Switcher"]} /> */}Langswitch
        </div>
      </div>
      <div class="flex h-[32px] flex-row items-center justify-center gap-6 bg-secondary-red py-[2px] text-[14px] font-semibold tracking-[1px] text-white max-sm:text-[11px]">
        {data["ClientOptions"].map((e:any, i:any) => (
          <Link key={i} href={e["Link"]}>
            {e["Text"]}
          </Link>
        ))}
      </div>
      <div class="flex flex-row items-center justify-evenly bg-white py-1 max-[1200px]:hidden">
        {data["gigfastOptions"].map((e:any, i:any) => (
          <Link key={i} href={e["Link"]}>
            <div class="w-[100px] rounded-md p-1 hover:bg-slate-50">
              <StrapiImage
                url={e["Icon"]["data"]["attributes"]["url"]}
                width={310}
                height={59}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});
