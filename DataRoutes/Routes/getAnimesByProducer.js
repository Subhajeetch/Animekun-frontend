import { HiAnime } from "aniwatch";

const hianime = new HiAnime.Scraper();

export const getAnimesByProducer = async (pr, p) => {
  const page = p || 1;

  try {
    const data = await hianime.getProducerAnimes(pr, page);
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
