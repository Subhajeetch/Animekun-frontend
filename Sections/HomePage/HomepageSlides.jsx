"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import "./HomepageSections.css";
import CustomImage from '@/Sections/Universal/CustomImage.jsx';

import Slider from "./Slider/Embla.jsx";

const HomepageSlides = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 760);
    }
  }, []);

  const OPTIONS = { loop: true };
  const SLIDES = data.map(anime => (
    <div
      key={anime.id}
      className="relative flex items-center justify-between h-[270px]
          md:h-[440px] w-full overflow-hidden"
    >
      <img
        src={anime.poster}
        alt={anime.name}
        className={`absolute right-0 w-full md:w-[80%] h-full object-cover
        object-top
        slide-image  ${isMobile ? "" : "fading-image "} `}
      />
      <div className="absolute h-[50%] w-full left-0 bottom-0 fade-bottom"></div>
      <div
        className="absolute top-0 left-0 h-full w-[40%] fade-left
        md:left-[186px]"
      ></div>
      <div
        className="relative flex flex-col z-10 p-4 md:p-[54px] max-w-fit h-full
      text-foreground "
      >
        <div className="flex-1 "></div>
        <span className="text-[12px] md:text-[16px] text-shadow-on-slides">
          Rank: #{anime.rank}
        </span>
        <h2
          className="text-[18px] md:text-[24px] font-[700] line-clamp-2 w-[250px]
        md:w-[610px] drop-shadow-md text-shadow-on-slides"
        >
          {anime.name}
        </h2>
        <div className="flex flex-col mt-2">
          <span
            className="text-[10px] flex gap-1 mb-1 md:text-[14px] font-[600]
          text-shadow-on-slides"
          >
            <span>{anime.type}</span> &#x2022; <span>{anime.otherInfo[1]}</span>{" "}
            &#x2022;
            <span> {anime.otherInfo[2]}</span>
          </span>
          <div className="text-[10px] md:text-[14px] flex gap-1 mb-4 md:mb-6">
            {anime.episodes.dub > 0 && (
              <div
                className="bg-dubBackground rounded-sm text-[11px] md:text-[14px]
                        px-[6px] py-[2px] flex gap-1 shadow-md
                        text-dubForeground w-max"
              >
                <span className="font-[900]">EN</span>
                <span className="font-[700]">{anime.episodes.dub}</span>
              </div>
            )}
            {anime.episodes.sub > 0 && (
              <div
                className="bg-subBackground rounded-sm text-[11px] md:text-[14px]
                        px-[6px] py-[2px] flex gap-1 shadow-md
                        text-subForeground w-max
                        "
              >
                <span className="font-[900]">JP</span>
                <span className="font-[700]">{anime.episodes.sub}</span>
              </div>
            )}

            {anime.otherInfo[3] && anime.otherInfo[3] === "HD" && (
              <div className="bg-quality rounded-sm">
                <p
                  className="text-[11px] px-[6px] py-[2px] font-[700]
                  md:text-[14px]
                  text-infoForeground"
                >
                  {anime.otherInfo[3]}
                </p>
              </div>
            )}
          </div>
        </div>
        <Link
          href={`/anime/${anime.id}`}
          className="
         px-4 py-2 text-[13px] max-w-fit text-center bg-main rounded-full
         mb-4 transition-all font-[800] flex gap-1.5 items-center
         justify-center"
        >
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
            className="h-[16px]"
            style={{ fill: "var(--foreground)" }}
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              stroke="none"
            >
              <path
                d="M1160 5106 c-303 -64 -567 -280 -670 -549 -69 -179 -65 -41 -65
-1997 0 -1956 -4 -1818 65 -1997 86 -224 294 -423 532 -508 127 -45 224 -59
361 -52 129 6 227 31 337 85 98 48 2609 1746 2688 1817 378 343 378 967 0
1309 -78 71 -2590 1770 -2688 1818 -123 60 -206 80 -360 84 -90 2 -157 -1
-200 -10z"
              />
            </g>
          </svg>
          Watch Now
        </Link>
      </div>
    </div>
  ));

  return <Slider slides={SLIDES} options={OPTIONS} />;
};

const SlidesSkeleton = () => {
  return (
    <>
      <div
        className="h-[270px] md:h-[440px] w-full 
         flex flex-col p-4 md:p-[54px]"
      >
        <div className="flex-1"></div>
        <div>
          <Skeleton className="w-[40px] h-[12px] rounded-full mb-1" />
          <Skeleton className="w-[130px] md:w-[150px] h-[18px] md:h-[24px] rounded-full mb-2" />
          <Skeleton className="w-[270px] md:w-[360px] h-[30px] md:h-[70px] rounded-md mb-2" />
          <Skeleton className="w-[70px] h-[13px] md:h-[16px] rounded-full mb-1" />
          <div className="flex gap-2 mb-4">
            <Skeleton className="w-[40px] h-[18px] rounded-md" />
            <Skeleton className="w-[38px] h-[18px] rounded-md" />
            <Skeleton className="w-[32px] h-[18px] rounded-md" />
          </div>

          <Skeleton className="w-[120px] h-[30px] rounded-full mb-4" />
        </div>
      </div>
    </>
  );
};

export { HomepageSlides, SlidesSkeleton };
