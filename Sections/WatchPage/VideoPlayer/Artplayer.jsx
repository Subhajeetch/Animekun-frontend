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

    // Store latest props in refs to avoid dependency issues
    const propsRef = useRef({
        handleNextEpisode,
        handlePreviousEpisode,
        isLastEpisode,
        skipIntroOutro,
        data
    });

    // Update refs when props change
    useEffect(() => {
        propsRef.current = {
            handleNextEpisode,
            handlePreviousEpisode,
            isLastEpisode,
            skipIntroOutro,
            data
        };
    }, [handleNextEpisode, handlePreviousEpisode, isLastEpisode, skipIntroOutro, data]);

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

    useEffect(() => {
        if (typeof window === "undefined" || !containerRef.current) return;

        let art = null;
        let hls = null;
        let isCleanedUp = false;

        console.log("Initializing player...");
        const buildChapters = () => {
            try {
                const currentData = propsRef.current.data;
                console.log('Raw intro/outro data:', { intro: currentData.intro, outro: currentData.outro });

                const chapters = [];

                const hasIntro = currentData.intro &&
                    typeof currentData.intro.start === 'number' &&
                    typeof currentData.intro.end === 'number' &&
                    currentData.intro.start >= 0 &&
                    currentData.intro.end > currentData.intro.start &&
                    isFinite(currentData.intro.start) &&
                    isFinite(currentData.intro.end);

                const hasOutro = currentData.outro &&
                    typeof currentData.outro.start === 'number' &&
                    typeof currentData.outro.end === 'number' &&
                    currentData.outro.start >= 0 &&
                    currentData.outro.end > currentData.outro.start &&
                    isFinite(currentData.outro.start) &&
                    isFinite(currentData.outro.end);

                if (!hasIntro && !hasOutro) {
                    console.log('No intro/outro data, skipping chapters');
                    return null;
                }

                if (hasIntro && hasOutro) {
                    if (currentData.intro.start > 0) {
                        // Before intro
                        chapters.push({
                            start: 0,
                            end: currentData.intro.start,
                            title: ''
                        });
                    }

                    // Intro
                    chapters.push({
                        start: currentData.intro.start,
                        end: currentData.intro.end,
                        title: 'Intro'
                    });

                    // Between intro and outro
                    if (currentData.intro.end < currentData.outro.start) {
                        chapters.push({
                            start: currentData.intro.end,
                            end: currentData.outro.start,
                            title: ''
                        });
                    }

                    // Outro
                    chapters.push({
                        start: currentData.outro.start,
                        end: currentData.outro.end,
                        title: 'Outro'
                    });

                    // After outro
                    chapters.push({
                        start: currentData.outro.end,
                        end: Infinity,
                        title: ''
                    });

                } else if (hasIntro) {
                    // Only intro exists
                    if (currentData.intro.start > 0) {
                        chapters.push({
                            start: 0,
                            end: currentData.intro.start,
                            title: ''
                        });
                    }

                    chapters.push({
                        start: currentData.intro.start,
                        end: currentData.intro.end,
                        title: 'Intro'
                    });

                    chapters.push({
                        start: currentData.intro.end,
                        end: Infinity,
                        title: ''
                    });

                } else if (hasOutro) {
                    // Only outro exists
                    if (currentData.outro.start > 0) {
                        chapters.push({
                            start: 0,
                            end: currentData.outro.start,
                            title: ''
                        });
                    }

                    chapters.push({
                        start: currentData.outro.start,
                        end: currentData.outro.end,
                        title: 'Outro'
                    });

                    chapters.push({
                        start: currentData.outro.end,
                        end: Infinity,
                        title: ''
                    });
                }

                console.log('Built chapters:', chapters);
                return chapters;

            } catch (error) {
                console.error('Error building chapters:', error);
                return null;
            }
        };

        const chapters = buildChapters();

        // Dynamic imports
        const imports = [
            import('artplayer'),
            import('hls.js')
        ];

        // Only import chapter plugin if we have chapters
        if (chapters && chapters.length > 0) {
            imports.push(import('artplayer-plugin-chapter'));
        }

        Promise.all(imports).then((modules) => {
            if (isCleanedUp) {
                console.log("Component unmounted before player creation");
                return;
            }

            const ArtplayerModule = modules[0];
            const HlsModule = modules[1];
            const ChapterPluginModule = chapters && chapters.length > 0 ? modules[2] : null;

            const Artplayer = ArtplayerModule.default;
            const Hls = HlsModule.default;
            const artplayerPluginChapter = ChapterPluginModule?.default;

            try {
                const currentData = propsRef.current.data;

                // Load saved subtitle settings
                const savedSubtitleSettings = JSON.parse(
                    localStorage.getItem('artplayer-subtitle-settings') || '{}'
                );
                const savedFontSize = Math.min(Math.max(savedSubtitleSettings.fontSize || 20, 12), 60);
                const savedColor = savedSubtitleSettings.color || '#ffffff';

                // Process video sources
                const mainSource = currentData.sources[0];
                const rawUrl = mainSource.url || mainSource.file || "";
                const url = mainSource.isM3U8
                    ? `${backendUrl}/api/mantox/proxy/?url=${encodeURIComponent(rawUrl)}`
                    : rawUrl;

                // Process subtitles
                const validTracks = (Array.isArray(currentData.tracks) ? currentData.tracks : [])
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
                    screenshot: false,
                    setting: true,
                    loop: false,
                    flip: true,
                    playbackRate: true,
                    aspectRatio: true,
                    fullscreen: true,
                    subtitleOffset: validTracks.length > 0,
                    miniProgressBar: true,
                    mutex: true,
                    backdrop: true,
                    playsInline: true,
                    autoPlayback: true,
                    theme: '#fe0000',
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
                    plugins: []
                };

                // Add chapter plugin if we have chapters
                if (chapters && chapters.length > 0 && artplayerPluginChapter) {
                    options.plugins.push(
                        artplayerPluginChapter({
                            chapters: chapters
                        })
                    );
                    console.log('Chapter plugin added with', chapters.length, 'chapters');
                }

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

                // HLS.js custom type
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
                console.log("Player ready");

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
                    const latestData = propsRef.current.data;
                    const latestIsLastEpisode = propsRef.current.isLastEpisode;
                    const latestHandleNextEpisode = propsRef.current.handleNextEpisode;

                    // Skip Intro Button
                    if (latestData.intro &&
                        currentTime >= latestData.intro.start &&
                        currentTime < Math.min(latestData.intro.start + 8, latestData.intro.end)) {

                        if (!skipIntroLayer) {
                            const timeInIntro = currentTime - latestData.intro.start;
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
                                    art.currentTime = latestData.intro.end;
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

                            introTimeout = setTimeout(() => {
                                if (skipIntroLayer) {
                                    art.layers.remove('skip-intro');
                                    skipIntroLayer = null;
                                }
                            }, remainingTime * 1000);
                        }
                    } else if (skipIntroLayer && (currentTime < latestData.intro?.start || currentTime >= latestData.intro?.start + 8)) {
                        art.layers.remove('skip-intro');
                        skipIntroLayer = null;
                        if (introTimeout) {
                            clearTimeout(introTimeout);
                            introTimeout = null;
                        }
                    }

                    // Skip Outro Button
                    if (latestData.outro &&
                        currentTime >= latestData.outro.start &&
                        currentTime < Math.min(latestData.outro.start + 8, latestData.outro.end)) {

                        if (!skipOutroLayer) {
                            const timeInOutro = currentTime - latestData.outro.start;
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
                                    art.currentTime = latestData.outro.end;
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

                            outroTimeout = setTimeout(() => {
                                if (skipOutroLayer) {
                                    art.layers.remove('skip-outro');
                                    skipOutroLayer = null;
                                }
                            }, remainingTime * 1000);
                        }
                    } else if (skipOutroLayer && (currentTime < latestData.outro?.start || currentTime >= latestData.outro?.start + 8)) {
                        art.layers.remove('skip-outro');
                        skipOutroLayer = null;
                        if (outroTimeout) {
                            clearTimeout(outroTimeout);
                            outroTimeout = null;
                        }
                    }

                    // Next Episode Button
                    if (!latestIsLastEpisode && latestHandleNextEpisode && duration > 0) {
                        let shouldShowNextEpisode = false;

                        if (latestData.outro && latestData.outro.end) {
                            const timeAfterOutro = duration - latestData.outro.end;

                            if (timeAfterOutro > 20) {
                                shouldShowNextEpisode = currentTime >= duration - 10;
                            }
                        } else {
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
                                    if (latestHandleNextEpisode) {
                                        latestHandleNextEpisode();
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
                    if (autoPlay && propsRef.current.handleNextEpisode && !propsRef.current.isLastEpisode) {
                        propsRef.current.handleNextEpisode();
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
            console.log("Cleaning up player");

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
    }, [episodeNumber, animeId, backendUrl]); // ONLY primitives that need re-init

    return (
        <div className="w-full h-full">
            <div className="w-full aspect-video" style={{ minHeight: 200 }}>
                <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
    );
};

export default ArtplayerComponent;
