import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
// import { Button } from "~/components/Button";
import { BsArrowUpRightCircleFill } from "@qwikest/icons/bootstrap";
import { FaCircleArrowRightSolid } from "@qwikest/icons/font-awesome";
import { Button } from "~/components/Button";
import { Header } from "~/components/Header";
import { Paragraph } from "~/components/Paragraph";
import { layoutQuery } from "~/data/gql_queries/layout_query";
import { GQLQuery } from "~/services/graphql";

export const useHomeData = routeLoader$(async () => {
  const data = await GQLQuery(layoutQuery("en"));
  return data;
});

export default component$(() => {
  const data = useHomeData();

  return (
    <div class="m-1 flex flex-col items-center gap-3">
      {/* <Button type="link" Icon={<LuRocket />} text={"Go to page"} /> */}
      <Header />
      <Header vertical={false} />
      <Button type="link" text="Watch more">
        <FaCircleArrowRightSolid
          color="#13B295"
          class="text-[18px] opacity-60"
        />
      </Button>
      <Paragraph
        title="Título"
        subtitle="Subtítulo"
        logo="https://strapi.rtatel.com/uploads/gig_FASTTV_mini_c93a89c210.webp"
        image="https://strapi.rtatel.com/uploads/LP_03_contact_support_woman_8e4bdd490a.png"
        button="Watch more"
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quis maiores quisquam blanditiis, pariatur minus aliquid odit modi aperiam sapiente dolorum illo excepturi fugit quas animi hic voluptatibus repellendus et. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam cum rem obcaecati vero ad facilis neque beatae architecto, non nobis, temporibus alias deleniti sint asperiores excepturi animi, nulla minima iure! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptas fugit veritatis impedit quibusdam maxime adipisci exercitationem, architecto odit totam ut voluptatem animi dignissimos, quia possimus minus deleniti et laudantium."
      />
      <Paragraph
        title="Título"
        subtitle="Subtítulo"
        logo="https://strapi.rtatel.com/uploads/gig_FASTTV_mini_c93a89c210.webp"
        image="https://strapi.rtatel.com/uploads/LP_03_contact_support_woman_8e4bdd490a.png"
        button="Watch more"
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quis maiores quisquam blanditiis, pariatur minus aliquid odit modi aperiam sapiente dolorum illo excepturi fugit quas animi hic voluptatibus repellendus et. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam cum rem obcaecati vero ad facilis neque beatae architecto, non nobis, temporibus alias deleniti sint asperiores excepturi animi, nulla minima iure! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptas fugit veritatis impedit quibusdam maxime adipisci exercitationem, architecto odit totam ut voluptatem animi dignissimos, quia possimus minus deleniti et laudantium."
        reverse={true}
      />
      <Paragraph
        title="Título"
        image="https://strapi.rtatel.com/uploads/LP_03_contact_support_woman_8e4bdd490a.png"
        button="Watch more"
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quis maiores quisquam blanditiis, pariatur minus aliquid odit modi aperiam sapiente dolorum illo excepturi fugit quas animi hic voluptatibus repellendus et. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam cum rem obcaecati vero ad facilis neque beatae architecto, non nobis, temporibus alias deleniti sint asperiores excepturi animi, nulla minima iure! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptas fugit veritatis impedit quibusdam maxime adipisci exercitationem, architecto odit totam ut voluptatem animi dignissimos, quia possimus minus deleniti et laudantium."
      />
      <Paragraph
        title="Título"
        image="https://strapi.rtatel.com/uploads/LP_03_contact_support_woman_8e4bdd490a.png"
        button="Watch more"
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quis maiores quisquam blanditiis, pariatur minus aliquid odit modi aperiam sapiente dolorum illo excepturi fugit quas animi hic voluptatibus repellendus et. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam cum rem obcaecati vero ad facilis neque beatae architecto, non nobis, temporibus alias deleniti sint asperiores excepturi animi, nulla minima iure! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptas fugit veritatis impedit quibusdam maxime adipisci exercitationem, architecto odit totam ut voluptatem animi dignissimos, quia possimus minus deleniti et laudantium."
        reverse={true}
      />
      <Paragraph
        title="Título"
        button="Watch more"
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quis maiores quisquam blanditiis, pariatur minus aliquid odit modi aperiam sapiente dolorum illo excepturi fugit quas animi hic voluptatibus repellendus et. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam cum rem obcaecati vero ad facilis neque beatae architecto, non nobis, temporibus alias deleniti sint asperiores excepturi animi, nulla minima iure! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptas fugit veritatis impedit quibusdam maxime adipisci exercitationem, architecto odit totam ut voluptatem animi dignissimos, quia possimus minus deleniti et laudantium."
      />
      {/* <div>{JSON.stringify(data.value, null, 2)}</div> */}

      {/* <Button type={"action"} Icon={<LuRocket />} text={"Action"} /> */}
      <div class="flex w-[650px] flex-col items-center justify-center rounded-[200px] bg-[#1D65C3] px-5 shadow-2xl">
        <div class="mt-2.5 flex w-[315px] max-w-full flex-col items-center justify-center self-center">
          <div class="self-center whitespace-nowrap text-right text-2xl font-bold leading-6 text-white">
            Gigometer
          </div>
          <div class="mt-2.5 self-stretch whitespace-nowrap text-base text-white">
            Wondering how fast your internet really is?
          </div>
        </div>
        <div class="my-2.5 flex w-[167px] max-w-full items-start justify-center gap-2 self-center rounded-[100px] border-2 border-solid border-teal-500 border-opacity-60 bg-white py-1.5 pl-2.5 pr-1.5 shadow">
          <div class="my-auto text-base font-bold tracking-wide text-teal-500">
            Test your speed
          </div>
          <div class="w-[25px] min-w-[25px] max-w-full flex-wrap content-center items-center justify-center self-stretch whitespace-nowrap rounded-[100px] bg-teal-500 bg-opacity-60 py-1.5 pl-1.5 pr-2 text-center text-sm font-black tracking-wide text-white">
            <BsArrowUpRightCircleFill class="bg-teal-500 bg-opacity-60"></BsArrowUpRightCircleFill>
          </div>
        </div>
      </div>

      <div class="w-[650px] justify-between rounded-[200px] bg-[#1D65C3] px-8 shadow-2xl">
        <div class="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div class="flex w-[66%] flex-col items-stretch max-md:ml-0 max-md:w-full">
            <div class="mt-6 flex flex-col items-start justify-center max-md:mt-10">
              <div class="self-start whitespace-nowrap text-right text-2xl font-bold leading-6 text-white">
                Gigometer
              </div>
              <div class="mt-2.5 self-start whitespace-nowrap text-base text-white">
                Wondering how fast your internet really is?
              </div>
            </div>
          </div>
          <div class="ml-5 flex w-[34%] flex-col items-stretch max-md:ml-0 max-md:w-full">
            <div class="m-auto flex w-[167px] max-w-full items-start justify-center gap-2 rounded-[100px] border-2 border-solid border-teal-500 border-opacity-60 bg-white py-1.5 pl-2.5 pr-1.5 shadow max-md:mt-10">
              <div class="my-auto text-base font-bold tracking-wide text-teal-500">
                Test your speed
              </div>
              <div class="w-[25px] min-w-[25px] max-w-full flex-wrap content-center items-center justify-center self-stretch whitespace-nowrap rounded-[100px] bg-teal-500 bg-opacity-60 py-1.5 pl-2 pr-1.5 text-center text-sm font-black tracking-wide text-white">
                <BsArrowUpRightCircleFill></BsArrowUpRightCircleFill>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <div class="flex w-[139px] max-w-full items-start justify-center gap-2 self-start rounded-[100px] border-2 border-solid border-teal-500 border-opacity-60 bg-white py-1.5 pl-2.5 pr-1.5 shadow">
          <div class="my-auto self-center text-base font-bold tracking-wide text-teal-500">
            Watch More
          </div>
          <div class="w-[25px] min-w-[25px] max-w-full flex-wrap content-center items-center justify-center self-stretch whitespace-nowrap rounded-[100px] bg-teal-500 bg-opacity-60 py-1.5 pl-2 pr-1.5 text-center text-sm font-black tracking-wide text-white">
            <BsArrowUpRightCircleFill></BsArrowUpRightCircleFill>
          </div>
        </div>
        <div class="mt-20 flex w-[115px] max-w-full items-start justify-center gap-2 self-start rounded-[100px] border-2 border-solid border-blue-800 border-opacity-60 bg-white py-1.5 pl-2.5 pr-1.5 shadow max-md:mt-10">
          <div class="my-auto self-center text-base font-bold tracking-wide text-blue-800">
            Buy Now
          </div>
          <div class="w-[25px] min-w-[25px] max-w-full flex-wrap content-center items-center justify-center self-stretch whitespace-nowrap rounded-[100px] bg-blue-800 bg-opacity-60 px-1.5 py-1.5 text-center text-sm font-black tracking-wide text-white">
            tag
          </div>
        </div>
        <div class="mt-20 flex w-[158px] max-w-full items-start justify-center gap-2 self-start rounded-[100px] border-[3px] border-solid border-white border-opacity-0 bg-teal-500 py-1.5 pl-2.5 pr-1.5 shadow max-md:mt-10">
          <div class="my-auto text-base font-bold tracking-wide text-white">
            +555 217 69 86
          </div>
          <div class="w-[25px] min-w-[25px] max-w-full flex-wrap content-center items-center justify-center self-stretch whitespace-nowrap rounded-[100px] bg-white bg-opacity-60 px-1.5 py-1.5 text-center text-sm font-black tracking-wide text-teal-500">
            phone
          </div>
        </div>
        <div class="mt-20 flex w-[129px] max-w-full items-start justify-center gap-2 self-start rounded-[100px] border-2 border-solid border-teal-500 border-opacity-60 bg-white py-2 pl-2.5 pr-2 shadow max-md:mt-10">
          <div class="flex flex-col items-center justify-center self-stretch">
            <div class="self-stretch whitespace-nowrap text-base font-bold tracking-wide text-teal-500">
              Download
            </div>
            <div class="self-center whitespace-nowrap text-xs tracking-wide text-teal-500">
              518 kb
            </div>
          </div>
          <div class="my-auto w-[25px] min-w-[25px] max-w-full flex-wrap content-center items-center justify-center self-center whitespace-nowrap rounded-[100px] bg-teal-500 bg-opacity-60 py-1.5 pl-2 pr-1.5 text-center text-sm font-black tracking-wide text-white">
            arrow-down
          </div>
        </div>
      </div>
      <div class="justify-center">
        <div class="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div class="flex w-[67%] flex-col items-stretch max-md:ml-0 max-md:w-full">
            <div class="my-auto flex w-[674px] flex-col items-center justify-center px-5 max-md:mt-10 max-md:max-w-full">
              <img
                loading="lazy"
                srcSet="..."
                class="aspect-[5.36] w-[386px] max-w-full self-center overflow-hidden object-contain object-center"
              />
              <div class="mt-6 flex w-[297px] max-w-full items-start justify-center gap-4 self-center">
                <div class="flex-1 text-center text-4xl font-bold tracking-tighter text-blue-800">
                  Título H1
                </div>
                <div class="self-start whitespace-nowrap text-2xl font-bold leading-6 text-rose-700">
                  Subtítulo H2
                </div>
              </div>
              <div class="-mr-5 mt-6 w-full self-stretch text-justify text-base text-blue-800">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </div>
              <div class="mt-6 flex w-[139px] max-w-full items-start justify-center gap-2 self-center rounded-[100px] border-2 border-solid border-teal-500 border-opacity-60 bg-white py-1.5 pl-2.5 pr-1.5 shadow">
                <div class="my-auto self-center text-base font-bold tracking-wide text-teal-500">
                  Watch More
                </div>
                <div class="w-[25px] min-w-[25px] max-w-full flex-wrap content-center items-center justify-center self-stretch whitespace-nowrap rounded-[100px] bg-teal-500 bg-opacity-60 py-1.5 pl-1.5 pr-2 text-center text-sm font-black tracking-wide text-white">
                  <BsArrowUpRightCircleFill></BsArrowUpRightCircleFill>
                </div>
              </div>
            </div>
          </div>
          <div class="ml-5 flex w-[33%] flex-col items-stretch max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              srcSet="..."
              width={300}
              height={300}
              class="aspect-[0.83] w-full grow overflow-hidden object-contain object-center max-md:mt-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
