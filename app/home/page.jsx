import Link from "next/link";
import { getCustomHomePage } from "../../DataRoutes/index.js";
import { getSearchSuggetion } from "@/DataRoutes/index.js";
import { ChevronRight } from "lucide-react";
import "./some.css";

import { HomepageSlides } from "../../Sections/HomePage/HomepageSlides.jsx";
import { GenreSection } from "../../Sections/HomePage/GenreSection.jsx";
import { TrendingAnime } from "../../Sections/HomePage/TrendingAnime.jsx";
import HomePageCetagoryTemplate from "../../Sections/HomePage/HomePageCetagoryTemplate.jsx";
import AnimeCard from "../../Sections/Universal/AnimeCard.jsx";
import NewsCard from "../../Sections/Universal/NewsCard.jsx";
import ScheduleComponent from "./Schedule.jsx";
import Top10AnimeList from "./Top10.jsx";
import ContinueWatching from "./continueWatching.jsx";

export const metadata = {
  title:
    "Animekun HomePage - Watch Anime Online For Absolutely Free Without ADS",
  description:
    "Watch and download animes online in english Dub/Sub. Stream your favourite episodes with high-quality & ad free for best experience.",
  keywords: [
    "Animekun Homepage",
    "anime watch online free",
    "best anime site",
    "anime site free",
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
      "Animekun HomePage - Watch Anime Online For Absolutely Free Without ADS",
    description:
      "Watch and download animes online in english Dub/Sub. Stream your favourite episodes with high-quality & ad free for best experience.",
    url: "https://animekun.top/home",
    siteName: "AnimeKun",
    images: [
      {
        url: "https://i.imgur.com/MNnhK3G.jpeg",
        width: 1200,
        height: 430,
        alt: `AnimeKun website banner`
      }
    ],
    locale: "en_US",
    type: "website"
  },
  alternates: {
    canonical: "/home"
  }
};

