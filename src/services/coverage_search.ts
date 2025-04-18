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

export const consultMap = async (
    Lat: string,
    Lng: string,
    radius: string,
    limit: string,
    geometry: string,
    accessToken: string
  ) => {
    const url = `https://api.mapbox.com/v4/uzzielpalma99.cm86cp9fg0fdp1otla8ttr421-5s8um/tilequery/${Lng},${Lat}.json?radius=${radius}&limit=${limit}&geometry=${geometry}&access_token=${accessToken}`;
    const res = await fetch(url);
    return res.json();
  };
  
  export const searchBastropCoverage = async (Lat: string, Lng: string) => {
    const getFeatures = async (geometry: 'point' | 'polygon', radius: string, limit: string) =>
      (await consultMap(Lat, Lng, radius, limit, geometry, access_token)).features;

    const access_token ='pk.eyJ1IjoidXp6aWVscGFsbWE5OSIsImEiOiJja3hoeWxxaHUwYjVhMndvYzdkMW4wbTAzIn0.JGPo9_pMeml93PD7bELQRg';
    const pointFeatures = await getFeatures('point', '150', '2');
    const polygonFeatures = await getFeatures('polygon', '0', '5');
  
    const isBastrop = polygonFeatures.some((f: { properties: { folder: string; }; }) => f.properties.folder === 'bastrop_county_outline');
    const noFiber = pointFeatures.some((f: { properties: { folder: string; }; }) => f.properties.folder === 'bastrop_served_nonfiber');
    const eligible = pointFeatures.some((f: { properties: { folder: string; }; }) => f.properties.folder === 'Eligible_locations_Bastrop');
    let serviceType: 'bastrop_nofiber' | 'bastrop_elegible' | 'bastrop_nocoverage' | 'notbastrop' | 'unknown' = 'unknown';
    
    serviceType =
      isBastrop
        ? noFiber
          ? 'bastrop_nofiber'
          : eligible
            ? 'bastrop_elegible'
            : 'bastrop_nocoverage'
        : 'notbastrop';
  
    return { serviceType };
  };