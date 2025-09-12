export const searchStreets = async (
  q: string,
  atLat: number,
  atLng: number,
) => {
  const apiKey = "7Bjb7NlgbyFq2tgXhZsANgwpDRgh8RJlxqD9gn4WN44";
  const resp = await fetch(
    
    `https://autosuggest.search.hereapi.com/v1/autosuggest?apiKey=${apiKey}&q=${q}&at=${atLat},${atLng}&in=countryCode:USA`,
  );
  if (resp.status !== 200) {
    return [];
  }
  const data = await resp.json();

  let tempItems = data['items'];

  tempItems = tempItems.filter(
    (item: any) =>
      item['resultType'] !== "locality" &&
      item['resultType'] !== "intersection" &&
      item['resultType'] !== "postalCodePoint"
  );

  const items = tempItems.map((item: any) => {

    if (item['resultType'] == 'place') {  
      const label = item['address']['label'];
      
      // Separa el texto por la primera coma
      if(label != null || label != ''){
        const parts = label.split(',').slice(1).join(',').trim();
        item['address']['label'] = parts;
      }

    }
    
    return {
      resultType: item['resultType'],
      address: item['address']?.['label'] || '',
      zip: item['address']?.['label']?.split(", ")[2]?.split(" ")[1] || "",
      position: item['position']
    };

  });

  return items;
};

