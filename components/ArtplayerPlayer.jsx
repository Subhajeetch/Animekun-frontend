"use client";

import dynamic from 'next/dynamic';
import MineConfig from "@/mine.config.js";

const { backendUrl } = MineConfig;

// Dynamically import with SSR disabled
const ArtplayerComponent = dynamic(
    () => import('../Sections/WatchPage/VideoPlayer/Artplayer.jsx'),
    {
        ssr: false,
        loading: () => (
            <div className='w-full aspect-video bg-[#1a1a1a] flex items-center justify-center'>
                <p className='text-white'>Loading player...</p>
            </div>
        )
    }
);

const ArtplayerPlayer = (props) => {
    return <ArtplayerComponent {...props} backendUrl={backendUrl} />;
};

export default ArtplayerPlayer;
