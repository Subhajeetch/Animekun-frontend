import axios from "axios";
import Link from "next/link";
import AnimeCard from "../../../Sections/Universal/AnimeCard.jsx";
import "../../../Styles/AnimeCardGrid.css";
import React from "react";

export const metadata = {
  title: "Anime Info Page",
  description: "This is the AnimeKun anime info page"
};

export default async function AnimeInfo({ params }) {
  const { animeId } = await params;

  // Fetch anime data
  const fetchAnimeData = async id => {
    try {
      const response = await axios.get(
        `https://mantomart.in/api/mantox/anime/info/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching anime data:", error);
      return null;
    }
  };

  const animeData = await fetchAnimeData(animeId);
  const { info, moreInfo } = animeData.anime;
  const { recommendedAnimes, seasons } = animeData;

  function toCamelCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join("");
  }

  if (!animeData) {
    return (
      <>
        <h1>Anime not found</h1>
        <Link href="/home">Home</Link>
      </>
    );
  }

  return (
    <>
      <div className="p-6 bg-backgroundtwo">
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-wrap gap-3">
            {/* Anime Poster */}
            <div
              className="flex flex-col items-center
           responsive-div"
            >
              <img
                src={info.poster}
                alt={info.name}
                className="rounded-lg shadow-lg h-56 md:h-96"
              />

              <div className="flex items-center mt-2">
                <p className="text-[10px] text-[#b0b0b0] font-[800]">
                  {info.stats.type}
                </p>
                <span className="px-2">&#x2022;</span>
                <p className="text-[10px] text-[#b0b0b0] font-[800]">
                  {info.stats.duration}
                </p>
              </div>
            </div>

            {/* Anime Info */}
            <div className="md:col-span-2 flex-1">
              <h1
                className="text-[20px] font-bold text-white text-center
            md:text-left"
              >
                {info.name}
              </h1>

              <div className="flex flex-col mt-4">
                <div
                  className="h-1 w-[130px] bg-separatorOnBackground self-center md:h-0 md:w-0
              rounded-lg"
                ></div>
                <div className="bg-separatorOnBackground self-left md:h-1 md:w-[130px] rounded-lg"></div>
              </div>

              <div className="flex justify-center gap-1 md:justify-start mt-9">
                <div className="flex gap-1">
                  {info.stats.episodes.dub > 0 && (
                    <div
                      className="bg-dubBackground rounded-sm text-[9px]
                        px-[6px] py-[2px] flex gap-1 shadow-lg
                        text-dubForeground
                        justify-center items-center"
                    >
                      <span className="font-[900]">EN</span>
                      <span className="font-[500]">
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
                      <span className="font-[500]">
                        {info.stats.episodes.sub}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-rating rounded-sm">
                  <p
                    className="text-[10px] px-2.5 py-1 font-[700]
                  text-infoForeground"
                  >
                    {info.stats.rating}
                  </p>
                </div>

                <div className="bg-quality rounded-sm">
                  <p
                    className="text-[10px] px-2.5 py-1 font-[700]
                  text-infoForeground"
                  >
                    {info.stats.quality}
                  </p>
                </div>
                <div className="bg-status rounded-sm">
                  <p
                    className="text-[10px] px-2.5 py-1 font-[700]
                  text-infoForeground"
                  >
                    {moreInfo.status}
                  </p>
                </div>
              </div>

              <div
                id="genres"
                className="flex flex-wrap gap-1 justify-center
              md:justify-start mt-3"
              >
                {moreInfo.genres.map((genre, index) => (
                  <Link
                    key={index}
                    href={`/genre/${toCamelCase(genre)}`}
                    className={`py-1 px-2 rounded-lg
                border border-foreground
                justify-center items-center flex hover:bg-foreground
                hover:text-background`}
                  >
                    <span className="text-[10px] font-[600]">{genre}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-4 flex w-full justify-center md:justify-start">
                <Link href={`/watch/${info.id}`}>
                  <div
                    className="px-4 py-3 w-max mt-4 bg-main rounded-lg flex
                gap-3 justify-center items-center"
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

                    <span className="font-[600]">Watch Now</span>
                  </div>
                </Link>
              </div>

              <div
                className="mt-11 overflow-y-auto max-h-[100px] max-w-[600px]
                scrollbar-thin scrollbar-thumb-backgroundHover
          scrollbar-track-background pr-2"
              >
                <p className="text-discriptionForeground text-[11px]">
                  {info.description}
                </p>
              </div>

              <div className="mt-4">
                <label className="text-[14px] font-[800]">More Info:</label>

                <div className="flex flex-col mt-0.5 mb-2">
                  <div
                    className="h-1 w-[64px] bg-separatorOnBackgroundtwo self-left md:h-0 md:w-0
              rounded-lg"
                  ></div>
                  <div className="bg-separatorOnBackgroundtwo self-left md:h-1 md:w-[64px] rounded-lg"></div>
                </div>

                {moreInfo.aired && (
                  <div className="flex gap-1 text-[11px]">
                    <span className="font-[600]">Aired:</span>{" "}
                    <span className="font-[300]">{moreInfo.aired}</span>
                  </div>
                )}
                {moreInfo.malscore && (
                  <div className="flex gap-1 text-[11px]">
                    <span className="font-[600]">MAL Score:</span>{" "}
                    <span className="font-[300]">{moreInfo.malscore}</span>
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
            </div>
          </div>

          {/* sequence */}
          {seasons && seasons.length > 0 && (
            <div
              className="flex-1 flex flex-col items-center flex-wrap gap-4 mt-8
            md:mt-0"
            >
              <div className="flex flex-col">
                <label className="text-center text-[16px] font-[800]">
                  Sequence
                </label>
                <span className="text-[8px] font-[300]">
                  Watch one by one seasons of this anime.
                </span>
                <div className="flex flex-col mt-0.5 mb-2">
                  <div
                    className="h-1 w-[130px] bg-separatorOnBackgroundtwo self-center md:h-0 md:w-0
              rounded-lg"
                  ></div>
                  <div className="bg-separatorOnBackgroundtwo self-center md:h-1 md:w-[130px] rounded-lg"></div>
                </div>
              </div>

              <div
                className="flex bg-episodeContainerBackground flex-col items-center gap-3 overflow-y-auto
              p-2 max-h-[460px] scrollbar-thin scrollbar-thumb-backgroundHover
          scrollbar-track-background rounded-md"
              >
                {seasons.map(season => (
                  <Link
                    href={`/anime/${season.id}`}
                    className="min-w-[300px] w-full rounded-lg
                  md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]"
                    key={season.id}
                  >
                    <div
                      key={season.id}
                      className={`flex p-1 bg-background max-w-[300px] w-full rounded-lg
                  md:max-w-[500px]
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
        <div className="mt-8">
          <h2 className="text-[17px] font-bold text-foreground">
            Recommended Animes
          </h2>
          <div className="grid animeCardGrid gap-4 mt-4">
            {recommendedAnimes.map(anime => (
              <AnimeCard anime={anime} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
