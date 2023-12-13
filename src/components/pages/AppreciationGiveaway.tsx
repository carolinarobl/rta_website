import { component$, useSignal } from "@builder.io/qwik";
import { Spinner } from "../Spinner";

export const AppreciationGiveaway = component$(({ data }: { data: any }) => {
  const isLoading = useSignal(true);

  return <div class="h-[550px] w-full  flex flex-col items-center justify-center">
    {isLoading.value ?
      <Spinner size="250px"></Spinner>
      : null}
    <iframe id="iframe-appre-giveaway" onLoad$={() => {
      isLoading.value = false
    }} class="w-3/4 my-4 h-full rounded-3xl" src={data['iFrame_link']} loading="lazy"></iframe>
  </div>
});