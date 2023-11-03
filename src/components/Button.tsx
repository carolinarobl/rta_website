import { component$ } from "@builder.io/qwik";
export const Button = component$(
  ({
    type,
    text,
    onClick,
    Icon,
    subtext,
  }: {
    type?: "link" | "action";
    text: string;
    onClick: () => void;
    Icon: any;
    subtext?: string;
  }) => {
    console.log(subtext);
    if (type === "link")
      return (
        <div
          onClick$={onClick}
          class="flex w-fit items-center justify-center gap-1 rounded-full border-2 border-btn-green bg-white p-1 pl-2 font-bold text-btn-green hover:cursor-pointer"
        >
          <span class="text-[13px]">{text}</span>
          <Icon color="#13B295" size={23} class="opacity-60" />
        </div>
      );
    if (type === "action")
      return (
        <div
          onClick$={onClick}
          class="flex w-fit items-center justify-center gap-1 rounded-full bg-button-green p-1 pl-2 font-bold text-white hover:cursor-pointer"
        >
          <span class="text-[13px]">{text}</span>
          {/* <Icon size={23} class="opacity-60" /> */}
        </div>
      );
    return <div>Button</div>;
  },
);
