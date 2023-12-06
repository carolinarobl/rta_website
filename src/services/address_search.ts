export const searchStreets = async (
  q: string,
  atLat: number,
  atLng: number,
) => {
  const apiKey = "-plDP_dR7XAGxBSiHgTFyxkxNdjFFHqjQK9ge8b92CE";
  const resp = await fetch(
    `https://autosuggest.search.hereapi.com/v1/autosuggest?apiKey=${apiKey}&q=${q}&at=${atLat},${atLng}&in=countryCode:USA&types=street`,
  );
  if (resp.status !== 200) {
    return [];
  }
  const data = await resp.json();
  const items = data["items"].map((item: any) => {
    return {
      address: item["title"],
      zip: item["title"].split(", ")[2].split(" ")[1],
    };
  });
  return items;
};
