"use client";
import { useState, useEffect, useCallback } from "react";

export default function AiringSchedule({ data, color }) {
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

  const hexToRgb = hex => {
    hex = hex.replace(/^#/, "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  return (
    <div
      className="mt-2 
      shadow-lg p-2"
      style={{
        backgroundColor: `rgba(${hexToRgb(color)}, 0.3)`
      }}
    >
      <div className="space-y-3">
        <div className="flex justify-between">
          <p className="text-[13px] font-[500]">
            <span
              className="font-[800]"
              style={{
                color: `rgba(${hexToRgb(color)}, 1)`
              }}
            >
              EPISODE {data.episode}
            </span>{" "}
            WILL ARRIVE (Estimated)
          </p>
          <span className="font-mono text-[13px] font-[800]">
            {formatDuration(remainingSeconds)}
          </span>
        </div>

        <p className="font-mono text-foreground text-[14px] text-center">
          {" "}
          {formatLocalTime(data.airingTime)}
        </p>
      </div>
    </div>
  );
}
