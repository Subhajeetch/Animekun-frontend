
export async function generateMetadata() {
  return {
    title: "My Watchlist - AnimeKun",
    description:
      "Your desired watch lists on animekun. Save your favourite animes on specific lists and sort them out to watch later",
    keywords: [
      `animekun watchlist`,
      `animekun watchlist save`,
      `my watchlist animekun.top`,
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
      title: "My Watchlist - AnimeKun",
      description:
        "Your desired watch lists on animekun. Save your favourite animes on specific lists and sort them out to watch later",
      url: `https://animekun.lol/watchlist`,
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
      canonical: `/watchlist`
    }
  };
}

export default function Layout({ children }) {
  return <>{children}</>;
}