"use client";

import { CircleArrowOutUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const CastAndCh = ({ getutilsData }) => {
  const hexToRgb = hex => {
    hex = hex.replace(/^#/, "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  const getCImage = c => {
    return c?.image || "https://i.imgur.com/GYmfXR6.jpeg";
  };

  const getCRole = c => {
    return c?.role || "?";
  };

  const getVImage = c => {
    return c.voiceActors[0]?.image || "https://i.imgur.com/GYmfXR6.jpeg";
  };

  const getVID = c => {
    return c.voiceActors[0]?.id || "0";
  };

  const getCName = c => {
    return c?.name?.full || c?.name?.userPreferred || c?.name?.first || "?";
  };
  const getVName = c => {
    return (
      c?.voiceActors[0]?.name?.full ||
      c?.voiceActors[0]?.name?.userPreferred ||
      c?.voiceActors[0]?.name?.first ||
      null
    );
  };

  return (
    <div className="relative w-full px-4 md:px-[54px]">
      {/* Scroll Buttons - Visible only on larger screens */}
      <button
        className="hidden md:block absolute left-[20px] top-1/2 transform
        -translate-y-1/2 text-white p-2 rounded-full"
        onClick={() =>
          document
            .getElementById("scroll-container")
            .scrollBy({ left: -160, behavior: "smooth" })
        }
        style={{
          backgroundColor: `rgba(${hexToRgb(getutilsData.color)}, 0.3)`
        }}
      >
        <ChevronLeft />
      </button>

      {/* Scrollable Container */}
      <div
        id="scroll-container"
        className="flex overflow-x-auto scroll-smooth no-scrollbar space-x-2"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch"
        }}
      >
        {getutilsData.ch.slice(0, 40).map((c, index) => (
          <div
            key={index}
            className="w-[150px] flex"
            style={{ scrollSnapAlign: "start" }}
          >
            <div
              className="w-[150px] flex flex-col items-center
            "
            >
              <img
                src={getCImage(c)}
                className="w-[100px] h-[100px] object-cover
              object-top rounded-full"
              ></img>
              <div className="flex flex-col">
                <p className="text-[17px] font-[800] text-center line-clamp-1">
                  {getCName(c)}
                </p>
                <label className="text-[9px] font-[400] text-center">
                  {getCRole(c)}
                </label>
              </div>

              {getVName(c) && (
                <div className="flex justify-center items-center gap-1">
                  <img
                    className="h-[20px] w-[20px] rounded-full object-cover
                object-top"
                    src={getVImage(c)}
                  ></img>
                  <Link
                    href={`https://anilist.co/staff/${getVID(c)}`}
                    className="flex gap-0.5 items-center"
                  >
                    <p className="text-[12px] font-[600] line-clamp-1">
                      {getVName(c)}
                    </p>

                    <CircleArrowOutUpRight size={12} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Right Button */}
      <button
        className="hidden md:block absolute right-[20px] top-1/2 transform
        -translate-y-1/2 text-white p-2 rounded-full"
        onClick={() =>
          document
            .getElementById("scroll-container")
            .scrollBy({ left: 160, behavior: "smooth" })
        }
        style={{
          backgroundColor: `rgba(${hexToRgb(getutilsData.color)}, 0.3)`
        }}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default CastAndCh;
