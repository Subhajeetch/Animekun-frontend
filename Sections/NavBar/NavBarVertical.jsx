"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SheetClose } from "@/components/ui/CustomSheetForNavBar.jsx";

const NavBarVertical = () => {
  const currentPath = usePathname();

  const isActive = path => currentPath === path;

  return (
    <>
      <nav className="mt-5">
        <SheetClose asChild>
          <Link
            className={`flex gap-7 items-center py-2.5 pl-3
        rounded-[9px] ${
          isActive("/home") ? "bg-backgroundHover" : "hover:bg-backgroundHover"
        }`}
            href={"/home"}
          >
            <div className="h-[28px]">
              <svg
                version="1.0"
                viewBox="0 0 100.000000 100.000000"
                preserveAspectRatio="xMidYMid meet"
                className="h-full"
                style={{ fill: "var(--foreground)" }}
              >
                <g
                  transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M10 911 c0 -29 31 -81 64 -107 22 -18 36 -38 36 -51 0 -20 5 -23 45
-23 l45 0 0 -55 0 -55 -45 0 -45 0 0 -55 0 -55 45 0 c40 0 45 -2 45 -23 0 -77
-51 -288 -95 -390 -6 -15 0 -17 58 -17 65 0 66 0 76 33 27 82 42 171 48 280
l6 117 207 0 207 0 7 -117 c6 -117 13 -160 42 -261 l15 -52 66 0 c58 0 64 2
58 17 -44 102 -95 313 -95 390 0 21 5 23 45 23 l45 0 0 55 0 55 -45 0 -45 0 0
55 0 55 45 0 c39 0 45 3 45 22 0 12 16 35 39 55 34 29 71 96 59 108 -2 2 -26
-2 -53 -11 -165 -49 -774 -42 -907 11 -11 4 -18 3 -18 -4z m440 -236 l0 -55
-75 0 -75 0 0 55 0 55 75 0 75 0 0 -55z m250 0 l0 -55 -75 0 -75 0 0 55 0 55
75 0 75 0 0 -55z"
                  />
                </g>
              </svg>
            </div>
            <span className="font-[700] text-[14px]">Home</span>
          </Link>
        </SheetClose>

        <div
          className="flex gap-7 items-center hover:bg-backgroundHover py-2.5 pl-3
        rounded-[9px]"
        >
          {/*History Icon*/}
          <div className="h-[28px]">
            <svg
              version="1.0"
              viewBox="0 0 100.000000 100.000000"
              preserveAspectRatio="xMidYMid meet"
              className="h-full"
              style={{ fill: "var(--foreground)" }}
            >
              <g
                transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
                stroke="none"
              >
                <path
                  d="M425 979 c-90 -13 -196 -68 -266 -138 -254 -255 -152 -685 190 -801
78 -26 212 -28 291 -5 142 42 263 157 315 298 21 57 11 93 -30 103 -27 7 -75
-17 -75 -37 0 -6 -12 -34 -26 -63 -107 -214 -392 -264 -573 -101 -21 19 -53
63 -72 97 -33 60 -34 68 -34 168 0 100 1 108 34 168 39 72 88 120 163 159 48
25 62 28 158 28 95 0 110 -3 160 -28 30 -15 66 -36 79 -48 l24 -20 -57 -58
c-33 -33 -55 -64 -52 -70 5 -7 60 -11 161 -11 142 0 155 2 165 19 15 29 13
283 -3 304 -11 16 -17 12 -67 -38 -30 -30 -58 -55 -63 -55 -5 0 -23 12 -40 26
-96 81 -249 122 -382 103z"
                />
                <path
                  d="M397 662 c-14 -15 -17 -41 -17 -134 0 -150 -2 -148 152 -148 126 0
148 9 148 63 0 40 -33 57 -112 57 l-68 0 0 68 c0 80 -17 112 -59 112 -15 0
-35 -8 -44 -18z"
                />
              </g>
            </svg>
          </div>
          <span className="font-[700] text-[14px]">History</span>
        </div>

        <div
          className="flex gap-7 items-center hover:bg-backgroundHover py-2.5 pl-3
        rounded-[9px]"
        >
          <div className="h-[28px]">
            <svg
              version="1.0"
              viewBox="0 0 100.000000 100.000000"
              preserveAspectRatio="xMidYMid meet"
              className="h-full"
              style={{ fill: "var(--foreground)" }}
            >
              <g
                transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
                stroke="none"
              >
                <path
                  d="M220 970 c-11 -11 -20 -33 -20 -50 l0 -30 300 0 300 0 0 30 c0 17 -9
39 -20 50 -19 19 -33 20 -280 20 -247 0 -261 -1 -280 -20z"
                />
                <path
                  d="M132 824 c-15 -11 -22 -25 -22 -50 l0 -34 390 0 390 0 0 34 c0 66 -2
66 -390 66 -297 0 -349 -2 -368 -16z"
                />
                <path
                  d="M57 669 c-41 -24 -47 -66 -47 -325 0 -276 5 -303 62 -323 50 -18 820
-15 862 3 51 21 56 48 56 323 0 259 -6 300 -48 322 -28 15 -860 15 -885 0z
m484 -210 c123 -84 144 -102 136 -122 -5 -14 -214 -163 -245 -175 -33 -12 -42
27 -42 181 0 146 7 187 34 187 7 0 60 -32 117 -71z"
                />
              </g>
            </svg>
          </div>
          <span className="font-[700] text-[14px]">Watchlist</span>
        </div>

        {/* separator line */}
        <div className="h-[2px] w-full bg-separatorOnBackground rounded-full mt-3 mb-2"></div>

        {/* sub main pages */}
        <SheetClose asChild>
          <Link
            className={`flex gap-7 items-center hover:bg-backgroundHover py-2.5 pl-3
        rounded-[9px] ${
          isActive("/category/most-popular")
            ? "bg-backgroundHover"
            : "hover:bg-backgroundHover"
        }`}
            href={"/category/most-popular"}
          >
            <div className="h-[28px]">
              <svg
                version="1.0"
                viewBox="0 0 100.000000 100.000000"
                preserveAspectRatio="xMidYMid meet"
                className="h-full"
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
            </div>
            <span className="font-[700] text-[14px]">Most Popular</span>
          </Link>
        </SheetClose>

        <SheetClose asChild>
          <Link
            className={`flex gap-7 items-center hover:bg-backgroundHover py-2.5 pl-3
        rounded-[9px] ${
          isActive("/category/subbed-anime")
            ? "bg-backgroundHover"
            : "hover:bg-backgroundHover"
        }`}
            href={"/category/subbed-anime"}
          >
            <div className="h-[28px]">
              <svg
                version="1.0"
                viewBox="0 0 100.000000 100.000000"
                preserveAspectRatio="xMidYMid meet"
                className="h-full"
                style={{ fill: "var(--foreground)" }}
              >
                <g
                  transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M49 951 l-29 -29 0 -422 0 -422 29 -29 29 -29 422 0 422 0 29 29 29
29 0 422 0 422 -29 29 -29 29 -422 0 -422 0 -29 -29z m351 -411 c0 -216 -6
-246 -53 -271 -38 -21 -99 -28 -159 -17 -63 11 -66 15 -48 80 l11 37 49 -6
c80 -9 80 -9 80 198 l0 179 60 0 60 0 0 -200z m380 178 c60 -30 82 -74 78
-149 -7 -101 -63 -149 -178 -149 l-60 0 0 -80 0 -80 -65 0 -65 0 0 240 0 240
123 0 c107 0 128 -3 167 -22z"
                  />
                  <path
                    d="M620 580 c0 -60 0 -60 29 -60 65 0 97 30 84 79 -5 21 -50 41 -89 41
-23 0 -24 -4 -24 -60z"
                  />
                </g>
              </svg>
            </div>
            <span className="font-[700] text-[14px]">Subbed</span>
          </Link>
        </SheetClose>

        <SheetClose asChild>
          <Link
            className={`flex gap-7 items-center hover:bg-backgroundHover py-2.5 pl-3
        rounded-[9px] ${
          isActive("/category/dubbed-anime")
            ? "bg-backgroundHover"
            : "hover:bg-backgroundHover"
        }`}
            href={"/category/dubbed-anime"}
          >
            <div className="h-[28px]">
              <svg
                version="1.0"
                viewBox="0 0 100.000000 100.000000"
                preserveAspectRatio="xMidYMid meet"
                className="h-full"
                style={{ fill: "var(--foreground)" }}
              >
                <g
                  transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M49 951 l-29 -29 0 -422 0 -422 29 -29 29 -29 422 0 422 0 29 29 29
29 0 422 0 422 -29 29 -29 29 -422 0 -422 0 -29 -29z m381 -266 l0 -55 -105 0
-105 0 0 -40 0 -40 85 0 85 0 0 -50 0 -50 -85 0 -85 0 0 -40 0 -40 110 0 110
0 0 -55 0 -55 -170 0 -170 0 0 240 0 240 165 0 165 0 0 -55z m275 -66 l70
-121 3 121 3 121 64 0 65 0 0 -240 0 -241 -62 3 -63 3 -75 128 -75 128 -3
-131 -3 -130 -59 0 -60 0 0 240 0 240 63 0 62 0 70 -121z"
                  />
                </g>
              </svg>
            </div>
            <span className="font-[700] text-[14px]">Dubbed</span>
          </Link>
        </SheetClose>

        <SheetClose asChild>
          <Link
            className={`flex gap-7 items-center hover:bg-backgroundHover py-2.5 pl-3
        rounded-[9px] ${
          isActive("/category/movie")
            ? "bg-backgroundHover"
            : "hover:bg-backgroundHover"
        }`}
            href={"/category/movie"}
          >
            <div className="h-[28px]">
              <svg
                version="1.0"
                viewBox="0 0 100.000000 100.000000"
                preserveAspectRatio="xMidYMid meet"
                className="h-full"
                style={{ fill: "var(--foreground)" }}
              >
                <g
                  transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M147 905 c-72 -25 -127 -101 -127 -175 0 -19 9 -53 19 -75 33 -72 86
-105 167 -105 82 0 137 37 170 115 l17 40 8 -27 c27 -101 151 -157 252 -114
44 18 95 78 103 121 21 111 -43 206 -153 230 -74 15 -171 -43 -197 -117 l-12
-38 -18 40 c-21 49 -74 96 -123 109 -48 14 -59 13 -106 -4z m116 -127 c33 -39
17 -99 -31 -116 -40 -14 -89 8 -98 44 -21 82 75 136 129 72z m361 11 c53 -41
24 -129 -43 -131 -80 -2 -111 113 -38 142 35 14 52 12 81 -11z"
                  />
                  <path
                    d="M285 528 c-49 -19 -93 -20 -167 -2 -47 11 -58 -29 -58 -211 0 -173 8
-203 58 -224 20 -9 105 -11 291 -9 l263 3 24 28 c23 27 24 33 24 201 0 155 -2
176 -19 197 -17 21 -21 22 -58 11 -57 -17 -101 -15 -152 8 -55 25 -139 25
-206 -2z"
                  />
                  <path
                    d="M837 453 l-78 -45 3 -96 3 -96 83 -48 c89 -51 101 -55 120 -36 13 13
18 321 6 352 -10 27 -55 17 -137 -31z"
                  />
                </g>
              </svg>
            </div>
            <span className="font-[700] text-[14px]">Movies</span>
          </Link>
        </SheetClose>

        <SheetClose asChild>
          <Link
            className={`flex gap-7 items-center hover:bg-backgroundHover py-2.5 pl-3
        rounded-[9px] ${
          isActive("/category/tv")
            ? "bg-backgroundHover"
            : "hover:bg-backgroundHover"
        }`}
            href={"/category/tv"}
          >
            <div className="h-[28px]">
              <svg
                version="1.0"
                viewBox="0 0 100.000000 100.000000"
                preserveAspectRatio="xMidYMid meet"
                className="h-full"
                style={{ fill: "var(--foreground)" }}
              >
                <g
                  transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M42 827 c-22 -23 -22 -29 -22 -329 l0 -307 26 -20 c26 -21 37 -21
456 -21 l429 0 24 25 25 24 0 301 0 301 -25 24 -24 25 -434 0 -434 0 -21 -23z
m838 -322 l0 -255 -385 0 -385 0 0 248 c0 137 3 252 7 255 3 4 177 7 385 7
l378 0 0 -255z m-162 -308 c2 -10 -3 -17 -12 -17 -18 0 -29 16 -21 31 9 14 29
6 33 -14z m128 12 c10 -17 -13 -36 -27 -22 -12 12 -4 33 11 33 5 0 12 -5 16
-11z"
                  />
                  <path
                    d="M252 618 c2 -18 11 -24 36 -26 l32 -3 0 -99 c0 -110 4 -130 29 -130
34 0 41 22 41 126 l0 103 33 3 c24 2 33 8 35 26 3 22 2 22 -103 22 -105 0
-106 0 -103 -22z"
                  />
                  <path
                    d="M504 626 c-3 -8 12 -69 34 -137 l39 -124 39 0 39 0 43 125 c23 68 40
130 38 137 -3 7 -17 13 -30 13 -23 0 -28 -8 -53 -90 -15 -49 -31 -90 -34 -90
-3 0 -18 41 -32 90 -25 82 -29 90 -52 90 -14 0 -28 -6 -31 -14z"
                  />
                </g>
              </svg>
            </div>
            <span className="font-[700] text-[14px]">Tv Series</span>
          </Link>
        </SheetClose>

        <SheetClose asChild>
          <Link
            className={`flex gap-7 items-center hover:bg-backgroundHover py-2.5 pl-3
        rounded-[9px] ${
          isActive("/category/ova")
            ? "bg-backgroundHover"
            : "hover:bg-backgroundHover"
        }`}
            href={"/category/ova"}
          >
            <div className="h-[28px]">
              <svg
                version="1.0"
                viewBox="0 0 100.000000 100.000000"
                preserveAspectRatio="xMidYMid meet"
                className="h-full"
                style={{ fill: "var(--foreground)" }}
              >
                <g
                  transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M381 964 c-248 -67 -402 -316 -350 -566 36 -172 194 -330 367 -367
166 -35 314 10 437 134 76 75 115 144 134 233 73 346 -251 657 -588 566z m292
-77 c80 -36 170 -125 210 -206 30 -63 32 -72 32 -181 0 -111 -1 -118 -33 -183
-43 -86 -113 -156 -199 -199 -65 -32 -72 -33 -183 -33 -110 0 -119 2 -181 32
-84 42 -160 118 -202 202 -30 62 -32 71 -32 181 0 104 3 121 27 173 29 61 110
154 164 188 75 46 133 60 239 56 82 -3 110 -8 158 -30z"
                  />
                  <path
                    d="M403 791 c-96 -33 -170 -109 -198 -204 -20 -66 -19 -103 1 -111 23
-9 44 11 44 42 0 112 120 232 232 232 34 0 55 25 38 45 -16 20 -53 19 -117 -4z"
                  />
                  <path
                    d="M432 620 c-68 -42 -91 -124 -52 -188 50 -81 151 -95 217 -29 113 112
-29 300 -165 217z m125 -62 c51 -48 15 -138 -56 -138 -47 0 -81 32 -81 79 0
72 84 109 137 59z"
                  />
                  <path
                    d="M480 514 c-11 -12 -10 -18 3 -32 16 -15 18 -15 34 0 13 14 14 20 3
32 -7 9 -16 16 -20 16 -4 0 -13 -7 -20 -16z"
                  />
                  <path
                    d="M762 518 c-7 -7 -12 -27 -12 -45 0 -102 -121 -223 -222 -223 -40 0
-62 -19 -52 -45 6 -14 15 -16 56 -12 140 17 253 126 274 265 8 56 -15 89 -44
60z"
                  />
                </g>
              </svg>
            </div>
            <span className="font-[700] text-[14px]">OVA</span>
          </Link>
        </SheetClose>

        <SheetClose asChild>
          <Link
            className={`flex gap-7 items-center hover:bg-backgroundHover py-2.5 pl-3
        rounded-[9px] ${
          isActive("/category/ona")
            ? "bg-backgroundHover"
            : "hover:bg-backgroundHover"
        }`}
            href={"/category/ona"}
          >
            <div className="h-[28px]">
              <svg
                version="1.0"
                viewBox="0 0 100.000000 100.000000"
                preserveAspectRatio="xMidYMid meet"
                className="h-full"
                style={{ fill: "var(--foreground)" }}
              >
                <g
                  transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M451 961 c-19 -19 -28 -51 -33 -120 l-3 -34 -34 52 c-43 67 -70 80
-115 58 -19 -9 -37 -25 -41 -37 -8 -24 9 -81 38 -128 l20 -34 -49 26 c-93 47
-130 44 -154 -14 -18 -43 -3 -71 62 -114 l53 -36 -40 0 c-57 0 -113 -18 -125
-40 -5 -10 -10 -32 -10 -49 0 -41 38 -65 115 -71 l60 -5 -31 -17 c-49 -27 -94
-77 -94 -104 0 -32 42 -74 74 -74 13 0 49 13 80 29 l55 30 -24 -47 c-39 -75
-42 -106 -12 -136 46 -46 89 -32 141 45 l34 50 4 -59 c6 -82 27 -112 78 -112
51 0 72 30 78 112 l4 59 34 -50 c52 -77 95 -91 141 -45 30 30 27 61 -12 136
l-24 47 55 -30 c31 -16 67 -29 80 -29 33 0 74 42 74 76 0 28 -41 73 -94 102
l-31 17 60 5 c77 6 115 30 115 71 0 17 -5 39 -10 49 -12 22 -68 40 -125 40
l-40 0 52 35 c79 53 92 91 47 140 -30 32 -59 30 -136 -10 l-46 -24 29 57 c42
83 37 118 -21 142 -42 17 -72 1 -113 -63 l-32 -50 -3 34 c-7 103 -29 139 -82
139 -16 0 -39 -9 -49 -19z m109 -356 c16 -9 36 -29 45 -45 43 -84 -13 -180
-105 -180 -92 0 -148 96 -105 180 29 55 105 76 165 45z"
                  />
                </g>
              </svg>
            </div>
            <span className="font-[700] text-[14px]">ONA</span>
          </Link>
        </SheetClose>
      </nav>
    </>
  );
};

export default NavBarVertical;
