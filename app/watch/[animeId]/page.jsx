import axios from "axios";
import {
  getAnimeInfo,
  getEpisodesByAnimeId,
  getAnimeInfoUtils
} from "@/DataRoutes/index.js";

import WatchContainer from "../../../Sections/WatchPage/WatchContainer.jsx";
import AnimeInfoSection from "../../../Sections/WatchPage/AnimeInfoOnWatchPage.jsx";
import AnimeRecommendations from "../../../Sections/WatchPage/AnimeRecommendationsOnWarchPage.jsx";
import SeasonsCarousel from "../../../Sections/WatchPage/AnimePageSeasonsCarousel.jsx";
import AiringSchedule from "../../../Sections/WatchPage/upcomingEp.jsx";

// Dynamic metadata generation function
export async function generateMetadata({ params }) {
  const { animeId } = await params;

  try {
    const fetchedData = await getAnimeInfo(animeId);
    //console.log(fetchedData);
    const animeInfoData = fetchedData.data;
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
            url: "https://i.imgur.com/MNnhK3G.jpeg",
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

const WatchAnime = async ({ params }) => {
  const { animeId } = await params;

  const fetchedData = await getAnimeInfo(animeId);

  const InfoUtils = await getAnimeInfoUtils(
    fetchedData.data.anime.info.anilistId || 0
  );

  const getData = () => {
    if (InfoUtils.manto) {
      return {
        color: InfoUtils.data.color || "#2073ae",
        uE: InfoUtils.data.upcomingEp
      };
    } else {
      return {
        color: "#2e3d41",
        uE: null
      };
    }
  };

  const getutilsData = getData();

  try {
    const [animeInfoRes, episodesRes] = await Promise.all([
      getAnimeInfo(animeId),
      getEpisodesByAnimeId(animeId)
    ]);

    const animeInfoData = animeInfoRes.data;
    const seasons = animeInfoRes.data.seasons || [];
    const episodes = episodesRes.data.episodes || [];

    return (
      <>
        <main className="bg-backgroundtwo">
          <WatchContainer
            episodes={episodes}
            animeId={animeId}
            animeInfoData={animeInfoData}
            seasons={seasons}
            getutilsData={getutilsData}
          />

          <div className="lg:hidden flex flex-col pb-6 bg-backgroundtwo">
            {getutilsData.uE && (
              <div className="px-4 md:px-[54px]">
                <AiringSchedule
                  data={getutilsData.uE}
                  color={getutilsData.color}
                />
              </div>
            )}
            {seasons && seasons.length > 0 && (
              <>
                <div
                  className="flex gap-1 pl-4 py-2 items-center
              border-backgroundHover border-b-2
              mt-2
               "
                >
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                    className="h-[17px]"
                    style={{ fill: "var(--foreground)" }}
                  >
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      stroke="none"
                    >
                      <path
                        d="M2478 4630 c-131 -21 -269 -122 -336 -247 l-32 -61 -423 -4 c-389 -4
-428 -6 -497 -25 -274 -76 -469 -259 -530 -499 -25 -98 -25 -180 0 -278 61
-238 236 -409 507 -493 l88 -28 960 -3 c1074 -3 1002 -7 1053 68 20 29 23 44
20 88 -4 45 -10 59 -42 90 l-36 37 -953 5 c-951 5 -952 5 -1018 27 -130 44
-229 127 -277 231 -21 47 -24 65 -20 131 9 155 106 264 290 325 l77 26 399 0
400 0 7 -27 c11 -47 72 -137 123 -186 139 -129 354 -162 529 -80 81 38 181
139 222 226 l32 67 442 0 c287 0 456 4 482 11 144 39 147 238 4 279 -20 6
-220 10 -485 10 l-452 0 -26 54 c-90 184 -298 288 -508 256z"
                      />
                      <path
                        d="M3905 3508 c-84 -16 -172 -65 -240 -133 -186 -186 -191 -467 -12
-661 180 -195 480 -205 672 -23 59 56 61 55 106 -31 33 -62 34 -184 2 -253
-31 -67 -116 -148 -193 -185 -136 -64 -91 -62 -1464 -62 l-1244 0 -22 35 c-83
135 -296 225 -461 196 -74 -13 -173 -57 -230 -103 -82 -65 -169 -221 -169
-302 0 -18 -12 -33 -43 -55 -65 -45 -157 -143 -200 -213 -76 -126 -103 -285
-73 -422 55 -246 236 -427 513 -513 l88 -28 677 -3 676 -3 32 -49 c163 -253
511 -293 731 -83 196 187 198 486 5 679 -72 72 -141 110 -240 131 -231 49
-473 -91 -546 -316 l-23 -72 -626 4 c-544 3 -633 5 -680 19 -141 43 -241 120
-292 223 -28 58 -31 71 -27 137 4 78 27 139 73 191 l26 29 67 -64 c73 -68 128
-99 219 -123 248 -65 519 101 576 351 l14 59 1274 5 1274 5 75 23 c330 101
531 341 531 632 0 175 -54 301 -186 434 -78 79 -80 83 -91 148 -25 145 -124
282 -251 351 -91 49 -210 66 -318 45z"
                      />
                    </g>
                  </svg>

                  <span className="text-[13px] font-[800]">Sequence: </span>
                </div>
                <SeasonsCarousel seasons={seasons} />
              </>
            )}
          </div>

          {animeInfoData && (
            <div>
              <AnimeInfoSection
                anime={animeInfoData}
                getutilsData={getutilsData}
              />
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
