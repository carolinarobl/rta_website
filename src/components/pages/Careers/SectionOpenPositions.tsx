import { $, component$, useSignal } from "@builder.io/qwik";
import { FaLocationArrowSolid } from "@qwikest/icons/font-awesome";
import Carousel from "~/components/Carousel";
import { Markdown } from "~/components/Markdown";
import { Modal } from "~/components/Modal";
import { PopupLearnMore } from "./PopupLearnMore";
import { FormCareers } from "~/components/forms/form-careers";
import { useLocation } from "@builder.io/qwik-city";
export const SectionOpenPositions = component$(({ data }: { data: any }) => {
  const formSignal = useSignal(false);
  const infoSignal = useSignal(false);
  const selected = useSignal(data["Positions"][0]["attributes"]);

  const positionSignal = useSignal('');

  const formInfo = data['FormInfo'].split('=');

  const location = useLocation();
  const isES = location.prevUrl?.pathname.includes("/es/");
  
  const formClick = $(({ positionName }: { positionName: string }) => {
    positionSignal.value = positionName;
        formSignal.value = true;

  });
  const PositionCard = component$(({ position }: { position: any }) => {
    return (
      <div class="flex h-[380px] w-[460px] flex-col justify-between rounded-[30px] bg-white p-6 text-center shadow-lg max-[800px]:h-[280px] ">
        <div class="flex-col items-center">
          <div class="flex items-center justify-center gap-2">
            <FaLocationArrowSolid />
            <span class="font-[500] opacity-60">{position["Location"]}</span>
          </div>
          <h4 class="mt-2 text-[19px] font-[700] text-primary-dark-blue">
            {position["Name"]}
          </h4>
          <Markdown
            classN="text-[15px] max-[800px]:text-[13px]"
            text={position["Summary"]}
          />
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="flex gap-1 text-[15px]">
            <span
              class="text-btn-green hover:cursor-pointer"
              onClick$={() => {
                selected.value = position;
                infoSignal.value = true;
              }}
            >
              Learn more
            </span>{" "}
            <span class="text-black">or</span>
          </div>
          <button class={`flex w-fit items-center justify-center rounded-full border-2 border-teal-500 border-opacity-70 bg-white p-0.5 px-1 text-btn-green opacity-90 shadow-md delay-150 ease-in-out hover:cursor-pointer hover:border-transparent hover:bg-teal-500 hover:text-white`} onClick$={() => formClick({ positionName: position['Name'] })}> Submit Resume </button>
        </div>
      </div>
    );
  });

  const positionsSlides = data["Positions"].map(
    (slideContent: any, i: number) => (
      <PositionCard position={slideContent["attributes"]} key={i} />
    ),
  );
  return (
    <div class="my-8 flex justify-center text-primary-blue">
      <Modal showSignal={formSignal}>
        
        <FormCareers templateID={formInfo[2]} mailto={formInfo[3]} subject={formInfo[4]} lang={isES ? 'es' : 'en'} position={positionSignal.value}/>
      </Modal>
      <Modal showSignal={infoSignal}>
        <PopupLearnMore data={selected.value} />
      </Modal>

      <div class="flex flex-col ">
        <h3 class="text-center text-[44px] font-[600]">
          {data["PositionsTitle"]}
        </h3>
        {/* <PositionCard position={data["Positions"][0]["attributes"]} /> */}
        <div class="flex-column flex w-[1200px] ">
          <Carousel
            slides={positionsSlides}
            id={"carPositions"}
            hasArrows={true}
          />
        </div>
      </div>
    </div>
  );
});
