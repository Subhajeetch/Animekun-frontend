import axios from "axios";
import NewsCard from "../../../Sections/Universal/NewsCard.jsx";
import "./some.css";

import MineConfig from "@/mine.config.js";

const { backendUrl } = MineConfig;

export async function generateMetadata() {
  return {
    title: "Recent Anime News - Read all anime news with daily updates",
    description:
      "Get all recent anime news for free. Read your favourite anime updates without any issues",
    keywords: [
      `anime news`,
      `read anime news`,
      `read and watch anime updates and news`,
      `anime news frre`,
      `recent anime news`,
      `read anime`,
      `anime & manga news for free`,
      `anime news with daily updates`,
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
      title: "Recent Anime News - Read all anime news with daily updates",
      description: "Recent Anime News - Read all anime news with daily updates",
      url: `https://animekun.lol/anime/news`,
      siteName: "AnimeKun",
      images: [
        {
          url: "https://i.imgur.com/MNnhK3G.jpeg",
          width: 1200,
          height: 430,
          alt: `news banner`
        }
      ],
      locale: "en_US",
      type: "website"
    },
    alternates: {
      canonical: `/anime/news`
    }
  };
}

const newsFeed = async () => {

  try {
    const fetchedData = await axios.get(`${backendUrl}/api/mantox/get/news?topic=anime`);

    if (!fetchedData.data) {
      return <h1>Error 404</h1>;
    }
    const mainData = fetchedData.data;

    return (
      <main className="bg-backgroundtwo">
        <div className="max-w-[1800px] mx-auto p-4">
          <h1 className="text-[40px] md:text-[48px]  font-[700]">
            Anime News Feed
          </h1>
          <p className="py-4 text-[13px] mb-8 max-w-[700px]">
            Stay updated with the latest news in the anime community! From
            breaking announcements on new anime releases and episode air dates
            to in-depth reviews and discussions of popular series. Get to know
            about interviews with anime creators, sneak peeks of upcoming
            episodes, and detailed analyses of your favorite characters and
            storylines. Perfect for anime weeb looking to stay informed and
            entertained!
          </p>

          <div
            className="h-[40px] bg-gradient-to-l
        from-transparent to-backgroundHover w-[200px] mb-[10px] p-2 flex
        items-center font-[700] text-[18px] rounded-l-md gap-2"
          >
            <div className="h-[28px] w-[8px] rounded-full bg-main"></div>

            <h2>News Feed</h2>
          </div>
          <div className="mt-2 min-h-screen">
            <div className="masonry-container2">

              {mainData.map(news => (
                <NewsCard
                  key={news.id}
                  news={news}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  } catch (e) {
    return <h1>Error</h1>;
  }
};

export default newsFeed;
