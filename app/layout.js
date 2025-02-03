import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/Sections/Universal/ScrollToTop.jsx";
import NavBar from "@/Sections/NavBar/NavBar.jsx";
import FooterSection from "@/Sections/Universal/FooterSection.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata = {
  metadataBase: new URL("https://animekun.top"),
  title:
    "Watch Anime Online For Free On Animekun, Stream Sub & Dub Anime Without ADS - Animekun",
  description:
    "Stream and download animes in english Dub/Sub options. Watch your favourite episodes with high-quality video for an impressive viewing experience.",
  keywords: [
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
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true
    }
  },
  icons: {
    icon: "/logo-192.png",
    shortcut: "/shortcut.png",
    apple: [
      { url: "/shortcut.png" },
      { url: "/logo-192.png", sizes: "192x192", type: "image/png" }
    ],
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/shortcut.png"
    }
  },
  authors: [{ name: "Animekun" }],
  manifest: "/manifest.json",
  openGraph: {
    title:
      "Watch Anime Online For Free On Animekun, Stream Sub & Dub Anime Without ADS - Animekun",
    description:
      "Stream and download animes in english Dub/Sub options. Watch your favourite episodes with high-quality video for an impressive viewing experience.",
    url: "https://animekun.top",
    siteName: "AnimeKun",
    images: [
      {
        url: "https://i.imgur.com/MNnhK3G.jpeg",
        width: 1200,
        height: 430,
        alt: "Animekun Website Banner"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo"
  },
  alternates: {
    canonical: "/"
  },

  other: {
    "theme-color": "#292929",
    "msapplication-TileColor": "#292929",
    "apple-mobile-web-app-title": "Animekun",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black",
    "msapplication-TileImage": "/icon-192.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        <ScrollToTop />
        {children}
        <FooterSection />
      </body>
    </html>
  );
}
