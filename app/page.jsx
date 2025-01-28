import Link from "next/link";

export const metadata = {
  title:
    "Watch Anime Online For Free On Animekun, Stream Sub & Dub Anime Without ADS - Animekun",
  description:
    "Stream and download animes online in english Dub/Sub. Watch your favourite episodes with high-quality video for an impressive viewing experience.",
  keywords: [
    "anime to watch",
    "best site to watch anime",
    "online watch anime",
    "hd anime",
    "anime site ads free",
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
      "Watch Anime Online For Free On Animekun, Stream Sub & Dub Anime Without ADS - Animekun",
    description:
      "Stream and download animes online in english Dub/Sub. Watch your favourite episodes with high-quality video for an impressive viewing experience.",
    url: "https://animekun.lol",
    siteName: "AnimeKun",
    images: [
      {
        url: "https://i.imgur.com/dgkXTMO.png",
        width: 1200,
        height: 430,
        alt: "Animekun Website Banner"
      },
      {
        url: "https://i.imgur.com/kBhogcl.jpeg",
        width: 1200,
        height: 430,
        alt: "Animekun Website Banner"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  alternates: {
    canonical: "/"
  }
};

export default function Home() {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Link
          className="text-xl font-[800] px-4 py-2 rounded-md bg-main"
          href="/home"
        >
          Homepage
        </Link>
      </div>
    </>
  );
}
