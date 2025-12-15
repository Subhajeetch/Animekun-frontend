"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import CustomImage from "../Universal/CustomImage";

const Sequence = ({ anime }) => {
  const currentEpisodeRef = useRef(null);

  const { seasons } = anime;

  // copied from chat GPT
  useEffect(() => {
    const container = currentEpisodeRef.current?.parentNode; // Get the container element
    if (container && currentEpisodeRef.current) {
      const elementOffsetTop = currentEpisodeRef.current.offsetTop;

      // Smoothly scroll the container to bring the current episode into view with a 14px offset
      container.scrollTo({
        top: elementOffsetTop - 140, // Adjusted scroll position
        behavior: "smooth" // Enable smooth scrolling
      });
    }
  }, [seasons]);

  return (
    <>
      {/* sequence */}
      {seasons && seasons.length > 0 && (
        <div
          className="flex flex-col items-center flex-wrap
            md:mt-0 min-w-[210px] max-w-[500px] bg-background"
        >
          <div
            className="flex gap-1 pl-4 py-2 items-center border-t-2
              border-separatorOnBackground border-b-2 w-full"
          >
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet"
              className="h-[24px]"
              style={{ fill: "var(--foreground)" }}
            >
              <g
                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                stroke="none"
              >
                <path
                  d="M2478 4630 c-131 -21 -269 -122 -336 -247 l-32 -61 -423 -4 c-389 -4
-428 -6 -497 -25 -274 -76 -469 -259 -530 -499 -25 -98 -25 -180 0 -278 61
-238 236 -409 507 -493 l88 -28 960 -3 c1074 -3 1002 -7 1053 68 20 29 23 44
20 88 -4 45 -10 59 -42 90 l-36 37 -953 5 c-951 5 -952 5 -1018 27 -130 44
-229 127 -277 231 -21 47 -24 65 -20 131 9 155 106 264 290 325 l77 26 399 0
400 0 7 -27 c11 -47 72 -137 123 -186 139 -129 354 -162 529 -80 81 38 181
139 222 226 l32 67 442 0 c287 0 456 4 482 11 144 39 147 238 4 279 -20 6
-220 10 -485 10 l-452 0 -26 54 c-90 184 -298 288 -508 256z"
                />
                <path
                  d="M3905 3508 c-84 -16 -172 -65 -240 -133 -186 -186 -191 -467 -12
-661 180 -195 480 -205 672 -23 59 56 61 55 106 -31 33 -62 34 -184 2 -253
-31 -67 -116 -148 -193 -185 -136 -64 -91 -62 -1464 -62 l-1244 0 -22 35 c-83
135 -296 225 -461 196 -74 -13 -173 -57 -230 -103 -82 -65 -169 -221 -169
-302 0 -18 -12 -33 -43 -55 -65 -45 -157 -143 -200 -213 -76 -126 -103 -285
-73 -422 55 -246 236 -427 513 -513 l88 -28 677 -3 676 -3 32 -49 c163 -253
511 -293 731 -83 196 187 198 486 5 679 -72 72 -141 110 -240 131 -231 49
-473 -91 -546 -316 l-23 -72 -626 4 c-544 3 -633 5 -680 19 -141 43 -241 120
-292 223 -28 58 -31 71 -27 137 4 78 27 139 73 191 l26 29 67 -64 c73 -68 128
-99 219 -123 248 -65 519 101 576 351 l14 59 1274 5 1274 5 75 23 c330 101
531 341 531 632 0 175 -54 301 -186 434 -78 79 -80 83 -91 148 -25 145 -124
282 -251 351 -91 49 -210 66 -318 45z"
                />
              </g>
            </svg>

            <span className="text-[18px] font-[800]">Sequence: </span>
          </div>

          <div
            className="bg-episodeContainerBackground overflow-y-auto flex flex-col
          items-center gap-4 w-full scrollbar-thin
          scrollbar-thumb-backgroundHover
          scrollbar-track-background p-2 h-full max-h-[380px]"
          >
            {seasons.map(season => (
              <Link
                href={`/watch/${season.id}`}
                className="max-w-[300px] w-full rounded-lg
                  md:max-w-[500px] card-item"
                ref={season.isCurrent ? currentEpisodeRef : null}
                key={season.id}
              >
                <div
                  key={season.id}
                  className={`flex p-1 bg-backgroundtwo max-w-[300px] w-full rounded-lg
                  md:max-w-[500px] ${season.isCurrent
                      ? "border-2 border-separatorOnBackgroundtwo"
                      : ""
                    }`}
                >
                  <div className="w-[64px]">
                    <CustomImage
                      src={season.poster}
                      alt={season.name}
                      className="rounded-sm h-[94px] w-[62px] cover"
                    />
                  </div>
                  <div className="flex-1 w-3/5 pl-2 pt-1 relative">
                    <h2
                      className={`text-foreground text-[16px] font-[500]
                    truncate ${season.isCurrent ? "font-[800] text-foreground" : ""
                        }`}
                    >
                      {season.name}
                    </h2>
                    <h3
                      className={`text-[12px] font-[300]
                      text-animeCardDimmerForeground
                    ${season.isCurrent
                          ? "text-animeCardDimmerForeground font-[400]"
                          : ""
                        }`}
                    >
                      {season.title}
                    </h3>

                    {season.isCurrent && (
                      <span
                        className="bg-main text-foreground text-[12px] font-[800] px-1
            py-0.5 self-start absolute top-[-4px] right-[-5px] rounded-tr-[4px]
            rounded-bl-[4px]"
                      >
                        Now Playing
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Sequence;
