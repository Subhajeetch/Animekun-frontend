"use client";

import React, { useEffect, useRef, useState } from "react";
import { SkipForward, FastForward } from "lucide-react";
import { renderToString } from "react-dom/server";

const ARTPLAYER_CSS = "https://unpkg.com/artplayer/dist/artplayer.css";

const ArtplayerComponent = ({
    data = { sources: [], tracks: [] },
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
    animeId,
    autoPlay = true,
    backendUrl
}) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const hlsRef = useRef(null);
    const [playerReady, setPlayerReady] = useState(false);

    // Inject CSS once
    useEffect(() => {
        if (typeof window === "undefined") return;

        const id = "artplayer-cdn-css";
        if (!document.getElementById(id)) {
            const link = document.createElement("link");
            link.id = id;
            link.rel = "stylesheet";
            link.href = ARTPLAYER_CSS;
            link.crossOrigin = "anonymous";
            document.head.appendChild(link);
        }
    }, []);

    // Main player initialization
    useEffect(() => {
        if (typeof window === "undefined" || !containerRef.current) return;

        let art = null;
        let hls = null;
        let isCleanedUp = false;

        console.log("Initializing player...");

        // Build highlights from intro/outro data - create range markers
        const buildHighlights = () => {
            try {
                console.log('Raw intro/outro data:', { intro: data.intro, outro: data.outro });

                const highlights = [];

                // Validate and add intro range
                if (data.intro &&
                    typeof data.intro.start === 'number' &&
                    typeof data.intro.end === 'number' &&
                    data.intro.start >= 0 &&
                    data.intro.end > data.intro.start &&
                    isFinite(data.intro.start) &&
                    isFinite(data.intro.end)) {

                    // Add multiple markers across the intro range for better visibility
                    const introDuration = data.intro.end - data.intro.start;
                    const introMarkers = Math.min(Math.ceil(introDuration / 10), 10); // Max 10 markers

                    for (let i = 0; i <= introMarkers; i++) {
                        const time = data.intro.start + (introDuration * i / introMarkers);
                        highlights.push({
                            time: Math.round(time),
                            text: i === 0 ? 'Intro Start' : i === introMarkers ? 'Intro End' : 'Intro'
                        });
                    }
                    console.log('Added intro highlights from', data.intro.start, 'to', data.intro.end);
                }

                // Validate and add outro range
                if (data.outro &&
                    typeof data.outro.start === 'number' &&
                    typeof data.outro.end === 'number' &&
                    data.outro.start >= 0 &&
                    data.outro.end > data.outro.start &&
                    isFinite(data.outro.start) &&
                    isFinite(data.outro.end)) {

                    // Add multiple markers across the outro range
                    const outroDuration = data.outro.end - data.outro.start;
                    const outroMarkers = Math.min(Math.ceil(outroDuration / 10), 10);

                    for (let i = 0; i <= outroMarkers; i++) {
                        const time = data.outro.start + (outroDuration * i / outroMarkers);
                        highlights.push({
                            time: Math.round(time),
                            text: i === 0 ? 'Outro Start' : i === outroMarkers ? 'Outro End' : 'Outro'
                        });
                    }
                    console.log('Added outro highlights from', data.outro.start, 'to', data.outro.end);
                }

                console.log('Total highlights:', highlights.length);
                return highlights;

            } catch (error) {
                console.error('Error building highlights:', error);
                return [];
            }
        };

        // Build highlights BEFORE loading libraries
        const highlights = buildHighlights();

        // Dynamic imports for browser-only libraries
        Promise.all([
            import('artplayer'),
            import('hls.js')
        ]).then(([ArtplayerModule, HlsModule]) => {
            if (isCleanedUp) {
                console.log("Component unmounted before player creation");
                return;
            }

            const Artplayer = ArtplayerModule.default;
            const Hls = HlsModule.default;

            try {
                // Load saved subtitle settings from localStorage
                const savedSubtitleSettings = JSON.parse(
                    localStorage.getItem('artplayer-subtitle-settings') || '{}'
                );
                const savedFontSize = Math.min(Math.max(savedSubtitleSettings.fontSize || 20, 12), 60);
                const savedColor = savedSubtitleSettings.color || '#ffffff';

                // Process video sources
                const mainSource = data.sources[0];
                const rawUrl = mainSource.url || mainSource.file || "";
                const url = mainSource.isM3U8
                    ? `${backendUrl}/api/mantox/proxy/?url=${encodeURIComponent(rawUrl)}`
                    : rawUrl;

                // Process subtitles - filter out thumbnails
                const validTracks = (Array.isArray(data.tracks) ? data.tracks : [])
                    .filter(t => {
                        const file = t.url || t.file;
                        if (!file) return false;
                        const label = (t.label || t.lang || "").toLowerCase();
                        return !(/thumbnails?/.test(label) || /thumbnails?/.test(file.toLowerCase()));
                    });

                // Build subtitle selector settings
                const subtitleSettings = validTracks.length > 0 ? [{
                    width: 200,
                    html: 'Subtitles',
                    tooltip: validTracks[0]?.label || 'Select',
                    icon: '<img width="22" height="22" src="/captions.svg" style="filter: brightness(0) invert(1);">',
                    selector: [
                        {
                            html: 'Off',
                            tooltip: 'No subtitles',
                            switch: true,
                            onSwitch(item) {
                                if (art?.subtitle) {
                                    art.subtitle.show = !item.switch;
                                }
                                item.tooltip = item.switch ? 'Show' : 'Hide';
                                return !item.switch;
                            }
                        },
                        ...validTracks.map((track, idx) => ({
                            default: idx === 0,
                            html: track.label || track.lang || `Subtitle ${idx + 1}`,
                            url: track.url || track.file
                        }))
                    ],
                    onSelect(item) {
                        if (item.url && art?.subtitle) {
                            art.subtitle.switch(item.url, {
                                name: item.html,
                            });
                        }
                        return item.html;
                    }
                }] : [];

                // Subtitle Font Size setting
                const subtitleFontSizeSettings = validTracks.length > 0 ? [{
                    html: 'Subtitle Size',
                    icon: '<img width="22" height="22" src="/type-outline.svg" style="filter: brightness(0) invert(1);">',
                    tooltip: `${savedFontSize}px`,
                    range: [savedFontSize, 12, 60, 1],
                    onRange(item) {
                        if (art?.template?.$subtitle) {
                            art.template.$subtitle.style.fontSize = `${item.range[0]}px`;

                            const settings = JSON.parse(
                                localStorage.getItem('artplayer-subtitle-settings') || '{}'
                            );
                            settings.fontSize = item.range[0];
                            localStorage.setItem('artplayer-subtitle-settings', JSON.stringify(settings));
                        }
                        return `${item.range[0]}px`;
                    }
                }] : [];

                // Subtitle Color setting
                const subtitleColorSettings = validTracks.length > 0 ? [{
                    width: 200,
                    html: 'Subtitle Color',
                    icon: '<img width="22" height="22" src="/palette.svg" style="filter: brightness(0) invert(1);">',
                    tooltip: savedSubtitleSettings.colorName || 'White',
                    selector: [
                        {
                            default: savedColor === '#ffffff',
                            html: 'White',
                            color: '#ffffff'
                        },
                        {
                            default: savedColor === '#ffff00',
                            html: 'Yellow',
                            color: '#ffff00'
                        },
                        {
                            default: savedColor === '#00ff00',
                            html: 'Green',
                            color: '#00ff00'
                        },
                        {
                            default: savedColor === '#00ffff',
                            html: 'Cyan',
                            color: '#00ffff'
                        },
                        {
                            default: savedColor === '#ff00ff',
                            html: 'Magenta',
                            color: '#ff00ff'
                        },
                        {
                            default: savedColor === '#ff0000',
                            html: 'Red',
                            color: '#ff0000'
                        }
                    ],
                    onSelect(item) {
                        if (art?.template?.$subtitle) {
                            art.template.$subtitle.style.color = item.color;

                            const settings = JSON.parse(
                                localStorage.getItem('artplayer-subtitle-settings') || '{}'
                            );
                            settings.color = item.color;
                            settings.colorName = item.html;
                            localStorage.setItem('artplayer-subtitle-settings', JSON.stringify(settings));
                        }
                        return item.html;
                    }
                }] : [];

                // Player options
                const options = {
                    container: containerRef.current,
                    url,
                    type: mainSource.isM3U8 ? 'm3u8' : '',
                    title: `${animeNameFF || ""} - EP ${episodeNumber || ""}`,
                    autoplay: !!autoPlay,
                    poster: artWorkUrl || "",
                    volume: 0.5,
                    isLive: false,
                    muted: false,
                    pip: true,
                    autoSize: true,
                    autoMini: true,
                    screenshot: false,
                    setting: true,
                    loop: false,
                    flip: true,
                    playbackRate: true,
                    aspectRatio: true,
                    fullscreen: true,
                    fullscreenWeb: true,
                    subtitleOffset: validTracks.length > 0,
                    miniProgressBar: true,
                    mutex: true,
                    backdrop: true,
                    playsInline: true,
                    autoPlayback: true,
                    theme: '#23ade5',
                    lang: navigator.language.toLowerCase(),
                    moreVideoAttr: {
                        crossOrigin: "anonymous",
                        preload: 'auto'
                    },
                    settings: [
                        ...subtitleSettings,
                        ...subtitleFontSizeSettings,
                        ...subtitleColorSettings
                    ],
                    // Add highlights for intro/outro ranges
                    highlight: highlights
                };

                // Add subtitle if available
                if (validTracks.length > 0) {
                    options.subtitle = {
                        url: validTracks[0].url || validTracks[0].file,
                        type: 'vtt',
                        style: {
                            color: savedColor,
                            fontSize: `${savedFontSize}px`,
                        },
                        encoding: 'utf-8',
                        escape: false
                    };
                }

                // HLS.js custom type with quality selection
                if (mainSource.isM3U8) {
                    options.customType = {
                        m3u8: (video, url) => {
                            if (Hls.isSupported()) {
                                hls = new Hls({
                                    enableWorker: true,
                                    lowLatencyMode: false,
                                    backBufferLength: 90,
                                    autoStartLoad: true,
                                    startLevel: -1,
                                    maxBufferLength: 60,
                                    maxMaxBufferLength: 160
                                });

                                hls.loadSource(url);
                                hls.attachMedia(video);
                                hlsRef.current = hls;

                                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                                    console.log("HLS levels:", hls.levels);

                                    if (hls.levels.length > 1) {
                                        const qualityLevels = [
                                            {
                                                default: true,
                                                html: 'Auto',
                                                level: -1
                                            },
                                            ...hls.levels.map((level, index) => ({
                                                html: `${level.height}p`,
                                                level: index
                                            }))
                                        ];

                                        const qualitySetting = {
                                            width: 200,
                                            html: 'Quality',
                                            tooltip: 'Auto',
                                            icon: '<img width="22" height="22" src="/settings.svg" style="filter: brightness(0) invert(1);">',
                                            selector: qualityLevels,
                                            onSelect(item) {
                                                console.log("Quality selected:", item.html, "Level:", item.level);

                                                const currentTime = video.currentTime;
                                                const wasPlaying = !video.paused;

                                                hls.currentLevel = item.level;

                                                if (wasPlaying) {
                                                    video.currentTime = currentTime;
                                                    video.play().catch(e => console.warn("Play error:", e));
                                                }

                                                return item.html;
                                            }
                                        };

                                        if (art && art.setting) {
                                            art.setting.add(qualitySetting);
                                        }
                                    }
                                });

                                hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
                                    const currentLevel = data.level;
                                    const qualityText = currentLevel === -1
                                        ? 'Auto'
                                        : `${hls.levels[currentLevel].height}p`;

                                    console.log("Quality switched to:", qualityText);

                                    if (art && art.setting && art.setting.option) {
                                        const qualityOption = art.setting.option.find(opt => opt.html === 'Quality');
                                        if (qualityOption) {
                                            qualityOption.tooltip = hls.currentLevel === -1
                                                ? `Auto (${qualityText})`
                                                : qualityText;
                                        }
                                    }
                                });

                                hls.on(Hls.Events.ERROR, (event, errorData) => {
                                    if (errorData.fatal) {
                                        switch (errorData.type) {
                                            case Hls.ErrorTypes.NETWORK_ERROR:
                                                console.error('Network error', errorData);
                                                hls.startLoad();
                                                break;
                                            case Hls.ErrorTypes.MEDIA_ERROR:
                                                console.error('Media error', errorData);
                                                hls.recoverMediaError();
                                                break;
                                            default:
                                                console.error('Fatal error', errorData);
                                                hls.destroy();
                                                break;
                                        }
                                    }
                                });

                                hls.on(Hls.Events.FRAG_BUFFERED, () => {
                                    if (art && art.loading) {
                                        art.loading.show = false;
                                    }
                                });

                                hls.on(Hls.Events.BUFFER_STALLED, () => {
                                    if (art && art.loading) {
                                        art.loading.show = true;
                                    }
                                });

                            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                                video.src = url;
                            } else {
                                console.error('HLS is not supported');
                            }
                        }
                    };
                }

                art = new Artplayer(options);
                playerRef.current = art;
                setPlayerReady(true);
                console.log("Player ready with", highlights.length, "highlights");

                // Apply saved settings after player is ready
                art.on('ready', () => {
                    if (art?.template?.$subtitle && validTracks.length > 0) {
                        art.template.$subtitle.style.fontSize = `${savedFontSize}px`;
                        art.template.$subtitle.style.color = savedColor;
                    }
                });

                // Track button states
                let skipIntroLayer = null;
                let skipOutroLayer = null;
                let nextEpisodeLayer = null;
                let introTimeout = null;
                let outroTimeout = null;
                let nextEpisodeTimeout = null;

                // Generate icon SVG strings
                const skipForwardIcon = renderToString(<FastForward size={18} />);
                const nextEpisodeIcon = renderToString(<SkipForward size={18} />);

                // Add animated skip intro/outro and next episode buttons
                art.on('video:timeupdate', () => {
                    const currentTime = art.currentTime;
                    const duration = art.duration;

                    // Skip Intro Button (show only for first 8 seconds of intro)
                    if (data.intro &&
                        currentTime >= data.intro.start &&
                        currentTime < Math.min(data.intro.start + 8, data.intro.end)) {

                        if (!skipIntroLayer) {
                            const timeInIntro = currentTime - data.intro.start;
                            const remainingTime = Math.max(8 - timeInIntro, 0.1);

                            skipIntroLayer = art.layers.add({
                                name: 'skip-intro',
                                html: `
                                    <div style="
                                        position: relative;
                                        padding: 10px 20px;
                                        background: #ffffff;
                                        color: #131313;
                                        border: none;
                                        border-radius: 12px;
                                        cursor: pointer;
                                        font-size: 14px;
                                        font-weight: 700;
                                        overflow: hidden;
                                        z-index: 31;
                                    ">
                                        <div style="
                                            position: absolute;
                                            top: 0;
                                            left: 0;
                                            height: 100%;
                                            background: rgba(189, 189, 189, 0.7);
                                            width: 0%;
                                            animation: progressIntro ${remainingTime}s linear forwards;
                                        "></div>
                                        <div style="display: flex; align-items: center; gap: 8px; position: relative; z-index: 1;">
                                            ${skipForwardIcon}
                                            <span>Skip Intro</span>
                                        </div>
                                    </div>
                                    <style>
                                        @keyframes progressIntro {
                                            from { width: 0%; }
                                            to { width: 100%; }
                                        }
                                    </style>
                                `,
                                style: {
                                    position: 'absolute',
                                    bottom: '80px',
                                    right: '20px',
                                    zIndex: 31
                                },
                                click() {
                                    art.currentTime = data.intro.end;
                                    if (skipIntroLayer) {
                                        art.layers.remove('skip-intro');
                                        skipIntroLayer = null;
                                    }
                                    if (introTimeout) {
                                        clearTimeout(introTimeout);
                                        introTimeout = null;
                                    }
                                }
                            });

                            // Auto-remove after 8 seconds
                            introTimeout = setTimeout(() => {
                                if (skipIntroLayer) {
                                    art.layers.remove('skip-intro');
                                    skipIntroLayer = null;
                                }
                            }, remainingTime * 1000);
                        }
                    } else if (skipIntroLayer && (currentTime < data.intro?.start || currentTime >= data.intro?.start + 8)) {
                        art.layers.remove('skip-intro');
                        skipIntroLayer = null;
                        if (introTimeout) {
                            clearTimeout(introTimeout);
                            introTimeout = null;
                        }
                    }

                    // Skip Outro Button (show only for first 8 seconds of outro)
                    if (data.outro &&
                        currentTime >= data.outro.start &&
                        currentTime < Math.min(data.outro.start + 8, data.outro.end)) {

                        if (!skipOutroLayer) {
                            const timeInOutro = currentTime - data.outro.start;
                            const remainingTime = Math.max(8 - timeInOutro, 0.1);

                            skipOutroLayer = art.layers.add({
                                name: 'skip-outro',
                                html: `
                                    <div style="
                                        position: relative;
                                        padding: 10px 20px;
                                        background: #ffffff;
                                        color: #131313;
                                        border: none;
                                        border-radius: 12px;
                                        cursor: pointer;
                                        font-size: 14px;
                                        font-weight: 700;
                                        overflow: hidden;
                                        z-index: 31;
                                    ">
                                        <div style="
                                            position: absolute;
                                            top: 0;
                                            left: 0;
                                            height: 100%;
                                            background: rgba(189, 189, 189, 0.7);
                                            width: 0%;
                                            animation: progressOutro ${remainingTime}s linear forwards;
                                        "></div>
                                        <div style="display: flex; align-items: center; gap: 8px; position: relative; z-index: 1;">
                                            ${skipForwardIcon}
                                            <span>Skip Outro</span>
                                        </div>
                                    </div>
                                    <style>
                                        @keyframes progressOutro {
                                            from { width: 0%; }
                                            to { width: 100%; }
                                        }
                                    </style>
                                `,
                                style: {
                                    position: 'absolute',
                                    bottom: '80px',
                                    right: '20px',
                                    zIndex: 31
                                },
                                click() {
                                    art.currentTime = data.outro.end;
                                    if (skipOutroLayer) {
                                        art.layers.remove('skip-outro');
                                        skipOutroLayer = null;
                                    }
                                    if (outroTimeout) {
                                        clearTimeout(outroTimeout);
                                        outroTimeout = null;
                                    }
                                }
                            });

                            // Auto-remove after 8 seconds
                            outroTimeout = setTimeout(() => {
                                if (skipOutroLayer) {
                                    art.layers.remove('skip-outro');
                                    skipOutroLayer = null;
                                }
                            }, remainingTime * 1000);
                        }
                    } else if (skipOutroLayer && (currentTime < data.outro?.start || currentTime >= data.outro?.start + 8)) {
                        art.layers.remove('skip-outro');
                        skipOutroLayer = null;
                        if (outroTimeout) {
                            clearTimeout(outroTimeout);
                            outroTimeout = null;
                        }
                    }

                    // Next Episode Button Logic
                    // Only show if NOT last episode
                    if (!isLastEpisode && handleNextEpisode && duration > 0) {
                        let shouldShowNextEpisode = false;

                        if (data.outro && data.outro.end) {
                            // Check time after outro
                            const timeAfterOutro = duration - data.outro.end;

                            // If there's more than 20 seconds after outro, show in last 10 seconds
                            if (timeAfterOutro > 20) {
                                shouldShowNextEpisode = currentTime >= duration - 10;
                            }
                        } else {
                            // No outro - show in last 10 seconds
                            shouldShowNextEpisode = currentTime >= duration - 10;
                        }

                        if (shouldShowNextEpisode && !nextEpisodeLayer) {
                            const timeRemaining = Math.max(duration - currentTime, 0.1);
                            const animDuration = Math.min(timeRemaining, 10);

                            nextEpisodeLayer = art.layers.add({
                                name: 'next-episode',
                                html: `
                                    <div style="
                                        position: relative;
                                        padding: 10px 20px;
                                        background: #ffffff;
                                        color: #131313;
                                        border: none;
                                        border-radius: 12px;
                                        cursor: pointer;
                                        font-size: 14px;
                                        font-weight: 700;
                                        overflow: hidden;
                                        z-index: 31;
                                    ">
                                        <div style="
                                            position: absolute;
                                            top: 0;
                                            left: 0;
                                            height: 100%;
                                            background: rgba(189, 189, 189, 0.7);
                                            width: 0%;
                                            animation: progressNext ${animDuration}s linear forwards;
                                        "></div>
                                        <div style="display: flex; align-items: center; gap: 8px; position: relative; z-index: 1;">
                                            ${nextEpisodeIcon}
                                            <span>Next Episode</span>
                                        </div>
                                    </div>
                                    <style>
                                        @keyframes progressNext {
                                            from { width: 0%; }
                                            to { width: 100%; }
                                        }
                                    </style>
                                `,
                                style: {
                                    position: 'absolute',
                                    bottom: '80px',
                                    right: '20px',
                                    zIndex: 31
                                },
                                click() {
                                    if (handleNextEpisode) {
                                        handleNextEpisode();
                                    }
                                    if (nextEpisodeLayer) {
                                        art.layers.remove('next-episode');
                                        nextEpisodeLayer = null;
                                    }
                                    if (nextEpisodeTimeout) {
                                        clearTimeout(nextEpisodeTimeout);
                                        nextEpisodeTimeout = null;
                                    }
                                }
                            });

                            // Auto-remove after animation completes
                            nextEpisodeTimeout = setTimeout(() => {
                                if (nextEpisodeLayer) {
                                    art.layers.remove('next-episode');
                                    nextEpisodeLayer = null;
                                }
                            }, animDuration * 1000);
                        } else if (!shouldShowNextEpisode && nextEpisodeLayer) {
                            art.layers.remove('next-episode');
                            nextEpisodeLayer = null;
                            if (nextEpisodeTimeout) {
                                clearTimeout(nextEpisodeTimeout);
                                nextEpisodeTimeout = null;
                            }
                        }
                    }
                });

                art.on('video:ended', () => {
                    if (autoPlay && handleNextEpisode && !isLastEpisode) {
                        handleNextEpisode();
                    }
                });

            } catch (e) {
                console.error("Failed to initialize Artplayer:", e);
                setPlayerReady(false);
            }
        }).catch(err => {
            console.error("Failed to load player libraries:", err);
        });

        return () => {
            isCleanedUp = true;
            console.log("Cleaning up player (component unmounted)");

            if (playerRef.current?.video) {
                try {
                    playerRef.current.video.pause();
                    playerRef.current.video.src = '';
                    playerRef.current.video.load();
                } catch (e) {
                    // ignore
                }
            }

            if (hlsRef.current) {
                try {
                    hlsRef.current.destroy();
                    hlsRef.current = null;
                } catch (e) {
                    // ignore
                }
            }

            if (playerRef.current) {
                try {
                    playerRef.current.destroy(false);
                    playerRef.current = null;
                } catch (e) {
                    // ignore
                }
            }

            setPlayerReady(false);
            console.log("Cleanup complete");
        };
    }, [data, episodeNumber, animeNameFF, artWorkUrl, autoPlay, isLastEpisode, handleNextEpisode, backendUrl]);

    return (
        <div className="w-full h-full">
            <div className="w-full aspect-video" style={{ minHeight: 200 }}>
                <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
    );
};

export default ArtplayerComponent;
