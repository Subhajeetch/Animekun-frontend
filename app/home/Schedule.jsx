"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Play } from "@/Sections/Universal/icons.jsx";
import "./some.css";

const ScheduleComponent = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [datesList, setDatesList] = useState([]);
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollContainer = useRef(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Function to update time every second
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString());
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Generate initial dates (4 days before + 15 days after)
  useEffect(() => {
    const generateDates = () => {
      const dates = [];
      const today = new Date();

      for (let i = -4; i <= 15; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date);
      }

      setDatesList(dates);
      setSelectedDate(formatDate(today));
    };

    generateDates();
  }, []);

  // Scroll to current date on initial load
  useEffect(() => {
    if (datesList.length > 0 && scrollContainer.current) {
      const todayIndex = 4; // 4 days before + current date (index 4)
      const container = scrollContainer.current;
      const target = container.children[todayIndex];

      if (target) {
        container.scrollTo({
          left:
            target.offsetLeft -
            container.offsetWidth / 2 +
            target.offsetWidth / 2,
          behavior: "auto"
        });
      }
    }
  }, [datesList]);

  // Handle scroll events for fade effects
  useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return;

    const handleScroll = () => {
      setShowLeftFade(container.scrollLeft > 0);
      setShowRightFade(
        container.scrollLeft < container.scrollWidth - container.offsetWidth
      );
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Format date to YYYY-MM-DD
  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  const getDayName = date => {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };


  const getFormattedDate = date => {
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

  // Fetch anime data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `/api/mantox/get/schedule/${selectedDate}`
        );

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setAnimeData(data.data.scheduledAnimes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedDate) fetchData();
  }, [selectedDate]);

  // Smooth scroll handler
  const scroll = direction => {
    const container = scrollContainer.current;
    const scrollAmount = container.offsetWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  // Group anime by time
  const groupAnimeByTime = useCallback(() => {
    if (!animeData) return null;

    const grouped = animeData.reduce((acc, anime) => {
      acc[anime.time] = acc[anime.time] || [];
      acc[anime.time].push(anime);
      return acc;
    }, {});

    return Object.keys(grouped)
      .sort((a, b) => {
        const timeToMinutes = time => {
          const [hours, minutes] = time.split(":").map(Number);
          return hours * 60 + minutes;
        };
        return timeToMinutes(a) - timeToMinutes(b);
      })
      .map(time => ({
        time,
        animes: grouped[time]
      }));
  }, [animeData]);

  return (
    <div className="w-full lg:max-w-[500px] mx-auto bg-background rounded-xl pt-2 relative">
      <div className="text-[11px] text-gray-500 absolute right-4 top-7">
        (GMT+05:30) {currentTime || "Loading..."}
      </div>

      <div
        className="p-4 flex
        items-center font-[800] text-[18px] gap-2"
      >
        <div className="h-[28px] w-[8px] rounded-full bg-main"></div>

        <h2>Schedule</h2>
      </div>

      {/* Date scroller */}
      <div className="relative mb-6 px-6">
        {/* Fade effects */}
        {showLeftFade && (
          <div
            className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r
          from-background to-transparent pointer-events-none z-20"
          />
        )}
        {showRightFade && (
          <div
            className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l
          from-background to-transparent pointer-events-none z-20"
          />
        )}

        {/* Scroll buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-30
          bg-backgroundHover p-2 shadow-lg rounded-full hover:bg-separatorOnBackgroundtwo"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-30
          bg-backgroundHover p-2 shadow-lg rounded-full hover:bg-separatorOnBackgroundtwo"
        >
          <ChevronRight />
        </button>

        {/* Dates container */}
        <div
          ref={scrollContainer}
          className="flex space-x-4 overflow-x-auto scroll-smooth no-scrollbar
          py-2 px-10 snap-x snap-mandatory"
        >
          {datesList.map((date, index) => {
            const dateString = formatDate(date);
            return (
              <button
                key={index}
                data-date={dateString}
                onClick={() => setSelectedDate(dateString)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg snap-center ${selectedDate === dateString
                    ? "bg-main text-white"
                    : "bg-backgroundtwo hover:bg-separatorOnBackgroundtwo"
                  }`}
              >
                <div className="flex flex-col">
                  <p className="text-[14px] font-[800]">{getDayName(date)}</p>
                  <span className="text-[9px] font-mono">
                    {getFormattedDate(date)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content area */}
      <div className="min-h-[400px] px-2 flex flex-col gap-2 scheduleDivs">
        {loading && <div className="text-gray-500 text-center">Loading...</div>}
        {error && (
          <div className="text-red-500 text-center">Error: {error}</div>
        )}

        {!loading &&
          !error &&
          animeData?.map((a, index) => (
            <div key={index} className="flex gap-3 p-3 py-4">
              <p className="text-[12px] font-[600] text-discriptionForeground">
                {a.time || "?"}
              </p>
              <div key={a.id} className="flex-1 flex justify-between">
                <h3 className="font-[800] text-[14px] line-clamp-1 max-w-[60%]">
                  {a.name}
                </h3>
                <Link
                  className="text-foreground text-[12px] font-[700]
                   hover:bg-backgroundtwo
                    rounded-lg px-2 flex gap-2 items-center
                    "
                  href={`/watch/${a.id}`}
                >
                  <span>Episode {a.episode}</span>
                  <Play size={12} />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ScheduleComponent;
