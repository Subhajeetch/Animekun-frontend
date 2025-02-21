export async function generateMetadata() {
  return {
    title: "History - AnimeKun",
    description:
      "Your watch history on animekun. View your history data to the fullest capacity with all data of exactly when you watched",
    keywords: [
      `animekun history`,
      `animekun history read`,
      `history animekun.top`,
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
      title: "History - AnimeKun",
      description:
        "Your watch history on animekun. View your history data to the fullest capacity with all data of exactly when you watched",
      url: `https://animekun.top/history`,
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
      canonical: `/history`
    }
  };
}

export default function Layout({ children }) {
  return <>{children}</>;
}
