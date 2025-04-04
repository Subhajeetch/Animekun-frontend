"use client";
import { useState, useEffect, useRef } from "react";
import VideoPlayer from "./VideoPlayer.jsx";

export default function EditProfile() {
    const targetRef = useRef(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isFirstEpisode, setIsFirstEpisode] = useState(false);
    const [isLastEpisode, setIsLastEpisode] = useState(true);

    const skipIntroOutro = true;
    const artWorkUrl = "https://i.imgur.com/MNnhK3G.jpeg";
    const animeNameFF = "Attack on Titan";

    const handleNextEpisode = () => {
        console.log("lol");
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
            console.error(
                "Error toggling fullscreen or locking orientation:",
                err
            );
        }
    };

    const streamingData = {
        tracks: [
            {
                file: "https://s.megastatics.com/subtitle/5fbacd492a343a2f30b97d682b61b985/eng-2.vtt",
                label: "English",
                kind: "captions",
                default: true
            },
            {
                file: "https://s.megastatics.com/subtitle/5fbacd492a343a2f30b97d682b61b985/eng-3.vtt",
                label: "English",
                kind: "captions"
            },
            {
                file: "https://s.megastatics.com/subtitle/806a582526a4c5a226514316bd5b6f64/806a582526a4c5a226514316bd5b6f64.vtt",
                label: "English - (Crunchyroll)",
                kind: "captions"
            },
            {
                file: "https://s.megastatics.com/subtitle/5fbacd492a343a2f30b97d682b61b985/por-4.vtt",
                label: "Portuguese",
                kind: "captions"
            },
            {
                file: "https://s.megastatics.com/subtitle/5fbacd492a343a2f30b97d682b61b985/spa-5.vtt",
                label: "Spanish",
                kind: "captions"
            },
            {
                file: "https://s.megastatics.com/thumbnails/9f851301fa0ea7b316599351ccedb423/thumbnails.vtt",
                kind: "thumbnails"
            }
        ],
        intro: {
            start: 138,
            end: 215
        },
        outro: {
            start: 1452,
            end: 1542
        },
        sources: [
            {
                url: "https://sunshinerays93.live/_v7/85da27503d497abadce04a6c756a9bfad648451cfea9f39d3c2a584a9ffb45644417f699e0da69cb4f50701ecebb8b1d75d4f37b02dc2eeb0e32a287de765222ad083ea27aa71e7dc61b69b07dccc5558c5451e2ff91642435e5ebc7dbfce30db6a9e2367f75ad4173dac32b5f950b11d5f662e56f75fe72efb3518b4e008b1c/master.m3u8",
                type: "hls"
            }
        ],
        anilistID: 16498,
        malID: 16498
    };

    return (
        <main className='bg-[#334045] min-h-screen'>
            <div ref={targetRef} className='w-full'>
                {streamingData && (
                    <VideoPlayer
                        data={streamingData}
                        episodeNumber={1}
                        episodeName={"Down bad eren"}
                        handleNextEpisode={handleNextEpisode}
                        skipIntroOutro={skipIntroOutro}
                        toggleFullscreen={toggleFullscreen}
                        isFullScreen={isFullScreen}
                        isLastEpisode={isLastEpisode}
                        isFirstEpisode={isFirstEpisode}
                        artWorkUrl={artWorkUrl}
                        animeNameFF={animeNameFF}
                        animeId={"attack-on-titan"}
                    />
                )}
            </div>
        </main>
    );
}
