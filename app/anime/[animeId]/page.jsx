import Link from "next/link";
import Image from "next/image";
import AnimeCard from "../../../Sections/Universal/AnimeCard.jsx";
import "../../../Styles/AnimeCardGrid.css";
import React from "react";
import CastAndCh from "./CastAndCh.jsx";
import { ArrowDownToLine, ListFilterPlus } from "lucide-react";
import { getAnimeInfo, getAnimeInfoUtils } from "@/DataRoutes/index.js";

// Dynamic metadata generation function
export async function generateMetadata({ params }) {
  const { animeId } = await params;

  const fetchedData = await getAnimeInfo(animeId);
  //console.log(fetchedData);
  const animeInfoData = fetchedData.data;
  const { info } = animeInfoData.anime;

  if (!fetchedData.manto) {
    // Fallback metadata
    return {
      title:
        "Stream Animes & its Episodes In English Dub & Sub In HD Quality Without ADS - AnimeKun",
      description:
        "Watch and download Animes online in english Dub/Sub options. Stream your favourite episodes with HD-quality video for good experience.",
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
          "Watch and download Animes online in english Dub/Sub options. Stream your favourite episodes with HD-quality video for good experience.",
        url: `/anime/${animeId}`
      },
      alternates: {
        canonical: `/anime/${animeId}`
      }
    };
  }

  return {
    title:
      `Stream ${info.name} In English Dub & Sub In HD Quality Without ADS - AnimeKun` ||
      "Watch Anime Online In English Dub & Sub In HD Quality - AnimeKun",
    description:
      `Watch and download ${info.name} online in english Dub/Sub options. Stream your favourite episodes of ${info.name} with HD-quality video for good experience.` ||
      "Watch and download Animes online in english Dub/Sub options. Stream your favourite episodes with HD-quality video for good experience.",
    keywords: [
      `${info.name}`,
      `Stream ${info.name} online`,
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
        `Stream ${info.name} In English Dub & Sub In HD Quality Without ADS - AnimeKun` ||
        "Watch Anime Online In English Dub & Sub In HD Quality - AnimeKun",
      description:
        `Watch and download ${info.name} online in english Dub/Sub options. Stream your favourite episodes of ${info.name} with HD-quality video for good experience.` ||
        "Watch and download Animes online in english Dub/Sub options. Stream your favourite episodes with HD-quality video for good experience.",
      url: `https://animekun.top/anime/${animeId}`,
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
      canonical: `/anime/${animeId}`
    }
  };
}

