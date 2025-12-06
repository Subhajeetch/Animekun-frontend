import axios from "axios";
import { getAnimesByCategory } from "@/DataRoutes/index.js";
import "@/Styles/AnimeCardGrid.css";
import AnimeCard from "@/Sections/Universal/AnimeCard.jsx";
import { ArrowLeft, TriangleAlert } from "lucide-react";
import Link from "next/link";
import ReadAloud from "./ReadAloud.jsx";
import MineConfig from "@/mine.config.js";

const { backendUrl } = MineConfig;

export async function generateMetadata({ params }) {
  const { id = "Unknown-News" } = await params;

  function getFN(input) {
    let cleaned = input.replace(/^\d{4}-\d{2}-\d{2}_/, "").replace(/_\d+$/, "");
    cleaned = cleaned.replace(/-/g, " ");
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }

  return {
    title:
      `About: ${getFN(id)}` ||
      "Recent Anime News - Read all anime news with daily updates",
    description:
      `Read about ${getFN(id)}, on Animekun News.` ||
      "Get all recent anime news for free. Read your favourite anime updates without any issues",
    keywords: [
      `${getFN(id)}`,
      `Read ${getFN(id)}`,
      `anime news ${getFN(id)} online`,
      `${getFN(id)} watch`,
      `${getFN(id)} online`,
      `${getFN(id)} reqd`,
      `${getFN(id)} news`,
      `about ${getFN(id)}`,
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
        `About: ${getFN(id)}` ||
        "Recent Anime News - Read all anime news with daily updates",
      description:
        `Read about ${getFN(id)}, on Animekun News.` ||
        "Get all recent anime news for free. Read your favourite anime updates without any issues",
      url: `https://animekun.top/anime/news/${id}`,
      siteName: "AnimeKun",
      images: [
        {
          url: "https://i.imgur.com/MNnhK3G.jpeg",
          width: 1200,
          height: 430,
          alt: `${getFN(id)} banner`
        }
      ],
      locale: "en_US",
      type: "website"
    },
    alternates: {
      canonical: `/anime/news/${getFN(id)}`
    }
  };
}

const GenrePage = async ({ params }) => {
  const { id } = await params;

  function getRealId(id) {
    return id.replace(/_/g, "/");
  }

  try {
    const fetchedData = await axios.get(
      `${backendUrl}/api/mantox/get/news/info?id=${getRealId(id)}`
    );

    const animeData = await getAnimesByCategory("underrated", 1);
    const { animes } = animeData.data;

    if (!fetchedData.data) {
      return <h1>Error 404</h1>;
    }
    const news = fetchedData.data;

    return (
      <>
        <main className="p-4 md:px-[54px] bg-backgroundtwo relative">
          <Link
            className="bg-background hover:bg-separatorOnBackgroundtwo rounded-md p-2 absolute top-4 left-4"
            href="/anime/news"
          >
            <ArrowLeft />
          </Link>

          {/* News Image */}
          <div className="flex justify-center">
            <img
              src={news.thumbnail}
              alt={news.title}
              className="w-[200px] md:w-[360px] rounded-lg shadow-md"
            />
          </div>

          {/* Title */}
          <h1 className="text-[30px] font-[700] text-center my-6">
            {news.title}
          </h1>

          {/* Intro */}

          <div className="bg-background rounded-xl p-3 relative">
            <div className="absolute top-3 right-3">
              <ReadAloud text={news.description} />
            </div>

            <h2 className="text-[17px] font-[700] mb-6">Full Details</h2>
            {/* Description */}
            <p className="mt-4 mb-2 text-lg font-semibold text-[#45ffab]">
              {news.intro}
            </p>
            <p className="text-animeCardDimmerForeground text-[14px]">
              {news.description}
            </p>
            {/* Meta Info */}
            <p className="text-gray-400 text-sm mt-6 text-right">
              Published on:{" "}
              <span className="font-[800]">{news.uploadedAt}</span>
            </p>
          </div>

          <div
            className=" mt-10 h-[40px] bg-gradient-to-l
        from-transparent to-backgroundHover max-w-fit mb-[10px] p-2 flex
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
      </>
    );
  } catch (e) {
    return (
      <main
        className="min-h-screen bg-backgroundtwo flex justify-center
      items-center pb-[100px]"
      >
        <div className="flex flex-col items-center justify-center">
          <TriangleAlert size={100} />
          <h1 className="text-[60px] font-[800]">Error404</h1>
          <div className="flex flex-col mt-8 gap-2">
            <p className="text-[12px] font-[800]">
              Posible reasons why this happened:
            </p>
            <ul className="ml-2">
              <li className="text-[10px] font-[500]">&#9679; Outdated News</li>
              <li className="text-[10px] font-[500]">&#9679; Invalid Link</li>
            </ul>
          </div>
        </div>
      </main>
    );
  }
};

export default GenrePage;