export default async function Home() {
  const HomepageData = await getCustomHomePage();
  const data = HomepageData.data;

  if (!HomepageData.manto) {
    return <h1>Error 404</h1>;
  }

  return (
    <>
      <main className="min-h-screen bg-backgroundtwo w-full">
        <div className="relative overflow-hidden">
          <h1 className="">
            <span className="absolute top-0 left-0 h-[1px] w-[1px] overflow-hidden">
              Watch Animes Online For Free, Stream in SUB/DUB without ads & Get
              Anime News with daily updates
            </span>
          </h1>
        </div>
        {data && <HomepageSlides data={data.spotlightAnimes} />}

        <div className="h-[30px] w-full"></div>

        {data && <GenreSection />}

        <div className="h-[30px] w-full"></div>
        <ContinueWatching />

        <div
          className="relative h-[40px] bg-gradient-to-l
        from-transparent to-backgroundHover w-[200px] mx-4 md:mx-[54px] mb-[10px] p-2 flex
        items-center font-[700] text-[18px] rounded-l-md gap-2"
        >
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
            className="h-[24px] w-[24px]"
            style={{ fill: "var(--foreground)" }}
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              stroke="none"
            >
              <path
                d="M3056 3945 c-36 -19 -53 -40 -65 -82 -20 -69 -7 -85 254 -324 135
-123 243 -229 241 -236 -3 -6 -170 -203 -373 -437 l-368 -426 -400 399 c-373
372 -404 400 -458 420 -110 40 -233 22 -319 -46 -34 -27 -235 -291 -700 -923
-358 -487 -658 -897 -666 -913 -20 -41 -6 -83 46 -140 87 -92 140 -98 221 -23
25 24 327 289 670 591 l623 547 23 -23 c12 -13 174 -197 360 -409 185 -212
356 -402 379 -423 57 -52 134 -79 223 -80 123 -1 127 3 828 603 l630 540 277
-277 278 -278 56 0 c51 0 58 3 86 34 l31 35 -5 846 -5 847 -25 55 c-28 60 -74
102 -135 124 -31 10 -199 13 -858 13 -714 1 -824 -1 -849 -14z"
              />
            </g>
          </svg>

          <h2>Trending Animes</h2>
        </div>

        {data && <TrendingAnime data={data.trendingAnimes} />}

        <div className="h-[30px] w-full"></div>
        <div className="w-full grid md:grid-cols-2 md:gap-x-14 px-4 md:px-[54px]">
          <div className="mb-[40px] w-full">
            <div className="flex justify-between">
              <div
                className="relative h-[40px] bg-gradient-to-l
        from-transparent to-backgroundHover w-[200px] mb-[10px] p-2 flex
        items-center font-[700] text-[18px] rounded-l-md gap-2"
              >
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 611.999 611.999"
                  className="h-[24px] w-[24px]"
                  style={{ fill: "var(--foreground)" }}
                >
                  <g>
                    <path
                      d="M216.02,611.195c5.978,3.178,12.284-3.704,8.624-9.4c-19.866-30.919-38.678-82.947-8.706-149.952
		c49.982-111.737,80.396-169.609,80.396-169.609s16.177,67.536,60.029,127.585c42.205,57.793,65.306,130.478,28.064,191.029
		c-3.495,5.683,2.668,12.388,8.607,9.349c46.1-23.582,97.806-70.885,103.64-165.017c2.151-28.764-1.075-69.034-17.206-119.851
		c-20.741-64.406-46.239-94.459-60.992-107.365c-4.413-3.861-11.276-0.439-10.914,5.413c4.299,69.494-21.845,87.129-36.726,47.386
		c-5.943-15.874-9.409-43.33-9.409-76.766c0-55.665-16.15-112.967-51.755-159.531c-9.259-12.109-20.093-23.424-32.523-33.073
		c-4.5-3.494-11.023,0.018-10.611,5.7c2.734,37.736,0.257,145.885-94.624,275.089c-86.029,119.851-52.693,211.896-40.864,236.826
		C153.666,566.767,185.212,594.814,216.02,611.195z"
                    />
                  </g>
                </svg>

                <h2>Top Airing</h2>
              </div>
              <Link
                className=" mb-[10px] flex items-center text-[13px]
          hover:underline"
                href="/category/top-airing"
              >
                <span>View more</span>
                <ChevronRight size={17} />
              </Link>
            </div>
            {data && <HomePageCetagoryTemplate data={data.topAiring} />}
          </div>

          <div className="mb-[40px] w-full">
            <div className="flex justify-between">
              <div
                className="relative h-[40px] bg-gradient-to-l
        from-transparent to-backgroundHover w-[200px] mb-[10px] p-2 flex
        items-center font-[700] text-[18px] rounded-l-md gap-2"
              >
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200.000000 200.000000"
                  preserveAspectRatio="xMidYMid meet"
                  className="h-[24px] w-[24px]"
                  style={{ fill: "var(--foreground)" }}
                >
                  <g
                    transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
                    stroke="none"
                  >
                    <path
                      d="M984 1937 c-26 -84 -56 -114 -139 -141 l-70 -23 65 -21 c83 -28 114
-60 141 -141 l22 -66 21 60 c12 33 27 70 34 82 12 21 79 63 101 63 5 0 22 5
38 11 28 11 27 11 -36 34 -81 30 -106 55 -135 136 l-24 63 -18 -57z"
                    />
                    <path
                      d="M475 1549 c-55 -167 -78 -191 -231 -243 -57 -19 -93 -36 -84 -40 8
-3 53 -17 100 -32 71 -22 93 -34 131 -73 39 -39 51 -62 78 -143 18 -54 34 -98
36 -98 1 0 15 39 30 88 46 149 82 184 244 237 l85 28 -108 37 c-144 50 -166
72 -216 216 l-37 108 -28 -85z"
                    />
                    <path
                      d="M1132 1198 c-60 -184 -93 -250 -159 -315 -62 -59 -119 -87 -308 -149
-88 -28 -153 -54 -145 -57 8 -3 80 -27 160 -53 168 -54 218 -78 279 -130 70
-61 108 -132 167 -312 30 -91 56 -167 58 -170 3 -2 26 63 52 144 58 186 92
253 158 320 66 65 113 89 296 148 80 26 152 50 160 53 8 3 -57 28 -145 57
-183 59 -246 91 -310 154 -66 65 -89 111 -153 302 l-58 172 -52 -164z"
                    />
                  </g>
                </svg>

                <h2>Fan Favourite</h2>
              </div>
              <Link
                className="mb-[10px] flex items-center text-[13px]
          hover:underline"
                href="/category/most-favorite"
              >
                <span>View more</span>
                <ChevronRight size={17} />
              </Link>
            </div>
            {data && <HomePageCetagoryTemplate data={data.mostFavorite} />}
          </div>

          <div className="mb-[40px] w-full">
            <div className="flex justify-between">
              <div
                className="relative h-[40px] bg-gradient-to-l
        from-transparent to-backgroundHover w-[200px] mb-[10px] p-2 flex
        items-center font-[700] text-[18px] rounded-l-md gap-2"
              >
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 500.000000 500.000000"
                  preserveAspectRatio="xMidYMid meet"
                  className="h-[24px] w-[24px]"
                  style={{ fill: "var(--foreground)" }}
                >
                  <g
                    transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
                    stroke="none"
                  >
                    <path
                      d="M2170 4765 c-675 -93 -1192 -421 -1581 -1005 -220 -329 -369 -753
-369 -1052 l0 -78 510 0 510 0 5 -22 c3 -13 5 -70 3 -128 l-3 -105 -512 -3
-513 -2 0 -79 c0 -260 124 -649 300 -941 382 -635 906 -997 1601 -1107 164
-26 607 -26 764 0 515 86 913 293 1250 650 184 194 360 453 461 677 105 235
184 544 184 721 l0 79 -505 0 -505 0 0 130 0 130 505 0 505 0 0 79 c0 116 -43
334 -100 505 -63 188 -155 375 -265 540 -396 593 -913 922 -1588 1011 -145 19
-520 19 -657 0z m625 -209 c375 -55 680 -173 940 -363 109 -79 324 -296 416
-419 141 -188 248 -380 319 -573 37 -101 90 -302 90 -342 l0 -29 -882 2 -883
3 -3 674 -2 673 57 -7 c74 -9 265 -67 365 -110 219 -94 449 -273 618 -480 100
-123 230 -331 230 -370 0 -13 -51 -15 -457 -13 l-458 3 -3 203 c-1 111 1 202
6 202 27 0 150 -95 235 -181 l98 -100 115 3 115 3 -40 63 c-54 83 -197 231
-291 301 -135 100 -285 161 -397 161 l-53 0 0 -430 0 -430 715 0 c419 0 715 4
715 9 0 24 -77 225 -116 303 -119 236 -309 486 -488 640 -319 274 -656 414
-1093 453 l-73 6 0 -205 0 -205 -32 -6 c-18 -4 -58 -5 -88 -3 l-55 3 -3 208
c-2 189 -4 207 -20 207 -9 0 -73 -7 -142 -15 -514 -60 -938 -302 -1267 -725
-78 -100 -170 -245 -223 -351 -43 -84 -120 -285 -120 -310 0 -5 289 -8 713 -7
l712 3 0 430 0 430 -45 -3 c-112 -7 -235 -52 -355 -130 -89 -58 -280 -248
-335 -332 l-41 -65 115 -3 115 -3 98 100 c85 86 208 181 235 181 5 0 7 -91 6
-202 l-3 -203 -457 -3 c-407 -2 -458 0 -458 13 0 40 137 263 233 378 213 256
468 433 761 526 101 32 221 61 257 61 19 0 19 -13 17 -672 l-3 -673 -882 -3
-883 -2 0 27 c0 16 9 66 20 113 119 502 462 996 889 1282 274 183 540 272 961
322 68 8 387 -4 485 -18z m-205 -1346 l0 -580 483 -2 482 -3 0 -125 0 -125
-482 -3 -483 -2 0 -565 0 -565 -90 0 -90 0 0 565 0 565 -477 2 -478 3 0 125 0
125 478 3 477 2 0 580 0 580 90 0 90 0 0 -580z m-382 -1717 l2 -673 -24 0
c-75 0 -315 75 -452 140 -294 141 -564 401 -743 715 -28 49 -51 97 -51 107 0
17 24 18 460 18 l460 0 0 -205 c0 -113 -4 -205 -8 -205 -27 0 -150 95 -235
181 l-98 100 -115 -3 -116 -3 51 -76 c106 -159 311 -333 469 -399 77 -33 172
-53 222 -48 l35 3 3 428 2 427 -716 0 -716 0 7 -32 c11 -51 68 -195 114 -286
227 -451 622 -820 1041 -971 166 -59 383 -104 545 -113 l60 -3 3 218 2 217 90
0 90 0 0 -214 c0 -121 4 -217 9 -221 24 -14 304 29 456 70 483 132 918 501
1174 995 50 98 131 301 131 331 0 5 -289 8 -712 7 l-713 -3 -3 -427 -2 -428
54 0 c107 0 270 67 397 163 95 71 237 218 290 299 l40 63 -115 3 -115 3 -98
-100 c-85 -86 -208 -181 -235 -181 -4 0 -8 92 -8 205 l0 205 460 0 c526 0 484
10 423 -99 -192 -344 -469 -611 -786 -755 -122 -56 -360 -126 -428 -126 -19 0
-19 13 -17 673 l3 672 883 3 882 2 0 -27 c0 -45 -65 -280 -105 -383 -164 -419
-495 -823 -850 -1040 -328 -201 -798 -315 -1220 -296 -378 17 -738 128 -1020
313 -349 230 -662 620 -819 1021 -44 113 -92 280 -101 356 l-7 56 883 -2 884
-3 3 -672z"
                    />
                  </g>
                </svg>

                <h2>Underrated</h2>
              </div>
              <Link
                className="mb-[10px] flex items-center text-[13px]
          hover:underline"
                href="/category/underrated"
              >
                <span>View more</span>
                <ChevronRight size={17} />
              </Link>
            </div>
            {data && <HomePageCetagoryTemplate data={data.underrated} />}
          </div>

          <div className="mb-[40px] w-full">
            <div className="flex justify-between">
              <div
                className="relative h-[40px] bg-gradient-to-l
        from-transparent to-backgroundHover w-[200px] mb-[10px] p-2 flex
        items-center font-[700] text-[18px] rounded-l-md gap-2"
              >
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100.000000 100.000000"
                  preserveAspectRatio="xMidYMid meet"
                  className="h-[24px] w-[24px]"
                  style={{ fill: "var(--foreground)" }}
                >
                  <g
                    transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
                    stroke="none"
                  >
                    <path
                      d="M470 971 c-22 -42 -3 -111 30 -111 19 0 40 33 40 61 0 41 -17 69 -40
69 -11 0 -24 -9 -30 -19z"
                    />
                    <path
                      d="M254 915 c-8 -19 12 -68 36 -90 15 -13 23 -14 39 -5 26 14 26 30 0
74 -22 39 -64 50 -75 21z"
                    />
                    <path
                      d="M671 894 c-26 -44 -26 -60 0 -74 25 -14 50 5 69 51 27 65 -32 85 -69
23z"
                    />
                    <path
                      d="M108 769 c-28 -16 -21 -45 17 -69 74 -46 120 6 48 54 -42 29 -42 29
-65 15z"
                    />
                    <path
                      d="M421 731 c-27 -28 -62 -53 -83 -60 -43 -14 -78 -53 -78 -88 0 -13 14
-49 30 -80 20 -37 30 -70 30 -99 0 -35 5 -47 32 -69 28 -24 37 -26 72 -19 52
10 100 10 152 0 35 -7 44 -5 72 19 27 22 32 34 32 69 0 29 10 62 30 99 17 31
30 67 30 80 0 35 -35 74 -78 88 -21 7 -56 32 -83 60 -37 40 -51 49 -79 49 -28
0 -42 -9 -79 -49z"
                    />
                    <path
                      d="M827 754 c-72 -48 -24 -100 51 -54 36 22 42 54 13 70 -25 13 -20 14
-64 -16z"
                    />
                    <path
                      d="M41 542 c-17 -32 5 -52 59 -52 40 0 50 4 55 20 10 32 -12 50 -61 50
-31 0 -46 -5 -53 -18z"
                    />
                    <path
                      d="M850 545 c-6 -8 -9 -23 -5 -35 5 -16 15 -20 55 -20 54 0 76 20 59 52
-12 23 -91 25 -109 3z"
                    />
                    <path
                      d="M123 349 c-38 -24 -43 -53 -12 -69 36 -20 110 37 96 74 -9 22 -45 20
-84 -5z"
                    />
                    <path
                      d="M793 354 c-8 -22 7 -45 45 -67 24 -14 35 -16 51 -7 31 16 25 46 -13
69 -40 25 -74 27 -83 5z"
                    />
                    <path
                      d="M472 268 c-15 -15 -16 -211 -2 -239 6 -10 19 -19 30 -19 31 0 40 32
40 142 0 106 -7 128 -40 128 -9 0 -21 -5 -28 -12z"
                    />
                    <path
                      d="M341 206 c-19 -23 -10 -176 11 -189 12 -8 21 -7 32 2 20 17 23 170 4
189 -16 16 -33 15 -47 -2z"
                    />
                    <path
                      d="M611 206 c-19 -23 -10 -176 11 -189 12 -8 21 -7 32 2 20 17 23 170 4
189 -16 16 -33 15 -47 -2z"
                    />
                    <path
                      d="M202 128 c-15 -15 -16 -72 -2 -99 14 -25 46 -25 60 0 11 22 13 71 4
95 -7 19 -45 21 -62 4z"
                    />
                    <path
                      d="M736 124 c-9 -24 -7 -73 4 -95 14 -25 46 -25 60 0 14 27 13 84 -2 99
-17 17 -55 15 -62 -4z"
                    />
                  </g>
                </svg>

                <h2>Popular</h2>
              </div>
              <Link
                className=" mb-[10px] flex items-center text-[13px]
          hover:underline"
                href="/category/most-popular"
              >
                <span>View more</span>
                <ChevronRight size={17} />
              </Link>
            </div>
            {data && <HomePageCetagoryTemplate data={data.mostPopular} />}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row px-4 md:px-[54px] gap-12 pb-12">
          {/* specials */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <div
                  className="h-[40px] bg-gradient-to-l
        from-transparent to-backgroundHover w-[200px] mb-[10px] p-2 flex
        items-center font-[700] text-[18px] rounded-l-md gap-2"
                >
                  <div className="h-[28px] w-[8px] rounded-full bg-main"></div>

                  <h2>Special Animes</h2>
                </div>
                <div>
                  <Link
                    href="/category/special"
                    className=" mb-[10px] flex items-center text-[13px]
          hover:underline"
                  >
                    <span>View more</span>
                    <ChevronRight size={17} />
                  </Link>
                </div>
              </div>
              <div className="grid gap-4 gridcard">
                {data.special.slice(0, 12).map(anime => (
                  <AnimeCard anime={anime} />
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <div
                  className="h-[40px] bg-gradient-to-l
        from-transparent to-backgroundHover w-[200px] mb-[10px] p-2 flex
        items-center font-[700] text-[18px] rounded-l-md gap-2"
                >
                  <div className="h-[28px] w-[8px] rounded-full bg-main"></div>

                  <h2>News Feed</h2>
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
                {data.newsFeed.map(n => (
                  <NewsCard news={n} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            {/* top 10 */}
            <div className="">
              <Top10AnimeList top10Animes={data.topTen} />
            </div>

            {/* schedule  */}
            <div className="">
              <ScheduleComponent />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
