export const searchStreets = async (
  q: string,
  atLat: number,
  atLng: number,
) => {
  const apiKey = "IbuSA9oJnZ_SSAN3hiD9EFv0fxE0mijeZF2QQjcjl6Y";
  const resp = await fetch(
    `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${atLat},${atLng}&lang=en-US&&q=${q}apiKey=${apiKey}`,
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
