import { component$ } from '@builder.io/qwik';
import { BroadbandLabel } from '~/components/BroadbandLabel';
import { Button } from '~/components/Button';
import { Markdown } from '~/components/Markdown';

export default component$(({ plans }: { plans: any }) => {
  const description = `Experience the speed and reliability of *Gigfast Internet* with our detailed Broadband Labels. Easily compare pricing, contract terms, and additional features for each plan to find the best fit for your needs. With Gigfast, you get ultra-fast Internet, perfect for homes and businesses that demand top-tier connectivity. Browse our options and choose the plan that will take you to the next level.`


  return <div class="flex flex-col items-center justify-around">
    <h1 class="text-center text-[38px] font-bold text-[#2E5899] max-sm:text-[28px]">
        Broadband Labels
      </h1>
    <div class="bg-white h-[150px] rounded-full w-1/2 flex flex-col items-center justify-around my-5">
      <p class="px-8 text-center text-[22px] font-[600] text-primary-blue max-[1000px]:px-12">Find the available plans in your area</p>
      <form action="" class="w-3/4 flex items-center justify-center gap-4" >
        <input
          class="w-[50%] rounded-full px-3 py-2 placeholder-primary-blue bg-primary-light-blue/20"
          placeholder="Address Search"
          // onKeyUp$={handleSearch}
          // ref={streetRef}
          type="text"
        />
        <Button
          text="Check Now"
        // link={data["HeroForm"]["ActionButton"]["Link"]}
        // onClick={handleModal}
        />
      </form>
    </div>
    <div class="mx-4 my-8 max-w-[500px]">
      <img src="https://strapi42.rtatel.com/uploads/gig_FAST_Internet_0253314cce.webp" width={1230} height={229} alt="" />
      {/* cambiar img  */}
      {/* <StrapiImage media="/uploads/gig_FAST_Internet_0253314cce.webp" width={1230} height={229} /> */}
    </div>
    <div class="mx-10 my-4 flex max-w-[800px] flex-col items-center justify-center gap-2 text-primary-blue">
      
      <Markdown classN={"text-center"} text={description} />
    </div>
    <div class="w-full overflow-x-auto gap-1 flex flex-row xl:justify-center mb-4 pb-4">
      {
        plans.map((plan: any, index: number) => (
          <BroadbandLabel key={'Broadband-' + index} plan={plan} />
        ))
      }
    </div>
  </div>
});