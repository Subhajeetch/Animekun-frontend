import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Sequence from "./SequenceOnWatchPage.jsx";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const AnimeInfoSection = ({ anime }) => {
  const { info, moreInfo, seasons } = anime.anime;

  function toCamelCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join("");
  }

  return (
    <>
      <div
        className="flex flex-wrap bg-background justify-center
      md:justify-between md:items-center py-4 px-4 md:px-[54px]"
      >
        <div className="flex flex-col max-w-[800px]">
          <div className="flex gap-4 w-full">
            {/* Anime Poster */}
            <div className="flex flex-col items-center">
              <img
                src={info.poster}
                alt={info.name}
                className="rounded-lg shadow-lg h-[90px]"
              />

              <div
                className="flex items-center mt-2
              text-animeCardDimmerForeground"
              >
                <p className="text-[10px] font-[800]">{info.stats.type}</p>
                <span className="px-2">&#x2022;</span>
                <p className="text-[10px] font-[800]">{info.stats.duration}</p>
              </div>
            </div>

            {/* Anime Info */}
            <div className="md:col-span-2 flex-1">
              <h1 className="text-[17px] font-bold text-white">{info.name}</h1>

              <div className="flex flex-col mt-4">
                <div
                  className="h-1 w-[130px] bg-separatorOnBackground md:h-0 md:w-0
              rounded-lg"
                ></div>
                <div className="bg-separatorOnBackground md:h-1 md:w-[130px] rounded-lg"></div>
              </div>

              <div className="flex justify-start gap-1 mt-2">
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

                <div className="bg-rating text-infoForeground rounded-sm">
                  <p className="text-[10px] px-2.5 py-1 font-[800]">
                    {info.stats.rating}
                  </p>
                </div>

                <div className="bg-quality text-infoForeground rounded-sm">
                  <p className="text-[10px] px-2.5 py-1 font-[800]">
                    {info.stats.quality}
                  </p>
                </div>
              </div>

              <div
                id="genres"
                className="flex flex-wrap gap-1 justify-start mt-3 max-w-[500px]"
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
            </div>
          </div>
          <div>
            <div
              className="mt-11 overflow-y-auto max-h-[100px] max-w-[500px]
              scrollbar-thin scrollbar-thumb-backgroundHover
          scrollbar-track-background pr-2"
            >
              <p className="text-discriptionForeground text-[11px]">
                {info.description}
              </p>
            </div>
            <Link
              href={`/anime/${info.id}`}
              className="text-[11px] mt-2 underline
          flex gap-1 items-center"
            >
              More Info <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        <div className="w-[320px] h-[90px] bg-[#36453f] rounded-lg my-4">
          share box ig
        </div>

        <div className="hidden lg:block my-2 max-h-[400px]">
          <Sequence anime={anime} />
        </div>
      </div>
    </>
  );
};

export default AnimeInfoSection;
