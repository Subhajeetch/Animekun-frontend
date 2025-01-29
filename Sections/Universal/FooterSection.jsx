import Link from "next/link";
import Image from "next/image";
import categoryMap from "../../Utils/categoriesMap.js";
import genreMap from "../../Utils/genreMap.js";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background mt-2 flex flex-col px-4 md:px-[54px] pt-2 pb-4 relative">
      <div className=" flex flex-wrap gap-3 items-center">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          {/* Logo */}
          <Link href={"/"} className="flex gap-[3px]">
            {/* First Half of Logo */}
            <div className="relative h-[30px] md:h-[34px]">
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                style={{ fill: "var(--foreground)" }}
                className="w-full h-full"
                viewBox="0 0 290.000000 75.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,75.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M140 685 c0 -19 -4 -35 -10 -35 -5 0 -10 -11 -10 -25 0 -14 -4 -25
-10 -25 -5 0 -10 -9 -10 -20 0 -11 -7 -23 -15 -26 -8 -4 -15 -16 -15 -29 0
-13 -7 -25 -15 -29 -9 -3 -15 -18 -15 -36 0 -16 -4 -30 -10 -30 -13 0 -13
-137 0 -145 13 -8 13 -55 0 -55 -6 0 -10 -28 -10 -65 0 -61 2 -67 32 -95 18
-16 41 -30 51 -30 9 0 17 -4 17 -10 0 -6 50 -10 130 -10 80 0 130 4 130 10 0
6 14 10 31 10 20 0 40 10 60 29 26 26 29 36 29 90 0 34 -6 70 -12 81 -10 16
-10 24 0 40 14 24 16 150 2 150 -5 0 -10 13 -10 29 0 16 -7 34 -15 41 -8 7
-15 21 -15 31 0 11 -4 19 -10 19 -5 0 -10 11 -10 25 0 14 -4 25 -10 25 -5 0
-10 9 -10 19 0 11 -11 28 -24 38 -13 11 -25 28 -27 38 -7 33 -29 29 -29 -5 0
-20 9 -39 25 -54 23 -22 25 -29 25 -122 -1 -95 -2 -100 -30 -131 -27 -30 -35
-33 -86 -33 -49 0 -60 4 -90 32 l-34 32 0 100 c0 78 3 101 15 110 12 9 14 21
9 54 -8 51 -24 56 -24 7z m100 -415 c0 -5 -7 -10 -15 -10 -8 0 -15 5 -15 10 0
6 7 10 15 10 8 0 15 -4 15 -10z m50 0 c0 -5 -7 -10 -15 -10 -8 0 -15 5 -15 10
0 6 7 10 15 10 8 0 15 -4 15 -10z m-104 -64 c21 -21 30 -37 24 -41 -6 -4 -22
5 -35 19 -24 25 -75 36 -75 16 0 -5 -7 -10 -15 -10 -19 0 -19 5 2 30 26 30 60
25 99 -14z m224 20 c0 -8 6 -16 13 -19 9 -4 9 -7 0 -17 -10 -11 -14 -10 -19 3
-9 25 -52 20 -79 -9 -13 -14 -29 -23 -35 -19 -6 4 2 20 22 40 35 37 98 50 98
21z m-207 -136 c14 0 31 8 37 18 10 16 10 16 20 0 14 -23 66 -24 74 -1 5 11
10 13 17 6 8 -8 5 -17 -10 -32 -25 -25 -63 -27 -82 -5 -11 14 -13 14 -21 0 -5
-9 -21 -16 -36 -16 -30 0 -67 34 -56 52 5 7 11 6 19 -5 7 -10 24 -17 38 -17z"
                  />
                  <path
                    d="M702 548 l3 -53 108 -3 108 -3 -3 -52 -3 -52 -105 0 -105 0 -3 53 -3
52 -50 0 -49 0 0 -220 0 -220 50 0 50 0 0 110 0 110 110 0 110 0 0 -110 0
-110 55 0 55 0 0 220 0 220 -55 0 -55 0 0 55 0 55 -111 0 -110 0 3 -52z"
                  />
                  <path
                    d="M1140 325 l0 -275 50 0 50 0 0 165 0 165 54 0 55 0 3 -52 3 -53 53
-3 52 -3 0 -110 0 -109 55 0 55 0 0 275 0 275 -55 0 -55 0 0 -111 0 -110 -52
3 -53 3 -3 53 -3 52 -55 0 -54 0 0 55 0 55 -50 0 -50 0 0 -275z"
                  />
                  <path d="M1680 325 l0 -275 50 0 50 0 0 275 0 275 -50 0 -50 0 0 -275z" />
                  <path
                    d="M1900 325 l0 -275 50 0 50 0 0 165 0 165 59 0 60 0 3 -52 3 -53 48
-3 47 -3 0 55 0 56 55 0 55 0 2 -162 3 -163 55 0 55 0 0 270 0 270 -55 0 -55
0 -3 -52 -3 -52 -52 -3 -52 -3 -3 -52 -3 -53 -49 0 -49 0 -3 53 -3 52 -57 3
-58 3 0 54 0 55 -50 0 -50 0 0 -275z"
                  />
                  <path
                    d="M2560 325 l0 -276 158 3 157 3 3 53 3 52 -110 0 -111 0 0 55 0 54
108 3 107 3 3 53 3 52 -110 0 -111 0 0 55 0 54 108 3 107 3 3 53 3 52 -160 0
-161 0 0 -275z"
                  />
                </g>
              </svg>
            </div>

            {/* Second Half of Logo */}
            <div className="relative h-[30px] md:h-[34px]">
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                style={{ fill: "var(--main)" }}
                className="w-full h-full"
                viewBox="0 0 150.000000 75.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,75.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M20 330 l0 -260 50 0 50 0 0 99 0 100 53 3 52 3 3 48 3 47 -55 0 -56
