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
  const items = data["items"].map((item: any) => {
    return {
      address: item["title"],
      zip: item["title"]?.split(", ")[2]?.split(" ")[1] || "",
      position: item['position']
    };
  });
  return items;
};
