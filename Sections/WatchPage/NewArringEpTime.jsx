import { CircleArrowDown, ClockArrowDown } from 'lucide-react';
import { useState, useEffect, useCallback } from "react";

const NewArringEpTime = ({ data, toggleEpAnnouncementCollapse, isEpAnnouncementCollapsed }) => {
    const [remainingSeconds, setRemainingSeconds] = useState(
        data.timeUntilAiring
    );
    const [isClient, setIsClient] = useState(false);

    const formatDuration = useCallback(seconds => {
        if (seconds <= 0) return "Aired";

        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        const parts = [];
        let started = false;

        // Days
        if (days > 0) {
            parts.push(`${days}d`);
            started = true;
        }

        // Hours
        if (started) {
            if (hours > 0) parts.push(`${hours}h`);
        } else {
            if (hours > 0) {
                parts.push(`${hours}h`);
                started = true;
            }
        }

        // Minutes
        if (started) {
            if (minutes > 0) parts.push(`${minutes}m`);
        } else {
            if (minutes > 0) {
                parts.push(`${minutes}m`);
                started = true;
            }
        }

        // Seconds - always show if no other components
        if (started) {
            if (secs > 0) parts.push(`${secs}s`);
        } else {
            parts.push(`${secs}s`);
        }

        return parts.join(" ");
    }, []);

    const formatLocalTime = useCallback(timestamp => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString([], {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short"
        });
    }, []);

    useEffect(() => {
        setIsClient(true);
        const interval = setInterval(() => {
            setRemainingSeconds(prev => {
                const newValue = prev - 1;
                if (newValue <= 0) clearInterval(interval);
                return newValue;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!isClient) return null;



    return (
        <div
            className={`rounded-lg p-1 px-2.5 bg-[#385553] flex flex-col gap-3 relative transition-all duration-300 overflow-hidden ${isEpAnnouncementCollapsed ? "h-[34px]" : "h-[100px]"
                }`}
        >
            <div className='flex gap-2 justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <ClockArrowDown size={20} />
                    <p className='font-bold'>
                        Episode {data.episode}
                    </p>
                </div>

                {/* Timer - shows when collapsed, fades out when expanded */}
                <div
                    className={`flex gap-3 items-center mr-9 transition-all duration-300 ease-in-out ${isEpAnnouncementCollapsed
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                        }`}
                >
                    <span className='text-[13px] font-[500]'>
                        {formatDuration(remainingSeconds)}
                    </span>
                </div>
            </div>

            {/* Expanded content - fades in when opened */}
            <div
                className={`transition-all duration-300 ease-in-out ${isEpAnnouncementCollapsed
                    ? 'opacity-0 -translate-y-2 pointer-events-none'
                    : 'opacity-100 translate-y-0'
                    }`}
            >
                <p>
                    Airing on <span className='font-bold'>{formatLocalTime(data.airingTime)}</span>. Means {formatDuration(remainingSeconds)} left.
                </p>
            </div>

            {/* Toggle button with rotation */}
            <button
                className='absolute top-0.5 right-1 transition-transform duration-300 ease-in-out hover:bg-[#0f725b] rounded-full p-1'
                onClick={toggleEpAnnouncementCollapse}
                style={{ transform: isEpAnnouncementCollapsed ? 'rotate(0deg)' : 'rotate(180deg)' }}
            >
                <CircleArrowDown size={24} />
            </button>
        </div>
    );
};

export default NewArringEpTime;
