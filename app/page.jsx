import Image from "next/image";
import Link from "next/link";
import "./landingPage.css";
import { Play } from "@/Sections/Universal/icons.jsx";
import ShareComponent from "@/Sections/LandingPage/ShareComponent.jsx";
import axios from "axios";
import NewsCard from "@/Sections/Universal/NewsCard.jsx";
import { ChevronRight } from "lucide-react";

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
  alternates: {
    canonical: "/"
  }
};

const LandingPage = async () => {
  try {
    const fetchedData = await axios.get(
      "https://animekun.top/api/mantox/get/news/feed"
    );

    if (!fetchedData.data.manto) {
      return <h1>Error 404</h1>;
    }
    const mainData = fetchedData.data.data;

    return (
      <main className="bg-black bg-[radial-gradient(#bfbfbf36_1px,transparent_1px)] [background-size:16px_16px] p-4 md:px-[54px]">
        {/* Hero Section */}
        <div
          className="flex flex-col gap-16 lg:gap-20 md:flex-row justify-center
       mt-10 md:mb-8 justify-between rounded-2xl p-4 md:px-10 md:py-6
       "
        >
          <div className="md:my-10">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Watch your favourite anime online on Animekun streaming site
            </h1>
            <p className="my-4 mb-10 text-[13px] md:text-[16px] lg:text-[18px] max-w-2xl">
              Animekun is one of the best free anime streaming sites to watch
              anime online. We serve the fastest videos, giving you a smoother
              and more user-friendly experience. So... What are you waiting for?
            </p>
            <Link
              className="px-4 py-3 bg-main hover:bg-red-700 rounded-lg
        text-white text-[17px] font-bold transition flex gap-4 items-center
        justify-center
        max-w-[170px] homepage-btn"
              href="/home"
            >
              <span>Homepage</span>
              <Play size={18} />
            </Link>

            <ShareComponent />
          </div>
          <div className="hidden md:block">
            <img
              src="/extra/animekun-landingpage-banner.png"
              alt="Animekun Streaming Site Banner"
              className="max-h-[800px] glowing-image"
            ></img>
          </div>
        </div>

        <div className="mobile-banner bg-black w-max md:hidden">
          <img
            src="/extra/Anime_kun_cover.jpg"
            alt="Animekun Streaming Site Banner"
            className="anime-kun-mobile-bannner"
          ></img>
        </div>

        <section className="md:mt-16 bg-black">
          <div>
            <h2 className="font-[800] text-[20px] mt-[40px] mb-[6px]">
              1// What is Animekun?
            </h2>
            <p className="text-[14px] ml-4 max-w-3xl ">
              <strong>Animekun</strong> is a fast and super user friendly anime
              streaming platform online that has absolutely no ads or any kind
              of redirection to other malicious websites. We provide animes in
              subbed & dubbed with daily updates so you can watch whenever the
              episode releases without any login credentials.
            </p>
          </div>

          <div>
            <h2 className="font-[800] text-[20px] mt-[40px] mb-[6px]">
              2// Do I need to sign up to watch anime?
            </h2>
            <p className="text-[14px] ml-4 max-w-3xl ">
              No, you don't need to create any account in order to watch anime.
              You can just come on our streaming site and watch with ease
              without having to worry about anything else.
            </p>
          </div>

          <div>
            <h2 className="font-[800] text-[20px] mt-[40px] mb-[6px]">
              3// Why do we claim 'Animekun is the best site to watch anime
              online for free!'?
            </h2>
            <p className="text-[14px] ml-4 max-w-3xl ">
              So there are like thousands of anime streaming sites, but mostly
              all of them, to be precise 98% of them have ads. Some of them are
              too dangerous... They redirect you to some sites that can steal
              your data. So we decided to make a ultra user friendly site
              without a single ad. But having no ads doesn't make a site best
              isn't? So, how about these features:
            </p>
            <ul
              className="ml-10 mt-4 flex flex-col gap-2 text-[14px] list-disc
            "
            >
              <li>
                <strong>Video Experience: </strong> Our video player is made by
                us, we don't rely on third party Iframes. With that we can
                easily customize our video player how ever we want & we took
                feedback from lots of people, after that we created it. It
                turned out to be awesome.
                <br></br>
                <br></br>
                We have features that let you adjust your quality settings as
                you please. With our high-quality videos, you can stream your
                favorite anime even in 1080p. It doesn't matter how slow or fast
                your internet is, we try to make sure you don't find any
                buffering or interruption while streaming.
              </li>

              <li>
                <strong>Anime Library: </strong> We have a vast collection of
                anime, spanning{" "}
                <Link className="hover:underline" href="/anime/genres">
                  50+ genres
                </Link>{" "}
                and 20+ different categories, with around 10,000+ popular
                titles, including trending and upcoming ones added daily (mostly
                based on Hianime).
              </li>
              <li>
                <strong>Daily News Update: </strong>
                Yes, we also cover{" "}
                <Link className="hover:underline" href="/anime/news">
                  anime news
                </Link>
                . Many users enjoy reading about anime updates and love to stay
                informed about their favorite series. Whether it's news about a
                manga getting an anime adaptation, a cancellation, or a delay,
                we make sure to cover it all (source: Animenewsnetwork.com).
              </li>
              <li>
                {" "}
                <strong>User Interface: </strong>
                We spent a crazy amount of time searching for the best UI. After
                all that effort, we created the one you see on{" "}
                <Link className="hover:underline" href="/home">
                  our site
                </Link>
                . It's so interactive and easy to use that people just love it.
                For the video experience, we tried to mimic the top video
                players available and created according to it so users don't
                have to feel new to the site. And we will keep improving our
                site for even better experience.
                <br></br>
                <br></br>
                We make sure that our site and its UI/UX work well on mobile,
                tablet, and desktop. We have tested it on low-end devices, and
                it performed very well. If you're using a desktop, the
                experience will be even smoother.
              </li>
              <li>
                {" "}
                <strong>SUB & DUB Feature: </strong>
                We stream anime episodes in both subbed and dubbed versions.
                Users love watching anime in various languages. The original
                language of anime is Japanese, but with our dubbing feature, you
                can watch episodes in your preferred language (e.g., English).
              </li>
              <li>
                <strong>Subtitles Feature: </strong>
                While streaming subbed anime, we provide subtitles in many
                languages. Whether you prefer English or another language, we've
                got you covered—especially for new anime, where we offer
                subtitles in multiple languages.
                <br></br>
                <br></br>
                Our subtitle interface is also user-friendly. You can customize
                the appearance of subtitles however you want, making it a plus
                point to the user experience.
              </li>
              <li>
                {" "}
                <strong>Community: </strong>
                We are building an awesome anime community where anime fans can
                come together and share their perspectives on their favorite
                anime. It's also a great way to find your fellow anime friends.
              </li>
              <li>
                {" "}
                <strong>Watchlist Feature: </strong>
                We have created several{" "}
                <Link className="hover:underline" href="/watchlist">
                  lists
                </Link>{" "}
                for you (e.g., Plan to Watch, Currently Watching, On Hold,
                Finished, Dropped, Favorites). You can add anime to these lists
                as you like and watch them whenever the time comes.
              </li>
              <li>
                {" "}
                <strong>History & Continue Watching Feature: </strong>
                We save records of what you watch and exactly when you watch it.
                This allows you to revisit your{" "}
                <Link className="hover:underline" href="/watchlist">
                  watch history
                </Link>
                , see which anime you watched, and view the exact time you
                watched each episode—making a great overall experience.
                <br></br>
                <br></br>
                We also have a 'Continue Watching' feature, which appears on the
                homepage. Whatever you watch will be displayed there with a
                sleek and user-friendly interface, so you can easily pick up
                right where you left off.
              </li>
              <li>
                {" "}
                <strong>Bug Reports Handling: </strong>
                Wherever user finds any bugs on our site, they can submit their
                bug{" "}
                <Link className="hover:underline" href="/imp/bug-reports">
                  here
                </Link>
                , we are actively looking forward to hear from you 24/7.
              </li>
              <li>
                <strong>Data & Safety: </strong>
                We never collect your personal data, nor do we share anything
                anywhere. Our main objective is to provide you with the best
                site to watch anime without any interruptions. That’s why we
                don’t put any ads on our site—to prevent you from being
                redirected to malicious websites.
              </li>
              <li>
                <strong>Customer support: </strong>
                If you have any queries, business inquiries, partnership
                requests, or even just want to have a small chat or request new
                content, feel free to{" "}
                <Link className="hover:underline" href="/imp/contact-us">
                  contact us
                </Link>
                . Our staff is on duty 24/7 to ensure nothing gets missed.
              </li>
            </ul>
            <p className="text-[14px] ml-4 max-w-3xl mt-4">
              So, yes, that’s why we claim our site is one of the best. If
              you're looking for a place to watch anime online for free—without
              worrying about bugs, data leaks, ads, or a poor user interface—you
              might want to give '
              <Link className="hover:underline" href="/home">
                Animekun
              </Link>
              ' a try.
              <br></br>
              <br></br>
              We are always working to improve the site and bring you the best
              experience possible. Your support means a lot to us, so if you
              appreciate our hard work, don’t forget to share the site with your
              cool friends!
            </p>
          </div>
        </section>

        <div className="flex flex-col mt-16">
          <div className="flex justify-between items-center">
            <div
              className="h-[40px] bg-gradient-to-l
        from-transparent to-backgroundHover w-[200px] mb-[10px] p-2 flex
        items-center font-[700] text-[18px] rounded-l-md gap-2"
            >
              <div className="h-[28px] w-[8px] rounded-full bg-main"></div>

              <h2>Recent news</h2>
            </div>
            <div>
              <Link
                href="/anime/news"
                className=" mb-[10px] flex items-center text-[13px]
          hover:underline"
              >
                <span>View more</span>
                <ChevronRight size={17} />
              </Link>
            </div>
          </div>
          <div className="masonry-container">
            {mainData.slice(0, 24).map(n => (
              <NewsCard news={n} />
            ))}
          </div>
        </div>
      </main>
    );
  } catch (e) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1>Error 404</h1>
      </div>
    );
  }
};

export default LandingPage;
