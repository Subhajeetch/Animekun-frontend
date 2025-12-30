"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import "./some.css";
import Link from "next/link";
import {
  FileChartColumn,
  Radio,
  Anchor,
  CircleCheck,
  ShieldX,
  Sparkles,
  EllipsisVertical,
  FolderMinus,
  LogIn,
  TentTree
} from "lucide-react";
import CustomImage from "@/Sections/Universal/CustomImage";

const categories = [
  { display: "Plan To Watch", id: "PlanToWatch", icon: FileChartColumn },
  { display: "Currently Watching", id: "CurrentlyWatching", icon: Radio },
  { display: "On Hold", id: "OnHold", icon: Anchor },
  { display: "Finished", id: "Finished", icon: CircleCheck },
  { display: "Dropped", id: "Dropped", icon: ShieldX },
  { display: "Favorites", id: "Favorites", icon: Sparkles }
];

const WatchlistPage = () => {
  const [activeTab, setActiveTab] = useState("PlanToWatch");
  const [watchlist, setWatchlist] = useState({});

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = () => {
    const data = JSON.parse(localStorage.getItem("WaList-v1")) || {
      PlanToWatch: [],
      CurrentlyWatching: [],
      OnHold: [],
      Finished: [],
      Dropped: [],
      Favorites: []
    };
    setWatchlist(data);
  };

  const handleRemove = (category, anime) => {
    const id = anime.id;
    const updatedList = watchlist[category].filter(anime => anime.id !== id);
    const updatedWatchlist = { ...watchlist, [category]: updatedList };

    localStorage.setItem("WaList-v1", JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist);

    toast.info(`"${anime.name}" removed from list`);
  };

  const handleMove = (currentCategory, newCategory, anime) => {
    if (currentCategory === newCategory) return;

    const updatedCurrentList = watchlist[currentCategory].filter(
      item => item.id !== anime.id
    );

    let updatedNewList = [...watchlist[newCategory]];

    // Check if the anime already exists in the new category
    const existingIndex = updatedNewList.findIndex(
      item => item.id === anime.id
    );

    if (existingIndex === -1) {
      // Add anime with updated date
      updatedNewList.push({ ...anime, addedDate: Date.now() });
      toast.success(`Moved "${anime.name}" to ${newCategory}`);
    } else {
      // Remove from the current category and notify
      toast.warning(
        `"${anime.name}" already exists in ${newCategory}, removing from ${currentCategory}`
      );
    }

    const updatedWatchlist = {
      ...watchlist,
      [currentCategory]: updatedCurrentList,
      [newCategory]: updatedNewList
    };

    localStorage.setItem("WaList-v1", JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist);
  };

  return (
    <main className=" bg-backgroundtwo min-h-screen ">
      <div className="max-w-[1800px] mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>

        {/* Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 mb-6">
          {categories.map(({ display, id, icon: Icon }) => (
            <button
              key={id}
              className={`px-2 md:px-4 py-4 md:py-6 rounded-xl flex items-center gap-2 md:gap-4
            font-bold transition-all ${activeTab === id ? "bg-main text-white" : "bg-background"
                }`}
              onClick={() => setActiveTab(id)}
            >
              <Icon className="h-[16px] md:h-[24px]" />
              <span className="text-[10px] md:text-[16px]">{display}</span>
            </button>
          ))}
        </div>

        <div className="h-0.5 w-full bg-[#3a3a3ae6] rounded-xl mb-6"></div>

        {/* Anime Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchlist[activeTab]?.length > 0 ? (
            watchlist[activeTab].map(anime => (
              <AnimeCard
                key={anime.id}
                anime={anime}
                category={activeTab}
                onRemove={handleRemove}
                onMove={handleMove}
              />
            ))
          ) : (
            <div
              className="text-center text-gray-500 col-span-full flex flex-col
          items-center mt-10"
            >
              <TentTree size={68} />
              <h2 className="text-[24px] mt-2 font-bold">This List is empty</h2>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

const AnimeCard = ({ anime, category, onRemove, onMove }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [moveDropdownOpen, setMoveDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const moveDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        (!moveDropdownRef.current ||
          !moveDropdownRef.current.contains(event.target))
      ) {
        setDropdownOpen(false);
        setMoveDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const animeDate = new Date(anime.addedDate);
  animeDate.setHours(0, 0, 0, 0); // Reset time to midnight

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to midnight

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  let formattedDate;
  if (animeDate.getTime() === today.getTime()) {
    formattedDate = "Today";
  } else if (animeDate.getTime() === yesterday.getTime()) {
    formattedDate = "Yesterday";
  } else {
    formattedDate = animeDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "2-digit"
    });
  }

  // Format time without leading zeros
  const formattedTime = new Date(anime.addedDate).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });

  const getSepa = () => {
    if (formattedDate === "Today" || formattedDate === "Yesterday") {
      return ",";
    } else {
      return " -";
    }
  };

  return (
    <div className="bg-background p-2 rounded-lg shadow-md relative flex gap-2 justify-between">
      <CustomImage
        src={anime.poster}
        alt={anime.name}
        className="w-16 h-24 object-cover rounded-lg"
      />

      <Link className="flex flex-col w-full h-full" href={`/watch/${anime.id}`}>
        <h2 className="text-[16px] font-bold line-clamp-2">{anime.name}</h2>
        <div className="flex gap-1 mt-1">
          {anime.episodes.dub > 0 && (
            <div
              className="bg-dubBackground rounded-sm text-[10px]
                        px-[6px] py-[2px] flex gap-1 shadow-md text-dubForeground"
            >
              <span className="font-[900]">EN</span>
              <span className="font-[700]">{anime.episodes.dub}</span>
            </div>
          )}
          {anime.episodes.sub > 0 && (
            <div
              className="bg-subBackground rounded-sm text-[10px]
                        px-[6px] py-[2px] flex gap-1 shadow-md text-subForeground
                        "
            >
              <span className="font-[900]">JP</span>
              <span className="font-[700]">{anime.episodes.sub}</span>
            </div>
          )}

          <div className="bg-rating rounded-sm">
            <p
              className="text-[10px] px-[6px] py-[2px] font-[700]
                  text-infoForeground"
            >
              {anime.duration}
            </p>
          </div>

          <div className="bg-quality rounded-sm">
            <p
              className="text-[10px] px-[6px] py-[2px] font-[700]
                  text-infoForeground"
            >
              {anime.type}
            </p>
          </div>
        </div>
        <p className="text-[13px] font-mono ml-1 text-gray-500 mt-1">
          {"Added On: "}
          {formattedDate}
          {getSepa()} {formattedTime}
        </p>
      </Link>

      {/* Options Button */}
      <div className="h-full flex justify-center items-center">
        <div
          ref={dropdownRef}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="hover:bg-backgroundHover p-3 rounded-full relative cursor-pointer"
        >
          <EllipsisVertical />

          {dropdownOpen && (
            <div className="absolute top-full w-[230px] right-0 bg-status shadow-lg rounded-xl z-50">
              <button
                className="block text-left px-4 py-2 rounded-xl
                text-background font-bold flex gap-3 cursor-pointer
                hover:bg-[#dab089] w-full"
                onClick={() => onRemove(category, anime)}
              >
                <FolderMinus />
                <span>Remove from List</span>
              </button>
              <button
                className="block w-full text-left px-4 py-2 rounded-xl
                text-background font-bold relative flex gap-2 cursor-pointer
                hover:bg-[#dab089]"
                onClick={e => {
                  e.stopPropagation(); // Prevents closing the dropdown
                  setMoveDropdownOpen(!moveDropdownOpen);
                }}
              >
                <LogIn />
                <span>Move To</span>

                {/* Move Dropdown */}
                {moveDropdownOpen && (
                  <div
                    className="absolute right-5 top-10 w-[230px] bg-white
                    shadow-lg rounded-xl z-50"
                    ref={moveDropdownRef}
                    onClick={e => e.stopPropagation()} // Prevents closing when clicking inside
                  >
                    {categories.map(({ display, id, icon: Icon }) => (
                      <div
                        key={id}
                        className="flex items-center space-x-2 w-full text-left
                        px-4 py-2 hover:bg-gray-100 rounded-xl cursor-pointer"
                        onClick={() => {
                          onMove(category, id, anime);
                          setDropdownOpen(false);
                          setMoveDropdownOpen(false);
                        }}
                      >
                        <Icon size={16} /> <span>{display}</span>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchlistPage;
