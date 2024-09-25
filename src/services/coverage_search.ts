export const searchCoverage = async (Lat:string, Lng:string, zipcode:string)=>{
    const resp = await fetch(`https://cblsrvr1.rtatel.com/planbuilder/validate/coverage?lat=${Lat}&long=${Lng}&zipcode=${zipcode}`);

    const data = await resp.json();
    
    const flag = data['result']['coverage'];
    const locationgroup = data['result']['locationgroup'];
    const type= data['result']['type'];

    console.log(flag);
    console.log(type);
    console.log(locationgroup);

    return {
        "coverage": flag,
        "type":type,
        "locationgroup":locationgroup
    };
}