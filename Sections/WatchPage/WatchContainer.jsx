"use client";

import axios from "axios";
import { useState, useEffect, useRef } from "react";

import CustomVideoPlayer from "./VideoPlayer/CustomVideoPlayer.jsx";
import Loader from "../Universal/Loader.jsx";

import { TriangleAlert, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import EpisodeSection from "./EpisodesSection.jsx";
import LessThenFiftyEpisodeSection from "./LessThenFiftyEpisodesSection.jsx";
import SeasonsCarousel from "./AnimePageSeasonsCarousel.jsx";

import ArtplayerPlayer from '@/components/ArtplayerPlayer';

import MineConfig from "@/mine.config.js";
const { backendUrl } = MineConfig;


const WatchContainer = ({
  episodes,
  animeId,
  animeInfoData,
  seasons,
  getutilsData
}) => {
  const targetRef = useRef(null);

  // State for dynamic functionality
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isFirstEpisode, setIsFirstEpisode] = useState(false);
  const [isLastEpisode, setIsLastEpisode] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [selectedServer, setSelectedServer] = useState(null);
  const [streamingData, setStreamingData] = useState(null);
  const [servers, setServers] = useState({ sub: [], dub: [], raw: [] });
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [skipIntroOutro, setSkipIntroOutro] = useState(true);

  const [resfreshToggle, setResfreshToggle] = useState(false);

  const [noServerSelected, setNoServerSelected] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("language") || "sub"
      : "sub"
  );
  const [watchedEpisodes, setWatchedEpisodes] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedWatchedEpisodes = JSON.parse(
        localStorage.getItem("watchedEpisodes") || "[]"
      );
      setWatchedEpisodes(savedWatchedEpisodes);
    }
  }, [currentEpisode]);

  const [targetHeight, setTargetHeight] = useState(0);

  useEffect(() => {
    if (!episodes || episodes.length === 0) return;

    const watchingKey = `currentWatchingEpisode:${animeId}`;
    const savedEpisodeId = localStorage.getItem(watchingKey);
    const validEpisode = episodes.find(ep => ep.episodeId === savedEpisodeId);

    setCurrentEpisode(validEpisode ? savedEpisodeId : episodes[0]?.episodeId);
  }, [animeId, episodes]);

  // Fetch servers and update state when the current episode or language changes
  const fetchServers = async episodeId => {
    try {
      setLoadingVideo(true);
      const f = await axios.get(`/api/mantox/get/servers/${episodeId}`);

      const data = f.data.data;

      const localStorageKey = `selectedServer:${episodeId}:${selectedLanguage}`;
      const savedServer = localStorage.getItem(localStorageKey);
      const validServers = data[selectedLanguage] || [];
      const initialServer =
        validServers.find(server => server.serverName === savedServer)
          ?.serverName || validServers[0]?.serverName;

      setSelectedServer(initialServer || null);
    } catch (error) {
      console.error("Error fetching servers:", error);
    }
  };

  useEffect(() => {
    if (!currentEpisode || !selectedServer) return;

    const fetchStreamingData = async () => {
      setLoadingVideo(true);
      try {
        const fd = await axios.get(
          `${backendUrl}/api/mantox/episode/sources/${currentEpisode}&s=${selectedServer}&c=${selectedLanguage}`
        );

        const rawData = fd.data || {};

        // Normalize streaming data for Artplayer
        // Ensure sources array has proper structure with isM3U8 flag
        let sources = [];
        if (rawData.sources && Array.isArray(rawData.sources)) {
          sources = rawData.sources.map(src => ({
            url: src.url || src.file || "",
            file: src.url || src.file || "",
            label: src.label || src.quality || "Source",
            isM3U8: (src.url || src.file || "").toLowerCase().includes(".m3u8")
          }));
        }

        // Normalize tracks (subtitles)
        let tracks = [];
        if (rawData.tracks && Array.isArray(rawData.tracks)) {
          tracks = rawData.tracks.map(track => ({
            url: track.url || track.file || "",
            file: track.url || track.file || "",
            label: track.label || track.lang || track.language || "Subtitle",
            lang: track.lang || track.language || track.label || "Unknown"
          }));
        }

        // Prefer English subtitles
        if (tracks.length > 0) {
          const englishTrackIdx = tracks.findIndex(t =>
            /english|eng|en\b/i.test(t.lang || t.label || "")
          );
          if (englishTrackIdx > 0) {
            const englishTrack = tracks.splice(englishTrackIdx, 1)[0];
            tracks.unshift(englishTrack);
          }
        }

        setStreamingData({
          sources: sources.length > 0 ? sources : [],
          tracks: tracks.length > 0 ? tracks : [],
          intro: rawData.intro || undefined,
          outro: rawData.outro || undefined
        });

        // console.log("Normalized streaming data:", { sources, tracks });
      } catch (error) {
        console.error("Error fetching streaming data:", error);

        // Provide a safe fallback so the player can still render without crashing.
        // The player expects at least `sources` and `tracks` arrays on `data`.
        setStreamingData({ sources: [], tracks: [] });
      } finally {
        setLoadingVideo(false);
      }
    };

    fetchStreamingData();
  }, [currentEpisode, selectedServer, selectedLanguage, resfreshToggle]);

  // Handle episode changes
  const handleEpisodeChange = episodeId => {
    setLoadingVideo(true);
    setCurrentEpisode(episodeId);

    // Save the current episode in localStorage
    const watchingKey = `currentWatchingEpisode:${animeId}`;
    localStorage.setItem(watchingKey, episodeId);

    // Update watched episodes
    const watchedEpisodes = JSON.parse(
      localStorage.getItem("watchedEpisodes") || "[]"
    );
    if (!watchedEpisodes.includes(episodeId)) {
      watchedEpisodes.push(episodeId);
      localStorage.setItem("watchedEpisodes", JSON.stringify(watchedEpisodes));
    }
  };

  // Handle next and previous episodes
  const handleNextEpisode = () => {
    setLoadingVideo(true);
    const currentIndex = episodes.findIndex(
      ep => ep.episodeId === currentEpisode
    );
    if (currentIndex < episodes.length - 1) {
      handleEpisodeChange(episodes[currentIndex + 1].episodeId);
    }
  };

  const handlePreviousEpisode = () => {
    setLoadingVideo(true);
    const currentIndex = episodes.findIndex(
      ep => ep.episodeId === currentEpisode
    );
    if (currentIndex > 0) {
      handleEpisodeChange(episodes[currentIndex - 1].episodeId);
    }
  };

  const handleLanguageChange = language => {
    setLoadingVideo(true);
    setSelectedLanguage(language);
    localStorage.setItem("language", language);
  };

  const handleServerChange = serverName => {
    setLoadingVideo(true);
    setSelectedServer(serverName);

    // Save the selected server to local storage
    const localStorageKey = `selectedServer:${currentEpisode}:${selectedLanguage}`;
    localStorage.setItem(localStorageKey, serverName);
  };

  // Update dynamic states based on current episode
  useEffect(() => {
    if (!episodes || episodes.length === 0 || !currentEpisode) return;

    // Check if the current episode is the first
    setIsFirstEpisode(currentEpisode === episodes[0]?.episodeId);

    // Check if the current episode is the last
    setIsLastEpisode(
      currentEpisode === episodes[episodes.length - 1]?.episodeId
    );
  }, [episodes, currentEpisode]);

  // Fetch servers whenever current episode or language changes
  useEffect(() => {
    if (currentEpisode) {
      fetchServers(currentEpisode);
    }
  }, [currentEpisode, selectedLanguage]);

  useEffect(() => {
    if (!currentEpisode) return;

    const fetchServers = async episodeId => {
      try {
        const fetchedData = await axios.get(
          `/api/mantox/get/servers/${episodeId}`
        );

        const data = fetchedData.data.data;
        setServers({ sub: data.sub, dub: data.dub, raw: data.raw });

        const localStorageKey = `selectedServer:${episodeId}:${selectedLanguage}`;
        const savedServer = localStorage.getItem(localStorageKey);

        // Validate saved server
        const validServers = data[selectedLanguage] || [];
        const initialServer =
          validServers.find(server => server.serverName === savedServer)
            ?.serverName || validServers[0]?.serverName;

        setSelectedServer(initialServer || null);
      } catch (error) {
        console.error("Error fetching servers:", error);
      }
    };

    fetchServers(currentEpisode);
  }, [currentEpisode, selectedLanguage]);

  useEffect(() => {
    if (
      !servers ||
      (!servers.sub?.length && !servers.dub?.length && !servers.raw?.length)
    )
      return;

    if (selectedLanguage === "sub" && servers.sub.length > 0) {
      setNoServerSelected(false);
      return;
    } else if (selectedLanguage === "dub" && servers.dub.length > 0) {
      setNoServerSelected(false);
      return;
    } else if (selectedLanguage === "raw" && servers.raw.length > 0) {
      setNoServerSelected(false);
      return;
    } else {
      setNoServerSelected(true);
    }
  }, [servers, selectedLanguage]);

  const ToggleAutoPlay = () => {
    if (autoPlay) {
      setAutoPlay(false);
    } else {
      setAutoPlay(true);
    }
  };

  const handleAutoPlay = () => {
    if (autoPlay) {
      const currentIndex = episodes.findIndex(
        ep => ep.episodeId === currentEpisode
      );
      if (currentIndex < episodes.length - 1) {
        handleEpisodeChange(episodes[currentIndex + 1].episodeId);
      }
    } else {
      return;
    }
  };

  const ToggleSkipIntroOutro = () => {
    if (skipIntroOutro) {
      setSkipIntroOutro(false);
    } else {
      setSkipIntroOutro(true);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        // Enter fullscreen mode
        await targetRef.current.requestFullscreen();

        // Lock the screen orientation to landscape
        if (screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock("landscape");
        }
        setIsFullScreen(true);
      } else {
        // Exit fullscreen mode
        document.exitFullscreen();

        // Unlock orientation (optional, depends on your app's requirements)
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
        }
        setIsFullScreen(false);
      }
    } catch (err) {
      console.error("Error toggling fullscreen or locking orientation:", err);
    }
  };

  useEffect(() => {
    if (targetRef.current) {
      setTargetHeight(targetRef.current.offsetHeight); // Set the target div's height
    }

    const handleResize = () => {
      if (targetRef.current) {
        setTargetHeight(targetRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const updateContinueWatching = () => {
      if (!currentEpisode || !animeInfoData || !episodes) return;

      try {
        // Get current episode details
        const currentEpNum = episodes.find(
          ep => ep.episodeId === currentEpisode
        )?.number;

        // Get existing data from localStorage
        const conWaData = JSON.parse(localStorage.getItem("conWa-v1") || "[]");

        // Find anime index in array
        const animeIndex = conWaData.findIndex(
          item => item.animeId === animeId
        );

        // Get current date (set to midnight for grouping by day)
        const currentTime = Date.now();
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Normalize to start of the day (timestamp)

        const newEntry = {
          animeId,
          animeEngName: animeInfoData.anime.info.name,
          animeJpName: "",
          poster: animeInfoData.anime.info.poster,
          lastEp: {
            epId: currentEpisode,
            epNum: currentEpNum
          },
          date: currentDate.getTime(), // Store date for grouping
          eps: [
            {
              ep: currentEpNum,
              date: currentTime
            }
          ]
        };

        if (animeIndex === -1) {
          // Add new anime entry
          conWaData.unshift(newEntry);
        } else {
          // Update existing entry
          const existing = conWaData[animeIndex];

          // Update last episode info
          existing.lastEp = newEntry.lastEp;

          // Check if episode already exists in history
          const existingEpIndex = existing.eps.findIndex(
            e => e.ep === currentEpNum
          );

          if (existingEpIndex === -1) {
            existing.eps.unshift({
              ep: currentEpNum,
              date: currentTime
            });
          } else {
            // Update timestamp if already exists
            existing.eps[existingEpIndex].date = currentTime;
          }

          // Ensure unique episodes and limit history
          existing.eps = existing.eps
            .filter((v, i, a) => a.findIndex(t => t.ep === v.ep) === i)
            .slice(0, 50); // Keep last 50 unique episodes

          // Always update the date to the latest watch date
          existing.date = currentDate.getTime();

          // Move to front of array
          conWaData.splice(animeIndex, 1);
          conWaData.unshift(existing);
        }

        // Limit to 30 unique anime entries
        const uniqueAnime = conWaData
          .filter((v, i, a) => a.findIndex(t => t.animeId === v.animeId) === i)
          .slice(0, 30);

        localStorage.setItem("conWa-v1", JSON.stringify(uniqueAnime));
      } catch (error) {
        console.error("Error updating continue watching:", error);
      }
    };

    // Run whenever current episode changes
    updateContinueWatching();
  }, [currentEpisode, animeId, episodes, animeInfoData]);

  const artWorkUrl = animeInfoData.anime.info.poster;
  const animeNameFF = animeInfoData.anime.info.name || "";

  return (
    <>
      <div
        className="flex justify-center lg:flex-row flex-col gap-4 md:px-6
        bg-backgroundtwo"
      >
        <div className="flex-1 md:min-w-[400px] lg:max-w-[940px]">

          <div ref={targetRef}>
            {/* Show loader when loading video */}
            {loadingVideo && (
              <AspectRatio
                ratio={16 / 9}
                className="bg-[#070707] flex justify-center items-center"
              >
                <Loader />
              </AspectRatio>
            )}

            {/* Show error when no server selected */}
            {!loadingVideo && noServerSelected && (
              <AspectRatio
                ratio={16 / 9}
                className="bg-[#0f0f0f] flex flex-col justify-center items-center"
              >
                <span className="text-[16px] flex items-center gap-2 text-[#efefef] font-[800]">
                  <TriangleAlert size={24} /> No selected server.
                </span>
                <span className="text-[10px] text-[#cccccc] mt-1">
                  Please select from available server(s) [ SUB / DUB ].
                </span>
              </AspectRatio>
            )}

            {/* Show error when sources are empty */}
            {!loadingVideo && !noServerSelected && streamingData && (!streamingData.sources || streamingData.sources.length === 0) && (
              <AspectRatio
                ratio={16 / 9}
                className="bg-[#1a1a1a] flex flex-col justify-center items-center gap-1"
              >
                <span className="text-[16px] flex items-center gap-1 text-[#efefef] font-[800]">
                  <TriangleAlert size={24} /> Something went wrong!
                </span>
                <span className="text-[10px] text-[#cccccc]">
                  This usually happens when video server is down.
                </span>
                <span className="text-[10px] text-[#cccccc]">
                  You can try refreshing the page
                </span>
                <button
                  onClick={() => setResfreshToggle(prev => !prev)}
                  className="flex items-center gap-2 px-3 py-1 bg-foreground text-background rounded-md mt-4 font-bold hover:opacity-80 transition-opacity"
                >
                  <RefreshCw size={20} />
                  Refresh
                </button>
              </AspectRatio>
            )}

            {/* Show error when first source is not M3U8 */}
            {!loadingVideo && !noServerSelected && streamingData && streamingData.sources && streamingData.sources.length > 0 && streamingData.sources[0].isM3U8 === false && (
              <AspectRatio
                ratio={16 / 9}
                className="bg-[#1a1a1a] flex flex-col justify-center items-center gap-1"
              >
                <span className="text-[16px] flex items-center gap-1 text-[#efefef] font-[800]">
                  <TriangleAlert size={24} /> Server busy!
                </span>
                <span className="text-[10px] text-[#cccccc]">
                  Please switch to different server.
                </span>
              </AspectRatio>
            )}

            {/* Only render player when everything is valid */}
            {!loadingVideo && !noServerSelected && streamingData && streamingData.sources && streamingData.sources.length > 0 && streamingData.sources[0].isM3U8 !== false && (
              <ArtplayerPlayer
                key={`${currentEpisode}-${selectedServer}-${selectedLanguage}`}
                data={streamingData}
                episodeNumber={
                  episodes.find(ep => ep.episodeId === currentEpisode)?.number
                }
                episodeName={
                  episodes
                    .find(ep => ep.episodeId === currentEpisode)
                    ?.title.match(/Episode \d+/i)
                    ? ""
                    : episodes.find(ep => ep.episodeId === currentEpisode)?.title
                }
                handleNextEpisode={handleNextEpisode}
                handlePreviousEpisode={handlePreviousEpisode}
                skipIntroOutro={skipIntroOutro}
                toggleFullscreen={toggleFullscreen}
                isFullScreen={isFullScreen}
                isLastEpisode={isLastEpisode}
                isFirstEpisode={isFirstEpisode}
                artWorkUrl={artWorkUrl}
                animeNameFF={animeNameFF}
                animeId={animeId}
              />
            )}
          </div>


          <div
            className="flex items-center justify-between h-[40px]
            bg-background px-2 md:px-4 border-b-[1px] border-separatorOnBackgroundtwo"
          >
            <div className="flex gap-1 justify-center">
              {/* Auto play next episode button or message */}
              <div
                className="flex gap-1 items-center
                  cursor-pointer active:bg-backgroundHover
                  md:hover:bg-backgroundHover
                  px-2 py-1 rounded-lg"
                onClick={ToggleAutoPlay}
              >
                <span className="text-[9px] md:text-[12px]">Auto Next: </span>
                <span
                  className={`text-[9px] md:text-[12px] text-dimmerMain w-[20px] ${autoPlay ? "text-main font-[800]" : "text-dimmerMain"
                    }`}
                >
                  {autoPlay ? "ON" : "OFF"}
                </span>
              </div>
              <div
                className="flex gap-1 items-center justify-center
                  cursor-pointer active:bg-backgroundHover
                  md:hover:bg-backgroundHover
                  px-2 py-1 rounded-lg"
                onClick={ToggleSkipIntroOutro}
              >
                <span className="text-[9px] md:text-[12px]">
                  Skip Intro & Outro:{" "}
                </span>
                <span
                  className={`text-[9px] md:text-[12px] text-dimmerMain ${skipIntroOutro ? "text-main font-[800]" : "text-dimmerMain"
                    }`}
                >
                  {skipIntroOutro ? "ON" : "OFF"}
                </span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              {!isFirstEpisode && (
                <div
                  onClick={handlePreviousEpisode}
                  className="flex items-center cursor-pointer
                  active:bg-backgroundHover md:hover:bg-backgroundHover
                  rounded-lg"
                >
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                    className="h-[28px]"
                    style={{ fill: "var(--foreground)" }}
                  >
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      stroke="none"
                    >
                      <path
                        d="M1613 3815 c-56 -28 -95 -77 -112 -140 -15 -56 -15 -2174 0 -2230 17
-63 56 -112 112 -140 79 -39 163 -30 230 26 72 59 71 55 77 535 l5 432 574
-474 c379 -313 593 -483 630 -500 209 -99 471 -14 568 184 l28 57 0 995 0 995
-28 57 c-57 116 -171 197 -311 221 -81 14 -180 0 -257 -37 -37 -17 -251 -187
-630 -500 l-574 -474 -5 432 c-6 480 -5 476 -77 535 -67 56 -151 65 -230 26z"
                      />
                    </g>
                  </svg>

                  <span className="hidden md:flex text-[11px] pr-2">
                    Previous
                  </span>
                </div>
              )}

              {!isFirstEpisode && !isLastEpisode && (
                <div
                  className="h-[24px] w-[4px] rounded-lg
    bg-separatorOnBackground hidden
    md:flex"
                ></div>
              )}

              {!isLastEpisode && (
                <div
                  onClick={handleNextEpisode}
                  className="flex items-center cursor-pointer
                  active:bg-backgroundHover md:hover:bg-backgroundHover
                  rounded-lg"
                >
                  <span className="hidden md:flex text-[11px] pl-2">Next</span>

                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                    className="h-[28px]"
                    style={{ fill: "var(--foreground)" }}
                  >
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      stroke="none"
                    >
                      <path
                        d="M1691 3825 c-121 -34 -210 -107 -259 -213 l-27 -57 0 -995 0 -995 27
-57 c93 -200 349 -284 560 -184 35 16 227 168 534 421 263 218 523 432 577
476 l97 80 0 -417 c0 -301 3 -428 12 -458 25 -81 118 -146 210 -146 83 0 173
75 197 165 15 56 15 2174 0 2230 -17 63 -56 112 -112 140 -79 39 -163 30 -230
-26 -72 -59 -71 -55 -77 -535 l-5 -431 -550 454 c-302 250 -569 468 -591 483
-99 69 -251 96 -363 65z"
                      />
                    </g>
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div
            className="flex flex-col items-center pt-4 gap-4
            bg-background"
          >
            <div className="flex flex-col items-center gap-1 cursor-default">
              <div className="flex gap-2 justify-center items-center">
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512.000000 512.000000"
                  preserveAspectRatio="xMidYMid meet"
                  className="h-[14px]"
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

                <span className="leading-none text-[12px] font-[800]">
                  {episodes.find(ep => ep.episodeId === currentEpisode)
                    ?.isFiller && <span>Filler </span>}
                  Episode{" "}
                  {episodes.find(ep => ep.episodeId === currentEpisode)?.number}
                </span>
              </div>
              <div className="flex flex-col mt-0.5">
                <div
                  className="h-1 w-[64px] bg-[#0d131a] self-left md:h-0 md:w-0
                rounded-lg"
                ></div>
                <div className="bg-[#0d131a] self-left md:h-1 md:w-[64px] rounded-lg"></div>
              </div>
              <div>
                <span className="leading-none text-[13px] font-[300]">
                  {episodes
                    .find(ep => ep.episodeId === currentEpisode)
                    ?.title.match(/Episode \d+/i)
                    ? "" // You can also use any alternative text here, like "Untitled"
                    : episodes.find(ep => ep.episodeId === currentEpisode)
                      ?.title}
                </span>
              </div>
            </div>
            <Tabs
              defaultValue={selectedLanguage}
              onValueChange={handleLanguageChange}
              className="w-full flex flex-col justify-center items-center
              p-4
              bg-backgroundtwo
              "
            >
              <TabsList className="flex gap-2 bg-background">
                {Array.isArray(servers.dub) && servers.sub.length > 0 && (
                  <TabsTrigger
                    value="sub"
                    className="flex gap-2
                      bg-background
                    hover:bg-backgroundHover
                    data-[state=active]:bg-backgroundtwo w-[130px]"
                  >
                    <div>
                      <span
                        className="text-[#242424] text-[12px] bg-[#0bff77] p-0.5
                        px-[3px]
                    rounded-[2px] font-[900]"
                      >
                        JP
                      </span>
                    </div>
                    <span className="text-[14px]">SUB</span>
                  </TabsTrigger>
                )}

                {Array.isArray(servers.dub) && servers.dub.length > 0 && (
                  <TabsTrigger
                    value="dub"
                    className="flex gap-2
                    bg-background
                    hover:bg-backgroundHover
                    data-[state=active]:bg-backgroundtwo w-[120px]"
                  >
                    <div>
                      <span
                        className="text-[#242424] text-[13px] bg-[#ff9c0b] p-0.5
                    rounded-[2px] font-[900]"
                      >
                        EN
                      </span>
                    </div>
                    <span className="text-[14px]">DUB</span>
                  </TabsTrigger>
                )}

                {Array.isArray(servers.raw) && servers.raw.length > 0 && (
                  <TabsTrigger
                    value="raw"
                    className="flex gap-2
                      bg-background
                    hover:bg-backgroundHover
                    data-[state=active]:bg-backgroundtwo w-[130px]"
                  >
                    <div>
                      <span
                        className="text-[#242424] text-[12px] bg-[#0bff77] p-0.5
                        px-[3px]
                    rounded-[2px] font-[900]"
                      >
                        JP
                      </span>
                    </div>
                    <span className="text-[14px]">RAW</span>
                  </TabsTrigger>
                )}
              </TabsList>
              {Array.isArray(servers.dub) && servers.sub.length > 0 && (
                <TabsContent value="sub" className="flex gap-2">
                  {servers.sub.map(server => (
                    <div
                      key={server.serverId}
                      className={`px-2 py-1 flex justify-center w-max rounded
                      cursor-pointer ${selectedServer === server.serverName
                          ? "bg-main text-foreground font-[800]"
                          : "bg-background hover:bg-backgroundHover"
                        }`}
                      onClick={() => handleServerChange(server.serverName)}
                    >
                      <span className="text-bold text-[12px]">
                        {server.serverName.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </TabsContent>
              )}

              {Array.isArray(servers.dub) && servers.dub.length > 0 && (
                <TabsContent value="dub" className="flex gap-2">
                  {servers.dub.map(server => (
                    <div
                      key={server.serverId}
                      className={`px-2 py-1 flex justify-center w-max rounded
                      cursor-pointer ${selectedServer === server.serverName
                          ? "bg-main text-foreground font-[800]"
                          : "bg-background hover:bg-backgroundHover"
                        }`}
                      onClick={() => handleServerChange(server.serverName)}
                    >
                      <span className="text-bold text-[12px]">
                        {server.serverName.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </TabsContent>
              )}

              {Array.isArray(servers.raw) && servers.raw.length > 0 && (
                <TabsContent value="raw" className="flex gap-2">
                  {servers.raw.map(server => (
                    <div
                      key={server.serverId}
                      className={`px-2 py-1 flex justify-center w-max rounded
                      cursor-pointer ${selectedServer === server.serverName
                          ? "bg-main text-foreground font-[800]"
                          : "bg-background hover:bg-backgroundHover"
                        }`}
                      onClick={() => handleServerChange(server.serverName)}
                    >
                      <span className="text-bold text-[12px]">
                        {server.serverName.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>

        {/* episodes starts here */}

        <div>
          <div className="lg:max-w-[400px] mt-2">
            {episodes.length > 50 ? (
              <EpisodeSection
                episodes={episodes}
                currentEpisode={currentEpisode}
                handleEpisodeChange={handleEpisodeChange}
                watchedEpisodes={watchedEpisodes}
                targetHeight={targetHeight}
                getutilsData={getutilsData}
              />
            ) : (
              <LessThenFiftyEpisodeSection
                episodes={episodes}
                currentEpisode={currentEpisode}
                handleEpisodeChange={handleEpisodeChange}
                watchedEpisodes={watchedEpisodes}
                targetHeight={targetHeight}
                getutilsData={getutilsData}
              />
            )}
          </div>
          <div
            className="h-[12px] w-full bg-background border-b-2
            border-separatorOnBackgroundtwo"
          ></div>
        </div>
      </div>
    </>
  );
};

export default WatchContainer;
