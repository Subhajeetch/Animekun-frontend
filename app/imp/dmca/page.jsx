import Link from "next/link";

export const metadata = {
  title: "DMCA - Animekun",
  description:
    "Read our DMCA policy so you can use animekun site with it's full potential.",
  keywords: [
    "DMCA policy",
    "DMCA policy read",
    "DMCA policy of animekun",
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
    title: "DMCA policy - Animekun",
    description:
      "Read our DMCA policy so you can use animekun site with it's full potential.",
    url: "https://animekun.top/imp/dmca",
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
  alternates: {
    canonical: "/imp/dmca"
  }
};

const Terms = () => {
  return (
    <main className="p-4 md:px-[54px] bg-backgroundtwo">
      <h1 className="font-[700] mb-2">DMCA Takedown Request</h1>
      <p className="ml-2 text-discriptionForeground text-[14px]">
        Animekun respects copyright laws and complies with the Digital
        Millennium Copyright Act (DMCA) & we take it very seriously. If you own
        a copyright or have authority to act on behalf of a copyright owner and
        want to report a claim that a third party is infringing that material on
        or through GitLab's services, please submit a DMCA report on our Contact
        page, and we will take appropriate action.
      </p>
      <div className="mt-16">
        <h2 className="text-[18px] font-[700]"> -/ DMCA Takedown Request</h2>

        <ul
          className="ml-6 mt-2 text-discriptionForeground text-[14px] flex
        flex-col gap-2 list-disc"
        >
          <li>
            Your full name, company (if applicable), and contact information.
          </li>
          <li>
            A detailed description of the copyrighted work being infringed,
            including proof of ownership (e.g., registration details, published
            work links).
          </li>
          <li>The specific URL or location of the infringing content.</li>
          <li>
            A statement under penalty of perjury affirming that you have a good
            faith belief that the use of the content is unauthorized.
          </li>
          <li>
            A statement that the information in your complaint is accurate.
          </li>
          <li>Your electronic or physical signature.</li>
        </ul>
      </div>

      <div className="mt-16 text-[14px]">
        <p>Your DMCA take down request should be submit here: </p>
        <Link
          className="text-discriptionForeground
        hover:text-foreground hover:underline"
          href="/imp/contact-us"
        >
          https://animekun.top/imp/contact-us
        </Link>

        <p className="text-[14px] mt-2 text-discriptionForeground">
          We will then review your DMCA request and take proper actions,
          including removal of the content from the website.
        </p>
      </div>
    </main>
  );
};

export default Terms;
