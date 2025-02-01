import axios from "axios";

export const getAnimeInfoUtils = async id => {
  try {
    const response = await axios.get(
      `https://consumetapi-bay.vercel.app/meta/anilist/info/${id}`
    );

    const banner = response.data.cover;
    const popularity = response.data.popularity;
    const isAdult = response.data.isAdult;
    const upcomingEp = response.data?.nextAiringEpisode || null;

    return {
      manto: true,
      data: {
        banner,
        popularity,
        isAdult,
        upcomingEp
      }
    };
  } catch (error) {
    // Handling errors
    console.error("Error fetching data:", error.message);
    return {
      manto: false,
      error: error.message
    };
  }
};
