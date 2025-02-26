import Form from "./Form.jsx";
export async function generateMetadata() {
  return {
    title: "Report Bug - AnimeKun",
    description:
      "Animekun bug reports page, contact us about any bugs you find in the site, we'll fix it as soon as possible",
    keywords: [
      `bug report animekun`,
      `how to send bug report to animekun`,
      `animekun contact`,
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
      title: "Report Bug - AnimeKun",
      description:
        "Animekun bug reports page, contact us about any bugs you find in the site, we'll fix it as soon as possible.",
      url: `https://animekun.lol/imp/bug-reports`,
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
      canonical: `/imp/bug-reports`
    }
  };
}

export default function BugReportPage() {
  return (
    <main className="min-h-screen bg-backgroundtwo p-4 md:px-[54px]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">🐞 Report a Bug</h1>

        <p className="text-center">
          If anything is not working properly for you, any buttons or if
          something seems missing or any error, be sure to report to us. We'll
          try super hard to fix it as soon as possible.
        </p>
      </div>

      <Form />
    </main>
  );
}
