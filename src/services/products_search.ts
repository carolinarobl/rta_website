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


    const { gigfastInternetProductsResidential, gigfastVoiceResidential } = data.result.reduce(
        (acc: any, item: any) => {
          if (item.family === "gigFastInternet") {
            acc.gigfastInternetProductsResidential.push(item);
          } else if (item.family === "gigFastVoice") {
            acc.gigfastVoiceResidential.push(item);
          }
          return acc;
        },
        { gigfastInternetProductsResidential: [], gigfastVoiceResidential: [] }
      );
      
      // Filtrando 'dataBusiness.result'
      const { gigfastInternetProductsBusiness, gigfastVoiceBusiness } = dataBusiness.result.reduce(
        (acc: any, item: any) => {
          if (item.family === "gigFastInternet") {
            acc.gigfastInternetProductsBusiness.push(item);
          } else if (item.family === "gigFastVoice") {
            acc.gigfastVoiceBusiness.push(item);
          }
          return acc;
        },
        { gigfastInternetProductsBusiness: [], gigfastVoiceBusiness: [] }
      );


    console.log(gigfastInternetProductsResidential);
    return {
        'residentialInternet': gigfastInternetProductsResidential,
        'businessInternet': gigfastInternetProductsBusiness,
        'residentialVoice': gigfastVoiceResidential,
        'businessVoice': gigfastVoiceBusiness

    }
}