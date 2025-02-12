import Link from "next/link";
import GenreMap from "@/Utils/genreMap.js";
import "./some.css";
import { Play } from "@/Sections/Universal/icons.jsx";
import { getAnimesByCategory } from "@/DataRoutes/index.js";
import AnimeCard from "@/Sections/Universal/AnimeCard.jsx";
import "@/Styles/AnimeCardGrid.css";

export async function generateMetadata() {
  return {
    title:
      "Watch Anime Online By Specific Genre In English Dub & Sub In HD Quality - AnimeKun",
    description:
      "Watch and download Animes online by specific genre in English Dub/Sub options. Stream your favorite episodes with HD-quality video for a good experience.",
    keywords: [
      `watch animes by genre`,
      `all genres of anime`,
      `anime genres`,
      `anime genres to watch`,
      `watch anime online by specific genre`,
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
        "Watch Anime Online By Specific Genre In English Dub & Sub In HD Quality - AnimeKun",
      description:
        "Watch and download Animes online by specific genre in English Dub/Sub options. Stream your favorite episodes with HD-quality video for a good experience.",
      url: `https://animekun.top/anime/genres`,
      siteName: "AnimeKun",
      images: [
        {
          url: "https://i.imgur.com/MNnhK3G.jpeg",
          width: 1200,
          height: 430,
          alt: `Animekun banner`
        }
      ],
      locale: "en_US",
      type: "website"
    },
    alternates: {
      canonical: `/anime/genres`
    }
  };
}

const Genre = async () => {
  const animeData = await getAnimesByCategory("underrated", 1);
  const { animes } = animeData.data;

  return (
    <main className="px-4 md:px-[54px] bg-backgroundtwo py-8">
      <div className="sr-only">
        <h1>Watch your favourite animes by specific genres</h1>
        <p>
          If you love watching anime, you’re in the right place! We have a huge
          collection of anime from all genres: action, romance, fantasy,
          mystery, and more. Whether you’re looking for popular hits or hidden
          gems, you’ll find something to enjoy. Start watching now and explore a
          world of amazing stories!
        </p>
      </div>

      {/* First 2 Genres */}
      <div className="flex flex-col md:flex-row gap-8">
        {GenreMap.slice(0, 2).map(g => (
          <Link
            key={g.id}
            className="rounded-xl relative overflow-hidden w-full"
            href={`/genre/${g.idTwo}`}
          >
            <img
              src={g.gif}
              className="w-full h-full object-cover"
              alt={g.display}
            />
            <div
              className="absolute bottom-4 left-4 right-4 flex
            justify-between"
            >
              <h3 className="font-[900] text-[42px] text-smm">{g.display}</h3>
              <div
                className="bg-main hover:bg-[#d70000] rounded-xl flex justify-center
              items-center p-[16px]"
              >
                <Play size={30} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div
        className="h-[40px] mt-16 bg-gradient-to-l
        from-transparent to-backgroundHover w-[200px] mb-4 p-2 flex
        items-center font-[700] text-[18px] rounded-l-md gap-2"
      >
        <div className="h-[28px] w-[8px] rounded-full bg-main"></div>

        <h2>Popular Genres</h2>
      </div>

      {/* Remaining Genres */}
      <div className="grid gap-4 genre-css">
        {GenreMap.slice(2).map(genre => (
          <Link
            className="relative h-[80px] bg-[#f94b00] overflow-hidden flex items-center justify-center rounded-md"
            style={{
              backgroundColor: genre.backgroundColor,
              color: genre.foreground
            }}
            href={`/genre/${genre.idTwo}`}
            key={genre.idTwo}
          >
            <h3 className="text-[16px] font-[800] absolute top-1 left-2">
              {genre.display}
            </h3>

            <div className="absolute right-[-6px] bottom-[-10px] h-[56px] w-[56px] bg-[#2b553e] transform rotate-[30deg] rounded-md add-shadow">
              <img
                src={genre.url}
                alt={genre.display}
                className="h-full w-full rounded-md object-cover shadow-md"
              />
            </div>
          </Link>
        ))}
      </div>

      <div
        className=" mt-16 h-[40px] bg-gradient-to-l
        from-transparent to-backgroundHover w-[200px] mb-[10px] p-2 flex
        items-center font-[700] text-[18px] rounded-l-md gap-2"
      >
        <div className="h-[28px] w-[8px] rounded-full bg-main"></div>

        <h2>Underrated Animes</h2>
      </div>

      <div className="mt-6">
        <div className="grid animeCardGrid gap-4">
          {animes.map(anime => (
            <AnimeCard anime={anime} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Genre;