0 0 110 0 110 -50 0 -50 0 0 -260z"
                  />
                  <path
                    d="M330 540 l0 -50 -50 0 -50 0 0 -55 0 -55 50 0 50 0 0 54 0 55 53 3
52 3 3 48 3 47 -55 0 -56 0 0 -50z"
                  />
                  <path d="M550 380 l0 -210 50 0 50 0 0 210 0 210 -50 0 -50 0 0 -210z" />
                  <path
                    d="M864 577 c-2 -7 -3 -100 -2 -207 l3 -195 48 -3 47 -3 0 210 0 211
-45 0 c-28 0 -48 -5 -51 -13z"
                  />
                  <path
                    d="M1070 330 l0 -260 50 0 50 0 0 154 0 155 53 3 52 3 3 47 3 47 -53 3
-53 3 -3 53 -3 52 -50 0 -49 0 0 -260z"
                  />
                  <path
                    d="M1390 486 l0 -105 -52 -3 -53 -3 -3 -47 -3 -48 55 0 56 0 0 -105 0
-105 50 0 50 0 0 260 0 260 -50 0 -50 0 0 -104z"
                  />
                  <path d="M230 220 l0 -50 50 0 50 0 0 50 0 50 -50 0 -50 0 0 -50z" />
                  <path
                    d="M337 164 c-4 -4 -7 -27 -7 -51 l0 -43 56 0 55 0 -3 48 -3 47 -45 3
c-25 2 -49 0 -53 -4z"
                  />
                  <path
                    d="M657 163 c-4 -3 -7 -26 -7 -50 l0 -43 105 0 105 0 0 50 0 50 -98 0
c-54 0 -102 -3 -105 -7z"
                  />
                </g>
              </svg>
            </div>
          </Link>
          <div
            className="h-[40px] w-[3px] bg-separatorOnBackground rounded-full hidden
        md:block"
          ></div>

          <div
            className="h-[2px] w-[160px] bg-separatorOnBackground rounded-full
        md:hidden"
          ></div>
        </div>

        <p className="text-[15px] text-[#c8dbe1] max-w-[600px]">
          <Link className="hover:underline" href="/">
            <b>
              <i>Animekun</i>
            </b>
          </Link>{" "}
          does not store any media content and is not affiliated with the
          services provided here. All media content is hosted on third-party
          services.
        </p>
      </div>

      <div className="mt-4 md:mt-8 gap-8 grid grid-cols-1 md:grid-cols-3">
        <div>
          <h4 className="text-[22px] font-[700] mb-1">Popular Genres</h4>
          <ul className="flex flex-wrap gap-1.5 pl-2">
            {genreMap.map((g, i) => (
              <li
                key={i}
                className="py-1 px-2 rounded-lg
                border border-[#7a7a7a] text-[#e4e4e4]
                justify-center items-center flex hover:bg-foreground
                hover:text-background text-[10px] font-[600]
                hover:border-foreground"
              >
                <Link href={`/genre/${g.idTwo}`}>{g.display}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[22px] font-[700] mb-1">Categories</h4>
          <ul className="grid grid-cols-2 xl:grid-cols-3 pl-2 gap-0.5">
            {categoryMap.map((c, i) => (
              <li
                key={i}
                className="text-[#cacaca] text-[13px]
              hover:underline"
              >
                <Link href={`/category/${c.id}`}>{`${c.display}`}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[22px] font-[700] mb-1">Necessary</h4>
          <ul className="grid grid-cols-2 pl-2 gap-0.5">
            <li className="text-[#cacaca] text-[13px] hover:underline">
              <Link href="#">Report bug</Link>
            </li>
            <li className="text-[#cacaca] text-[13px] hover:underline">
              <Link href="#">Contact</Link>
            </li>
            <li className="text-[#cacaca] text-[13px] hover:underline">
              <Link href="#">Terms of service</Link>
            </li>
            <li className="text-[#cacaca] text-[13px] hover:underline">
              <Link href="#">Privacy policy</Link>
            </li>
            <li className="text-[#cacaca] text-[13px] hover:underline">
              <Link href="#">DMCA</Link>
            </li>
            <li className="text-[#cacaca] text-[13px] hover:underline">
              <Link href="#">Anime news</Link>
            </li>
            <li className="text-[#cacaca] text-[13px] hover:underline">
              <Link href="#">Recent updates</Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="flex flex-col items-center mt-4 py-4 border-t
      border-[#4d4d4dc6]"
      >
        <div className="flex">
          <Link
            href="#"
            className="
            p-1 hover:bg-[#334346] rounded-full
            "
          >
            <Image
              src="/social-icons/Discord-icon.png"
              width={30}
              height={30}
              alt="Discord Icon"
            />
          </Link>

          <Link
            href="#"
            className="
            p-1 hover:bg-[#334346] rounded-full
            "
          >
            <Image
              src="/social-icons/X-icon.png"
              width={34}
              height={34}
              alt="X(Twitter) Icon"
            />
          </Link>

          <Link
            href="#"
            className="
            p-1 hover:bg-[#334346] rounded-full
            "
          >
            <Image
              src="/social-icons/reddit-logo.png"
              width={34}
              height={34}
              alt="Reddit Icon"
            />
          </Link>

          <Link
            href="#"
            className="
            p-1 hover:bg-[#334346] rounded-full
            "
          >
            <Image
              src="/social-icons/bluesky-icon.png"
              width={26}
              height={26}
              alt="BlueSky Icon"
            />
          </Link>
        </div>

        <span className="font-[500] text-[14px] text-[#c8dbe1] text-center">
          &#169; {currentYear} Animekun. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default FooterSection;
