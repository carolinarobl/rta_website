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
    <div class="flex flex-col items-center gap-3">
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
        alt={true}
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
    </div>
  );
});
