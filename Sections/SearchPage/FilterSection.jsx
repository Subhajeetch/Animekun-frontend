"use client";

import { useState } from "react";
import GenreMap from "../../Utils/genreMap.js";
import { useRouter } from "next/navigation";

import {
  DrawerClose,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";

const FilterSection = ({ q, page }) => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    lang: "",
    sort: "",
    status: "",
    type: "",
    rated: "",
    score: "",
    season: "",
    start_date: "",
    end_date: "",
    genres: []
  });

  // Update filter state
  const handleInputChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleGenreSelect = genre => {
    setFilters(prev => {
      const updatedGenres = prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre];
      return { ...prev, genres: updatedGenres };
    });
  };

  // Construct URL with query parameters
  const constructURL = () => {
    const params = new URLSearchParams();

    // Retain current query and page values
    if (q) params.append("q", q);
    if (page) params.append("page", page);

    // Add updated filter values
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.append(key, value.join(","));
      } else if (value) {
        params.append(key, value);
      }
    });

    return `/search?${params.toString()}`;
  };

  const handleSubmit = () => {
    // Construct the formatted URL
    const formattedURL = constructURL();

    // Navigate to the constructed URL
    router.push(formattedURL);
  };

  return (
    <div className="p-6 max-w-[800px]">
      <DrawerHeader>
        <DrawerTitle>Filter</DrawerTitle>
        <DrawerDescription className="text-[12px]">
          Get filtered results with specific options you choose.
        </DrawerDescription>
      </DrawerHeader>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Language Dropdown */}
        <div className="relative">
          <label className="block text-[12px] text-foreground mb-1">
            Language
          </label>
          <div className="relative">
            <select
              value={filters.lang}
              onChange={e => handleInputChange("lang", e.target.value)}
              className="block w-full px-4 py-1.5 text-[11px] bg-backgroundHover text-white rounded focus:ring focus:ring-separatorOnBackground focus:outline-none"
            >
              <option value="">Select Language</option>
              <option value="sub">Sub</option>
              <option value="dub">Dub</option>
              <option value="sub-&-dub">Sub & Dub</option>
            </select>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <label className="block text-[12px] text-foreground mb-1">Sort</label>
          <select
            value={filters.sort}
            onChange={e => handleInputChange("sort", e.target.value)}
            className="block w-full px-4 py-1.5 text-[11px] bg-backgroundHover text-white rounded focus:ring focus:ring-separatorOnBackground focus:outline-none"
          >
            <option value="">Sort By</option>
            <option value="recently-added">Recently Added</option>
            <option value="recently-updated">Recently Updated</option>
            <option value="score">Score</option>
            <option value="name-a-z">Name (A-Z)</option>
            <option value="released-date">Released Date</option>
            <option value="most-watched">Most Watched</option>
          </select>
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block text-[12px] text-foreground mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={e => handleInputChange("status", e.target.value)}
            className="block w-full px-4 py-1.5 text-[11px] bg-backgroundHover text-white rounded focus:ring focus:ring-separatorOnBackground focus:outline-none"
          >
            <option value="">Select Status</option>
            <option value="finished-airing">Finished Airing</option>
            <option value="currently-airing">Currently Airing</option>
            <option value="not-yet-aired">Not Yet Aired</option>
          </select>
        </div>

        {/* Type Dropdown */}
        <div>
          <label className="block text-[12px] text-foreground mb-1">Type</label>
          <select
            value={filters.type}
            onChange={e => handleInputChange("type", e.target.value)}
            className="block w-full px-4 py-1.5 text-[11px] bg-backgroundHover text-white rounded focus:ring focus:ring-separatorOnBackground focus:outline-none"
          >
            <option value="">Select Type</option>
            <option value="movie">Movie</option>
            <option value="tv">TV</option>
            <option value="ova">OVA</option>
            <option value="ona">ONA</option>
            <option value="special">Special</option>
            <option value="music">Music</option>
          </select>
        </div>

        {/* Rated Dropdown */}
        <div>
          <label className="block text-[12px] text-foreground mb-1">
            Rated
          </label>
          <select
            value={filters.rated}
            onChange={e => handleInputChange("rated", e.target.value)}
            className="block w-full px-4 py-1.5 text-[11px] bg-backgroundHover text-white rounded focus:ring focus:ring-separatorOnBackground focus:outline-none"
          >
            <option value="">Select rated</option>
            <option value="g">General Audience</option>
            <option value="pg">Parental Guidance</option>
            <option value="pg-13">PG-13</option>
            <option value="r">Restricted</option>
            <option value="r+">Mature Audiences</option>
            <option value="rx">Adults Only</option>
          </select>
        </div>

        {/* Score Dropdown */}
        <div>
          <label className="block text-[12px] text-foreground mb-1">
            Score
          </label>
          <select
            value={filters.score}
            onChange={e => handleInputChange("score", e.target.value)}
            className="block w-full px-4 py-1.5 text-[11px] bg-backgroundHover text-white rounded focus:ring focus:ring-separatorOnBackground focus:outline-none"
          >
            <option value="">Select rated</option>
            <option value="appalling">Appalling</option>
            <option value="horrible">Horrible</option>
            <option value="very-bad">Very Bad</option>
            <option value="bad">Bad</option>
            <option value="avarage">Avarage</option>
            <option value="fine">Fine</option>
            <option value="good">Good</option>
            <option value="very-good">Very Good</option>
            <option value="great">Great</option>
            <option value="masterpiece">Masterpiece</option>
          </select>
        </div>
      </div>

      {/* Genres */}
      <div className="mt-4 max-w-[600px]">
        <label className="block text-[12px] text-foreground mb-1">Genres</label>
        <div
          className="grid grid-cols-2 gap-2 overflow-y-auto max-h-24 px-2
        py-1 border rounded bg-backgroundHover"
        >
          {GenreMap.map(genre => (
            <div key={genre.idTwo} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.genres.includes(genre.idTwo)}
                onChange={() => handleGenreSelect(genre.idTwo)}
                className="form-checkbox text-separatorOnBackground
                bg-backgroundtwo rounded
                  h-[13px]"
              />
              <span className="ml-2 text-[10px] text-foreground">
                {genre.display}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-4 flex justify-end">
        <DrawerClose className="bg-transparent">
          <div
            onClick={handleSubmit}
            className="text-foreground px-4 py-2 rounded shadow transition
            text-[12px] bg-main font-[700]"
          >
            Apply Filters
          </div>
        </DrawerClose>
      </div>
    </div>
  );
};

export default FilterSection;
