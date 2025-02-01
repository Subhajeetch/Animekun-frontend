"use client";

import axios from "axios";
import { useState, useEffect, useRef } from "react";

import VideoPlayer from "./VideoPlayer/VideoPlayer.jsx";
import Loader from "../Universal/Loader.jsx";

import { TriangleAlert } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import EpisodeSection from "./EpisodesSection.jsx";
import LessThenFiftyEpisodeSection from "./LessThenFiftyEpisodesSection.jsx";
import SeasonsCarousel from "./AnimePageSeasonsCarousel.jsx";
import Sequence from "./SequenceOnWatchPage.jsx";

const WatchContainer = ({ episodes, animeId, animeInfoData, seasons }) => {
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
          `/api/mantox/get/sources/${currentEpisode}&s=${selectedServer}&c=${selectedLanguage}`
        );

        setStreamingData(fd.data.data);
      } catch (error) {
        console.error("Error fetching streaming data:", error);
      } finally {
        setLoadingVideo(false);
      }
    };

    fetchStreamingData();
  }, [currentEpisode, selectedServer, selectedLanguage]);

  // Handle episode changes
  const handleEpisodeChange = episodeId => {
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
    const currentIndex = episodes.findIndex(
      ep => ep.episodeId === currentEpisode
    );
    if (currentIndex < episodes.length - 1) {
      handleEpisodeChange(episodes[currentIndex + 1].episodeId);
    }
  };

  const handlePreviousEpisode = () => {
    const currentIndex = episodes.findIndex(
      ep => ep.episodeId === currentEpisode
    );
    if (currentIndex > 0) {
      handleEpisodeChange(episodes[currentIndex - 1].episodeId);
    }
  };

  const handleLanguageChange = language => {
    setSelectedLanguage(language);
    localStorage.setItem("language", language);
  };

  const handleServerChange = serverName => {
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
          `/api/mantox/get/servers-by-episode-id/${episodeId}`
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

  return (
    <>
      <div
        className="flex justify-center lg:flex-row flex-col gap-4 md:px-6
        bg-backgroundtwo"
      >
        <div className="flex-1 md:min-w-[400px] lg:max-w-[940px]">
          <div ref={targetRef}>
            {loadingVideo && !noServerSelected && (
              <AspectRatio
                ratio={16 / 9}
                className="bg-[#070707] flex justify-center
            items-center"
              >
                <Loader />
              </AspectRatio>
            )}

            {noServerSelected && (
              <AspectRatio
                ratio={16 / 9}
                className="bg-[#0f0f0f] flex flex-col justify-center
            items-center"
              >
                <span
                  className="text-[16px] flex items-center gap-2 text-[#efefef]
        font-[800]"
                >
                  <TriangleAlert size={24} /> No selected server.
                </span>
                <span className="text-[10px] text-[#cccccc] mt-1">
                  Please select from available server(s) [ SUB / DUB ].
                </span>
              </AspectRatio>
            )}

            {!loadingVideo && !noServerSelected && streamingData && (
              <VideoPlayer
                data={streamingData}
                episodeNumber={
                  episodes.find(ep => ep.episodeId === currentEpisode)?.number
                }
                episodeName={
                  episodes
                    .find(ep => ep.episodeId === currentEpisode)
                    ?.title.match(/Episode \d+/i)
                    ? "" // You can also use any alternative text here, like "Untitled"
                    : episodes.find(ep => ep.episodeId === currentEpisode)
                        ?.title
                }
                handleNextEpisode={handleAutoPlay}
                skipIntroOutro={skipIntroOutro}
                toggleFullscreen={toggleFullscreen}
                isFullScreen={isFullScreen}
                isLastEpisode={isLastEpisode}
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
                  className={`text-[9px] md:text-[12px] text-dimmerMain w-[20px] ${
                    autoPlay ? "text-main font-[800]" : "text-dimmerMain"
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
                  className={`text-[9px] md:text-[12px] text-dimmerMain ${
                    skipIntroOutro ? "text-main font-[800]" : "text-dimmerMain"
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
                      cursor-pointer ${
                        selectedServer === server.serverName
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
                      cursor-pointer ${
                        selectedServer === server.serverName
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
                      cursor-pointer ${
                        selectedServer === server.serverName
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

          {seasons && seasons.length > 0 && (
            <div className="lg:hidden flex flex-col">
              <div
                className="flex gap-1 pl-4 py-2 items-center border-t-2
              border-backgroundHover border-b-2
               "
              >
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512.000000 512.000000"
                  preserveAspectRatio="xMidYMid meet"
                  className="h-[17px]"
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

                <span className="text-[13px] font-[800]">Sequence: </span>
              </div>
              <SeasonsCarousel seasons={seasons} />
            </div>
          )}
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
              />
            ) : (
              <LessThenFiftyEpisodeSection
                episodes={episodes}
                currentEpisode={currentEpisode}
                handleEpisodeChange={handleEpisodeChange}
                watchedEpisodes={watchedEpisodes}
                targetHeight={targetHeight}
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
