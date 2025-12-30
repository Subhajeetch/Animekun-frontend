"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  CircleChevronDown,
  CircleChevronUp,
  MessageCircleQuestion,
  Trash2
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

import Link from "next/link";
import "./some.css";
import CustomImage from "@/Sections/Universal/CustomImage";

const History = () => {
  const [watchHistory, setWatchHistory] = useState([]);

  useEffect(() => {
    // Get continue watching data from localStorage
    const storedData = JSON.parse(localStorage.getItem("conWa-v1")) || [];

    const groupedData = storedData.reduce((acc, anime) => {
      const animeDate = new Date(anime.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize to start of today
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      let formattedDate;
      if (animeDate.getTime() === today.getTime()) {
        formattedDate = "Today";
      } else if (animeDate.getTime() === yesterday.getTime()) {
        formattedDate = "Yesterday";
      } else {
        formattedDate = animeDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "2-digit"
        });
      }

      if (!acc[formattedDate]) acc[formattedDate] = [];
      acc[formattedDate].push(anime);
      return acc;
    }, {});

    setWatchHistory(groupedData);
  }, []);

  const handleDelete = animeId => {
    const storedData = JSON.parse(localStorage.getItem("conWa-v1")) || [];

    const updatedData = storedData.filter(anime => anime.animeId !== animeId);

    localStorage.setItem("conWa-v1", JSON.stringify(updatedData));

    // Re-group data by date
    const groupedData = updatedData.reduce((acc, anime) => {
      const animeDate = new Date(anime.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
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

      if (!acc[formattedDate]) acc[formattedDate] = [];
      acc[formattedDate].push(anime);
      return acc;
    }, {});

    // Update state with re-grouped data
    setWatchHistory(groupedData);
  };

  return (
    <main className="min-h-screen bg-backgroundtwo">
      <div className="max-w-[1800px] mx-auto p-4">
        <div className=" mb-10 flex justify-start">
          <Link
            className="flex justify-between items-center bg-background gap-2
        py-2 px-3 rounded-lg hover:bg-separatorOnBackgroundtwo"
            href="/home"
          >
            <ArrowLeft />
            <span className="text-[18px] font-bold">Home</span>
          </Link>
        </div>

        {Object.keys(watchHistory).length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <MessageCircleQuestion size={58} />

            <h1 className="text-[22px] mt-4 font-bold">
              No watch history found.
            </h1>
            <p className="text-gray-500 text-[13px]">
              Please watch something to get started
            </p>
          </div>
        ) : (
          Object.entries(watchHistory).map(([date, animes]) => (
            <div key={date} className="mb-6 max-w-[600px]">
              <h3 className="text-[30px] font-bold text-animeCardDimmerForeground mb-3">
                {date}
              </h3>
              <div className="space-y-4">
                {animes.map(anime => (
                  <AnimeCard
                    key={anime.animeId}
                    anime={anime}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

// Anime Card Component
const AnimeCard = ({ anime, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-background shadow-md rounded-xl overflow-hidden">
      {/* Anime Info */}
      <div className="flex items-start p-3 cursor-pointer">
        <Link href={`/watch/${anime.animeId}`}>
          <CustomImage
            src={anime.poster}
            alt={anime.animeEngName}
            className="w-16 h-24 object-cover rounded-lg"
          />
        </Link>
        <Link
          className="ml-4 flex-1 h-24 flex flex-col"
          href={`/watch/${anime.animeId}`}
        >
          <h4 className="text-[16px] font-bold line-clamp-2">
            {anime.animeEngName}
          </h4>
          <p className="text-sm font-[500] text-gray-500 mt-1">
            Last watched{" "}
            <span className="font-[800]">Episode {anime.lastEp.epNum}</span>
          </p>
        </Link>
        <div className="flex flex-col w-[50px] items-center h-24">
          <AlertDialog>
            <AlertDialogTrigger>
              {" "}
              <div className="p-3 rounded-full hover:bg-backgroundHover">
                <Trash2 />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  The following anime will be deleted from history. Are you sure?
                </AlertDialogTitle>
                <AlertDialogDescription></AlertDialogDescription>

                <div className="flex items-start p-3 bg-backgroundtwo rounded-xl">
                  <div href={`/watch/${anime.animeId}`}>
                    <CustomImage
                      src={anime.poster}
                      alt={anime.animeEngName}
                      className="w-16 h-24 object-cover rounded-lg"
                    />
                  </div>
                  <div
                    className="ml-4 flex-1 h-24 flex flex-col"
                    href={`/watch/${anime.animeId}`}
                  >
                    <h4 className="text-[16px] text-left font-bold line-clamp-2">
                      {anime.animeEngName}
                    </h4>
                    <p className="text-sm text-left font-[500] text-gray-500 mt-1">
                      Last watched{" "}
                      <span className="font-[800]">
                        Episode {anime.lastEp.epNum}
                      </span>
                    </p>
                  </div>
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(anime.animeId)}
                  className="bg-backgroundHover hover:bg-main"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <button
            className="p-3 rounded-full hover:bg-backgroundHover"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <CircleChevronUp /> : <CircleChevronDown />}
          </button>
        </div>
      </div>

      {/* Episode Dropdown */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden
        overflow-y-auto scrollbar-thin scrollbar-thumb-backgroundHover
          scrollbar-track-background ${isOpen ? "max-h-[800px]" : "max-h-0"}`}
      >
        <div
          className="px-4 py-2 border-t border-[#2f2f2fc3] bg-[#252525] flex
        flex-col gap-1 getSeparation"
        >
          {anime.eps.length > 0 ? (
            anime.eps.map(ep => {
              const epDate = new Date(ep.date);
              epDate.setHours(0, 0, 0, 0); // Reset time to midnight

              const today = new Date();
              today.setHours(0, 0, 0, 0); // Reset time to midnight

              const yesterday = new Date(today);
              yesterday.setDate(today.getDate() - 1);

              let formattedDate;
              if (epDate.getTime() === today.getTime()) {
                formattedDate = "Today";
              } else if (epDate.getTime() === yesterday.getTime()) {
                formattedDate = "Yesterday";
              } else {
                formattedDate = epDate.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "2-digit"
                });
              }

              const formattedTime = new Date(ep.date).toLocaleTimeString(
                "en-US",
                {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true
                }
              );

              const getSepa = () => {
                if (
                  formattedDate === "Today" ||
                  formattedDate === "Yesterday"
                ) {
                  return ",";
                } else {
                  return " -";
                }
              };

              return (
                <div
                  key={ep.ep}
                  className="flex justify-between py-1.5 text-[14px] font-bold text-animeCardDimmerForeground"
                >
                  <p>Episode {ep.ep} </p>
                  <p>
                    {formattedDate}
                    {getSepa()} {formattedTime}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-500">No episodes watched.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
