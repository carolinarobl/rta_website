import { $, Slot, component$ } from "@builder.io/qwik";
export const Button = component$(
  ({
    type = "link",
    text,
    link,
    color = "#13B295",
    onClick,
    Icon,
    subtext,
  }: {
    type?: "link" | "action";
    text: string;
    link?: string;
    color?: string;
    onClick?: void;
    Icon?: any;
    subtext?: string;
  }) => {
    const handleClick = $(() => {
      (onClick ?? (() => {}))();
    });
    if (type === "link")
      return (
        <div
          onClick$={handleClick}
          class={`flex w-fit items-center justify-center gap-2 rounded-full border-2 border-teal-500 bg-white p-1 pl-2 font-bold text-btn-green hover:cursor-pointer`}
        >
          <span class="text-[14px] ">{text}</span>
          <Slot />
          {/* <Icon color="#13B295" size={23} class="opacity-60" /> */}
        </div>
      );
    if (type === "action")
      return (
        <div
          onClick$={handleClick}
          class="flex w-fit items-center justify-center gap-1 rounded-full bg-button-green p-1 pl-2 font-bold text-white hover:cursor-pointer"
        >
          <span class="text-[13px]">{text}</span>
          {/* <Icon size={23} class="opacity-60" /> */}
        </div>
      );
    return <div>Button</div>;
  },
);
