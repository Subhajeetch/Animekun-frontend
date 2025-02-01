import axios from "axios";

const anilistGraphqlUrl = "https://graphql.anilist.co";

function anilistMediaDetailQuery(id) {
  return {
    query: `
      query ($id: Int) {
        Media(id: $id) {
          bannerImage
          popularity
          coverImage {
            color
          }
          isAdult
          nextAiringEpisode {
            airingAt
            timeUntilAiring
            episode
          }
        }
      }
    `,
    variables: { id }
  };
}

export const getAnimeInfoUtils = async id => {
  if (id === 0) {
    return {
      manto: true,
      data: {
        banner: "https://i.imgur.com/1JNOKZx.jpeg",
        popularity: 0,
        color: "#434343",
        isAdult: null,
        upcomingEp: {
          airingTime: 0,
          timeUntilAiring: 0,
          episode: 0
        }
      }
    };
  }

  try {
    const response = await axios.post(
      anilistGraphqlUrl,
      anilistMediaDetailQuery(id),
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );

    const media = response.data?.data?.Media;

    // Constructing the response object
    const result = {
      manto: true,
      data: {
        banner: media?.bannerImage || null,
        popularity: media?.popularity || null,
        color: media?.coverImage?.color || null,
        isAdult: media?.isAdult || false,
        upcomingEp: media?.nextAiringEpisode
          ? {
              airingTime: media.nextAiringEpisode.airingAt,
              timeUntilAiring: media.nextAiringEpisode.timeUntilAiring,
              episode: media.nextAiringEpisode.episode
            }
          : null
      }
    };

    return result;
  } catch (error) {
    console.error("Error fetching anime details:", error.message);
    return {
      manto: false,
      message: "Failed to fetch anime details. Please try again later."
    };
  }
};
