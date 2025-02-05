"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Search } from "lucide-react";

const LessThenFiftyEpisodeSectionWithSearch = ({
  episodes,
  currentEpisode,
  handleEpisodeChange,
  watchedEpisodes,
  targetHeight
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredEpisode, setFilteredEpisode] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const currentEpisodeRef = useRef(null);

  const handleSearch = e => {
    const value = e.target.value;
    setSearchValue(value);

    if (value) {
      const episode = episodes.find(ep => ep.number === parseInt(value));
      setFilteredEpisode(episode || null);
      setShowOverlay(true);
    } else {
      setFilteredEpisode(null);
      setShowOverlay(false);
    }
  };

  const clearSearch = () => {
    setSearchValue("");
    setFilteredEpisode(null);
    setShowOverlay(false);
  };

  // copied from chat GPT
  useEffect(() => {
    const container = currentEpisodeRef.current?.parentNode; // Get the container element
    if (container && currentEpisodeRef.current) {
      const elementOffsetTop = currentEpisodeRef.current.offsetTop;

      // Smoothly scroll the container to bring the current episode into view with a 14px offset
      container.scrollTo({
        top: elementOffsetTop - 14, // Adjusted scroll position
        behavior: "smooth" // Enable smooth scrolling
      });
    }
  }, [currentEpisode]);

  return (
    <div
      className="flex flex-col gap-2 bg-background border-t-2
            border-separatorOnBackgroundtwo w-full md:min-w-[300px]
            lg:max-w-[400px]"
    >
      <div
        className="w-full h-[38px] px-4 bg-background flex
              justify-between items-center border-b-2
            border-separatorOnBackgroundtwo"
      >
        <div className="flex gap-2 items-center">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 297 297"
            className="h-[16px]"
            style={{ fill: "var(--foreground)" }}
          >
            <g>
              <g>
                <g>
                  <path
                    d="M279.368,24.726H102.992c-9.722,0-17.632,7.91-17.632,17.632V67.92c0,9.722,7.91,17.632,17.632,17.632h176.376
				c9.722,0,17.632-7.91,17.632-17.632V42.358C297,32.636,289.09,24.726,279.368,24.726z"
                  />
                  <path
                    d="M279.368,118.087H102.992c-9.722,0-17.632,7.91-17.632,17.632v25.562c0,9.722,7.91,17.632,17.632,17.632h176.376
				c9.722,0,17.632-7.91,17.632-17.632v-25.562C297,125.997,289.09,118.087,279.368,118.087z"
                  />
                  <path
                    d="M279.368,211.448H102.992c-9.722,0-17.632,7.91-17.632,17.633v25.561c0,9.722,7.91,17.632,17.632,17.632h176.376
				c9.722,0,17.632-7.91,17.632-17.632v-25.561C297,219.358,289.09,211.448,279.368,211.448z"
                  />
                  <path
                    d="M45.965,24.726H17.632C7.91,24.726,0,32.636,0,42.358V67.92c0,9.722,7.91,17.632,17.632,17.632h28.333
				c9.722,0,17.632-7.91,17.632-17.632V42.358C63.597,32.636,55.687,24.726,45.965,24.726z"
                  />
                  <path
                    d="M45.965,118.087H17.632C7.91,118.087,0,125.997,0,135.719v25.562c0,9.722,7.91,17.632,17.632,17.632h28.333
				c9.722,0,17.632-7.91,17.632-17.632v-25.562C63.597,125.997,55.687,118.087,45.965,118.087z"
                  />
                  <path
                    d="M45.965,211.448H17.632C7.91,211.448,0,219.358,0,229.081v25.561c0,9.722,7.91,17.632,17.632,17.632h28.333
				c9.722,0,17.632-7.91,17.632-17.632v-25.561C63.597,219.358,55.687,211.448,45.965,211.448z"
                  />
                </g>
              </g>
            </g>
          </svg>
          <span className="text-[12px] font-[600]">Episodes list:</span>
        </div>
        <div className="relative flex items-center">
          <input
            type="number"
            placeholder="Search ep..."
            value={searchValue}
            onChange={handleSearch}
            className="w-[100px] h-[20px] rounded
                  bg-backgroundHover outline-0 pr-[20px] pl-[17px] text-[8px]"
          />
          <Search className="absolute h-[10px] left-[-2px]" />
          {searchValue && (
            <X
              className="absolute right-[4px] cursor-pointer bg-[#ff1717]"
              size={12}
              onClick={clearSearch}
            />
          )}
        </div>
      </div>
      <div
        className="px-2 py-2 flex flex-col gap-1.5 overflow-y-auto
             bg-episodeContainerBackground relative scrollbar-thin
             scrollbar-thumb-backgroundHover
          scrollbar-track-background pr-2"
        style={{
          maxHeight: `${targetHeight + 50}px`
        }}
      >
        {/* Overlay */}
        {showOverlay && (
          <div
            className="absolute inset-0 bg-backgroundtwo bg-opacity-70 backdrop-blur-sm z-10 flex
              items-start pt-4 justify-center"
          >
            {filteredEpisode ? (
              <div
                className={`px-2 py-1 rounded w-full max-w-[300px] ${
                  filteredEpisode.episodeId === currentEpisode
                    ? "bg-main"
                    : watchedEpisodes.includes(filteredEpisode.episodeId)
                    ? "bg-watchedEpisodeBackground border-[1px] border-[#e2e2e2]"
                    : "bg-episodeBackground"
                }`}
                onClick={() => handleEpisodeChange(filteredEpisode.episodeId)}
              >
                {filteredEpisode.episodeId === currentEpisode ? (
                  <div className="flex justify-between items-center">
                    <span className="truncate text-[12px] font-[500] flex gap-3">
                      <span>{filteredEpisode.number}</span>
                      <span>{filteredEpisode.title}</span>
                    </span>

                    <svg
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 200.000000 200.000000"
                      preserveAspectRatio="xMidYMid meet"
                      className="h-[17px]"
                      style={{ fill: "var(--foreground)" }}
                    >
                      <g
                        transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
                        stroke="none"
                      >
                        <path
                          d="M851 1899 c-91 -15 -232 -67 -316 -117 -107 -63 -254 -210 -317 -317
-144 -244 -166 -537 -61 -807 154 -395 600 -635 1018 -549 368 76 640 348 716
716 75 363 -92 749 -413 948 -178 111 -421 160 -627 126z m238 -641 c367 -212
361 -208 361 -257 0 -24 -7 -44 -17 -53 -42 -36 -642 -378 -663 -378 -13 0
-34 10 -47 22 l-23 21 0 388 0 388 26 20 c15 12 36 21 47 21 11 0 153 -77 316
-172z"
                        />
                      </g>
                    </svg>
                  </div>
                ) : (
                  <span
                    className={`flex truncate text-[12px] flex
                        gap-3
                        ${
                          watchedEpisodes.includes(filteredEpisode.episodeId)
                            ? "text-watchedEpisodeForeground"
                            : ""
                        }`}
                  >
                    <span>{filteredEpisode.number}</span>
                    <span>{filteredEpisode.title}</span>
                  </span>
                )}
              </div>
            ) : (
              <div className="text-foreground text-[10px] font-semibold">
                No episode found with the number "{searchValue}"
              </div>
            )}
          </div>
        )}

        {/* Episodes List */}
        {episodes.map(episode => (
          <div
            key={episode.episodeId}
            ref={
              episode.episodeId === currentEpisode ? currentEpisodeRef : null
            }
            className={`px-2 py-1.5 rounded cursor-pointer
              ${
                episode.episodeId === currentEpisode
                  ? "bg-main"
                  : watchedEpisodes.includes(episode.episodeId)
                  ? "bg-watchedEpisodeBackground"
                  : "bg-episodeBackground"
              }`}
            onClick={() => handleEpisodeChange(episode.episodeId)}
          >
            {episode.episodeId === currentEpisode ? (
              <div className="flex justify-between items-center">
                <span className="truncate text-[12px] font-[500] flex gap-3">
                  <span>{episode.number}</span>
                  <span>{episode.title}</span>
                </span>

                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200.000000 200.000000"
                  preserveAspectRatio="xMidYMid meet"
                  className="h-[17px]"
                  style={{ fill: "var(--foreground)" }}
                >
                  <g
                    transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
                    stroke="none"
                  >
                    <path
                      d="M851 1899 c-91 -15 -232 -67 -316 -117 -107 -63 -254 -210 -317 -317
-144 -244 -166 -537 -61 -807 154 -395 600 -635 1018 -549 368 76 640 348 716
716 75 363 -92 749 -413 948 -178 111 -421 160 -627 126z m238 -641 c367 -212
361 -208 361 -257 0 -24 -7 -44 -17 -53 -42 -36 -642 -378 -663 -378 -13 0
-34 10 -47 22 l-23 21 0 388 0 388 26 20 c15 12 36 21 47 21 11 0 153 -77 316
-172z"
                    />
                  </g>
                </svg>
              </div>
            ) : (
              <span
                className={`flex truncate text-[12px] flex
                        gap-3
                        ${
                          watchedEpisodes.includes(episode.episodeId)
                            ? "text-watchedEpisodeForeground"
                            : "episodeForeground"
                        }`}
              >
                <span>{episode.number}</span>
                <span>{episode.title}</span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessThenFiftyEpisodeSectionWithSearch;
