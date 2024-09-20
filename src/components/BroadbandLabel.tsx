import { $, component$ } from "@builder.io/qwik";
import { Button } from "./Button";
import { downloadCSV } from "~/utils/download_broadband_csv";
import { downloadPDF, downloadPNG } from "~/utils/download_broadband_pdf";

export const BroadbandLabel = component$(({ plan }: { plan: any }) => {
    const singlePurchase = plan.single_purchase_fee_descr.split(';').map((item: any, index: number) => ({
        description: item.trim(),
        price: plan.single_purchase_fees.split(';')[index].trim()
    }));

    const monthlyProvider = plan.monthly_provider_fee_descr.split(';').map((item: any, index: number) => ({
        description: item.trim(),
        price: plan.monthly_provider_fee.split(';')[index].trim()
    }));

    const handleClick = $(() => downloadCSV(plan, `${plan.unique_plan_id}.csv`));

    const handleClickBtnPDF = $(()=>downloadPDF('div-plan-'+ plan.unique_plan_id));

    const handleClickBtnPNG = $(()=>downloadPNG('div-plan-'+ plan.unique_plan_id));

    return <div class="flex flex-col items-start">
        <div class="mx-2 my-5 overflow-hidden w-[325px] min-h-[1435px] p-3 border-4 border-black bg-white  shrink-0" id={`div-plan-`+ plan.unique_plan_id}>
        <header>
            <h2 class="text-2xl font-extrabold text-center">Broadband Facts</h2>
            <hr class="border-black border-2" />
            <p class="text-base font-bold">{plan.provider_name}</p>
            <p class="text-base font-extrabold">{plan.service_plan_name}</p>
            <p class="text-base">{plan.connection_type
            } Broadband Consumer Disclosure</p>
        </header>
        <hr class="border-black border-4" />
        <div class="grid grid-cols-2 font-extrabold">
            <p>Monthly Price</p>
            <p class="text-right">${plan.intro_rate == "Yes" ? plan.intro_rate_price : plan.monthly_price}</p>
        </div>
        <hr class="border-2 border-black" />

        {/* price-info */}
        <div class="grid grid-cols-2 text-sm gap-2">
            <p>This monthly price is an introductory rate</p>
            <p class="text-right">{plan.intro_rate}</p>
            <p>Time the introductory rate applies</p>
            <p class="text-right">{plan.intro_rate_time == 0 ? "None" : `${plan.intro_rate_time} months`}</p>
            <p>Monthly price after the introductory rate</p>
            <p class="text-right">${plan.monthly_price}</p>
            <p>Length of contract</p>
            <p class="text-right">{plan.contract_time} months</p>
            <p class="col-span-2">Link to Terms of Contract</p>
            <p><a href={plan.contract_terms_url}>{plan.contract_terms_url}</a></p>
        </div>
        <hr class="border-2 border-black" />

        {/* additional-charges */}
        <div class="text-sm">
            <p class="font-bold">Additional Charges & Terms</p>
            <div class="grid grid-cols-[2fr_1fr] gap-1 p-2">
                <p class="col-span-2">Provider Monthly Fees</p>
                {
                    monthlyProvider.map((item: any) => 
                        <>
                        <p>{item.description}</p>
                        <p class="text-right font-bold">${item.price}</p>
                        </>
                    )
                }
                {/* <p>Modem Rental</p>
                <p class="text-right font-bold">$10.00</p>
                <p>Wifi Extender</p>
                <p class="text-right font-bold">$5.00</p> */}

                <div class="col-span-2 h-2"></div>

                <p class="col-span-2">One-Time Purchase Fees</p>
                {
                    singlePurchase.map((item: any) => 
                        <>
                        <p>{item.description}</p>
                        <p class="text-right font-bold">${item.price}</p>
                        </>
                    )
                }

                {/* <p>Installation</p>
                <p class="text-right font-bold">$100.00</p>
                <p>Battery Back-up</p>
                <p class="text-right font-bold">$100.00</p> */}

                <div class="col-span-2 h-2"></div>

                <p>Early Termination Fee </p>
                <p class="text-right font-bold">${plan.early_termination_fee}</p>
                <p>Government Taxes</p>
                <p class="text-right font-bold">$27.57</p>

            </div>
        </div>
        <hr class="border-2 border-black" />

        {/* Discounts & Bundles */}
        <div class="text-sm">
            <p class="font-bold">Discounts & Bundles</p>
            <p class="p-2">Visit the link below for available billing discounts and pricing
                options for broadband service bundled with other services like
                video, phone, and wireless service, and use of your own
                equipment like modems and routers.</p>
            <p><a href="https://www.example.com/discounts">https://www.example.com/discounts</a></p>
        </div>
        <hr class="border-2 border-black" />

        {/* Speeds Provided with Plan */}
        <div class="text-sm">
            <p class="font-bold">Speeds Provided with Plan</p>
            <div class="grid grid-cols-[2fr_1fr] gap-1 p-2">
                <p>Typical Download Speed</p>
                <p class="text-right font-bold">{plan.typical_download_speed} Mbps</p>
                <p>Typical Upload Speed</p>
                <p class="text-right font-bold">{plan.typical_upload_speed} Mbps</p>
                <p>Typical Latency</p>
                <p class="text-right font-bold">{plan.typical_latency} ms</p>
            </div>
        </div>
        <hr class="border-black" />

        {/* Data Included with Monthly Price */}
        <div class="text-sm grid grid-cols-[3fr_1fr]">
            <p class="font-bold">Data Included with Monthly Price</p>
            <p class="text-right font-bold">{plan.monthly_data_allow} GB</p>
            <div class="p-2 col-span-2">
                <div class="grid grid-cols-2 gap-1">
                    <p>Charges for Additional Data Usage</p>
                    <p class="text-right font-bold">{plan.over_usage_data_price == 0 ? 'n/a' : `$${plan.over_usage_data_price}/GB `}</p>
                    <p><a href={plan.data_allowance_policy_url}>{plan.data_allowance_policy_url}</a></p>
                </div>
            </div>
        </div>
        <hr class="border-2 border-black" />

        {/* network-management */}
        <div class="text-sm">
            <p>
                <strong>Network Management Policy</strong>
            </p>
            <a class="px-2" href={plan.network_management_policy_url} target="_blank" rel="noreferrer">{plan.network_management_policy_url}</a>
            <p>
                <strong>Privacy Policy</strong>
            </p>
            <a class="px-2" href={plan.privacy_policy_url} target="_blank" rel="noreferrer">{plan.privacy_policy_url}</a>
        </div>
        <hr class="border-4 border-black" />

        {/* customer-support */}
        <div class="text-sm">
            <p class="font-bold">Customer Support</p>
            <p class="px-2">Phone: <a href={`tel:${plan.customer_support_phone}`}>{plan.customer_support_phone}</a></p>
            <p class="px-2">Website: <a href={plan.customer_support_web} target="_blank" rel="noreferrer">{plan.customer_support_web}</a></p>
        </div>
        <hr class="border border-black" />
        <p class="text-sm">Learn more about the terms used on this label by visiting the Federal Communications Commission's Consumer Resource Center.</p>
        <p class="text-sm text-right"><strong><a href="https://fcc.gov/consumer" target="_blank" rel="noreferrer">fcc.gov/consumer</a></strong></p>
    </div>
    <div class="flex flex-col items-center justify-evenly gap-2 w-full">
        <Button  text="Download as CSV" onClick={handleClick}/>
        <Button  text="Download as PDF" onClick={handleClickBtnPDF}/>
        <Button  text="Download as PNG" onClick={handleClickBtnPNG}/>
    </div>
    </div>
});