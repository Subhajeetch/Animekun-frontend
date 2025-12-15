"use client";

import React, { useState, useEffect } from "react";
import "./Carousel/Embla.css";
import EmblaCarousel from "./Carousel/EmblaCarousel.jsx";
import Link from "next/link";
import CustomImage from "../Universal/CustomImage";

const SeasonsCarousel = ({ seasons }) => {
  const OPTIONS = { containScroll: false };
  const [emblaApi, setEmblaApi] = useState(null);

  // Find the index of the current season
  const currentIndex = seasons.findIndex(season => season.isCurrent);

  useEffect(() => {
    if (emblaApi && currentIndex !== -1) {
      emblaApi.scrollTo(currentIndex); // Scroll to the current season
    }
  }, [emblaApi, currentIndex]);

  // Map seasons to create slide cards
  const SLIDES = seasons.map(season => (
    <div
      key={season.id}
      className="flex justify-center items-center w-[70vw]
    md:w-[58vw] relative"
    >
      <Link
        href={`/watch/${season.id}`}
        className="flex bg-background shadow-lg rounded-[4px]
      p-1 w-full space-x-2"
      >
        <CustomImage
          src={season.poster}
          alt={season.name}
          className="w-[36px] h-[60px] object-cover rounded-[2px]"
        />
        <div className="flex flex-col pt-1.5 w-9/12">
          <p className="text-[11px] font-semibold text-foreground truncate">
            {season.name}
          </p>
          <p className="text-[8px] font-[400] text-animeCardDimmerForeground truncate">
            {season.title}
          </p>

        </div>
      </Link>

      {season.isCurrent && (
        <span
          className="bg-main text-foreground text-[8px] font-[800] px-1
            py-0.5 self-start absolute top-0 right-0 rounded-tr-[4px]
            rounded-bl-[4px]"
        >
          Now Playing
        </span>
      )}
    </div>
  ));

  return (
    <div className="bg-backgroundtwo lg:hidden pt-3 pb-1">
      <EmblaCarousel
        slides={SLIDES}
        options={OPTIONS}
        onInit={setEmblaApi}
        className="will-change-transform"
      />
    </div>
  );
};

export default SeasonsCarousel;
