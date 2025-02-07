"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./some.css";

const AnimeTop10 = ({ top10Animes }) => {
  const [activeTab, setActiveTab] = useState("t");
  const activeData = top10Animes[activeTab] || [];

  const timePeriods = [
    { key: "t", label: "Today" },
    { key: "w", label: "Weekly" },
    { key: "m", label: "Monthly" }
  ];

  return (
    <div
      className="w-full lg:max-w-[500px] mx-auto bg-background rounded-xl
    pb-4"
    >
      {/* Tabs Navigation */}
      <div className="flex justify-between mb-6">
        <div
          className="p-4 flex
        items-center font-[800] text-[18px] gap-2"
        >
          <div className="h-[28px] w-[8px] rounded-full bg-main"></div>

          <h2>Top 10</h2>
        </div>
        <div className="flex m-4 overflow-hidden rounded-lg">
          {timePeriods.map(period => (
            <button
              key={period.key}
              onClick={() => setActiveTab(period.key)}
              className={`px-3 py-2 font-[700] text-[14px] transition-colors ${
                activeTab === period.key
                  ? "bg-main text-white"
                  : "bg-backgroundtwo text-discriptionForeground hover:bg-separatorOnBackgroundtwo hover:text-foreground"
              }`}
              aria-label={`Show ${period.label} rankings`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Anime List */}
      <div className="grid grid-cols-1 scheduleDivs top-ten-div px-4">
        {activeData.map(anime => (
          <Link
            key={anime.id}
            className="flex items-center gap-4 p-4
          hover:bg-[#3a3a3ae6]"
          href={`/anime/${anime.id}`}
          >
            {/* Ranking Badge */}
            <div
              className="text-white text-[14px] font-[800] w-10 h-10 flex
            justify-center items-center"
            >
              #{anime.rank}
            </div>

            {/* Poster Image */}
            <img
              src={anime.poster}
              alt={`Poster for ${anime.name}`}
              className="w-[60px] h-[90px] object-cover rounded-md"
            />

            {/* Anime Details */}
            <div className="flex-1">
              <h3 className="text-[15px] font-semibold mb-2 line-clamp-2">
                {anime.name}
              </h3>

              {/* Episodes Info */}
              <div className="flex gap-1 text-gray-600">
                {anime.episodes.dub > 0 && (
                  <div
                    className="bg-dubBackground rounded-sm text-[9px]
                        px-[6px] py-[2px] flex gap-1 shadow-md text-dubForeground"
                  >
                    <span className="font-[900]">EN</span>
                    <span className="font-[700]">{anime.episodes.dub}</span>
                  </div>
                )}
                {anime.episodes.sub > 0 && (
                  <div
                    className="bg-subBackground rounded-sm text-[9px]
                        px-[6px] py-[2px] flex gap-1 shadow-md text-subForeground
                        "
                  >
                    <span className="font-[900]">JP</span>
                    <span className="font-[700]">{anime.episodes.sub}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AnimeTop10;
