export const searchCoverage = async (Lat:string, Lng:string, zipcode:string)=>{
    const resp = await fetch(`https://cblsrvr1.rtatel.com/planbuilder/validate/coverage?lat=${Lat}&long=${Lng}&zipcode=${zipcode}`);

    const data = await resp.json();
    
    const flag = data['result']['coverage'];
    const locationgroup = data['result']['locationgroup'];
    const type= data['result']['type'];

    return {
        "coverage": flag,
        "type":type,
        "locationgroup":locationgroup
    };
}

export const searchBastropCoverage = async (Lat:string, Lng:string)=>{

    const radius = '50';
    const limit = '5';
    const accessToken = 'pk.eyJ1IjoidXp6aWVscGFsbWE5OSIsImEiOiJja3hoeWxxaHUwYjVhMndvYzdkMW4wbTAzIn0.JGPo9_pMeml93PD7bELQRg';
   
    const resp = await fetch(`https://api.mapbox.com/v4/uzzielpalma99.cm86cp9fg0fdp1otla8ttr421-5s8um/tilequery/${Lng},${Lat}.json?radius=${radius}&limit=${limit}&geometry=linestring&access_token=${accessToken}`);
    
    const data = await resp.json();
    
    const flag = data['features'].length > 0;

    return {
        "coverage": flag,
    };
}
