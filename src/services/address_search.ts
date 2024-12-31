export const searchStreets = async (
  q: string,
  atLat: number,
  atLng: number,
) => {
  const apiKey = "IbuSA9oJnZ_SSAN3hiD9EFv0fxE0mijeZF2QQjcjl6Y";
  const resp = await fetch(
    
    `https://autosuggest.search.hereapi.com/v1/autosuggest?apiKey=${apiKey}&q=${q}&at=${atLat},${atLng}&in=countryCode:USA`,
  );
  if (resp.status !== 200) {
    return [];
  }
  const data = await resp.json();

  var tempItems = data['items'];

  tempItems = tempItems.filter(
    (item: any) =>
      item['resultType'] !== "locality" &&
      item['resultType'] !== "intersection" &&
      item['resultType'] !== "postalCodePoint"
  );

  const items = tempItems.map((item: any) => {
    
    return {
      resultType: item['resultType'],
      address: item["address"]['label'],
      zip: item["title"]?.split(", ")[2]?.split(" ")[1] || "",
      position: item['position']
    };
  });



  return items;
};