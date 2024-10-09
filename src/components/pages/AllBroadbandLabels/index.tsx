import { component$ } from '@builder.io/qwik';
import { BroadbandLabel } from '~/components/BroadbandLabel';
import { setURL } from '~/data/constants';

interface Props {
    pageData: any,
    broadbandlabelnternet: any,
    braodbandlabelVoice: any
}



export default component$((props: Props) => {
    const { pageData, broadbandlabelnternet, braodbandlabelVoice } = props;

    return <div class="flex flex-col items-center justify-around">
        <h1 class="text-center text-[38px] font-bold text-[#2E5899] max-sm:text-[28px]">
            {pageData['data']['attributes']['Title']}
        </h1>

        {/* gigFastInternet */}

        <div class={`w-full flex-col gap-2 flex px-4`}>
            <div class="my-8 max-w-[350px] sm:max-w-[500px] mx-auto">
                <img
                    src={setURL(pageData['data']['attributes']['Services'][0]['Picture']['data']['attributes']['url'])}
                    width={1230}
                    height={229}
                    alt={pageData['data']['attributes']['Services'][0]['Picture']['data']['attributes']['alternativeText']}
                    />
            </div>

            <div class={`flex w-full overflow-x-auto gap-1 flex-row justify-start mb-4 pb-4 px-4`} style={"scrollbar-width: thin; scrollbar-color: #2E5698 #f1f1f1;"}>
                {broadbandlabelnternet.map((plan: any, idx: number) => (
                    <BroadbandLabel
                        key={`Broadband-Internet}-${idx}`}

                        tier_plan_name="NULL"
                        connection_type={plan['values']?.['connection_type']?.[0]?.['data'] || 'N/A'}
                        monthly_price={plan['values']['price'][0]['data'][0]['amount']}
                        service_plan_name={plan['values']['name'][0]['data']}
                        intro_rate={plan['values']?.['intro_rate']?.[0]?.['data'] || 'No'}
                        intro_rate_price={plan['values']?.['intro_rate_price']?.[0]?.['data'] || '0.00'}
                        intro_rate_time={plan['values']?.['intro_rate_time']?.[0]?.['data'] || 'N/A'}
                        contract_req={plan['values']?.['contract_req']?.[0]?.['data'] || 'No'}
                        contract_time={plan['values']?.['contract_time']?.[0]?.['data'] || 'N/A'}
                        contract_terms_url={plan['values']?.['contract_terms_url']?.[0]?.['data'] || ''}
                        early_termination_fee={plan['values']?.['early_termination_fee']?.[0]?.['data'] || '0.00'}
                        single_purchase_fee_descr={plan['values']?.['single_purchase_fee_descr']?.[0]?.['data'] || ''}
                        single_purchase_fees={plan['values']?.['single_purchase_fees']?.[0]?.['data'] || ''}
                        monthly_provider_fee_descr={plan['values']?.['monthly_provider_fee_descr']?.[0]?.['data'] || ''}
                        monthly_provider_fee={plan['values']?.['monthly_provider_fee']?.[0]?.['data'] || ''}
                        tax={plan['values']?.['tax']?.[0]?.['data'] || 'Varies'}
                        bundle_discounts_url={plan['values']?.['bundle_discounts_url']?.[0]?.['data'] || ''}
                        typical_download_speed={plan['values']['downloadSpeed'][0]['data']}
                        typical_upload_speed={plan['values']['uploadSpeed'][0]['data']}
                        typical_latency={plan['values']?.['typical_latency']?.[0]?.['data'] || 'N/A'}
                        unique_plan_id={plan['values']['unique_plan_id']?.[0]?.['data'] || 'N/A'}
                        monthly_data_allow={plan['values']?.['monthly_data_allow']?.[0]?.['data'] || 'Unlimited'}
                        over_usage_data_price={plan['values']?.['over_usage_data_price']?.[0]?.['data'] || 'N/A'}
                        additional_data_increment={plan['values']?.['additional_data_increment']?.[0]?.['data'] || 'N/A'}
                        data_allowance_policy_url={plan['values']?.['data_allowance_policy_url']?.[0]?.['data'] || ''}
                        network_management_policy_url={plan['values']?.['network_management_policy_url']?.[0]?.['data'] || ''}
                        privacy_policy_url={plan['values']?.['privacy_policy_url']?.[0]?.['data'] || ''}
                        customer_support_phone={plan['values']?.['customer_support_phone']?.[0]?.['data'] || ''}
                        customer_support_web={plan['values']?.['customer_support_web']?.[0]?.['data'] || ''}
                        isVoice={false}
                    />
                ))}
            </div>
        </div>



                {/* gigFastVoice */}

        <div class={`w-full flex-col gap-2 flex px-4`}>
            <div class="my-8 max-w-[350px] sm:max-w-[500px] mx-auto">
                <img
                    src={setURL(pageData['data']['attributes']['Services'][1]['Picture']['data']['attributes']['url'])}
                    width={1230}
                    height={229}
                    alt={pageData['data']['attributes']['Services'][1]['Picture']['data']['attributes']['alternativeText']}
                    />
            </div>

            <div class={`flex w-full overflow-x-auto gap-1 flex-row justify-start mb-4 pb-4 px-4`} style={"scrollbar-width: thin; scrollbar-color: #2E5698 #f1f1f1;"}>
                {braodbandlabelVoice.map((plan: any, idx: number) => (
                    <BroadbandLabel
                        key={`Broadband-Voice}-${idx}`}
                        tier_plan_name="NULL"
                        connection_type={plan['values']?.['connection_type']?.[0]?.['data'] || 'N/A'}
                        monthly_price={plan['values']?.['monthly_price']?.[0]['data'] || plan['values']?.['price']?.[0]['data'][0]['amount']}
                        service_plan_name={plan['values']['name'][0]['data']}
                        intro_rate={plan['values']?.['intro_rate']?.[0]?.['data'] || 'No'}
                        intro_rate_price={plan['values']?.['intro_rate_price']?.[0]?.['data'] || '0.00'}
                        intro_rate_time={plan['values']?.['intro_rate_time']?.[0]?.['data'] || 'N/A'}
                        contract_req={plan['values']?.['contract_req']?.[0]?.['data'] || 'No'}
                        contract_time={plan['values']?.['contract_time']?.[0]?.['data'] || 'N/A'}
                        contract_terms_url={plan['values']?.['contract_terms_url']?.[0]?.['data'] || ''}
                        early_termination_fee={plan['values']?.['early_termination_fee']?.[0]?.['data'] || '0.00'}
                        single_purchase_fee_descr={plan['values']?.['single_purchase_fee_descr']?.[0]?.['data'] || ''}
                        single_purchase_fees={plan['values']?.['single_purchase_fees']?.[0]?.['data'] || ''}
                        monthly_provider_fee_descr={plan['values']?.['monthly_provider_fee_descr']?.[0]?.['data'] || ''}
                        monthly_provider_fee={plan['values']?.['monthly_provider_fee']?.[0]?.['data'] || ''}
                        tax={plan['values']?.['tax']?.[0]?.['data'] || 'Varies'}
                        bundle_discounts_url={plan['values']?.['bundle_discounts_url']?.[0]?.['data'] || ''}
                        typical_download_speed={plan['download_mbps']}
                        typical_upload_speed={plan['upload_mbps']}
                        typical_latency={plan['values']?.['typical_latency']?.[0]?.['data'] || 'N/A'}
                        unique_plan_id={plan['values']['unique_plan_id']?.[0]?.['data'] || 'N/A'}
                        monthly_data_allow={plan['values']?.['monthly_data_allow']?.[0]?.['data'] || 'Unlimited'}
                        over_usage_data_price={plan['values']?.['over_usage_data_price']?.[0]?.['data'] || 'N/A'}
                        additional_data_increment={plan['values']?.['additional_data_increment']?.[0]?.['data'] || 'N/A'}
                        data_allowance_policy_url={plan['values']?.['data_allowance_policy_url']?.[0]?.['data'] || ''}
                        network_management_policy_url={plan['values']?.['network_management_policy_url']?.[0]?.['data'] || ''}
                        privacy_policy_url={plan['values']?.['privacy_policy_url']?.[0]?.['data'] || ''}
                        customer_support_phone={plan['values']?.['customer_support_phone']?.[0]?.['data'] || ''}
                        customer_support_web={plan['values']?.['customer_support_web']?.[0]?.['data'] || ''}
                        isVoice={true}
                    />
                ))}
            </div>
        </div>


    </div>;
});