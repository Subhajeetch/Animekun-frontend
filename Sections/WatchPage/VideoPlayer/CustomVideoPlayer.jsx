"use client";

import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import DOMPurify from "dompurify";
import SubtitleSettings from "./SubtitleSettings.jsx";
import MineConfig from "@/mine.config.js";
const { backendUrl } = MineConfig;

import VideoSkipOverlay from "./skipAnimetion.jsx";

// icons
import {
    Pause,
    Play,
    Muted,
    Unmuted,
    TenSecskip,
    TenSecskipBack,
    SkipForwardIcon,
    ReplayIcon,
    NextEpisodeIcon,
    PreviousEpisodeIcon,
    SettingIcon
} from "@/Sections/Universal/icons.jsx";

import Loader from "@/Sections/Universal/Loader.jsx";
import {
    Maximize2,
    Minimize2,
    Captions,
    Check,
    Settings,
    CircleGauge,
    FolderCog,
    TriangleAlert,
    X,
    RefreshCw
} from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/CustomTabForVideoPlayer";

// Function to parse VTT file into cues
const parseVTT = async fileUrl => {
    const response = await fetch(fileUrl);
    const vttText = await response.text();

    const cues = [];
    const regex =
        /(?:([0-9]{2}):)?([0-9]{2}):([0-9]{2}\.[0-9]{3})\s*-->\s*(?:([0-9]{2}):)?([0-9]{2}):([0-9]{2}\.[0-9]{3})\s*([\s\S]*?)(?=\n\n|$)/g;
    let match;

    while ((match = regex.exec(vttText)) !== null) {
        const [
            _,
            startHours,
            startMinutes,
            startSeconds,
            endHours,
            endMinutes,
            endSeconds,
            text
        ] = match;

        cues.push({
            start: parseTime(startHours, startMinutes, startSeconds),
            end: parseTime(endHours, endMinutes, endSeconds),
            text: text.trim()
        });
    }

    return cues;
};

const parseTime = (hours, minutes, seconds) => {
    const totalHours = parseInt(hours || "0") * 3600;
    const totalMinutes = parseInt(minutes) * 60;
    const totalSeconds = parseFloat(seconds);
    return totalHours + totalMinutes + totalSeconds;
};

// Main subtitle synchronization logic
const useSubtitleSync = (videoRef, subtitleTracks, currentSubtitleTrack) => {
    const [currentSubtitle, setCurrentSubtitle] = useState("");
    const subtitleCuesRef = useRef([]);

    useEffect(() => {
        const loadSubtitles = async () => {
            if (
                currentSubtitleTrack === -1 ||
                !subtitleTracks[currentSubtitleTrack]
            ) {
                subtitleCuesRef.current = [];
                setCurrentSubtitle("");
                return;
            }

            const track = subtitleTracks[currentSubtitleTrack];
            const cues = await parseVTT(track.file);
            subtitleCuesRef.current = cues;
        };

        loadSubtitles();
    }, [currentSubtitleTrack, subtitleTracks]);

    useEffect(() => {
        const updateSubtitle = () => {
            const video = videoRef.current;
            if (!video) return;

            const currentTime = video.currentTime;
            const cues = subtitleCuesRef.current;

            const currentCue = cues.find(
                cue => currentTime >= cue.start && currentTime <= cue.end
            );

            setCurrentSubtitle(currentCue ? currentCue.text : "");
        };

        const video = videoRef.current;
        video.addEventListener("timeupdate", updateSubtitle);

        return () => {
            video.removeEventListener("timeupdate", updateSubtitle);
        };
    }, [videoRef]);

    return currentSubtitle;
};

