import Form from "./Form.jsx";

export async function generateMetadata() {
  return {
    title: "Contact Us - AnimeKun",
    description:
      "Animekun contact page, contact us about any queries you have.",
    keywords: [
      `contact animekun`,
      `how to contact animekun`,
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
      title:
        "Contact Us - AnimeKun",
      description:
        "Animekun contact page, contact us about any queries you have.",
      url: `https://animekun.lol/imp/contact-us`,
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
      canonical: `/imp/contact-us`
    }
  };
}

export default function BugReportPage() {
  return (
    <main className="min-h-screen bg-backgroundtwo">
      <div className="max-w-[1800px] mx-auto p-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-center">Contact Us</h1>

          <p className="text-center">
            You can contact us about any queries. If you want to add new content,
            any request regarding new features, any partnership queries or
            business related queries, be sure to let us know.
          </p>
        </div>
        <Form />
      </div>
    </main>
  );
}
