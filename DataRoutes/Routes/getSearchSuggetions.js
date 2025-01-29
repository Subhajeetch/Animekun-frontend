import { HiAnime } from "aniwatch";

const hianime = new HiAnime.Scraper();

export const getSearchSuggetion = async query => {
  try {
    const data = await hianime.searchSuggestions(query);
    return {
      manto: true,
      data: data
    };
  } catch (err) {
    console.error("Error fetching data:", err.message);
    return {
      manto: false,
      error: err.message
    };
  }
};
