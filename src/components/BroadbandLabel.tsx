import { $, component$ } from "@builder.io/qwik";
import { Button } from "./Button";
import { downloadCSV } from "~/utils/download_broadband_csv";
import { downloadPDF, downloadPNG } from "~/utils/download_broadband_pdf";
import { useLocation } from "@builder.io/qwik-city";

function convertToMbps(speed: string): number {
    const match = speed.match(/^(\d+(?:\.\d+)?)(\s*[MG]B)$/i);
    if (!match) {
        return parseFloat(speed) * 8;
    }

    const value = parseFloat(match[1]);
    const unit = match[2].trim();

    if (unit === "MB") {
        return value * 8; // Convertir MB a Mbps
    } else if (unit === "GB") {
        return value * 8000; // Convertir GB a Mbps
    } else {
        throw new Error("Unsupported unit");
    }
}


export const BroadbandLabel = component$(({
    providerName = "Rural Telecommunications of America",
    unique_plan_id,
    service_plan_name,
    tier_plan_name,
    connection_type,
    monthly_price,
    intro_rate,
    intro_rate_price,
    intro_rate_time,
    contract_req,
    contract_time,
    contract_terms_url,
    early_termination_fee,
    single_purchase_fee_descr,
    single_purchase_fees,
    monthly_provider_fee_descr,
    monthly_provider_fee,
    tax,
    bundle_discounts_url,
    typical_download_speed,
    typical_upload_speed,
    typical_latency,
    monthly_data_allow,
    over_usage_data_price,
    additional_data_increment,
    data_allowance_policy_url,
    network_management_policy_url,
    privacy_policy_url,
    customer_support_phone,
    customer_support_web,
    isVoice,
}: {
    providerName?: string,
    unique_plan_id: string;
    service_plan_name: string;
    tier_plan_name?: string | null;
    connection_type: string;
    monthly_price: number;
    intro_rate: string;
    intro_rate_price?: number | null;
    intro_rate_time?: string | null;
    contract_req: string;
    contract_time?: string | null;
    contract_terms_url?: string | null;
    early_termination_fee?: string | null;
    single_purchase_fee_descr?: string | null;
    single_purchase_fees?: string | null;
    monthly_provider_fee_descr?: string | null;
    monthly_provider_fee?: string | null;
    tax: string;
    bundle_discounts_url: string;
    typical_download_speed?: string | null;
    typical_upload_speed?: string | null;
    typical_latency?: string | null;
    monthly_data_allow?: string | null;
    over_usage_data_price?: string | null;
    additional_data_increment?: string | null;
    data_allowance_policy_url: string;
    network_management_policy_url: string;
    privacy_policy_url: string;
    customer_support_phone: string,
    customer_support_web: string,
    isVoice?: boolean,
}) => {
    

    const typicalDownSpeedMBbps = typical_download_speed ? convertToMbps(typical_download_speed) : "N/A";
    const typicalUploadSpeedMbps = typical_upload_speed ? convertToMbps(typical_upload_speed) : 'N/A';


    const plan = {
        unique_plan_id: unique_plan_id,
        provider_name: providerName,
        service_plan_name: service_plan_name,
        tier_plan_name,
        connection_type,
        monthly_price: monthly_price,
        intro_rate: intro_rate === 'N/A' ? "NULL" : intro_rate,
        intro_rate_price: intro_rate_price,
        intro_rate_time: intro_rate_time === 'N/A' ? "0" : intro_rate_time,
        contract_req: contract_req === 'N/A' ? "NULL" : contract_req,
        contract_time: contract_time === 'N/A' ? "0" : contract_time,
        contract_terms_url: contract_terms_url,
        early_termination_fee: early_termination_fee === 'N/A' ? "NULL" : early_termination_fee,
        single_purchase_fee_descr: single_purchase_fee_descr === 'N/A' ? "NULL" : single_purchase_fee_descr,
        single_purchase_fees: single_purchase_fees === 'N/A' ? "NULL" : single_purchase_fees,
        monthly_provider_fee_descr: monthly_provider_fee_descr === 'N/A' ? "NULL" : monthly_provider_fee_descr,
        monthly_provider_fee: monthly_provider_fee === 'N/A' ? "NULL" : monthly_provider_fee,
        tax: tax,
        bundle_discounts_url: bundle_discounts_url,
        typical_download_speed: typicalDownSpeedMBbps,
        typical_upload_speed: typicalUploadSpeedMbps,
        typical_latency: typical_latency === 'N/A' ? "0" : typical_latency,
        monthly_data_allow: monthly_data_allow === 'N/A' ? "NULL" : monthly_data_allow,
        over_usage_data_price: over_usage_data_price === 'N/A' ? "0" : over_usage_data_price,
        additional_data_increment: additional_data_increment === 'N/A' ? "0" : additional_data_increment,
        data_allowance_policy_url: data_allowance_policy_url,
        network_management_policy_url: network_management_policy_url,
        privacy_policy_url,
        customer_support_phone,
        customer_support_web
    };


    const location = useLocation();
    const isES = location.prevUrl?.pathname.includes("/es/");



    // const singlePurchase = planData.single_purchase_fee_descr &&  planData.single_purchase_fee_descr.split(';').map((item: any, index: number) => ({
    //     description: item.trim(),
    //     price: planData.single_purchase_fees && planData.single_purchase_fees.split(';')[index].trim()
    // }));

    // const monthlyProvider = planData.monthly_provider_fee_descr && planData.monthly_provider_fee_descr.split(';').map((item: any, index: number) => ({
    //     description: item.trim(),
    //     price: plan.monthly_provider_fee.split(';')[index].trim()
    // }));

    const handleClick = $(() => downloadCSV(plan, `${plan.unique_plan_id}.csv`));

    const handleClickBtnPDF = $(() => downloadPDF('div-plan-' + plan.unique_plan_id));

    const handleClickBtnPNG = $(() => downloadPNG('div-plan-' + plan.unique_plan_id));

    return <div class="flex flex-col items-start">
        <div class="mx-2 my-5 overflow-hidden w-[325px] min-h-[1000px] p-3 border-4 border-black bg-white shrink-0" id={`div-plan-` + plan.unique_plan_id}>
            <header>
                <h2 class="text-2xl font-extrabold text-center">{isVoice == true ? isES ? "Información del Servicio telefónico" : "Phone Service Facts" : isES ? "Información de Internet de Banda Ancha" : "Broadband Facts"}</h2>
                <hr class="border-black border-2" />
                <p class="text-base font-bold">{providerName}</p>
                <p class="text-base font-extrabold">{plan.service_plan_name}</p>
                <p class="text-base">{isES ? "Declaración de transparencia para el usuario de servicios de internet de banda ancha fija." : "Fixed Broadband Consumer Disclosure"}</p>
            </header>
            <hr class="border-black border-4" />
            <div class="grid grid-cols-2 font-extrabold">
                <p>{isES ? "Precio mensual" : "Monthly Price"}</p>
                <p class="text-right">$ {plan.monthly_price}</p>
                {/* <p class="text-right">${plan.intro_rate == "Yes" ? plan.intro_rate_price : plan.monthly_price}</p> */}
            </div>
            <hr class="border-2 border-black" />

            {/* price-info */}
            <div class="grid grid-cols-2 text-sm gap-2">
                <p>{isES ? "Este precio mensual corresponde a una tarifa inicial" : "This monthly price is an introductory rate"}</p>
                <p class="text-right">{intro_rate}</p>
                <p>{isES ? "Lapso al que se aplica la tarifa inicial" : "Time the introductory rate applies"}</p>
                <p class="text-right">{intro_rate_time}</p>
                <p>{isES ? "Precio mensual posterior a la tarifa inicial" : "Monthly price after the introductory rate"}</p>
                <p class="text-right">${plan.intro_rate_price}</p>
                <p>{isES ? "Duración del contrato" : "Length of contract"}</p>
                <p class="text-right">{contract_time}</p>
                <p class="col-span-2">{isES ? "Enlace a los términos del contrato" : "Link to Terms of Contract"}</p>
            </div>
            <p class="text-sm"><a href="https://rtatel.com/client-services-agreement-general-terms-and-conditions/">https://rtatel.com/client-services-agreement-general-terms-and-conditions/</a></p>
            <hr class="border-2 border-black" />

            {/* additional-charges */}
            <div class="text-sm">
                <p class="font-bold">{isES ? "Cargos y condiciones adicionales" : "Additional Charges & Terms"}</p>
                <div class="grid grid-cols-[2fr_1fr] gap-1 p-2">
                    <p class="col-span-2">{isES ? "Tarifas mensuales del proveedor" : "Provider Monthly Fees"}</p>
                    {/* { monthlyProvider &&
                        monthlyProvider.map((item: any) =>
                            <>
                                <p>{item.description}</p>
                                <p class="text-right font-bold">${item.price}</p>
                            </>
                        )
                    } */}
                    {/* <p>Modem Rental</p>
                <p class="text-right font-bold">$10.00</p>
                <p>Wifi Extender</p>
                <p class="text-right font-bold">$5.00</p> */}

                    <div class="col-span-2 h-2"></div>

                    <p class="col-span-2">{isES ? "Tarifas cobradas una sola vez" : "One-Time Purchase Fees"}</p>
                    {/* {
                        singlePurchase.map((item: any) =>
                            <>
                                <p>{item.description}</p>
                                <p class="text-right font-bold">${item.price}</p>
                            </>
                        )
                    } */}

                    {/* <p>Installation</p>
                <p class="text-right font-bold">$100.00</p>
                <p>Battery Back-up</p>
                <p class="text-right font-bold">$100.00</p> */}

                    <div class="col-span-2 h-2"></div>

                    <p>{isES ? "Tarifa por fin del servicio antes de lo pactado" : "Early Termination Fee"}</p>
                    <p class="text-right font-bold">{early_termination_fee}</p>
                    <p>{isES ? "Impuestos gubernamentales" : "Government Taxes"}</p>
                    <p class="text-right font-bold">{isES ? "Varía según la ubicación" : "Varies by Location"}</p>

                </div>
            </div>
            <hr class="border-2 border-black" />

            {/* Discounts & Bundles */}
            <div class="text-sm">
                <p class="font-bold">{isES ? "Descuentos y servicios combinados" : "Discounts & Bundles"}</p>
                <p><a href={plan.bundle_discounts_url}> {plan.bundle_discounts_url}</a></p>
            </div>
            <hr class="border-2 border-black" />

            {
                isVoice != true && (
                    <>
                        {/* Speeds Provided with Plan */}
                        <div class="text-sm">
                            <p class="font-bold">{isES ? "Velocidades de internet proporcionadas con este plan" : "Speeds Provided with Plan"}</p>
                            <div class="grid grid-cols-[2fr_1fr] gap-1 p-2">
                                <p>{isES ? "Velocidad típica de descarga de datos" : "Typical Download Speed"}</p>
                                <p class="text-right font-bold">{typicalDownSpeedMBbps == "N/A" ? typicalDownSpeedMBbps : typicalDownSpeedMBbps + "Mbps"}</p>
                                <p>{isES ? "Velocidad típica de carga de datos" : "Typical Upload Speed"}</p>
                                <p class="text-right font-bold">{typicalUploadSpeedMbps == "N/A" ? typicalUploadSpeedMbps : typicalUploadSpeedMbps + "Mbps"}</p>
                                <p>{isES ? "Latencia típica" : "Typical latency"}</p>
                                <p class="text-right font-bold">{typical_latency} ms</p>
                            </div>
                        </div>
                        <hr class="border-black" />

                        {/* Data Included with Monthly Price */}
                        <div class="text-sm grid grid-cols-[3fr_1fr]">
                            <p class="font-bold">{isES ? "Volumen de datos incluido en este precio mensual" : "Data Included with Monthly Price"}</p>
                            <p class="text-right font-bold">{monthly_data_allow}</p>
                            <div class="p-2 col-span-2">
                                <div class="grid grid-cols-2 gap-1">
                                    <p>{isES ? "Cargos por uso adicional de datos " : "Charges for Additional Data Usage"}</p>
                                    <p class="text-right font-bold">${over_usage_data_price}</p>
                                </div>
                                {
                                    data_allowance_policy_url != "N/A" && (
                                        <p class="text-sm"><a href={plan.data_allowance_policy_url}>{plan.data_allowance_policy_url}</a></p>
                                    )
                                }
                            </div>
                        </div>
                        <hr class="border-2 border-black" />
                    </>
                )
            }



            {/* network-management */}
            <div class="text-sm">
                <p>
                    <strong>{isES ? "Política de administración de redes" : "Network Management Policy"}</strong>
                </p>
                <a class="px-2" href={plan.network_management_policy_url} target="_blank" rel="noreferrer">{plan.network_management_policy_url}</a>
                <p>
                    <strong>{isES ? "Políticas de privacidad" : "Privacy Policy"}</strong>
                </p>
                <a class="px-2" href={plan.privacy_policy_url} target="_blank" rel="noreferrer">{plan.privacy_policy_url}</a>
            </div>
            <hr class="border-4 border-black" />

            {/* customer-support */}
            <div class="text-sm">
                <p class="font-bold">{isES ? "Política de privacidad" : "Customer Support"}</p>
                <p class="px-2">{isES ? "Teléfono:" : "Phone:"} <a href={`tel:${plan.customer_support_phone}`}>{plan.customer_support_phone}</a></p>
                <p class="px-2">{isES ? "Sitio web:" : "Website:"} <a href={plan.customer_support_web} target="_blank" rel="noreferrer">{plan.customer_support_web}</a></p>
            </div>
            <hr class="border border-black" />
            <p class="text-sm"> {isES ? "Familiarícese con el lenguaje utilizado en esta etiqueta. Visite el sitio web del área de recursos para el consumidor, de la Comisión Federal de Comunicaciones (FCC)." : "Learn more about the terms used on this label by visiting the Federal Communications Commission's Consumer Resource Center."}</p>
            <p class="text-sm text-right"><strong><a href="https://fcc.gov/consumer" target="_blank" rel="noreferrer">fcc.gov/consumer</a></strong></p>
        </div>
        <div class="flex flex-col items-center justify-evenly gap-2 w-full">
            <Button text="Download as CSV" onClick={handleClick} />
            <Button text="Download as PDF" onClick={handleClickBtnPDF} />
            <Button text="Download as PNG" onClick={handleClickBtnPNG} />
        </div>
    </div >
});