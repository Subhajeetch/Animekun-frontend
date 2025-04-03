"use client";

import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import DOMPurify from "dompurify";
import SubtitleSettings from "./SubtitleSettings.jsx";
import MineConfig from "@/mine.config.js";

// icons
import {
    Pause,
    Play,
    Muted,
    Unmuted,
    TenSecskip,
    TenSecskipBack,
    SkipForwardIcon,
    ReplayIcon
} from "../../Universal/icons.jsx";

import Loader from "../../Universal/Loader.jsx";
import {
    Maximize2,
    Minimize2,
    SlidersVertical,
    Captions,
    CaptionsOff,
    Check,
    Settings,
    CircleGauge,
    FolderCog,
    TriangleAlert
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
const VideoPlayer = ({
    data,
    episodeNumber,
    handleNextEpisode,
    skipIntroOutro,
    toggleFullscreen,
    isFullScreen,
    episodeName,
    isLastEpisode,
    artWorkUrl,
    animeNameFF
}) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
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
    const [showControls, setShowControls] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [manualShow, setManualShow] = useState(false); // Track manual override
    
    // for handle mouse move function:
const movementThreshold = 5; // Ignore tiny movements
const movementDelay = 500; // 500ms delay

const [lastMouseX, setLastMouseX] = useState(0);
const [lastMouseY, setLastMouseY] = useState(0);
const timerRef = useRef(null);
    
    
    
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

    const initialSubtitleStyles = () => {
        const settings = localStorage.getItem("subtitleSettings");
        const defaultStyles = {
            color: "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            opacity: 1, // Background opacity
            bottom: "20px",
            fontSize: "16px"
        };

        if (settings) {
            const parsedSettings = JSON.parse(settings);

            // Calculate RGBA for text and background
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
                parseFloat(parsedSettings.bgOpacity || "50") / 100;

            const rgbaTextColor = `rgba(${
                colorMap[parsedSettings.textColor?.toLowerCase()] ||
                "255, 255, 255"
            }, ${textOpacity})`;

            const rgbaBgColor = `rgba(${
                colorMap[parsedSettings.bgColor?.toLowerCase()] || "0, 0, 0"
            }, ${bgOpacity})`;

            // Use 20px as the default position if it doesn't exist
            const position = parsedSettings.position
                ? parsedSettings.position.replace("%", "px")
                : "20px";

            return {
                color: rgbaTextColor,
                backgroundColor: rgbaBgColor,
                bottom: position || defaultStyles.bottom,
                fontSize: parsedSettings.textSize || defaultStyles.fontSize
            };
        }

        return defaultStyles;
    };

    const [subtitleStyles, setSubtitleStyles] = useState(initialSubtitleStyles);

    if (data.sources[0].isM3U8 === false) {
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
    }

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
            </div>
        );
    } else {
        videoUrl = `${MineConfig.m3u8ProxyApiUrl}${data.sources[0].url}`;
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

            const tracks = data.tracks.filter(
                track => track.kind === "captions"
            );
            setSubtitleTracks(tracks);
            if (tracks.length > 0) {
                // Check if any track has `default: true`
                const defaultTrackIndex = tracks.findIndex(
                    track => track.default === true
                );
                setCurrentSubtitleTrack(
                    defaultTrackIndex !== -1 ? defaultTrackIndex : 0
                );
            } else {
                setCurrentSubtitleTrack(-1); // No tracks available
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
            video.removeEventListener("loadedmetadata", () => {});
            video.removeEventListener("canplaythrough", () => {});
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
    
    


const handleMouseMove = (event) => {
    const { clientX, clientY } = event;

    // Calculate the movement distance
    const dx = Math.abs(clientX - lastMouseX);
    const dy = Math.abs(clientY - lastMouseY);

    // Clear previous timer if movement happens before 500ms
    if (timerRef.current) {
        clearTimeout(timerRef.current);
    }

    // Start a new timer
    timerRef.current = setTimeout(() => {
        // Only show controls if movement is significant
        if ((dx > movementThreshold || dy > movementThreshold) && !manualShow) {
            setShowControls(true);
            resetTimer();
            setLastMouseX(clientX);
            setLastMouseY(clientY);
        }
    }, movementDelay);
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
        if (manualShow || isPaused) {
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
        const rgbaTextColor = `rgba(${
            colorMap[textColor.toLowerCase()] || "255, 255, 255"
        }, ${textOpacity})`;

        // Convert bgColor to rgba
        const rgbaBgColor = `rgba(${
            colorMap[bgColor.toLowerCase()] || "0, 0, 0"
        }, ${bgOpacity})`;

        // Map newSettings to subtitle styles
        const subtitleStyle = {
            color: rgbaTextColor, // Use rgba for text color with opacity
            fontSize: textSize,
            backgroundColor: rgbaBgColor, // Use rgba for background
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

    return (
        <div
            ref={containerRef}
            className={`flex w-full h-full aspect-video bg-[#000000] ${
                loading ? "cursor-wait" : ""
            }`}
            onMouseMove={handleMouseMove}
            onDoubleClick={toggleFullscreen}
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
                    className={`absolute w-full h-full top-0 z-[30]
        ${showControls ? "hidden" : "block"}
        `}
                ></div>

                {/* Dropdown Menu */}
                <div ref={qualityDropdownRef}>
                    {isDropdownOpen && (
                        <Tabs
                            defaultValue='quality'
                            className='w-[200px] h-[160px] md:h-[200px] absolute
                    bottom-[34px] right-[56px] rounded-md shadow-lg
                    z-30 bg-backgroundtwo'
                        >
                            <TabsList className='bg-background h-[37px] w-full'>
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

                                <div className=' w-full max-h-[116px] md:max-h-[160px] overflow-y-auto'>
                                    <div className='flex flex-col mx-2'>
                                        {/* Auto Quality Option */}
                                        <div
                                            onClick={() => {
                                                changeQuality(-1);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`flex items-center justify-between
                              text-foreground px-3 py-1 rounded-lg cursor-pointer
                              hover:bg-backgroundHover transition-all ${
                                  currentQuality === "auto"
                                      ? "bg-backgroundHover"
                                      : ""
                              }`}
                                        >
                                            <span className='text-[10px]'>
                                                Auto
                                            </span>
                                            {currentQuality === "auto" && (
                                                <Check
                                                    size={12}
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
                                hover:bg-backgroundHover transition-all ${
                                    currentQuality === label
                                        ? "bg-backgroundHover"
                                        : ""
                                }`}
                                                >
                                                    <span className='text-[10px]'>
                                                        {label}
                                                    </span>
                                                    {currentQuality ===
                                                        label && (
                                                        <Check
                                                            size={12}
                                                            className='text-white ml-2'
                                                        />
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value='subtitle'>
                                {/* subtitles in the tabbb */}

                                <div className='mb-2 w-full max-h-[116px] md:max-h-[156px] overflow-y-auto'>
                                    {/* Option to Turn Off Subtitles */}
                                    <div
                                        onClick={() => {
                                            setCurrentSubtitleTrack(-1);
                                        }}
                                        className={`flex items-center text-foreground px-3 py-1
                            rounded-full transition-all duration-200
                            cursor-pointer mx-2 hover:bg-backgroundHover ${
                                currentSubtitleTrack === -1
                                    ? "bg-backgroundHover"
                                    : ""
                            }`}
                                    >
                                        <span className='flex-1 text-[10px]'>
                                            Off
                                        </span>
                                        {currentSubtitleTrack === -1 && (
                                            <Check
                                                size={12}
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
                              cursor-pointer mx-2 hover:bg-backgroundHover ${
                                  currentSubtitleTrack === index
                                      ? "bg-backgroundHover"
                                      : ""
                              }`}
                                        >
                                            <span className='flex-1 text-[10px]'>
                                                {track.label}
                                            </span>
                                            {currentSubtitleTrack === index && (
                                                <Check
                                                    size={12}
                                                    className='text-white ml-2'
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value='videoSpeed'>
                                {/* video speed controller */}

                                <div
                                    className='mb-2 w-full max-h-[116px] md:max-h-[156px] overflow-y-auto
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
                              transition-all hover:bg-backgroundHover ${
                                  currentPlaybackSpeed === `${speed}x`
                                      ? "bg-backgroundHover"
                                      : ""
                              }`}
                                        >
                                            <span className='text-[10px]'>{`${speed}x`}</span>
                                            {currentPlaybackSpeed ===
                                                `${speed}x` && (
                                                <Check
                                                    size={12}
                                                    className='text-white ml-2'
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value='subSetting'>
                                {/* subtitles settings goes here */}

                                <SubtitleSettings
                                    className='w-max'
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
  font-[800] rounded-xl cursor-pointer right-[20px] transition-all overflow-hidden duration-200 z-[29]
  ${showControls ? "bottom-[54px]" : "bottom-[14px]"}
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
                    className={`flex flex-col absolute z-5 top-0 w-full h-full
          transition-opacity duration-300 z-20 ${
              showControls ? "opacity-100" : "opacity-0"
          }
        }`}
                    style={fadeEffectStyles}
                >
                    <div
                        className='h-[30px] ml-3 mt-2 flex items-center max-w-[80%]
          cursor-default'
                        style={EpisodeNameFadeStyles}
                    >
                        <div className='h-[24px] w-[4px] bg-main rounded-md'></div>

                        <span className=' text-[14px] font-[800] text-white ml-2 mr-5 '>{`EP
            ${episodeNumber}`}</span>

                        {isFullScreen && (
                            <span className='text-[13px] font-[700] truncate'>{`${episodeName}`}</span>
                        )}
                    </div>

                    <div
                        className='flex-1 flex items-center justify-center'
                        onClick={() => {
                            ToggleAllControls();
                        }}
                    >
                        {/* Play/Pause Button (big button on the middle)*/}
                        <div
                            className='flex items-center gap-[24px]'
                            onClick={makeControlApperOnCkick}
                        >
                            {isFullScreen && (
                                <div
                                    onClick={() => skip(-10)}
                                    className='text-white rounded-full transition-all duration-300
                  flex items-center justify-center h-[38px] w-[38px]
                  cursor-pointer bg-[#22222229]
                active:bg-[#4c4c4cc1] md:hover:bg-[#4c4c4cc1]'
                                >
                                    <TenSecskip size={24} />
                                </div>
                            )}

                            <div
                                onClick={togglePlay}
                                className='w-[54px] h-[54px] flex justify-center items-center
                text-white rounded-full transition-all duration-300
                cursor-pointer bg-[#22222229]
                active:bg-[#4c4c4cc1] md:hover:bg-[#4c4c4cc1]'
                            >
                                {allEpisodeEnded ? (
                                    <ReplayIcon size={38} />
                                ) : loading ? (
                                    <Loader />
                                ) : isPlaying ? (
                                    <Pause size={44} />
                                ) : (
                                    <Play size={38} />
                                )}
                            </div>

                            {isFullScreen && (
                                <div
                                    onClick={() => skip(10)}
                                    className='text-white rounded-full transition-all duration-300
                  flex items-center justify-center cursor-pointer h-[38px] w-[38px] bg-[#22222229]
                active:bg-[#4c4c4cc1] md:hover:bg-[#4c4c4cc1]'
                                >
                                    <TenSecskipBack size={24} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* progress bar & time */}

                    <div
                        className='flex flex-col py-1 w-full px-2 mb-1'
                        onMouseMove={() => {
                            setShowControls(true);
                            setManualShow(true);
                        }}
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
                                            left: `${
                                                (introStart / duration) * 100
                                            }%`,
                                            width: `${
                                                ((introEnd - introStart) /
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
                                            left: `${
                                                (outroStart / duration) * 100
                                            }%`,
                                            width: `${
                                                ((outroEnd - outroStart) /
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
                                        width: `${
                                            (currentTime / duration) * 100
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
                                            left: `${
                                                (currentTime / duration) * 100
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
                    <div className='flex items-center w-full px-2 mb-1'>
                        <div className='flex gap-[12px] items-center flex-none'>
                            {/* Play/Pause Button */}
                            <div
                                onClick={togglePlay}
                                className=' text-white w-[28px] h-[28px] flex justify-center
                items-center active:bg-[#9d9d9ddb] md:hover:bg-[#9d9d9ddb] rounded-full transition-all
                duration-300 cursor-pointer
                ml-2 '
                            >
                                {isPlaying ? (
                                    <Pause size={22} />
                                ) : (
                                    <Play size={18} />
                                )}
                            </div>

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

                        <div className='flex-auto'></div>

                        {/* the left side Controls */}
                        <div className='flex gap-[24px] items-center flex-none'>
                            {/* Skip Buttons */}
                            <div className='flex gap-[8px]'>
                                <div
                                    onClick={() => skip(-10)}
                                    className='text-white rounded-full transition-all duration-300 w-[28px] h-[28px] flex justify-center
                items-center active:bg-[#9d9d9ddb] md:hover:bg-[#9d9d9ddb]
                cursor-pointer'
                                >
                                    <TenSecskip size={20} />
                                </div>
                                <div
                                    onClick={() => skip(10)}
                                    className='text-white rounded-full transition-all duration-300 w-[28px] h-[28px] flex justify-center
                items-center active:bg-[#9d9d9ddb] md:hover:bg-[#9d9d9ddb]
                cursor-pointer'
                                >
                                    <TenSecskipBack size={20} />
                                </div>
                            </div>

                            {/* settings */}
                            <div className='flex items-center'>
                                {/* settings button */}
                                <div className='relative' ref={exceptionRef}>
                                    {/* Button to Toggle Dropdown */}
                                    <div
                                        onClick={() => {
                                            setIsDropdownOpen(prev => !prev);
                                            setShowControls(true);
                                            setManualShow(true);
                                        }}
                                        className='text-white rounded-full transition-all w-[28px] h-[28px] flex justify-center
                items-center active:bg-[#9d9d9ddb] md:hover:bg-[#9d9d9ddb]
                cursor-pointer'
                                    >
                                        <SlidersVertical
                                            size={17}
                                            className='text-white'
                                        />
                                    </div>
                                </div>

                                {/* Fullscreen Button */}
                                <div
                                    onClick={toggleFullscreen}
                                    className='text-white p-1 ml-2.5 mr-2 rounded-full transition-all duration-300 w-[28px] h-[28px] flex justify-center
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
                        className='subtitle-overlay w-fit absolute left-1/2 transform
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

export default VideoPlayer;
