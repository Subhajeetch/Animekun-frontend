"use client";
import { useState, useEffect } from "react";
import "./some.css";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Play } from "@/Sections/Universal/icons.jsx";
import Link from "next/link";

import CustomImage from "@/Sections/Universal/CustomImage";

const ContinueWatching = () => {
  const [watchHistory, setWatchHistory] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("conWa-v1")) || [];
    setWatchHistory(storedData.slice(0, 10));
  }, []);

  return (
    <>
      {watchHistory && watchHistory.length > 0 && (
        <div className="w-full mb-[30px] relative max-w-[1200px] mx-auto px-4">
          <Link
            className="absolute top-[10px] right-[12px] flex items-center text-[13px]
          hover:underline"
            href="/history"
          >
            <span>History</span>
            <ChevronRight size={17} />
          </Link>

          <div
            className="relative h-[40px] bg-gradient-to-l
        from-transparent to-backgroundHover max-w-fit mb-[10px] p-2 flex
        items-center font-[700] text-[18px] rounded-l-md gap-2"
          >
            <div className="h-[30px] w-[8px] rounded-full bg-main"></div>
            <h2>Continue Watching</h2>
          </div>

          <div className="relative">
            <button
              onClick={() =>
                document
                  .getElementById("scroll-container")
                  .scrollBy({ left: -300, behavior: "smooth" })
              }
              className="absolute left-[210px] top-[-45px]
              bg-backgroundHover hover:bg-separatorOnBackgroundtwo
              text-white p-1 rounded-full hidden md:block hover:bg-gray-700
              transition-colors"
            >
              <ChevronLeft />
            </button>

            <div
              id="scroll-container"
              className="flex overflow-x-auto scroll-smooth no-scrollbar
              space-x-2 "
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch"
              }}
            >
              {watchHistory.map(anime => {
                const epDate = new Date(anime.eps[0].date);
                epDate.setHours(0, 0, 0, 0); // Reset time to midnight

                const today = new Date();
                today.setHours(0, 0, 0, 0); // Reset time to midnight

                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);

                let formattedDate;
                if (epDate.getTime() === today.getTime()) {
                  formattedDate = "Today";
                } else if (epDate.getTime() === yesterday.getTime()) {
                  formattedDate = "Yesterday";
                } else {
                  formattedDate = epDate.toLocaleDateString("en-GB", {
                    day: "numeric", // No leading zeros
                    month: "short",
                    year: "2-digit"
                  }); // Example: "8 January, 25"
                }

                // Format time without leading zeros
                const formattedTime = new Date(
                  anime.eps[0].date
                ).toLocaleTimeString("en-US", {
                  hour: "numeric", // No leading zeros
                  minute: "2-digit",
                  hour12: true
                });

                const getSepa = () => {
                  if (
                    formattedDate === "Today" ||
                    formattedDate === "Yesterday"
                  ) {
                    return ",";
                  } else {
                    return " -";
                  }
                };

                return (
                  <Link
                    key={anime.animeId}
                    className="w-[280px] shrink-0 bg-background rounded-xl
              overflow-hidden p-3 flex relative card-item"
                    href={`/watch/${anime.animeId}`}
                  >
                    <img
                      src={anime.poster}
                      alt={anime.animeEngName}
                      className="w-16 h-24 object-cover rounded-lg"
                    />

                    <div className="px-2">
                      <h3 className="text-md font-bold text-white line-clamp-2">
                        {anime.animeEngName}
                      </h3>
                      <p className="text-xs text-gray-400 mt-2">
                        Last watched{" "}
                        <span className="font-bold underline">
                          Episode {anime.lastEp.epNum}
                        </span>
                      </p>
                      <p className="text-xs font-mono text-gray-500">
                        {formattedDate}
                        {getSepa()} {formattedTime}
                      </p>
                    </div>

                    <div
                      className="absolute right-2 bottom-2 bg-main
                    rounded-xl p-2"
                    >
                      <Play size={24} />
                    </div>
                  </Link>
                );
              })}
            </div>

            <button
              onClick={() =>
                document
                  .getElementById("scroll-container")
                  .scrollBy({ left: 300, behavior: "smooth" })
              }
              className="absolute left-[250px] top-[-45px]
              bg-backgroundHover hover:bg-separatorOnBackgroundtwo
              text-white p-1 rounded-full hidden md:block hover:bg-gray-700
              transition-colors"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContinueWatching;