export default async function AnimeInfo({ params }) {
  const { animeId } = await params;

  const fetchedData = await getAnimeInfo(animeId);
  if (!fetchedData.manto) {
    return (
      <>
        <h1>Error :(</h1>
        <Link href="/home">Home</Link>
      </>
    );
  }

  const InfoUtils = await getAnimeInfoUtils(
    fetchedData.data.anime.info.anilistId || 0
  );

  const getData = () => {
    if (InfoUtils.manto) {
      return {
        banner: InfoUtils.data.banner,
        color: InfoUtils.data.color,
        pop: InfoUtils.data.popularity,
        rating: InfoUtils.data.rating,
        ch: InfoUtils.data.characters
      };
    } else {
      return {
        banner: "https://i.imgur.com/1JNOKZx.jpeg",
        color: "#2e3d41",
        pop: "?",
        rating: "?",
        ch: []
      };
    }
  };

  const getutilsData = getData();
 // console.log(getutilsData.ch[0].voiceActors);

  const animeData = fetchedData.data;
  const { info, moreInfo } = animeData.anime;
  const { recommendedAnimes, seasons, relatedAnimes } = animeData;

  function formatToKebabCase(str) {
    return str.toLowerCase().split(" ").join("-");
  }
  const hexToRgb = hex => {
    hex = hex.replace(/^#/, "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  return (
    <>
      <main className="bg-backgroundtwo">
        <div
          className="w-full relative bg-gradient-to-r from-status
        to-quality"
        >
          <div
            className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t
          from-black/80 to-transparent"
          ></div>

          {InfoUtils && InfoUtils.data.banner && (
            <img
              src={getutilsData.banner}
              alt={`${info.name} Banner`}
              className="w-full h-[180px] md:h-auto object-cover"
            />
          )}
        </div>

        <div className="flex flex-col gap-3 relative">
          <div
            className="w-full h-[60px] bg-gradient-to-b
         from-gray-700/50 to-transparent pl-[140px] md:pl-[288px]"
          >
            <div
              className="flex
            w-full p-2 pr-4 gap-1 max-w-[600px]"
            >
              <Link href={`/watch/${info.id}`} className="flex-1">
                <div
                  className="p-2 w-full bg-main rounded-lg flex
                gap-2 justify-center items-center"
                >
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                    className="h-5"
                    style={{ fill: "var(--foreground)" }}
                  >
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      stroke="none"
                    >
                      <path
                        d="M1160 5106 c-303 -64 -567 -280 -670 -549 -69 -179 -65 -41 -65
-1997 0 -1956 -4 -1818 65 -1997 86 -224 294 -423 532 -508 127 -45 224 -59
361 -52 129 6 227 31 337 85 98 48 2609 1746 2688 1817 378 343 378 967 0
1309 -78 71 -2590 1770 -2688 1818 -123 60 -206 80 -360 84 -90 2 -157 -1
-200 -10z"
                      />
                    </g>
                  </svg>

                  <span className="font-[800] flex gap-1">
                    Watch{" "}
                    <span
                      className="hidden
                  md:flex"
                    >
                      Now
                    </span>{" "}
                  </span>
                </div>
              </Link>

              <Link
                href={`/download/${info.id}`}
                className="bg-status
              flex justify-center items-center gap-2 rounded-lg min-w-[40px]
              md:px-3"
              >
                <ArrowDownToLine className="text-infoForeground" />

                <span className="hidden md:flex text-infoForeground font-[800]">
                  Download
                </span>
              </Link>
              <button
                className="min-w-[40px] bg-status flex justify-center
              items-center gap-2 rounded-lg md:px-3"
              >
                <ListFilterPlus className="text-infoForeground" />
                <span className="hidden md:flex text-infoForeground font-[800]">
                  Add To List
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 px-4 md:px-[54px] relative">
            {/* Anime Poster */}
            <div
              className="flex flex-col items-center absolute top-[-180px]
            left-[20px] md:left-[54px]"
            >
              <img
                src={info.poster}
                alt={`${info.name} Cover`}
                className="rounded-lg shadow-lg h-[160px] md:h-[300px] give-shadow "
              />

              <div className="flex items-center mt-2">
                <p className="text-[10px] text-[#b0b0b0] font-[800]">
                  {info.stats.type}
                  <span className="px-2">&#x2022;</span>
                  {info.stats.duration}
                </p>
              </div>
            </div>

            {/* Anime Info */}
            <div className="md:col-span-2 flex-1 pt-6 md:pt-2">
              <h1
                className="text-[20px] md:text-[24px] font-bold text-foreground
            md:pl-[240px]"
              >
                {info.name}
              </h1>

              <div className="flex gap-1 mt-4 md:pl-[240px]">
                <div className="flex gap-1">
                  {info.stats.episodes.dub > 0 && (
                    <div
                      className="bg-dubBackground rounded-sm text-[9px]
                        px-[6px] py-[2px] flex gap-1 shadow-lg
                        text-dubForeground
                        justify-center items-center"
                    >
                      <span className="font-[900]">EN</span>
                      <span className="font-[700]">
                        {info.stats.episodes.dub}
                      </span>
                    </div>
                  )}
                  {info.stats.episodes.sub > 0 && (
                    <div
                      className="bg-subBackground rounded-sm text-[9px]
                        px-[6px] py-[2px] flex gap-1 shadow-lg
                        text-subForeground
                        justify-center items-center"
                    >
                      <span className="font-[900]">JP</span>
                      <span className="font-[700]">
                        {info.stats.episodes.sub}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-rating rounded-sm">
                  <p
                    className="text-[10px] px-[6px] py-[2px] font-[700]
                  text-infoForeground"
                  >
                    {info.stats.rating}
                  </p>
                </div>

                <div className="bg-quality rounded-sm">
                  <p
                    className="text-[10px] px-[6px] py-[2px] font-[700]
                  text-infoForeground"
                  >
                    {info.stats.quality}
                  </p>
                </div>
                <div className="bg-status rounded-sm">
                  <p
                    className="text-[10px] px-[4px] py-[2px]  font-[700]
                  text-infoForeground"
                  >
                    {moreInfo.status}
                  </p>
                </div>
              </div>

              <div
                id="genres"
                className="flex flex-wrap gap-1 mt-3
              md:pl-[240px]"
              >
                {moreInfo.genres.map((genre, index) => (
                  <Link
                    key={index}
                    href={`/genre/${formatToKebabCase(genre)}`}
                    className={`py-1 px-2 rounded-lg
                border border-foreground
                justify-center items-center flex hover:bg-foreground
                hover:text-background`}
                  >
                    <span className="text-[10px] font-[600]">{genre}</span>
                  </Link>
                ))}
              </div>

              <div
                className="mt-11 md:mt-14 overflow-y-auto max-h-[100px] max-w-[800px]
                scrollbar-thin scrollbar-thumb-backgroundHover
          scrollbar-track-background pr-2"
              >
                <p className="text-discriptionForeground text-[11px]">
                  {info.description}
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-2 max-w-[834px]">
                <div
                  className="mt-4 p-3 rounded-xl flex-1"
                  style={{
                    backgroundColor: `rgba(${hexToRgb(
                      getutilsData.color
                    )}, 0.3)`
                  }}
                >
                  <h2 className="text-[16px] font-[800] mb-4">Details</h2>

                  {moreInfo.aired && (
                    <div className="flex gap-1 text-[11px]">
                      <span className="font-[600]">Aired:</span>{" "}
                      <span className="font-[300]">{moreInfo.aired}</span>
                    </div>
                  )}

                  {moreInfo.studios && (
                    <div className="flex gap-1 text-[11px]">
                      <span className="font-[600]">Studios:</span>{" "}
                      <span className="font-[300]">{moreInfo.studios}</span>
                    </div>
                  )}
                  {moreInfo.japanese && (
                    <div className="flex gap-1 text-[11px]">
                      <span className="font-[600]">Japanese:</span>{" "}
                      <span className="font-[300]">{moreInfo.japanese}</span>
                    </div>
                  )}

                  {moreInfo.premiered && (
                    <div className="flex gap-1 text-[11px]">
                      <span className="font-[600]">Premiered:</span>{" "}
                      <span className="font-[300]">{moreInfo.premiered}</span>
                    </div>
                  )}

                  {moreInfo.synonyms && (
                    <div className="flex gap-1 text-[11px]">
                      <span className="font-[600]">Synonyms:</span>{" "}
                      <span className="font-[300]">{moreInfo.synonyms}</span>
                    </div>
                  )}

                  {moreInfo.producers && (
                    <div className="flex gap-1 text-[11px]">
                      <span className="font-[600]">Producers:</span>
                      <span className="block">
                        {moreInfo.producers.map((producer, index) => (
                          <React.Fragment key={index}>
                            <Link
                              href={`/producer/${producer
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="font-[300] inline hover:underline"
                            >
                              {producer}
                            </Link>
                            {index < moreInfo.producers.length - 1 && ", "}
                          </React.Fragment>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
                <div
                  className="mt-4 p-3 rounded-xl w-full
                md:max-w-[274px] flex flex-col justify-around gap-3"
                  style={{
                    backgroundColor: `rgba(${hexToRgb(
                      getutilsData.color
                    )}, 0.3)`
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/extra/myAnimeListIcon.png"
                        width={28}
                        height={28}
                        alt="My Anime List Icon"
                      />
                      <p className="text-[14px] font-[800]">My Anime List</p>
                    </div>
                    <span className="text-[14px] font-[800]">
                      {moreInfo.malscore}/10
                    </span>
                  </div>
                  <div
                    className="h-[1px] w-full rounded-full"
                    style={{
                      backgroundColor: getutilsData.color
                    }}
                  ></div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/extra/anilistIcon.png"
                        width={28}
                        height={28}
                        alt="AniList Icon"
                      />
                      <p className="text-[14px] font-[800]">AniList</p>
                    </div>
                    <span
                      className="text-[14px]
                    font-[800]"
                    >
                      {getutilsData.rating}/100
                    </span>
                  </div>
                  <div
                    className="h-[1px] w-full rounded-full"
                    style={{
                      backgroundColor: getutilsData.color
                    }}
                  ></div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/extra/popularity.png"
                        width={26}
                        height={26}
                        alt="Animekun Popularity Icon"
                      />
                      <p className="text-[14px] font-[800]">Popularity</p>
                    </div>
                    <span className="text-[14px] font-[800]">
                      {getutilsData.pop}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {getutilsData.ch && getutilsData.ch.length > 0 && (
            <>
              <h2 className="flex mx-4 md:mx-[54px] mb-4 text-[17px] font-[800]
              md:mt-8">
                Cast & Characters
              </h2>

              <CastAndCh getutilsData={getutilsData} />
            </>
          )}

          {/* sequence */}
          {seasons && seasons.length > 0 && (
            <div
              className="flex-1 flex flex-col 
              gap-4 mt-2 p-3
            md:mt-0 xl:absolute top-[60px] xl:right-[10px]  mx-4
            md:mx-[54px] bg-background rounded-lg max-w-[834px]"
            >
              <div className="flex flex-col ">
                <label className="text-[16px] font-[800]">Sequence</label>
                <span className="text-[8px] font-[300]">
                  Watch one by one seasons of this anime.
                </span>
              </div>

              <div
                className="flex bg-episodeContainerBackground flex-col items-center gap-3 overflow-y-auto
              p-2 max-h-[460px] md:max-h-[380px] scrollbar-thin scrollbar-thumb-backgroundHover
          scrollbar-track-background rounded-md"
              >
                {seasons.map(season => (
                  <Link
                    href={`/anime/${season.id}`}
                    className="min-w-[300px] w-full rounded-lg
                  "
                    key={season.id}
                  >
                    <div
                      key={season.id}
                      className={`flex p-1 bg-background w-full rounded-lg
                  h-[74px] ${
                    season.isCurrent ? "border-2 border-foreground" : ""
                  }`}
                    >
                      <div className="w-[44px]">
                        <img
                          src={season.poster}
                          alt={season.name}
                          className="rounded-sm h-[64px] w-[42px] cover"
                        />
                      </div>
                      <div className="flex-1 w-3/5 pl-2 pt-1">
                        <h2
                          className={`text-foreground text-[11px] font-[500]
                    truncate ${
                      season.isCurrent ? "font-[800] text-foreground" : ""
                    }`}
                        >
                          {season.name}
                        </h2>
                        <h3
                          className={`text-[9px] font-[300]
                          text-animeCardDimmerForeground
                    ${season.isCurrent ? "font-[600]" : ""}`}
                        >
                          {season.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Promotional Videos */}
        {info.promotionalVideos && info.promotionalVideos.length > 0 && (
          <div className="mt-8 hidden">
            <h2 className="text-[14px] font-bold text-">Promotional Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {info.promotionalVideos.map((video, index) => (
                <div
                  key={index}
                  className="bg-muted p-1 rounded-lg shadow-lg space-y-2"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded"
                  />
                  <p className="font-bold">{video.title || "Untitled"}</p>
                  <a
                    href={video.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Watch Video
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Animes */}
        <div className="mt-8 px-4 md:px-[54px]">
          <h2
            className="relative h-[40px] bg-gradient-to-l
        from-transparent to-backgroundHover w-[200px] mb-[10px] p-2 flex
        items-center font-[700] text-[18px] rounded-l-md gap-2 w-full
        max-w-[400px]"
          >
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet"
              className="h-[24px] w-[24px]"
              style={{ fill: "var(--foreground)" }}
            >
              <g
                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                stroke="none"
              >
                <path
                  d="M3883 4498 c-11 -13 -64 -97 -119 -186 -61 -102 -109 -169 -124 -177
-14 -7 -106 -32 -205 -55 -209 -49 -235 -60 -235 -97 0 -31 17 -54 158 -217
57 -66 109 -131 115 -144 8 -16 6 -76 -4 -205 -20 -258 -16 -287 33 -287 11 0
105 34 209 75 103 41 201 75 218 75 17 0 108 -32 203 -71 205 -84 221 -88 249
-63 23 21 24 -7 -1 318 -7 96 -6 126 5 153 8 19 62 90 121 160 105 124 154
189 154 203 0 4 -8 17 -17 29 -14 16 -63 32 -203 66 -102 25 -199 51 -216 59
-24 11 -56 54 -137 183 -58 93 -115 177 -125 186 -26 23 -55 21 -79 -5z"
                />
                <path
                  d="M2498 3997 c-59 -23 -123 -64 -157 -102 -68 -77 -96 -165 -112 -348
-14 -157 -44 -270 -102 -381 -123 -237 -352 -415 -599 -466 -31 -6 -61 -16
-66 -23 -11 -14 -26 -1962 -16 -2026 l7 -41 1076 2 1076 3 55 30 c117 64 180
155 219 316 27 109 286 1305 301 1387 31 177 -87 377 -258 434 -65 21 -83 22
-504 26 -241 2 -438 6 -438 8 0 3 9 40 19 82 35 139 45 233 44 417 -1 318 -44
477 -159 585 -79 75 -148 103 -259 107 -59 2 -103 -1 -127 -10z"
                />
                <path
                  d="M587 2666 c-48 -18 -62 -29 -81 -70 -14 -30 -16 -134 -16 -959 l0
-924 23 -34 c45 -67 60 -70 362 -67 267 3 270 3 304 27 64 46 61 0 61 1006 0
881 -1 917 -19 953 -38 73 -53 77 -341 79 -196 2 -264 0 -293 -11z"
                />
              </g>
            </svg>

            <span>Recommended For You</span>
          </h2>
          <div
            className="grid animeCardGrid gap-4 mt-4 
          "
          >
            {relatedAnimes.map(anime => (
              <AnimeCard anime={anime} />
            ))}

            {recommendedAnimes.map(anime => (
              <AnimeCard anime={anime} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
