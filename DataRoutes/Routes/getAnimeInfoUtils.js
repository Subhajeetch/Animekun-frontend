import axios from "axios";

export const getAnimeInfoUtils = async id => {
  if (id === 0) {
    return {
      manto: true,
      data: {
        banner: "https://i.imgur.com/1JNOKZx.jpeg",
        popularity: 0,
        isAdult: false,
        upcomingEp: null
      }
    };
  }

  try {
    const response = await axios.get(
      `https://consumetapi-bay.vercel.app/meta/anilist/info/${id}`
    );

    const banner = response.data.cover || "https://i.imgur.com/1JNOKZx.jpeg";
    const popularity = response.data.popularity || 0;
    const isAdult = response.data.isAdult || false;
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
