import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import GenreMap from "../../Utils/genreMap.js";
import { ChevronRight } from "lucide-react";
import "./HomepageSections.css";

const GenreSection = () => {

  const displayedGenres = GenreMap.slice(0, 11);

  return (
    <div className=" max-w-[1800px] mx-auto px-4">
      <div
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4
        overflow-hidden
      genre-container relative"
      >
        {displayedGenres.map((genre, index) => (
          <Link
            className="relative h-[60px] bg-[#f94b00] overflow-hidden flex
        items-center justify-center rounded-md card-item"
            style={{
              backgroundColor: genre.backgroundColor,
              color: genre.foreground
            }}
            href={`/genre/${genre.idTwo}`}
            key={genre.idTwo}
          >
            <span className="text-[13px] font-[700] absolute top-1 left-2">
              {genre.display}
            </span>

            <div
              className="absolute right-[-6px] bottom-[-10px] h-[56px] w-[56px] bg-[#2b553e]
          transform rotate-[30deg] rounded-md add-shadow"
            >
              <img
                src={genre.url}
                alt={genre.display}
                className="h-full w-full rounded-md shadow-md"
              />
            </div>
          </Link>
        ))}

        <Link
          className="h-[60px] absolute right-0 bottom-0 bg-backgroundtwo
          w-[calc(100%/2-8px)] md:w-[calc(100%/4-12px)] lg:w-[calc(100%/6-12px)] card-item"
          href="/anime/genres"
        >
          <div
            className="h-full w-full border-2 border-foreground rounded-md
          flex items-center justify-center p-2 gap-2 hover:bg-backgroundHover"
          >
            <div>
              <span className="text-[13px] font-[700]">Browse All</span>
            </div>
            <div>
              <ChevronRight size={16} />
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
};

const GenreSectionSkeliton = () => {
  const displayedGenres = GenreMap.slice(0, 12);

  return (
    <div className="w-full flex flex-col p-4 md:p-[54px]">
      <div
        className="grid grid-cols-2  md:grid-cols-6 gap-4
      genre-container overflow-hidden"
      >
        {displayedGenres.map((genre, index) => (
          <Skeleton key={genre.id} className="h-[60px] w-full rounded-md " />
        ))}
      </div>
    </div>
  );
};

export { GenreSection, GenreSectionSkeliton };
