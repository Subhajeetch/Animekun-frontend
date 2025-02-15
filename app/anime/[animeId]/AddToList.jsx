"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner"; // ShadCN toast for notifications
import {
  ListFilterPlus,
  FileChartColumn,
  CircleCheck,
  Radio,
  Anchor,
  ShieldX,
  Sparkles
} from "lucide-react";
import "./some.css";

const categories = [
  { display: "Plan To Watch", id: "PlanToWatch", icon: FileChartColumn },
  { display: "Currently Watching", id: "CurrentlyWatching", icon: Radio },
  { display: "On Hold", id: "OnHold", icon: Anchor },
  { display: "Finished", id: "Finished", icon: CircleCheck },
  { display: "Dropped", id: "Dropped", icon: ShieldX },
  { display: "Favorites", id: "Favorites", icon: Sparkles }
];

const AddToWatchlist = ({ anime }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to add anime to local storage
  const handleAddToList = category => {
    const watchlist = JSON.parse(localStorage.getItem("WaList-v1")) || {
      PlanToWatch: [],
      CurrentlyWatching: [],
      OnHold: [],
      Finished: [],
      Dropped: [],
      Favorites: []
    };

    const animeData = {
      id: anime.info.id,
      name: anime.info.name,
      jname: anime.info.name,
      poster: anime.info.poster,
      duration: anime.info.stats.duration,
      type: anime.info.stats.type,
      rating: anime.info.stats.rating,
      episodes: anime.info.stats.episodes,
      addedDate: Date.now()
    };

    // Prevent duplicate entries
    if (!watchlist[category].some(item => item.id === animeData.id)) {
      watchlist[category].push(animeData);
      localStorage.setItem("WaList-v1", JSON.stringify(watchlist));

      const formattedDate = new Date(animeData.addedDate).toLocaleString();

      toast(`Added "${anime.info.name}" to ${category}`, {
        description: formattedDate,
        action: {
          label: "Undo",
          onClick: () => handleRemoveFromList(category, animeData.id)
        }
      });
    } else {
      toast.warning(`"${anime.info.name}" is already in ${category}`);
    }

    setOpen(false);
  };

  // Function to remove anime from local storage
  const handleRemoveFromList = (category, animeId) => {
    const watchlist = JSON.parse(localStorage.getItem("WaList-v1"));

    if (!watchlist || !watchlist[category]) return;

    watchlist[category] = watchlist[category].filter(
      anime => anime.id !== animeId
    );
    localStorage.setItem("WaList-v1", JSON.stringify(watchlist));

    toast.info(`Removed "${anime.info.name}" from ${category}`);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="min-w-[40px] bg-status flex justify-center
              items-center gap-2 rounded-lg md:px-3 p-2"
      >
        <ListFilterPlus className="text-infoForeground" />
        <span className="hidden md:flex text-infoForeground font-[800]">
          Add To List
        </span>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-52 bg-background shadow-lg
        rounded-xl overflow-hidden z-50 getSepa p-2"
        >
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleAddToList(category.id)}
              className="block w-full text-left font-[700] px-2 py-2
              hover:bg-separatorOnBackgroundtwo transition-all flex
              items-center gap-2"
            >
              <category.icon className="w-5 h-5 mr-2" />
              <span className="text-[14px]">{category.display}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddToWatchlist;
