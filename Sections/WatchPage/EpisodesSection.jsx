"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Search, Plus } from "lucide-react";

const EpisodeSection = ({
  episodes,
  currentEpisode,
  handleEpisodeChange,
  watchedEpisodes,
  targetHeight,
  isEpAnnouncementCollapsed
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEpisode, setFilteredEpisode] = useState(null);
  const [maxHeight, setMaxHeight] = useState("500px");
  const dropdownRef = useRef(null);
  const currentEpisodeRef = useRef(null);

  const episodesPerPage = 100;
  const totalPages = Math.ceil(episodes.length / episodesPerPage);

  useEffect(() => {
    const calculateMaxHeight = () => {
      if (window.innerWidth > 1280 && targetHeight > 0) {
        setMaxHeight(`${targetHeight - 200}px`);
      } else {
        setMaxHeight("500px");
      }
    };

    // Initial calculation
    calculateMaxHeight();

    // Recalculate on resize
    window.addEventListener("resize", calculateMaxHeight);

    return () => {
      window.removeEventListener("resize", calculateMaxHeight);
    };
  }, [targetHeight]);

  const handlePageChange = page => {
    setCurrentPage(page);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Determine the default page based on currentEpisode
    if (currentEpisode) {
      const episodeIndex = episodes.findIndex(
        ep => ep.episodeId === currentEpisode
      );
      if (episodeIndex >= 0) {
        const defaultPage = Math.floor(episodeIndex / episodesPerPage);
        setCurrentPage(defaultPage);
      }
    }
  }, [currentEpisode, episodes]);

  const handleSearch = event => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query) {
      const matchingEpisode = episodes.find(
        episode => episode.number === parseInt(query)
      );
      setFilteredEpisode(matchingEpisode || null);
    } else {
      setFilteredEpisode(null);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredEpisode(null);
  };

  const currentEpisodes = episodes.slice(
    currentPage * episodesPerPage,
    (currentPage + 1) * episodesPerPage
  );

  // Auto-scroll to current episode
  useEffect(() => {
    const container = currentEpisodeRef.current?.parentNode;
    if (container && currentEpisodeRef.current) {
      const elementOffsetTop = currentEpisodeRef.current.offsetTop;

      container.scrollTo({
        top: elementOffsetTop - 14,
        behavior: "smooth"
      });
    }
  }, [currentEpisode, currentPage]); // Added currentPage dependency

  return (
    <div className="bg-background">
      <div className="">
        <div
          className="w-full h-[38px] bg-background flex
              justify-between items-center border-b-2
            border-separatorOnBackgroundtwo pb-1"
        >
          <div className="flex items-center bg-backgroundHover rounded">
            <span className="text-[14px] font-[600]">
              {/* Dropdown for Page Selection */}
              <div className="relative inline-block">
                <div
                  className="text-white py-0.5"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span
                    className="text-[16px] flex gap-2 py-0.5 px-3
                items-center cursor-pointer"
                  >
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
                    <span className="text-foreground">
                      Episodes: {currentPage * episodesPerPage + 1} -{" "}
                      {Math.min(
                        (currentPage + 1) * episodesPerPage,
                        episodes.length
                      )}
                    </span>

                    <Plus size={18} />
                  </span>
                </div>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-[28px] left-[0px] bg-background border
                  shadow-lg mt-2 z-[12] overflow-y-auto rounded max-h-[200px]"
                  >
                    {Array.from({ length: totalPages }, (_, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-backgroundHover cursor-pointer"
                        onClick={() => handlePageChange(index)}
                      >
                        {index * episodesPerPage + 1} -{" "}
                        {Math.min(
                          (index + 1) * episodesPerPage,
                          episodes.length
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </span>
          </div>
          <div className="relative flex items-center">
            <input
              type="number"
              placeholder="Search ep..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-[140px] h-[30px] rounded
                  bg-backgroundHover outline-0 pr-[10px] pl-[26px] text-[14px]"
            />
            <Search className="absolute left-[4px]" size={18} />
            {searchQuery && (
              <div
                onClick={clearSearch}
                className="absolute right-1.5 text-foreground cursor-pointer
                bg-[#ff1717] rounded"
              >
                <X size={18} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="flex flex-wrap bg-episodeContainerBackground gap-1.5 overflow-y-auto
              relative scrollbar-thin scrollbar-thumb-backgroundHover
          scrollbar-track-background p-2"
        style={{ maxHeight }}
      >
        {/* Overlay for search */}
        {filteredEpisode && (
          <div
            className="absolute inset-0 bg-episodeContainerBackground bg-opacity-80
          backdrop-blur-sm z-10 flex justify-center pt-4 md:pt-0 md:items-center"
          >
            <div
              className={`w-[58px] h-[32px] flex cursor-pointer hover:bg-main items-center justify-center
              rounded
              ${filteredEpisode.episodeId === currentEpisode
                  ? "bg-main"
                  : watchedEpisodes.includes(filteredEpisode.episodeId)
                    ? "bg-watchedEpisodeBackground border-[1px] border-[#e2e2e2]"
                    : filteredEpisode.isFiller
                      ? "bg-fillerEpisodeBackground"
                      : "bg-episodeBackground"
                }
              `}
              onClick={() => handleEpisodeChange(filteredEpisode.episodeId)}
            >
              <span className="text-[12px] font-[800] text-[#f4f4f4]">
                {filteredEpisode.number}
              </span>
            </div>
          </div>
        )}
        {searchQuery && !filteredEpisode && (
          <div className="absolute inset-0 bg-episodeBackground bg-opacity-80 backdrop-blur-sm z-10 flex justify-center items-center">
            <span className="text-white text-[10px] font-bold">
              No episode found with the number "{searchQuery}"
            </span>
          </div>
        )}

        {/* Episodes Display */}
        {currentEpisodes.map(episode => (
          <div
            key={episode.episodeId}
            ref={
              episode.episodeId === currentEpisode ? currentEpisodeRef : null
            }
            className={`w-[58px] h-[32px] flex items-center justify-center cursor-pointer rounded ${episode.episodeId === currentEpisode
              ? "bg-main hover:bg-dimmerMain"
              : watchedEpisodes.includes(episode.episodeId)
                ? "bg-watchedEpisodeBackground hover:bg-main"
                : episode.isFiller
                  ? "bg-fillerEpisodeBackground hover:bg-main"
                  : "bg-episodeBackground hover:bg-main"
              }`}
            onClick={() => handleEpisodeChange(episode.episodeId)}
          >
            <span
              className={`text-[12px] font-[800]
                ${episode.episodeId === currentEpisode
                  ? "text-foreground"
                  : watchedEpisodes.includes(episode.episodeId)
                    ? "text-watchedEpisodeForeground"
                    : "text-episodeForeground"
                }
                `}
            >
              {episode.number}
            </span>
          </div>
        ))}

        {/* ghost box to scroll up so last episode isn't hidden by sticky headers */}
        <div
          aria-hidden="true"
          className={`w-full flex-shrink-0 ${isEpAnnouncementCollapsed ? "h-[26px]" : "h-[96px]"
            }`}
        />
      </div>
    </div>
  );
};

export default EpisodeSection;
