export const searchProducts = async (
    locationgroup: string,
    networkType: string,
    // customerType?:string,
) => {
    const resp = await fetch("https://cblsrvr1.rtatel.com/planbuilder/api", {
        method: "POST",
        headers:{
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            "action": "products",
            "networkType": networkType,
            "customerType": "residential",
            "locationgroup": locationgroup
        })
    })

    const respBusiness = await fetch("https://cblsrvr1.rtatel.com/planbuilder/api", {
        method: "POST",
        headers:{
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            "action": "products",
            "networkType": networkType,
            "customerType": "business",
            "locationgroup": locationgroup
        })
    })

    if(!resp.ok){
        console.error("Error residential products search")
    }
    if(!respBusiness.ok){
        console.error("Error business product search")
    }

    const data = await resp.json()
    const dataBusiness = await respBusiness.json()


    const gigfastInternetProductsResidential = data.result.filter((item:any) => item.family === "gigFastInternet");
    const gigfastInternetProductsBusiness = dataBusiness.result.filter((item:any) => item.family === "gigFastInternet");

    console.log(gigfastInternetProductsResidential);
    return {
        'residential': gigfastInternetProductsResidential,
        'business': gigfastInternetProductsBusiness
    }
}