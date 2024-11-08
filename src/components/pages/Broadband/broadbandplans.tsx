import { component$ } from '@builder.io/qwik';
import { includes } from 'valibot';
import { BroadbandLabel } from '~/components/BroadbandLabel';
import { setURL } from '~/data/constants';

interface BroadbandPlansProps {
  isVisible: boolean;
  plans: any[];
  broadbandPageData: any;
  index: number;
  customerTypeIndex: number;
  isVoice?: boolean;
}

export const BroadbandPlans = component$((props: BroadbandPlansProps) => {
  const { isVisible, plans, broadbandPageData, index, customerTypeIndex, isVoice = false } = props;

  if (!isVisible || plans.length === 0) {
    return null;
  }

  //orden de los plans para que los planes con name "ESSENTIALgig" aparezcan primero
  const sortedPlans = plans.sort((a:any, b:any) => {
    if (a['name'].includes('ESSENTIALgig') && !b['name'].includes('ESSENTIALgig')) {
      return -1;
    } else if (!a['name'].includes('ESSENTIALgig') && b['name'].includes('ESSENTIALgig')) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div class={`w-full flex-col gap-2 ${isVisible ? 'flex' : 'hidden'}`}>
      <div class="my-8 max-w-[350px] sm:max-w-[500px] mx-auto">
        <img
          src={setURL(broadbandPageData['LogoServices']['data'][index]['attributes']['url'])}
          width={1230}
          height={229}
          alt={broadbandPageData['LogoServices']['data'][index]['attributes']['alternativeText']}
        />
      </div>
      <h2 class="text-center text-[38px] font-bold text-[#2E5899] max-sm:text-[28px]">
        {broadbandPageData['CustomerType'][customerTypeIndex]['title']}
      </h2>

 {/* ajustar los estilos para que los elementos dentro del div se ajusten a la izquierda */}
     <div class={`flex w-full overflow-x-auto gap-1 px-4 flex-row ${plans.length > 3 ?'justify-start':'xl:justify-center'}  mb-4 pb-4`}
      style={"scrollbar-width: thin; scrollbar-color: #2E5698 #f1f1f1;"}>
        {sortedPlans.map((plan: any, idx: number) => (
          <BroadbandLabel
            key={`Broadband-${isVoice ? 'Voice' : 'Internet'}-${customerTypeIndex}-${idx}`}
            tier_plan_name="NULL"
            connection_type={plan['values']?.['connection_type']?.[0]?.['data'] || 'N/A'}
            monthly_price={plan['price']}
            service_plan_name={plan['name']}
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
            typical_download_speed={plan['values']['typical_download_speed'][0]['data']}
            typical_upload_speed={plan['values']['typical_upload_speed'][0]['data']}
            
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
            isVoice={isVoice}
          />
        ))}
      </div>
    </div>
  );
});
