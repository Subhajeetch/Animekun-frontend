"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./TrendingSlider.css";
import CustomImage from "../Universal/CustomImage";

const TrendingAnime = ({ data }) => {
  const getPerPage = () => {
    if (typeof window === "undefined") return 4; // Default value for SSR
    if (window.innerWidth < 480) return 2;
    if (window.innerWidth < 760) return 3;
    if (window.innerWidth < 1000) return 4;
    if (window.innerWidth < 1400) return 6;
    if (window.innerWidth < 1600) return 7;
    return 7;
  };

  const [perPage, setPerPage] = useState(getPerPage());

  useEffect(() => {
    const handleResize = () => {
      setPerPage(getPerPage());
    };

    setPerPage(getPerPage()); // Set the correct value on the client
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const OPTIONS = {
    rewind: false,
    perPage: perPage,
    gap: "2px",
    perMove: 1
  };

  return (
    <div className="trending-slider max-w-[1800px] mx-auto px-4">
      <Splide
        options={OPTIONS}
        className="will-change-transform"
      >
        {data.map(anime => (
          <SplideSlide
            key={anime.id}
            className="relative flex items-center justify-between w-full
          overflow-hidden aspect-[9/12]"
          >
            <Link
              className="absolute top-0 right-0 w-full
          aspect-[9/12] flex flex-col card-item p-2 rounded-md"
              href={`/anime/${anime.id}`}
              style={{ borderRadius: "10px" }}
            >
              <div className="flex-1 relative overflow-hidden">
                <CustomImage
                  src={anime.poster}
                  alt={anime.name}
                  className="object-cover object-top h-full w-full"
                />

                <div
                  className="absolute bottom-0 left-0 h-[40px] w-[40px]
              bg-[#74ff2d] flex justify-center items-center text-[#262626]
              text-[28px] font-[800]"
                >
                  {anime.rank.toString().padStart(2, "0")}
                </div>
              </div>
              <div className="w-full">
                <span
                  className="text-[14px] line-clamp-1 py-[1px]
              font-[700]"
                >
                  {anime.name}
                </span>
              </div>
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};



export { TrendingAnime };
