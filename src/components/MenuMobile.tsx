import { component$, useSignal } from "@builder.io/qwik";
import { MenuSuboptions } from "./MenuSuboptions";
import { StrapiImage } from "./StrapiImage";
import { ActionLink } from "./ActionLink";
import { Modal } from "./Modal";
import { PopupLoginForm } from "./popups/popup_login_form";
import { useLocation } from "@builder.io/qwik-city";

export const MenuMobile = component$(({ data }: { data: any }) => {
  const path = useLocation();
  const isES = path.prevUrl?.pathname.includes("/es/");
  const loginModal = useSignal<boolean>(false);

  return (
    <div class="flex flex-col gap-4 px-4 py-6 text-[15px] tracking-tight text-white">
      <div class="text-primary-blue">
        <Modal showSignal={loginModal}>
          <PopupLoginForm
            title={
              isES
                ? "Inicia sesión en el portal de tu zona"
                : "Log into the portal of your area"
            }
            description={
              isES ? "Ingrese su código postal." : "Just enter your Zip code."
            }
            btnText={isES ? "Ir ahora" : "Go Now"}
            popup="login"
          ></PopupLoginForm>
        </Modal>
      </div>

      {data["MainOptions"].map(function (e: any, i: any) {
        const hasSubOptions = e["SubOption"].length > 0;
        if (hasSubOptions) {
          //
        }
        return (
          <div key={i} class="">
            {!hasSubOptions ? (
              <ActionLink link={e["Link"]}>{e["Text"]}</ActionLink>
            ) : (
              <MenuSuboptions
                // classContainer="w-[200px] h-[50px] text-"
                title={e["Text"]}
              >
                <div class="flex flex-col gap-2 rounded-md bg-white p-3 font-[600] text-primary-blue shadow-md">
                  {e["SubOption"].map((el: any, i: number) => {
                    const subOpt = el["MenuOption"]["data"];
                    return !subOpt ? (
                      el["Link"].includes("Login") ? (
                        <div
                          class="hover:cursor-pointer"
                          onClick$={() => {
                            loginModal.value = true;
                          }}
                        >
                          {el["Text"]}
                        </div>
                      ) : (
                        <ActionLink key={i} link={el["Link"]} hasStyle={false}>
                          {el["Text"]}
                        </ActionLink>
                      )
                    ) : (
                      <MenuSuboptions title={el["Text"]}>
                        <div class="flex flex-col gap-2 rounded-md bg-white p-3 font-[600] text-primary-blue shadow-md">
                          {subOpt["attributes"]["SubOption"].map(
                            (sub: any, i: number) => {
                              return (
                                <ActionLink
                                  key={i}
                                  link={sub["Link"]}
                                  hasStyle={false}
                                >
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
      <div class="w-full border border-white border-opacity-40"></div>
      <div class="flex w-fit flex-col gap-5">
        {data["gigfastOptions"].map((e: any, i: any) => (
          <ActionLink
            key={i}
            link={e["Link"]}
            classN="rounded-full bg-white px-4 py-1 shadow-lg"
          >
            <div class="w-[130px] rounded-md p-1">
              <StrapiImage
                url={e["Icon"]["data"]["attributes"]["url"]}
                width="311"
                height="60"
              />
            </div>
          </ActionLink>
        ))}
      </div>
    </div>
  );
});
