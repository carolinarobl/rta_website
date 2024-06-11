import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export const TexasPage = component$(({ data }: { data: any }) => {
    const location = useLocation();
    const isES = location.prevUrl?.pathname.includes("/es/");
    
    return <div class="p-8">
        <h1 class="text-center font-bold text-4xl mb-6 text-secondary-red">{isES?"Encuentra tu locación":"Find your location"}</h1>
        <table class="w-full rounded-2xl">
            <thead class="bg-primary-blue text-white font-semibold">
                <th>{isES?"Nombre":"Name"}</th>
                <th>{isES?"Código postal":"Zip code"}</th>
                <th>{isES?"Ubicación de oficina local":"Local Office Location"}</th>
            </thead>
            <tbody>
                {data.map((location: any, index: any) => (
                    <tr key={index} class={`text-center text-primary-dark-blue w-full h-full ${index % 2 == 0 ? "bg-blue-100" : "bg-blue-200"}`}>
                        <td class="hover:text-secondary-red">
                            <a href={isES? ('/es/texas/'+location['attributes']['Slug']).replace('-es', '/') :  (location['attributes']['Slug']+'/')}>
                                {location['attributes']['Name']}, TX
                            </a>
                        </td>
                        <td>
                                {location['attributes']['ZipCode']}
                        </td>
                        <td>
                                {location['attributes']['office']['data']['attributes']['Location']}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
});