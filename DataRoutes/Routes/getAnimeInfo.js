import { HiAnime } from "aniwatch";

const hianime = new HiAnime.Scraper();

export const getAnimeInfo = async animeId => {
  try {
    const data = await hianime.getInfo(animeId);
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