// start
const CustomVideoPlayer = ({
    data,
    episodeNumber,
    handleNextEpisode,
    handlePreviousEpisode,
    skipIntroOutro,
    toggleFullscreen,
    isFullScreen,
    episodeName,
    isLastEpisode,
    isFirstEpisode,
    artWorkUrl,
    animeNameFF,
    animeId
}) => {
    const videoRef = useRef(null);
    const skipRef = useRef();
    const containerRef = useRef(null);
    const [activeTab, setActiveTab] = useState("quality");
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [qualityLevels, setQualityLevels] = useState([]);
    const [currentQuality, setCurrentQuality] = useState("auto");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const hlsRef = useRef(null);
    const [subtitleTracks, setSubtitleTracks] = useState([]);
    const [currentSubtitleTrack, setCurrentSubtitleTrack] = useState(-1);

    const [isSubtitleDropdownOpen, setIsSubtitleDropdownOpen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [manualShow, setManualShow] = useState(false); // Track manual override

    // for handle mouse move function:
    const [lastMouseX, setLastMouseX] = useState(0);
    const [lastMouseY, setLastMouseY] = useState(0);
    const movementThreshold = 10; // Ignore tiny movements

    const [currentPlaybackSpeed, setCurrentPlaybackSpeed] = useState("1x");
    const playbackSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    const fadeOutTimer = useRef(null);
    const dropdownRef = useRef(null);
    const qualityDropdownRef = useRef(null);
    const exceptionRef = useRef(null);

    const progressBarRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isShowNextEpisodeButton, setIsShowNextEpisodeButton] =
        useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [allEpisodeEnded, setAllEpisodeEnded] = useState(false);

    //change episode color
    const [previousEpColor, setPreviousEpColor] = useState("var(--foreground)");
    const [nextEpColor, setNextEpColor] = useState("var(--foreground)");

    // for last seen
    const [showResumeBox, setShowResumeBox] = useState(false);
    const [resumeTime, setResumeTime] = useState(0);

    const initialSubtitleStyles = () => {
        const settings = localStorage.getItem("subtitleSettings");
        const defaultStyles = {
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            bottom: "20px",
            fontSize: "16px"
        };

        if (settings) {
            const parsedSettings = JSON.parse(settings);

            const colorMap = {
                red: "255, 0, 0",
                white: "255, 255, 255",
                yellow: "255, 255, 0",
                green: "0, 255, 0",
                orange: "255, 165, 0",
                pink: "255, 192, 203",
                black: "0, 0, 0"
            };

            const textOpacity =
                parseFloat(parsedSettings.textOpacity || "100") / 100;
            const bgOpacity =
                parseFloat(parsedSettings.bgOpacity || "70") / 100;

            const textRGB =
                colorMap[parsedSettings.textColor?.toLowerCase()] ||
                "255, 255, 255";
            const shadowRGB =
                colorMap[parsedSettings.bgColor?.toLowerCase()] || "0, 0, 0";

            const rgbaTextColor = `rgba(${textRGB}, ${textOpacity})`;
            const textShadow = `2px 2px 4px rgba(${shadowRGB}, ${bgOpacity})`;

            const position = parsedSettings.position
                ? parsedSettings.position.replace("%", "px")
                : "20px";

            return {
                color: rgbaTextColor,
                textShadow,
                bottom: position,
                fontSize: parsedSettings.textSize || defaultStyles.fontSize
            };
        }

        return defaultStyles;
    };

    const [subtitleStyles, setSubtitleStyles] = useState(initialSubtitleStyles);



    let videoUrl;

    if (!data.sources.length) {
        return (
            <div
                className='w-full h-full flex flex-col justify-center items-center aspect-video
    bg-[#1a1a1a] gap-1'
            >
                <span
                    className='text-[16px] flex items-center gap-1 text-[#efefef]
        font-[800]'
                >
                    <TriangleAlert size={24} /> Something went wrong!
                </span>
                <span className='text-[10px] text-[#cccccc]'>
                    This usually happens when video server is down.
                </span>
                <span className='text-[10px] text-[#cccccc]'>
                    You can try refreshing the page
                </span>


                <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-3 py-1 bg-foreground text-background rounded-md mt-4 font-bold">
                    <RefreshCw size={20} />
                    Refresh
                </button>
            </div>
        );
    } else if (data.sources[0].isM3U8 === false) {
        return (
            <div
                className='w-full h-full flex flex-col justify-center items-center aspect-video
    bg-[#1a1a1a] gap-1'
            >
                <span
                    className='text-[16px] flex items-center gap-1 text-[#efefef]
        font-[800]'
                >
                    <TriangleAlert size={24} /> Server busy!
                </span>
                <span className='text-[10px] text-[#cccccc]'>
                    Please switch to different server.
                </span>
            </div>
        );
    } else {
        videoUrl = `${backendUrl}/api/mantox/proxy/?url=${data.sources[0].url}`;
    }

    useEffect(() => {
        let hls;

        if (Hls.isSupported()) {
            hls = new Hls({
                autoStartLoad: true,
                startLevel: -1,
                maxBufferLength: 60,
                maxMaxBufferLength: 160,
                autoLevelCapping: 2
            });

            hls.loadSource(videoUrl);
            hls.attachMedia(videoRef.current);
            hlsRef.current = hls;

            setLoading(true); // Show loading spinner at the start

            // Normalize different subtitle track shapes. Some servers return
            // { url, lang } while others may return { kind, file, label }.
            const rawTracks = Array.isArray(data.tracks) ? data.tracks : [];

            const processedTracks = rawTracks
                .filter(t => {
                    const url = t.url || t.file || "";
                    const lang = (t.lang || t.label || "").toString().toLowerCase();

                    // Exclude thumbnail VTTs
                    if (!url) return false;
                    if (lang.includes("thumb") || url.toLowerCase().includes("thumbnails.vtt")) return false;

                    return true;
                })
                .map(t => {
                    const file = t.url || t.file;
                    let label = t.label || t.lang || "Unknown";

                    // If label is not meaningful, try to derive from filename
                    if (!label || label === "Unknown") {
                        try {
                            const path = new URL(file).pathname;
                            label = path.split("/").pop();
                        } catch (e) {
                            label = file;
                        }
                    }

                    return {
                        file,
                        label,
                        default: !!t.default
                    };
                });

            setSubtitleTracks(processedTracks);

            if (processedTracks.length > 0) {
                // Prefer an explicit default flag
                const defaultTrackIndex = processedTracks.findIndex(t => t.default === true);

                // Try to find an English track (label or filename heuristics)
                const englishTrackIndex = processedTracks.findIndex(t => {
                    const label = (t.label || "").toLowerCase();
                    const file = (t.file || "").toLowerCase();

                    if (label.includes("eng") || label.includes("english") || label === "en") return true;
                    if (file.includes("/eng-") || file.includes("/en-") || file.endsWith("-eng.vtt") || file.endsWith("-en.vtt") || file.includes("eng.vtt") || file.includes("en.vtt")) return true;
                    return false;
                });

                const chosenIndex = defaultTrackIndex !== -1 ? defaultTrackIndex : (englishTrackIndex !== -1 ? englishTrackIndex : 0);
                setCurrentSubtitleTrack(chosenIndex);
            } else {
                setCurrentSubtitleTrack(-1);
            }

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                setQualityLevels(
                    hls.levels.map((level, index) => ({
                        label: `${level.height}p`,
                        index: index
                    }))
                );
            });

            hls.on(Hls.Events.FRAG_BUFFERED, () => {
                setLoading(false); // Video is buffered, ready to play
            });

            hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
                const selectedLevel =
                    data.level === -1
                        ? "auto"
                        : `${hls.levels[data.level].height}p`;
                setCurrentQuality(selectedLevel);
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error("HLS.js error:", data);
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            hls.startLoad(); // Attempt to recover
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            hls.recoverMediaError();
                            break;
                        default:
                            hls.destroy();
                            break;
                    }
                }
            });

            hls.on(Hls.Events.BUFFER_STALLED, () => {
                setLoading(true); // Show spinner when buffer stalls
            });

            hls.on(Hls.Events.BUFFER_EOS, () => {
                setLoading(false); // Hide loading at the end of the stream
            });
        } else if (
            videoRef.current.canPlayType("application/vnd.apple.mpegurl")
        ) {
            videoRef.current.src = videoUrl;
            setLoading(true); // Show spinner until canplay event
        }

        const video = videoRef.current;

        // Wait for video metadata to load
        video.addEventListener("loadedmetadata", () => {
            setDuration(video.duration);
        });

        // Wait until video can play without interruptions
        video.addEventListener("canplaythrough", () => {
            setLoading(false); // Hide spinner when ready to play
        });

        const updateStats = () => {
            setCurrentTime(video.currentTime);
            setDuration(video.duration);
            const bufferTime =
                video.buffered.length > 0
                    ? video.buffered.end(video.buffered.length - 1)
                    : 0;
            setBuffered(bufferTime);

            // Set loading state only if played time equals buffer time
            setLoading(video.currentTime === bufferTime);

            // Check if the video is at the end and call handleNextEpisode
            if (video.currentTime >= video.duration) {
                handleNextEpisode();
            }
        };

        video.addEventListener("timeupdate", updateStats);
        video.addEventListener("progress", updateStats);

        video.onplay = () => {
            setIsPlaying(true);
            setLoading(false); // Video is playing, hide the spinner
        };

        // Handle seeking events
        video.addEventListener("seeking", () => {
            setLoading(true); // Show spinner while seeking
        });

        video.addEventListener("seeked", () => {
            setLoading(false); // Hide spinner after seeking is complete
        });

        return () => {
            if (hls) hls.destroy();
            video.removeEventListener("timeupdate", updateStats);
            video.removeEventListener("progress", updateStats);
            video.removeEventListener("loadedmetadata", () => { });
            video.removeEventListener("canplaythrough", () => { });
        };
    }, [videoUrl]);

    const currentSubtitle = useSubtitleSync(
        videoRef,
        subtitleTracks,
        currentSubtitleTrack
    );

    const togglePlay = () => {
        const video = videoRef.current;
        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        const video = videoRef.current;
        setIsMuted(prevMuted => {
            const newMutedState = !prevMuted;
            video.muted = newMutedState;
            return newMutedState;
        });
    };

    const skip = seconds => {
        if (!videoRef.current) return;

        if (seconds === 10) {
            skipRef.current.forward();
        }
        if (seconds === -10) {
            skipRef.current.backward();
        }

        const video = videoRef.current;

        // Pause the video temporarily to ensure smooth seeking
        const wasPlaying = !video.paused;
        video.pause();

        // Adjust the current time
        video.currentTime = Math.min(
            Math.max(video.currentTime + seconds, 0),
            video.duration - 0.1
        );

        // Resume playback only if the video was playing before
        video.addEventListener("seeked", function resumePlayback() {
            if (wasPlaying) video.play();
            video.removeEventListener("seeked", resumePlayback);
        });
    };

    const changeQuality = index => {
        if (hlsRef.current) {
            hlsRef.current.currentLevel = index;
            setCurrentQuality(
                index === -1 ? "auto" : `${qualityLevels[index].label}`
            );
        }
        setIsDropdownOpen(false);
        setManualShow(false);
        setShowControls(true);
    };

    const changePlaybackSpeed = speed => {
        if (videoRef.current) {
            videoRef.current.playbackRate = speed;
            setCurrentPlaybackSpeed(`${speed}x`);
        }
        setIsSpeedDropdownOpen(false);
        setManualShow(false);
        setShowControls(true);
    };

    const changeSubtitleTrack = trackId => {
        setCurrentSubtitleTrack(trackId);
        setManualShow(false);
        setShowControls(true);
    };

    // Close the subtitles dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsSubtitleDropdownOpen(false);
                setManualShow(false);
                setShowControls(true);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Close the quality dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                qualityDropdownRef.current &&
                !qualityDropdownRef.current.contains(event.target) && // Check if clicked outside dropdown
                (!exceptionRef.current ||
                    !exceptionRef.current.contains(event.target)) // Exception div
            ) {
                setIsDropdownOpen(false);
                setManualShow(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        if (hours > 0) {
            return `${hours}:${minutes
                .toString()
                .padStart(2, "0")}:${remainingSeconds
                    .toString()
                    .padStart(2, "0")}`;
        } else {
            return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
        }
    }

    const resetTimer = () => {
        // Clear existing timer if any
        if (fadeOutTimer.current) {
            clearTimeout(fadeOutTimer.current);
        }

        // Start a new timer to hide controls
        fadeOutTimer.current = setTimeout(() => {
            if (!manualShow && !isPaused) {
                setShowControls(false);
            }
        }, 3000);
    };

    const handleMouseMove = event => {
        const { clientX, clientY } = event;

        // Calculate the movement distance
        const dx = Math.abs(clientX - lastMouseX);
        const dy = Math.abs(clientY - lastMouseY);

        // Only show controls if movement is significant
        if ((dx > movementThreshold || dy > movementThreshold) && !manualShow) {
            setShowControls(true);
            resetTimer();
            setLastMouseX(clientX);
            setLastMouseY(clientY);
        }
    };
    /*
    const handleMouseMove = () => {
        if (!manualShow) {
            setShowControls(true);
            resetTimer();
        }
    };
*/

    const togglePause = () => {
        setIsPaused(prev => !prev);
        setShowControls(true);
        setManualShow(false);
    };

    const handleManualShowControls = () => {
        setShowControls(true);
        setManualShow(true); // Prevent fading
    };

    const handleManualHideControls = () => {
        setManualShow(false);
        resetTimer(); // Re-enable fade out logic
    };

    useEffect(() => {
        if (manualShow) {
            // Ensure controls stay visible
            setShowControls(true);
        } else if (showControls) {
            // Reset timer to fade out controls
            resetTimer();
        }
        return () => clearTimeout(fadeOutTimer.current);
    }, [showControls, isPaused, manualShow]);

    const fadeEffectStyles = {
        background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0))"
    };

    const EpisodeNameFadeStyles = {
        textShadow: `
    1px 1px 6px rgba(0, 0, 0, 0.2),
    -1px -1px 6px rgba(0, 0, 0, 0.2)
  `
    };

    const ToggleAllControls = () => {
        if (showControls) {
            setShowControls(false);
        } else {
            setShowControls(true);
        }
    };

    const handleSubtitleSettingsChange = newSettings => {
        // Extract settings and provide defaults
        const subSettings = localStorage.getItem("subtitleSettings");

        const textOpacity =
            parseFloat((newSettings.textOpacity || "100%").replace("%", "")) /
            100;
        const textColor = newSettings.textColor || "white";
        const textSize = newSettings.textSize || "16px"; // Default size
        const bgColor = newSettings.bgColor || "black";
        const bgOpacity =
            parseFloat((newSettings.bgOpacity || "50%").replace("%", "")) / 100;
        const position = `${parseInt(newSettings.position || "20%")}px`;

        // Convert textColor to rgba (if a valid color is mapped)
        const colorMap = {
            red: "255, 0, 0",
            white: "255, 255, 255",
            yellow: "255, 255, 0",
            green: "0, 255, 0",
            orange: "255, 165, 0",
            pink: "255, 192, 203",
            black: "0, 0, 0"
        };
        const rgbaTextColor = `rgba(${colorMap[textColor.toLowerCase()] || "255, 255, 255"
            }, ${textOpacity})`;

        // Convert bgColor to text shadow color
        const shadowRGB = colorMap[bgColor.toLowerCase()] || "0, 0, 0";
        const textShadow = `2px 2px 4px rgba(${shadowRGB}, ${bgOpacity})`;

        // Map newSettings to subtitle styles
        const subtitleStyle = {
            color: rgbaTextColor, // Use rgba for text color with opacity
            fontSize: textSize,
            textShadow, // Use textShadow instead of backgroundColor
            bottom: position
        };

        // Update the subtitle styles dynamically
        setSubtitleStyles(subtitleStyle);
    };

    /// progress bar Start!!!!!
    const introStart = data.intro.start || 0;
    const introEnd = data.intro.end || 0;
    const outroStart = data.outro.start || 0;
    const outroEnd = data.outro.end || 0;

    const handleTimeUpdate = () => {
        if (!isDragging && videoRef.current) {
            const video = videoRef.current;
            const time = video.currentTime;

            if (skipIntroOutro) {
                // Skip intro
                if (time >= introStart && time < introEnd - 0.1) {
                    smoothSkipTo(introEnd + 0.1);
                    return; // Prevent further updates during the skip
                }
                // Skip outro
                if (time >= outroStart && time < outroEnd - 0.1) {
                    smoothSkipTo(outroEnd + 0.1);
                    return; // Prevent further updates during the skip
                }
            }

            // Update the progress bar
            setCurrentTime(time);
        }
    };

    // Smooth skip helper function
    const smoothSkipTo = targetTime => {
        if (!videoRef.current) return;

        const video = videoRef.current;

        const wasPlaying = !video.paused;
        video.pause();

        // Show loading spinner during the skip
        setLoading(true);

        // Set the new time
        video.currentTime = targetTime;

        // Resume playback after the seek is complete
        video.addEventListener("seeked", function onSeeked() {
            setLoading(false); // Hide loading spinner
            if (wasPlaying) video.play(); // Resume playback only if it was playing before
            video.removeEventListener("seeked", onSeeked);
        });
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleProgress = () => {
        if (videoRef.current) {
            const bufferedTime =
                videoRef.current.buffered.length > 0
                    ? videoRef.current.buffered.end(
                        videoRef.current.buffered.length - 1
                    )
                    : 0;
            setBuffered(bufferedTime);
        }
    };

    const handleSeekStart = e => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const newTime = calculateNewTime(clientX);
        setCurrentTime(newTime);
        setIsDragging(true);
        setManualShow(true);
        setShowControls(true);
    };

    const handleSeekMove = e => {
        if (isDragging) {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const newTime = calculateNewTime(clientX);
            setCurrentTime(newTime);
        }
    };

    const handleSeekEnd = () => {
        if (isDragging) {
            const video = videoRef.current;

            setIsDragging(false);
            setManualShow(false);

            // Smoothly set the final video time and resume playback
            setLoading(true); // Show loading spinner
            video.pause();
            video.currentTime = currentTime;

            video.addEventListener("seeked", function onSeeked() {
                setLoading(false); // Hide loading spinner
                video.play(); // Resume playback
                video.removeEventListener("seeked", onSeeked);
            });

            handleManualHideControls();
        }
    };

    // Debounce mechanism for better performance during seek move
    const calculateNewTime = (() => {
        let timeout;
        return clientX => {
            const progressBarWidth = progressBarRef.current.offsetWidth;
            const rect = progressBarRef.current.getBoundingClientRect();
            const offsetX = clientX - rect.left;

            const percentage = Math.max(
                0,
                Math.min(offsetX / progressBarWidth, 1)
            );
            const newTime = percentage * videoRef.current.duration;

            clearTimeout(timeout);
            timeout = setTimeout(() => {
                videoRef.current.currentTime = newTime; // Debounced update of currentTime
            }, 50); // Adjust debounce delay as needed

            return newTime;
        };
    })();

    // Add cleanup for mouse and touch events
    useEffect(() => {
        const handleMouseUp = () => {
            if (isDragging) {
                handleSeekEnd();
            }
        };

        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("touchend", handleMouseUp);

        return () => {
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchend", handleMouseUp);
        };
    }, [isDragging]);

    const makeControlApperOnCkick = () => {
        setManualShow(true);

        setTimeout(() => {
            setManualShow(false);
        }, 3000);
    };

    useEffect(() => {
        if (isLastEpisode) return;

        const video = videoRef.current;

        if (!video) return;

        const checkTime = () => {
            if (video.duration - video.currentTime <= 9) {
                setIsShowNextEpisodeButton(true);

                setTimeout(() => {
                    setIsVisible(true);
                }, 100);
            } else {
                setIsShowNextEpisodeButton(false);
                setIsVisible(false);
            }
        };

        video.addEventListener("timeupdate", checkTime);

        return () => {
            video.removeEventListener("timeupdate", checkTime);
        };
    }, [isLastEpisode, videoRef]);

    useEffect(() => {
        const handleKeyPress = e => {
            switch (e.code) {
                case "Space": // Play/Pause
                    e.preventDefault();
                    togglePlay();
                    break;

                case "KeyM": // Mute/Unmute
                    e.preventDefault();
                    toggleMute();
                    break;

                case "KeyF": // Fullscreen
                    e.preventDefault();
                    toggleFullscreen();
                    break;

                case "ArrowRight": // Skip forward
                    e.preventDefault();
                    skip(10);
                    break;

                case "ArrowLeft": // Skip backward
                    e.preventDefault();
                    skip(-10);
                    break;

                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    useEffect(() => {
        const handleTimeUpdate = () => {
            const video = videoRef.current;

            if (isLastEpisode) {
                if (video.currentTime >= video.duration - 0.1) {
                    setAllEpisodeEnded(true);
                    setLoading(false);
                } else if (
                    allEpisodeEnded &&
                    video.currentTime < video.duration - 0.1
                ) {
                    setAllEpisodeEnded(false);
                }
            }
        };

        const video = videoRef.current;

        video.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [isLastEpisode, allEpisodeEnded, setAllEpisodeEnded]);

    // rich notification (media session)
    useEffect(() => {
        if ("mediaSession" in navigator && videoRef.current) {
            const video = videoRef.current;

            // Set Metadata
            navigator.mediaSession.metadata = new MediaMetadata({
                title: `EP ${episodeNumber} - ${episodeName}`,
                artist: "Animekun",
                album: animeNameFF || "",
                artwork: [
                    { src: artWorkUrl, sizes: "300x400", type: "image/jpg" }
                ]
            });

            // Playback State
            const updatePlaybackState = () => {
                navigator.mediaSession.playbackState = video.paused
                    ? "paused"
                    : "playing";
            };

            // Media Controls
            navigator.mediaSession.setActionHandler("play", () => togglePlay());
            navigator.mediaSession.setActionHandler("pause", () =>
                togglePlay()
            );
            navigator.mediaSession.setActionHandler("seekbackward", details => {
                video.currentTime = Math.max(
                    video.currentTime - (details.seekOffset || 10),
                    0
                );
                updatePlaybackState(); // Ensure playback state updates after seeking
            });
            navigator.mediaSession.setActionHandler("seekforward", details => {
                video.currentTime = Math.min(
                    video.currentTime + (details.seekOffset || 10),
                    video.duration
                );
                updatePlaybackState(); // Ensure playback state updates after seeking
            });
            navigator.mediaSession.setActionHandler("seekto", details => {
                if (details.seekTime !== undefined) {
                    video.currentTime = details.seekTime;
                    updatePlaybackState(); // Ensure playback state updates after seeking
                }
            });
            navigator.mediaSession.setActionHandler("stop", () => {
                togglePlay();
                video.currentTime = 0;
                updatePlaybackState();
            });

            // Update Playback State on Play/Pause/Seek
            video.addEventListener("play", updatePlaybackState);
            video.addEventListener("pause", updatePlaybackState);
            video.addEventListener("seeked", updatePlaybackState); // Ensure state updates on manual seek

            return () => {
                video.removeEventListener("play", updatePlaybackState);
                video.removeEventListener("pause", updatePlaybackState);
                video.removeEventListener("seeked", updatePlaybackState);
            };
        }
    }, [videoRef, episodeName]);

    useEffect(() => {
        if (isFirstEpisode) {
            setPreviousEpColor("#707070");
        } else {
            setPreviousEpColor("var(--foreground)");
        }

        if (isLastEpisode) {
            setNextEpColor("#707070");
        } else {
            setNextEpColor("var(--foreground)");
        }
    }, [isLastEpisode, isFirstEpisode]);

    //last seen functions
    const storageKey = "lastSeen-v1";
    const videoId = `${animeId}:${episodeNumber}`;
    const MAX_SAVED_VIDEOS = 50;

    // Load last seen time
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageKey) || "{}");
        const lastTime = data[videoId];
        if (lastTime && videoRef.current) {
            videoRef.current.currentTime = lastTime;
            setResumeTime(lastTime);
            setShowResumeBox(true);
        }
    }, [videoId]);

    // Save current time every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (!videoRef.current) return;
            const time = videoRef.current.currentTime;
            const data = JSON.parse(localStorage.getItem(storageKey) || "{}");
            data[videoId] = time;

            // Enforce limit
            const keys = Object.keys(data);
            if (keys.length > MAX_SAVED_VIDEOS) {
                const oldestKey = keys[0];
                delete data[oldestKey];
            }

            localStorage.setItem(storageKey, JSON.stringify(data));
        }, 5000);

        return () => clearInterval(interval);
    }, [videoId]);

    // Auto hide resume box after 5s
    useEffect(() => {
        if (!showResumeBox) return;
        const timer = setTimeout(() => setShowResumeBox(false), 5000);
        return () => clearTimeout(timer);
    }, [showResumeBox]);

    const handleStartOver = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div
            ref={containerRef}
            className={`flex w-full h-full aspect-video bg-[#000000] ${loading ? "cursor-wait" : ""
                }`}
        >
            <div className='relative w-full'>
                {/* Video Player */}
                <video
                    ref={videoRef}
                    className='w-full h-full'
                    autoPlay
                    muted={false}
                    onClick={togglePause}
                    onPlay={() => setIsPaused(false)}
                    onPause={() => setIsPaused(true)}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onProgress={handleProgress}
                ></video>

                <div
                    onClick={() => {
                        ToggleAllControls();
                    }}
                    onMouseMove={handleMouseMove}
                    className={`absolute w-full h-full flex top-0 z-[30]
        ${showControls ? "hidden" : "block"}
        `}
                ></div>

                <div
                    onClick={() => {
                        ToggleAllControls();
                    }}
                    className={`absolute w-full flex  top-[34px] bottom-[84px] z-[31]`}
                >
                    <div
                        className='flex-1 h-full'
                        onDoubleClick={() => skip(-10)}
                    ></div>
                    <div
                        className='flex-1 h-full'
                        onDoubleClick={toggleFullscreen}
                    ></div>
                    <div
                        className='flex-1 h-full'
                        onDoubleClick={() => skip(10)}
                    ></div>
                </div>

                <VideoSkipOverlay
                    ref={skipRef}
                    currentTime={currentTime}
                    formatTime={formatTime}
                />

                {showResumeBox && (
                    <div className='absolute bottom-[90px] left-2 bg-gray-700 text-white text-[11px] px-3 py-2 rounded-md flex items-center space-x-2 animate-fade z-[32]'>
                        <button onClick={() => setShowResumeBox(false)}>
                            <X size={16} />
                        </button>

                        <span>
                            Skipped to last seen:{" "}
                            <span className='font-semibold'>
                                {formatTime(resumeTime)}
                            </span>
                            .{" "}
                            <button
                                onClick={handleStartOver}
                                className='underline ml-2 text-[#25b3ff]'
                            >
                                Start over&gt;
                            </button>
                        </span>
                    </div>
                )}

                {/* Dropdown Menu */}
                <div ref={qualityDropdownRef}>
                    {isDropdownOpen && (
                        <Tabs
                            value={activeTab}
                            onValueChange={setActiveTab}
                            className='w-[250px] lg:w-[330px] h-full 
                            absolute
                    bottom-[0px] right-0
                    z-[32] bg-backgroundtwo'
                        >
                            <TabsList className='bg-[#3a3a3a] h-[37px] w-full rounded-none'>
                                <TabsTrigger
                                    value='quality'
                                    className='bg-transparent
                        outline-none'
                                    onClick={() => {
                                        setShowControls(true);
                                        setManualShow(true);
                                    }}
                                >
                                    <Settings
                                        size={16}
                                        className='text-white'
                                    />
                                </TabsTrigger>
                                <TabsTrigger
                                    value='subtitle'
                                    className='bg-transparent
                        outline-none'
                                    onClick={() => {
                                        setShowControls(true);
                                        setManualShow(true);
                                    }}
                                >
                                    <Captions
                                        size={17}
                                        className='text-white'
                                    />
                                </TabsTrigger>
                                <TabsTrigger
                                    value='videoSpeed'
                                    className='bg-transparent
                        outline-none'
                                    onClick={() => {
                                        setShowControls(true);
                                        setManualShow(true);
                                    }}
                                >
                                    <CircleGauge
                                        size={17}
                                        className='text-white'
                                    />
                                </TabsTrigger>
                                <TabsTrigger
                                    value='subSetting'
                                    className='bg-transparent
                        outline-none'
                                    onClick={() => {
                                        setShowControls(true);
                                        setManualShow(true);
                                    }}
                                >
                                    <FolderCog
                                        size={17}
                                        className='text-white'
                                    />
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent
                                value='quality'
                                className='bg-backgroundtwo'
                            >
                                {/* quality in tabssss */}

                                <div className=' w-full h-full overflow-y-auto'>
                                    <div className='flex flex-col mx-2'>
                                        {/* Auto Quality Option */}
                                        <div
                                            onClick={() => {
                                                changeQuality(-1);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`flex items-center justify-between
                              text-foreground px-3 py-1 rounded-lg cursor-pointer
                              hover:bg-backgroundHover transition-all ${currentQuality === "auto"
                                                    ? "bg-backgroundHover"
                                                    : ""
                                                }`}
                                        >
                                            <span className='text-[13px] font-semibold'>
                                                Auto
                                            </span>
                                            {currentQuality === "auto" && (
                                                <Check
                                                    size={16}
                                                    className='text-white ml-2'
                                                />
                                            )}
                                        </div>

                                        {/* Render Quality Levels */}
                                        {qualityLevels.map(
                                            ({ index, label }) => (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        changeQuality(index);
                                                        setIsDropdownOpen(
                                                            false
                                                        );
                                                    }}
                                                    className={`flex items-center justify-between
                                text-foreground px-3 py-1 rounded-lg cursor-pointer
                                hover:bg-backgroundHover transition-all ${currentQuality === label
                                                            ? "bg-backgroundHover"
                                                            : ""
                                                        }`}
                                                >
                                                    <span className='text-[13px] font-semibold'>
                                                        {label}
                                                    </span>
                                                    {currentQuality ===
                                                        label && (
                                                            <Check
                                                                size={16}
                                                                className='text-white ml-2'
                                                            />
                                                        )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent
                                value='subtitle'
                                className='h-[calc(100%-38px)]'
                            >
                                {/* subtitles in the tabbb */}

                                <div className='mb-2 w-full h-full overflow-y-auto'>
                                    {/* Option to Turn Off Subtitles */}
                                    <div
                                        onClick={() => {
                                            setCurrentSubtitleTrack(-1);
                                        }}
                                        className={`flex items-center text-foreground px-3 py-1
                            rounded-full transition-all duration-200
                            cursor-pointer mx-2 hover:bg-backgroundHover ${currentSubtitleTrack === -1
                                                ? "bg-backgroundHover"
                                                : ""
                                            }`}
                                    >
                                        <span className='flex-1 text-[13px] font-semibold'>
                                            Off
                                        </span>
                                        {currentSubtitleTrack === -1 && (
                                            <Check
                                                size={16}
                                                className='text-white ml-2'
                                            />
                                        )}
                                    </div>

                                    {/* Subtitle Options */}
                                    {subtitleTracks.map((track, index) => (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                setCurrentSubtitleTrack(index);
                                            }}
                                            className={`flex items-center text-foreground px-3 py-1
                              rounded-full transition-all duration-200
                              cursor-pointer mx-2 hover:bg-backgroundHover ${currentSubtitleTrack === index
                                                    ? "bg-backgroundHover"
                                                    : ""
                                                }`}
                                        >
                                            <span className='flex-1 text-[13px] font-semibold'>
                                                {track.label}
                                            </span>
                                            {currentSubtitleTrack === index && (
                                                <Check
                                                    size={16}
                                                    className='text-white ml-2'
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent
                                value='videoSpeed'
                                className='h-[calc(100%-38px)]'
                            >
                                {/* video speed controller */}

                                <div
                                    className='mb-2 w-full h-full overflow-y-auto
                        px-2'
                                >
                                    {/* Render Playback Speeds */}
                                    {playbackSpeeds.map(speed => (
                                        <div
                                            key={speed}
                                            onClick={() =>
                                                changePlaybackSpeed(speed)
                                            }
                                            className={`flex items-center justify-between
                              text-foreground px-3 py-1 rounded-lg cursor-pointer
                              transition-all hover:bg-backgroundHover ${currentPlaybackSpeed === `${speed}x`
                                                    ? "bg-backgroundHover"
                                                    : ""
                                                }`}
                                        >
                                            <span className='text-[13px] font-semibold'>{`${speed}x`}</span>
                                            {currentPlaybackSpeed ===
                                                `${speed}x` && (
                                                    <Check
                                                        size={16}
                                                        className='text-white ml-2'
                                                    />
                                                )}
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent
                                value='subSetting'
                                className='h-[calc(100%-38px)] w-full'
                            >
                                {/* subtitles settings goes here */}

                                <SubtitleSettings
                                    className='w-full'
                                    handleSubtitleSettingsChange={
                                        handleSubtitleSettingsChange
                                    }
                                    setShowControls={setShowControls}
                                    setManualShow={setManualShow}
                                />
                            </TabsContent>
                        </Tabs>
                    )}
                </div>
                {/* tab should be above this */}

                {/* next episode button */}
                {isShowNextEpisodeButton && (
                    <div
                        className={`absolute w-max  px-4 py-2 bg-[#ffffff]
  text-[#131313] text-[14px]
  font-[700] rounded-xl cursor-pointer right-[20px] transition-all overflow-hidden duration-200 z-[31]
  ${showControls ? "bottom-[74px]" : "bottom-[14px]"}
  `}
                        onClick={handleNextEpisode}
                    >
                        <div
                            style={{
                                width: isVisible ? "100%" : "0px",
                                transition: "width 9s ease-in-out",
                                inset: "0"
                            }}
                            className='absolute bg-[#bdbdbdb2]'
                        ></div>

                        <div className='flex items-center gap-2 relative'>
                            <SkipForwardIcon size={22} />
                            <span>Next Episode</span>
                        </div>
                    </div>
                )}

                {/* Custom Controls */}
                <div
                    className={` flex flex-col absolute z-20 top-0 w-full h-full
          transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"
                        }
        }`}
                    style={fadeEffectStyles}
                >
                    <div className='w-full flex'>
                        <div
                            className='h-[30px] ml-3 mt-1 flex items-center
          cursor-default flex-1'
                            style={EpisodeNameFadeStyles}
                        >
                            <div className='h-[24px] w-[4px] bg-main rounded-md'></div>

                            <span className=' text-[14px] font-[800] text-white ml-2 mr-5 '>{`EP
            ${episodeNumber}`}</span>

                            {isFullScreen && (
                                <span className='text-[13px] font-[700] truncate'>{`${episodeName}`}</span>
                            )}
                        </div>

                        <div className='mt-1 mr-2'>
                            <div
                                className='relative flex gap-2 mr-2'
                                ref={exceptionRef}
                            >
                                <div
                                    onClick={() => {
                                        setIsDropdownOpen(prev => !prev);
                                        setShowControls(true);
                                        setManualShow(true);
                                        setActiveTab("subtitle");
                                    }}
                                    className='text-white rounded-full transition-all w-[28px] h-[28px] flex justify-center
                items-center active:bg-[#9d9d9ddb] md:hover:bg-[#9d9d9ddb]
                cursor-pointer'
                                >
                                    <Captions
                                        style={{
                                            filter: "drop-shadow(0px 0px 6px rgba(0,0,0,0.5))"
                                        }}
                                        size={26}
                                    />
                                </div>

                                {/* Button to Toggle Dropdown */}
                                <div
                                    onClick={() => {
                                        setIsDropdownOpen(prev => !prev);
                                        setShowControls(true);
                                        setManualShow(true);
                                        setActiveTab("quality");
                                    }}
                                    className='text-white rounded-full transition-all w-[28px] h-[28px] flex justify-center
                items-center active:bg-[#9d9d9ddb] md:hover:bg-[#9d9d9ddb]
                cursor-pointer'
                                >
                                    <SettingIcon size={22} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* do double tap skip here */}
                    <div className='flex-1 flex items-center justify-center'></div>

                    {/* progress bar & time */}

                    <div
                        className='flex flex-col py-1 w-full px-2 mb-1'
                        onMouseMove={handleMouseMove}
                    >
                        {/* Video Stats */}
                        <div className='text-foreground text-sm ml-1'>
                            <span className='text-[11px] font-[600]'>
                                {formatTime(currentTime)} /{" "}
                                {formatTime(duration)}
                            </span>
                        </div>

                        {/* Progress Bar */}

                        <div className='relative w-full z-[9] cursor-pointer'>
                            {/* Invisible Interaction Area */}
                            <div
                                className='absolute bottom-[-9px] left-0 w-full h-10 z-10
                
                '
                                onMouseDown={handleSeekStart}
                                onMouseMove={handleSeekMove}
                                onTouchStart={handleSeekStart}
                                onTouchMove={handleSeekMove}
                                onMouseUp={handleSeekEnd}
                                onTouchEnd={handleSeekEnd}
                            ></div>

                            {/* Actual Progress Bar */}
                            <div
                                className='w-full h-[4px] bg-gray-300 relative cursor-pointer'
                                ref={progressBarRef}
                            >
                                {/* Intro Highlight */}

                                {skipIntroOutro && (
                                    <div
                                        className='absolute top-0 left-0 h-full
                    bg-introOutroHighlight z-[12]
                    cursor-pointer'
                                        style={{
                                            left: `${(introStart / duration) * 100
                                                }%`,
                                            width: `${((introEnd - introStart) /
                                                duration) *
                                                100
                                                }%`
                                        }}
                                    ></div>
                                )}

                                {/* Outro Highlight */}

                                {skipIntroOutro && (
                                    <div
                                        className='absolute top-0 left-0 h-full
                    bg-introOutroHighlight z-[12]
                    cursor-pointer'
                                        style={{
                                            left: `${(outroStart / duration) * 100
                                                }%`,
                                            width: `${((outroEnd - outroStart) /
                                                duration) *
                                                100
                                                }%`
                                        }}
                                    ></div>
                                )}

                                <div
                                    className='absolute top-0 left-0 h-full bg-main 
                  z-10 cursor-pointer'
                                    style={{
                                        width: `${(currentTime / duration) * 100
                                            }%`
                                    }}
                                ></div>
                                <div
                                    className='absolute top-0 left-0 h-full bg-gray-500 opacity-50
                  z-[9] cursor-pointer'
                                    style={{
                                        width: `${(buffered / duration) * 100}%`
                                    }}
                                ></div>
                                {isDragging && (
                                    <div
                                        className='absolute top-[-2px] w-2 h-2 bg-[#f01515]
                    border-[1px] border-white rounded-full z-10 cursor-pointer'
                                        style={{
                                            left: `${(currentTime / duration) * 100
                                                }%`,
                                            transform: "translateX(-50%)"
                                        }}
                                    ></div>
                                )}
                            </div>
                            {/*iske upar tak visible progress bar h */}
                        </div>
                        {/*iske upar tak progress bar h */}
                    </div>

                    {/* all controls */}
                    <div className='flex items-center w-full px-2 mb-1 justify-between'>
                        <div className='flex gap-[8px] items-center flex-none'>
                            {/* Mute/Unmute Button */}
                            <div
                                onClick={toggleMute}
                                className='text-white rounded-full transition-all duration-300 w-[28px] h-[28px] flex justify-center
                items-center
                active:bg-[#9d9d9ddb] md:hover:bg-[#9d9d9ddb] cursor-pointer'
                            >
                                {isMuted ? (
                                    <Muted size={18} />
                                ) : (
                                    <Unmuted size={21} />
                                )}
                            </div>
                        </div>

                        {/* middle controls Controls */}
                        <div className='flex items-center justify-center gap-3 '>
                            <div
                                onClick={() => skip(-10)}
                                className='text-white rounded-full transition-all duration-300 w-[28px] h-[28px] flex justify-center
                items-center active:bg-[#9d9d9ddb] md:hover:bg-[#9d9d9ddb]
                cursor-pointer'
                            >
                                <TenSecskip size={20} />
                            </div>

                            <button
                                onClick={handlePreviousEpisode}
                                disabled={isFirstEpisode}
                                className=' text-white w-[38px] h-[38px] flex justify-center
                items-center active:bg-[#9d9d9ddb] md:hover:bg-[#9d9d9ddb] rounded-full transition-all
                duration-300 cursor-pointer'
                            >
                                <PreviousEpisodeIcon
                                    size={38}
                                    color={previousEpColor}
                                />
                            </button>

                            <div
                                onClick={togglePlay}
                                className=' text-white w-[48px] h-[48px] flex justify-center
                items-center active:bg-[#9d9d9ddb] md:hover:bg-[#9d9d9ddb] rounded-full transition-all
                duration-300 cursor-pointer'
                            >
                                {allEpisodeEnded ? (
                                    <ReplayIcon size={38} />
                                ) : isPlaying ? (
                                    <Pause size={44} />
                                ) : (
                                    <Play size={38} />
                                )}
                            </div>
                            <button
                                onClick={handleNextEpisode}
                                disabled={isLastEpisode}
                                className=' text-white w-[38px] h-[38px] flex justify-center
                items-center active:bg-[#9d9d9ddb] md:hover:bg-[#9d9d9ddb] rounded-full transition-all
                duration-300 cursor-pointer'
                            >
                                <NextEpisodeIcon
                                    size={38}
                                    color={nextEpColor}
                                />
                            </button>

                            <div
                                onClick={() => skip(10)}
                                className='text-white rounded-full transition-all duration-300 w-[28px] h-[28px] flex justify-center
                items-center active:bg-[#9d9d9ddb] md:hover:bg-[#9d9d9ddb]
                cursor-pointer'
                            >
                                <TenSecskipBack size={20} />
                            </div>
                        </div>

                        {/* the right side Controls */}
                        <div className='flex items-center flex-none'>
                            {/* settings */}
                            <div className='flex items-center'>
                                {/* settings button */}

                                {/* Fullscreen Button */}
                                <div
                                    onClick={toggleFullscreen}
                                    className='text-white p-1 rounded-full transition-all duration-300 w-[28px] h-[28px] flex justify-center
                items-center active:bg-[#9d9d9ddb] md:hover:bg-[#9d9d9ddb]
                cursor-pointer'
                                >
                                    {document.fullscreenElement ? (
                                        <Minimize2 size={16} />
                                    ) : (
                                        <Maximize2 size={16} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* all Controls end */}
                </div>

                {/* Custom Subtitle Overlay */}
                {currentSubtitle && (
                    <div
                        className='w-full max-w-[530px] absolute left-1/2 transform
            -translate-x-1/2 text-center
            py-[3px] px-[4px] rounded-sm font-[600] z-[5]'
                        style={subtitleStyles}
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(currentSubtitle)
                        }}
                    ></div>
                )}

                {/* Loader */}
                {loading && (
                    <div
                        className='flex items-center justify-center w-full h-full
          absolute top-0 left-0 pb-8'
                    >
                        <Loader />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomVideoPlayer;
