import { HiAnime } from "aniwatch";

const hianime = new HiAnime.Scraper();

export const getEpisodesByAnimeId = async (id) => {

  try {
    const data = await hianime.getEpisodes(id);
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
