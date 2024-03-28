import { component$ } from "@builder.io/qwik";
import { StrapiImage } from "../StrapiImage";
import { Markdown } from "../Markdown";
import { Button } from "../Button";
import { Paragraph } from "../Paragraph";
import { SimpleTable } from "../pricing-table/simple-table";

export const GigfastInternet = component$(({ data }: { data: any }) => {
    return <div class="flex flex-col items-center justify-around">
        <div class="mx-4 my-8 max-w-[500px]">
            <StrapiImage media={data['Logo']['data']['attributes']} width={1230} height={229} />
        </div>
        <div class="mx-10 my-4 flex max-w-[800px] flex-col items-center justify-center gap-2 text-primary-blue">
            <span class="text-center text-[38px] font-bold text-[#2E5899] max-sm:text-[28px]">
                {data['Introduction']["Title"]}
            </span>
            <Markdown classN={"text-center"} text={data['Introduction']["Paragraph"]} />
            <Button text={data['Introduction']["Buttons"][0]['Text']} link={data['Introduction']["Buttons"][0]['Link']}></Button>
        </div>
        <div class="flex flex-wrap gap-10 justify-center mx-4 my-8 items-start">
            {data['PackTables'].map((item: any, index: any) => (
                <SimpleTable key={index} title={item['Title']} logo={item['Logo']['data']['attributes']}
                description={item['Description']}
                features={item['Features']} price={item['Price']} priceTime={item['Pricetime']}
                btnLink={item['Button']['Link']} btnText={item['Button']['Text']}></SimpleTable>
            ))}
        </div>
        <Markdown classN="text-primary-blue text-center mx-4 my-8" text={data['Disclaimer']}></Markdown>
        <Paragraph text={data['GFInternetSupport']['Paragraph']} title={data['GFInternetSupport']['Title']}
        logo={data['GFInternetSupport']['Logo']['data']['attributes']}
        buttons={data['GFInternetSupport']['Buttons']}
        image={data['GFInternetSupport']['Media']['data']['attributes']}></Paragraph>
    </div>
});