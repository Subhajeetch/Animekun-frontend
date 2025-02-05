import axios from "axios";

const anilistGraphqlUrl = "https://graphql.anilist.co";

function anilistMediaDetailQuery(id) {
  return {
    query: `
      query ($id: Int) {
        Media(id: $id) {
          bannerImage
          popularity
          averageScore
          coverImage {
            color
          }
          isAdult
          nextAiringEpisode {
            airingAt
            timeUntilAiring
            episode
          }
          characters(sort: ROLE) {
            edges {
              role
              node {
                id
                name {
                  first
                  middle
                  last
                  full
                  native
                  userPreferred
                }
                image {
                  large
                  medium
                }
              }
              voiceActors(sort: LANGUAGE) {
                id
                languageV2
                name {
                  first
                  last
                  full
                  native
                  userPreferred
                }
                image {
                  large
                  medium
                }
              }
            }
          }
        }
      }
    `,
    variables: { id }
  };
}

export const getAnimeInfoUtils = async (id) => {
  if (id === 0) {
    return {
      manto: true,
      data: {
        banner: "https://i.imgur.com/1JNOKZx.jpeg",
        popularity: "?",
        rating: "?",
        color: "#2073ae",
        isAdult: null,
        upcomingEp: {
          airingTime: 0,
          timeUntilAiring: 0,
          episode: 0
        },
        characters: []
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

    if (!media) {
      throw new Error("Invalid response from AniList. Data is missing.");
    }

    return {
      manto: true,
      data: {
        banner: media.bannerImage || null,
        popularity: media.popularity ?? null,
        rating: media.averageScore ?? null,
        color: media.coverImage?.color || null,
        isAdult: media.isAdult ?? false,
        upcomingEp: media.nextAiringEpisode
          ? {
              airingTime: media.nextAiringEpisode.airingAt,
              timeUntilAiring: media.nextAiringEpisode.timeUntilAiring,
              episode: media.nextAiringEpisode.episode
            }
          : null,
        characters: media.characters?.edges.map((item) => ({
          id: item.node?.id,
          role: item.role,
          name: {
            first: item.node.name.first,
            middle: item.node.name.middle,
            last: item.node.name.last,
            full: item.node.name.full,
            native: item.node.name.native,
            userPreferred: item.node.name.userPreferred
          },
          image: item.node.image.large ?? item.node.image.medium,
          voiceActors: item.voiceActors.map((voiceActor) => ({
            id: voiceActor.id,
            language: voiceActor.languageV2,
            name: {
              first: voiceActor.name.first,
              last: voiceActor.name.last,
              full: voiceActor.name.full,
              native: voiceActor.name.native,
              userPreferred: voiceActor.name.userPreferred
            },
            image: voiceActor.image.large ?? voiceActor.image.medium
          }))
        })) ?? []
      }
    };
  } catch (error) {
    console.error("Error fetching anime details:", error.message);

    return {
      manto: false,
      message: "Failed to fetch anime details. Please try again later."
    };
  }
};