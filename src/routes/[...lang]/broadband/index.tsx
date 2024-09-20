import { component$ } from '@builder.io/qwik';
import {type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { MainLayout } from '~/components/MainLayout';
import Broadband from '~/components/pages/Broadband';
import { headSEO } from '~/data/constants';
import { contactUsQuery } from '~/data/gql_queries/pages/contact_us_query';
import { getPageData } from '~/services/graphql';

export const usePageData = routeLoader$(async (req) => {
    const lang = req.params["lang"] == "" ? "en" : "es-419";
    return await getPageData(contactUsQuery, lang);
  });

export default component$(() => {
    const signalData = usePageData()
    const data = signalData.value
    const plans = [
        {
          unique_plan_id: "F0005937974123ABC456EMC789",
          provider_name: "Acme Data Inc.",
          service_plan_name: "10G Unlimited World",
          tier_plan_name: "Gold",
          connection_type: "Fixed",
          monthly_price: 59.95,
          intro_rate: "Yes",
          intro_rate_price: 39.95,
          intro_rate_time: 6,
          contract_req: "Yes",
          contract_time: 24,
          contract_terms_url: "https://acmedata.com/terms",
          early_termination_fee: 90,
          single_purchase_fee_descr: "Equipment cost; installation fee",
          single_purchase_fees: "25.00; 50.00",
          monthly_provider_fee_descr: "Equipment rental; virus protection subscription",
          monthly_provider_fee: "9.95;4.00",
          tax: "Included",
          bundle_discounts_url: "https://www.acmedata.com/fixed-plan/discounts",
          typical_download_speed: 43.6,
          typical_upload_speed: 4.07,
          typical_latency: 139,
          monthly_data_allow: 50,
          over_usage_data_price: 5,
          additional_data_increment: 10,
          data_allowance_policy_url: "https://www.acmedata.com/data-charges",
          network_management_policy_url: "https://www.acmedata.com/how-we-manage-our-networks",
          privacy_policy_url: "https://www.acmedata.com/about/privacy",
          customer_support_phone: "1 (800) 555 8990",
          customer_support_web: "https://www.acmedata.com/help"
        },
        {
          unique_plan_id: "F0005937974123ABC456EMC790",
          provider_name: "Beta Networks",
          service_plan_name: "Fiber Optic Plan",
          tier_plan_name: "Platinum",
          connection_type: "Fixed",
          monthly_price: 69.95,
          intro_rate: "No",
          intro_rate_price: 0,
          intro_rate_time: 0,
          contract_req: "No",
          contract_time: 12,
          contract_terms_url: "https://betanetworks.com/terms",
          early_termination_fee: 120,
          single_purchase_fee_descr: "Installation fee",
          single_purchase_fees: "30.00",
          monthly_provider_fee_descr: "Router rental",
          monthly_provider_fee: "10.00",
          tax: "Included",
          bundle_discounts_url: "https://www.betanetworks.com/fiber-plan/discounts",
          typical_download_speed: 100.0,
          typical_upload_speed: 20.0,
          typical_latency: 50,
          monthly_data_allow: 100,
          over_usage_data_price: 10,
          additional_data_increment: 20,
          data_allowance_policy_url: "https://www.betanetworks.com/data-policy",
          network_management_policy_url: "https://www.betanetworks.com/network-management",
          privacy_policy_url: "https://www.betanetworks.com/about/privacy",
          customer_support_phone: "1 (888) 555 1234",
          customer_support_web: "https://www.betanetworks.com/help"
        },
        {
          unique_plan_id: "F0005937974123ABC456EMC791",
          provider_name: "Gamma Internet",
          service_plan_name: "Ultimate Speed 200",
          tier_plan_name: "Silver",
          connection_type: "Cable",
          monthly_price: 54.95,
          intro_rate: "Yes",
          intro_rate_price: 29.95,
          intro_rate_time: 12,
          contract_req: "Yes",
          contract_time: 24,
          contract_terms_url: "https://gammainternet.com/terms",
          early_termination_fee: 150,
          single_purchase_fee_descr: "Installation fee",
          single_purchase_fees: "25.00",
          monthly_provider_fee_descr: "Modem rental",
          monthly_provider_fee: "8.00",
          tax: "Not included",
          bundle_discounts_url: "https://www.gammainternet.com/cable-plan/discounts",
          typical_download_speed: 60.0,
          typical_upload_speed: 5.0,
          typical_latency: 100,
          monthly_data_allow: 150,
          over_usage_data_price: 8,
          additional_data_increment: 30,
          data_allowance_policy_url: "https://www.gammainternet.com/data-policy",
          network_management_policy_url: "https://www.gammainternet.com/network-management",
          privacy_policy_url: "https://www.gammainternet.com/about/privacy",
          customer_support_phone: "1 (877) 555 9876",
          customer_support_web: "https://www.gammainternet.com/help"
        }
      ];
      
      

    return <MainLayout data={data['layoutData']}>
        <Broadband plans={plans}/>
    </MainLayout>
});

export const head: DocumentHead = ({ resolveValue }) => {
    const seoData = {
        MetaTitle:"Broadband Labels | RTA Rural Telecomunication of America",
        MetaDescription: "Explore a comprehensive list of broadband plans tailored to your needs. Compare prices, speeds, and contract details from top providers to find the best internet service for your home or business",
        Keywords:"Broadband"
    }
  
    return headSEO(seoData)
  };