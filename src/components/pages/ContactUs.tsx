import { component$ } from "@builder.io/qwik";
import { Button } from "../Button";
import { Link } from "@builder.io/qwik-city";
import { StrapiImage } from "../StrapiImage";

export const ContactUs = component$(({ data }: { data: any }) => {
    const introduction = data['Introduction']
    const socialMedia = data['SocialMedia']
    const officesLocation = data['OfficesLocation']
    return <div class="flex flex-col py-10 items-center justify-center">
        <h1 class="text-2xl sm:text-4xl font-bold text-primary-blue">{introduction['Title']}</h1>
        <p class="text-primary-blue text-center text-[16px] md:text-[18px] m-5">{introduction['Paragraph']}</p>
        <Button text={introduction['Buttons'][0]['Text']} link={introduction['Buttons'][0]['Link']}></Button>

        <div class="flex flex-col items-center gap-2 px-4 py-4 my-10">
            <p class="text-xl sm:text-2xl font-bold text-primary-blue">{socialMedia["Text"]}</p>
            <div class="flex flex-row gap-4">
                {data["SocialMedia"]["SubOption"].map((item: any, index: any) => (
                    <Link key={index} href={item["Link"]}>
                        {item["Link"].includes("facebook") && (
                            <div class="flex w-[50px] h-[50px] items-center justify-center rounded-full bg-primary-blue p-4">
                                <StrapiImage
                                    url={item["Icon"]["data"]["attributes"]["url"]}
                                    toWhite={true}
                                />
                            </div>
                        )}
                        {!item["Link"].includes("facebook") && (
                            <div class="flex w-[50px] h-[50px] items-center justify-center rounded-full bg-primary-blue p-3">
                                <StrapiImage
                                    url={item["Icon"]["data"]["attributes"]["url"]}
                                    toWhite={true}
                                />
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
<div class="flex flex-col items-center justify-center">
<h1 class="text-xl sm:text-2xl font-bold text-primary-blue">{data['OfficesTitle']}</h1>
<div class="flex flex-wrap gap-8 mt-5 justify-center items-start">
    {officesLocation.map((item:any, index:any)=>(
        <div class="flex flex-col w-[200px]" key={index}>
            <a class="font-bold text-secondary-red" href={item['Buttons'][0]['Link']}>{item['Buttons'][0]['Text']}</a>
            <a class="font-bold text-primary-blue" href={item['Buttons'][1]['Link']}>{item['Buttons'][1]['Text']}</a>
            <p class="tracking-wide font-normal text-sm text-primary-blue">{item['Paragraph']}</p>
        </div>
    ))}
</div>
</div>
    </div>
});