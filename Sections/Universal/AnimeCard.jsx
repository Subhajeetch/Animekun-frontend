import Link from "next/link";

const AnimeCard = ({ anime }) => {
  return (
    <Link
      key={anime.id || index}
      className="flex flex-col"
      href={`/anime/${anime.id}`}
    >
      <div className="relative rounded-md overflow-hidden">
        <img
          src={anime.poster}
          alt={anime.name}
          className="object-cover object-top aspect-[9/12] w-full "
        />
        <div className="absolute flex gap-1 left-2 bottom-2 shadow-md">
          {anime.episodes.dub > 0 && (
            <div
              className="bg-dubBackground rounded-sm text-[9px]
                        px-[6px] py-[2px] flex gap-1 shadow-md text-dubForeground"
            >
              <span className="font-[900]">EN</span>
              <span className="font-[700]">{anime.episodes.dub}</span>
            </div>
          )}
          {anime.episodes.sub > 0 && (
            <div
              className="bg-subBackground rounded-sm text-[9px]
                        px-[6px] py-[2px] flex gap-1 shadow-md text-subForeground
                        "
            >
              <span className="font-[900]">JP</span>
              <span className="font-[700]">{anime.episodes.sub}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col py-1">
        <h3 className="text-[14px] line-clamp-1 font-[700]
        pl-1">{anime.name}</h3>
        <p className="text-[10px] pl-1 text-animeCardDimmerForeground">
          {anime.type}
          <span className="px-2">&#x2022;</span>
          {anime.duration}
        </p>
      </div>
    </Link>
  );
};

export default AnimeCard;
