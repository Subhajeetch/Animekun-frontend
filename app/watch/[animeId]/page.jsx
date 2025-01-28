import axios from "axios";
import WatchContainer from "../../../Sections/WatchPage/WatchContainer999.jsx";
import AnimeInfoSection from "../../../Sections/WatchPage/AnimeInfoOnWatchPage.jsx";
import AnimeRecommendations from "../../../Sections/WatchPage/AnimeRecommendationsOnWarchPage.jsx";

// Dynamic metadata generation function
export async function generateMetadata({ params }) {
  const { animeId } = await params;

  try {
    const animeInfoRes = await axios.get(
      `https://mantomart.in/api/mantox/anime/info/${animeId}`
    );
    const animeInfoData = animeInfoRes.data;
    const { info } = animeInfoData.anime;

    return {
      title:
        `Watch ${info.name} Online In English Dub & Sub In HD Quality - AnimeKun` ||
        "Watch Anime Online In English Dub & Sub In HD Quality - AnimeKun",
      description:
        `Stream and download ${info.name} in english Dub/Sub options. Watch your favourite episodes of ${info.name} with high-quality video for an impressive viewing experience.` ||
        "Stream and download animes in english Dub/Sub options. Watch your favourite episodes with high-quality video for an impressive viewing experience.",
      keywords: [
        `${info.name}`,
        `watch ${info.name} online`,
        `${info.name} watch`,
        `${info.name} online`,
        `${info.name} stream`,
        `${info.name} sub`,
        `${info.name} english dub`,
        "anime to watch",
        "no ads anime website",
        "watch anime",
        "ad free anime site",
        "anime online",
        "free anime online",
        "online anime",
        "anime streaming",
        "stream anime online",
        "english anime",
        "english dubbed anime"
      ],
      openGraph: {
        title:
          `Watch ${info.name} Online In English Dub & Sub In HD Quality - AnimeKun` ||
          "Watch Anime Online In English Dub & Sub In HD Quality - AnimeKun",
        description:
          `Stream and download ${info.name} in english Dub/Sub options. Watch your favourite episodes of ${info.name} with high-quality video for an impressive viewing experience.` ||
          "Stream and download animes in english Dub/Sub options. Watch your favourite episodes with high-quality video for an impressive viewing experience.",
        url: `https://animekun.lol/watch/${animeId}`,
        siteName: "AnimeKun",
        images: [
          {
            url: "https://i.imgur.com/dgkXTMO.png",
            width: 280,
            height: 400,
            alt: `${info.name} Cover`
          },
          {
            url: `${info.poster}`,
            width: 1200,
        height: 430,
            alt: `${info.name} Cover`
          }
        ],
        locale: "en_US",
        type: "website"
      },
      alternates: {
        canonical: `/watch/${animeId}`
      }
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);

    // Fallback metadata
    return {
      title: "Watch Anime Online In English Dub & Sub In HD Quality - AnimeKun",
      description:
        "Stream and download animes in english Dub/Sub options. Watch your favourite episodes with high-quality video for an impressive viewing experience.",
      keywords: [
        "anime to watch",
        "no ads anime website",
        "watch anime",
        "ad free anime site",
        "anime online",
        "free anime online",
        "online anime",
        "anime streaming",
        "stream anime online",
        "english anime",
        "english dubbed anime"
      ],
      openGraph: {
        title:
          "Watch Anime Online In English Dub & Sub In HD Quality - AnimeKun",
        description:
          "Stream and download animes in english Dub/Sub options. Watch your favourite episodes with high-quality video for an impressive viewing experience.",
        url: `/watch/${animeId}`
      },
      alternates: {
        canonical: `/watch/${animeId}`
      }
    };
  }
}

// Server component (fully server-side)
const WatchAnime = async ({ params }) => {
  const { animeId } = await params;

  try {
    // Fetch data on the server
    const [animeInfoRes, episodesRes] = await Promise.all([
      axios.get(`https://mantomart.in/api/mantox/anime/info/${animeId}`),
      axios.get(`https://mantomart.in/api/mantox/episodes/${animeId}`)
    ]);

    const animeInfoData = animeInfoRes.data;
    const seasons = animeInfoRes.data.seasons || [];
    const episodes = episodesRes.data.episodes || [];

    // Render the page using the fetched data
    return (
      <>
        <main>
          <WatchContainer
            episodes={episodes}
            animeId={animeId}
            animeInfoData={animeInfoData}
            seasons={seasons}
          />

          {animeInfoData && (
            <div>
              <AnimeInfoSection anime={animeInfoData} />
            </div>
          )}

          {animeInfoData && (
            <div>
              <AnimeRecommendations anime={animeInfoData} />
            </div>
          )}
        </main>
      </>
    );
  } catch (error) {
    console.error("Error fetching data on the server:", error);

    // Handle error by rendering a fallback UI
    return (
      <div>
        <h1>Error loading the anime</h1>
        <p>
          We encountered an error while fetching the anime data. Please try
          again later.
        </p>
      </div>
    );
  }
};

export default WatchAnime;
