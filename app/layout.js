import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/Sections/Universal/ScrollToTop.jsx";
import NavBar from "@/Sections/NavBar/NavBar.jsx";
import FooterSection from "@/Sections/Universal/FooterSection.jsx";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/context/AuthProvider.js";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"]
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"]
});

export const metadata = {
    metadataBase: new URL("https://animekun.lol"),
    title: "Watch Anime Online For Free On Animekun, Stream Sub & Dub Anime Without ADS - Animekun",
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
        title: "Watch Anime Online For Free On Animekun, Stream Sub & Dub Anime Without ADS - Animekun",
        description:
            "Stream and download animes in english Dub/Sub options. Watch your favourite episodes with high-quality video for an impressive viewing experience.",
        url: "https://animekun.lol",
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
        google: "IddIgo59Nd7ODs33MaPD4lAWqqa1HsfNdGM1QsRdQ_s",
        yandex: "420a11c6038170e2",
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
        "msapplication-TileImage": "/icon-192.png",
        "google-adsense-account": "ca-pub-8933586789581443"
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <head>
                {/* Global site tag (gtag.js) - Google Analytics */}
                <script
                    async
                    src='https://www.googletagmanager.com/gtag/js?id=G-TP82106C2E'
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TP82106C2E');
            `
                    }}
                />
                <script
                    defer
                    src='https://cloud.umami.is/script.js'
                    data-website-id='cc9b2338-3391-46a8-ab5c-b57c0ebcddcf'
                ></script>
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AuthProvider>
                    <NavBar />
                    <ScrollToTop />
                    {children}
                    <FooterSection />
                    <Toaster />
                </AuthProvider>
            </body>
        </html>
    );
}
