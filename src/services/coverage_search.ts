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

export const doubleCheckBastrop = async (
  lat: string,
  lng: string,
  address: string,
  zipcode: string
): Promise<'bastrop_nofiber' | 'bastrop_elegible' | 'bastrop_nocoverage' | 'unknown' > => {
  try {
    const street = address.toUpperCase();
    const  clean_zipcode =  zipcode.includes('-') ? zipcode.split('-')[0] : zipcode;

    const response = await fetch(
      'https://u-n8n.virtalus.cbluna-dev.com/webhook/rta_search_bastrop_location_cover',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lat, long: lng, address: street, zipcode: clean_zipcode })
      }
    );

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.status}`);
    }

    const data = await response.json();

    const value = data.data;

    // Validamos que el valor recibido sea uno de los esperados
    if (
      value === 'bastrop_nofiber' ||
      value === 'bastrop_elegible' ||
      value === 'bastrop_nocoverage'
    ) {
      return value;
    }

    return 'unknown';
  } catch (error) {
    console.error('Error al consultar la cobertura bastrop location:', error);
    return 'unknown';
  }
};

  
  export const searchBastropCoverage = async (Lat: string, Lng: string, Address: string, Zipcode: string ) => {
    
    let serviceType: 'bastrop_nofiber' | 'bastrop_elegible' | 'bastrop_nocoverage' | 'notbastrop' | 'unknown' = 'unknown';
    let section = '';

    const getFeatures = async (geometry: 'point' | 'polygon', radius: string, limit: string) =>
      (await consultMap(Lat, Lng, radius, limit, geometry, access_token)).features;

    const access_token ='pk.eyJ1IjoidXp6aWVscGFsbWE5OSIsImEiOiJja3hoeWxxaHUwYjVhMndvYzdkMW4wbTAzIn0.JGPo9_pMeml93PD7bELQRg';
    const polygonFeatures = await getFeatures('polygon', '0', '5');

    const isBastrop = polygonFeatures.some((f: { properties: { folder: string; }; }) => f.properties.folder === 'bastrop_county_outline');
    


    if(polygonFeatures.length >= 5){
      const lastFeature = polygonFeatures[polygonFeatures.length - 1];
      // Extraer el nombre de la sección de la propiedad 'folder'
      const folderName = lastFeature.properties.folder;
      const match = folderName.match(/Section \d+[a-zA-Z]?/);
      
      if (match) {
        section = match[0];
      }
    }

serviceType = isBastrop
  ? await doubleCheckBastrop(Lat, Lng, Address, Zipcode)
  : 'notbastrop';

    return { serviceType, section };
  };
