import { HiAnime } from "aniwatch";

const hianime = new HiAnime.Scraper();

export const getServersByEpisodeId = async (epid) => {

  try {
    const data = await hianime.getEpisodeServers(epid);
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
