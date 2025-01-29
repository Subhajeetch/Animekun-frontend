import { HiAnime } from "aniwatch";

const hianime = new HiAnime.Scraper();

export const getAnimesByGenre = async (g, p) => {
  const page = p || 1;

  try {
    const data = await hianime.getGenreAnime(g, page);
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
