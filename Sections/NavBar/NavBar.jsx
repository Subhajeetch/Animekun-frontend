"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/CustomSheetForNavBar.jsx";
import LoadingSke from "@/Sections/Universal/Loader.jsx";
import { Button } from "@/components/ui/button";
import NavBarVertical from "./NavBarVertical.jsx";
import { AlignRight, Search, X, TextSearch, Cat } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NavBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setSearchLoading(true); // Start loading
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Adjust delay (e.g., 500ms)

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const handleSearch = async () => {
    if (debouncedQuery.trim() === "") return;
    try {
      const response = await fetch(
        `https://getdata.animekun.top/api/mantox/searchsuggestion?q=${debouncedQuery}`
      );
      const data = await response.json();
      setResults(data.suggestions || []);
      setSearchLoading(false);
    } catch (error) {
      console.error("Error fetching anime data:", error);
    }
  };

  useEffect(() => {
    if (debouncedQuery) handleSearch();
    else setResults([]);
  }, [debouncedQuery]);

  const handleMoreResults = () => {
    const formattedQuery = query.trim().replace(/\s+/g, "-");
    router.push(`/search?q=${formattedQuery}`);
    setQuery("");
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    if (!showMobileSearch) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  };

  const handleMoreResultsClickInMobile = () => {
    handleMoreResults();
    toggleMobileSearch();
  };

  const handleClearQuery = () => {
    setQuery("");
  };

  const handleLogin = () => {
    alert("Login feature will be available shortly.");
  };

  return (
    <>
      <header className="h-[50px] md:h-[64px] px-2.5 flex items-center bg-background">
        {/* Sidebar trigger */}
        <Sheet>
          <SheetTrigger
            className="bg-transparent mr-[6px] py-[6px] px-[6px] md:px-[8px]
            md:py-[3px]
          rounded-md hover:bg-backgroundHover"
          >
            <svg
              version="1.1"
              id="Layer_1"
              viewBox="0 0 297 297"
              className="h-[24px] w-[24px] md:h-[32px] md:w-[32px]"
              style={{ fill: "var(--foreground)" }}
            >
              <g>
                <g>
                  <g>
                    <path
                      d="M279.368,24.726H102.992c-9.722,0-17.632,7.91-17.632,17.632V67.92c0,9.722,7.91,17.632,17.632,17.632h176.376
				c9.722,0,17.632-7.91,17.632-17.632V42.358C297,32.636,289.09,24.726,279.368,24.726z"
                    />
                    <path
                      d="M279.368,118.087H102.992c-9.722,0-17.632,7.91-17.632,17.632v25.562c0,9.722,7.91,17.632,17.632,17.632h176.376
				c9.722,0,17.632-7.91,17.632-17.632v-25.562C297,125.997,289.09,118.087,279.368,118.087z"
                    />
                    <path
                      d="M279.368,211.448H102.992c-9.722,0-17.632,7.91-17.632,17.633v25.561c0,9.722,7.91,17.632,17.632,17.632h176.376
				c9.722,0,17.632-7.91,17.632-17.632v-25.561C297,219.358,289.09,211.448,279.368,211.448z"
                    />
                    <path
                      d="M45.965,24.726H17.632C7.91,24.726,0,32.636,0,42.358V67.92c0,9.722,7.91,17.632,17.632,17.632h28.333
				c9.722,0,17.632-7.91,17.632-17.632V42.358C63.597,32.636,55.687,24.726,45.965,24.726z"
                    />
                    <path
                      d="M45.965,118.087H17.632C7.91,118.087,0,125.997,0,135.719v25.562c0,9.722,7.91,17.632,17.632,17.632h28.333
				c9.722,0,17.632-7.91,17.632-17.632v-25.562C63.597,125.997,55.687,118.087,45.965,118.087z"
                    />
                    <path
                      d="M45.965,211.448H17.632C7.91,211.448,0,219.358,0,229.081v25.561c0,9.722,7.91,17.632,17.632,17.632h28.333
				c9.722,0,17.632-7.91,17.632-17.632v-25.561C63.597,219.358,55.687,211.448,45.965,211.448z"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </SheetTrigger>
          <SheetContent side="left" className="w-[230px] md:w-[300px]">
            <SheetHeader className="hidden">
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <NavBarVertical />
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href={"/"} className="flex w-[166px] md:w-[250px] gap-[3px]">
          {/* First Half of Logo */}
          <div className="relative h-[28px] md:h-[32px]">
            <svg
              version="1.0"
              style={{ fill: "var(--foreground)" }}
              className="w-full h-full"
              viewBox="0 0 290.000000 75.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,75.000000) scale(0.100000,-0.100000)"
                stroke="none"
              >
                <path
                  d="M140 685 c0 -19 -4 -35 -10 -35 -5 0 -10 -11 -10 -25 0 -14 -4 -25
-10 -25 -5 0 -10 -9 -10 -20 0 -11 -7 -23 -15 -26 -8 -4 -15 -16 -15 -29 0
-13 -7 -25 -15 -29 -9 -3 -15 -18 -15 -36 0 -16 -4 -30 -10 -30 -13 0 -13
-137 0 -145 13 -8 13 -55 0 -55 -6 0 -10 -28 -10 -65 0 -61 2 -67 32 -95 18
-16 41 -30 51 -30 9 0 17 -4 17 -10 0 -6 50 -10 130 -10 80 0 130 4 130 10 0
6 14 10 31 10 20 0 40 10 60 29 26 26 29 36 29 90 0 34 -6 70 -12 81 -10 16
-10 24 0 40 14 24 16 150 2 150 -5 0 -10 13 -10 29 0 16 -7 34 -15 41 -8 7
-15 21 -15 31 0 11 -4 19 -10 19 -5 0 -10 11 -10 25 0 14 -4 25 -10 25 -5 0
-10 9 -10 19 0 11 -11 28 -24 38 -13 11 -25 28 -27 38 -7 33 -29 29 -29 -5 0
-20 9 -39 25 -54 23 -22 25 -29 25 -122 -1 -95 -2 -100 -30 -131 -27 -30 -35
-33 -86 -33 -49 0 -60 4 -90 32 l-34 32 0 100 c0 78 3 101 15 110 12 9 14 21
9 54 -8 51 -24 56 -24 7z m100 -415 c0 -5 -7 -10 -15 -10 -8 0 -15 5 -15 10 0
6 7 10 15 10 8 0 15 -4 15 -10z m50 0 c0 -5 -7 -10 -15 -10 -8 0 -15 5 -15 10
0 6 7 10 15 10 8 0 15 -4 15 -10z m-104 -64 c21 -21 30 -37 24 -41 -6 -4 -22
5 -35 19 -24 25 -75 36 -75 16 0 -5 -7 -10 -15 -10 -19 0 -19 5 2 30 26 30 60
25 99 -14z m224 20 c0 -8 6 -16 13 -19 9 -4 9 -7 0 -17 -10 -11 -14 -10 -19 3
-9 25 -52 20 -79 -9 -13 -14 -29 -23 -35 -19 -6 4 2 20 22 40 35 37 98 50 98
21z m-207 -136 c14 0 31 8 37 18 10 16 10 16 20 0 14 -23 66 -24 74 -1 5 11
10 13 17 6 8 -8 5 -17 -10 -32 -25 -25 -63 -27 -82 -5 -11 14 -13 14 -21 0 -5
-9 -21 -16 -36 -16 -30 0 -67 34 -56 52 5 7 11 6 19 -5 7 -10 24 -17 38 -17z"
                />
                <path
                  d="M702 548 l3 -53 108 -3 108 -3 -3 -52 -3 -52 -105 0 -105 0 -3 53 -3
52 -50 0 -49 0 0 -220 0 -220 50 0 50 0 0 110 0 110 110 0 110 0 0 -110 0
-110 55 0 55 0 0 220 0 220 -55 0 -55 0 0 55 0 55 -111 0 -110 0 3 -52z"
                />
                <path
                  d="M1140 325 l0 -275 50 0 50 0 0 165 0 165 54 0 55 0 3 -52 3 -53 53
-3 52 -3 0 -110 0 -109 55 0 55 0 0 275 0 275 -55 0 -55 0 0 -111 0 -110 -52
3 -53 3 -3 53 -3 52 -55 0 -54 0 0 55 0 55 -50 0 -50 0 0 -275z"
                />
                <path d="M1680 325 l0 -275 50 0 50 0 0 275 0 275 -50 0 -50 0 0 -275z" />
                <path
                  d="M1900 325 l0 -275 50 0 50 0 0 165 0 165 59 0 60 0 3 -52 3 -53 48
-3 47 -3 0 55 0 56 55 0 55 0 2 -162 3 -163 55 0 55 0 0 270 0 270 -55 0 -55
0 -3 -52 -3 -52 -52 -3 -52 -3 -3 -52 -3 -53 -49 0 -49 0 -3 53 -3 52 -57 3
-58 3 0 54 0 55 -50 0 -50 0 0 -275z"
                />
                <path
                  d="M2560 325 l0 -276 158 3 157 3 3 53 3 52 -110 0 -111 0 0 55 0 54
108 3 107 3 3 53 3 52 -110 0 -111 0 0 55 0 54 108 3 107 3 3 53 3 52 -160 0
-161 0 0 -275z"
                />
              </g>
            </svg>
          </div>

          {/* Second Half of Logo */}
          <div className="relative h-[28px] md:h-[32px]">
            <svg
              version="1.0"
              style={{ fill: "var(--main)" }}
              className="w-full h-full"
              viewBox="0 0 150.000000 75.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,75.000000) scale(0.100000,-0.100000)"
                stroke="none"
              >
                <path
                  d="M20 330 l0 -260 50 0 50 0 0 99 0 100 53 3 52 3 3 48 3 47 -55 0 -56
0 0 110 0 110 -50 0 -50 0 0 -260z"
                />
                <path
                  d="M330 540 l0 -50 -50 0 -50 0 0 -55 0 -55 50 0 50 0 0 54 0 55 53 3
52 3 3 48 3 47 -55 0 -56 0 0 -50z"
                />
                <path d="M550 380 l0 -210 50 0 50 0 0 210 0 210 -50 0 -50 0 0 -210z" />
                <path
                  d="M864 577 c-2 -7 -3 -100 -2 -207 l3 -195 48 -3 47 -3 0 210 0 211
-45 0 c-28 0 -48 -5 -51 -13z"
                />
                <path
                  d="M1070 330 l0 -260 50 0 50 0 0 154 0 155 53 3 52 3 3 47 3 47 -53 3
-53 3 -3 53 -3 52 -50 0 -49 0 0 -260z"
                />
                <path
                  d="M1390 486 l0 -105 -52 -3 -53 -3 -3 -47 -3 -48 55 0 56 0 0 -105 0
-105 50 0 50 0 0 260 0 260 -50 0 -50 0 0 -104z"
                />
                <path d="M230 220 l0 -50 50 0 50 0 0 50 0 50 -50 0 -50 0 0 -50z" />
                <path
                  d="M337 164 c-4 -4 -7 -27 -7 -51 l0 -43 56 0 55 0 -3 48 -3 47 -45 3
c-25 2 -49 0 -53 -4z"
                />
                <path
                  d="M657 163 c-4 -3 -7 -26 -7 -50 l0 -43 105 0 105 0 0 50 0 50 -98 0
c-54 0 -102 -3 -105 -7z"
                />
              </g>
            </svg>
          </div>
        </Link>

        {/* Spacer */}
        <div className="flex-1 md:hidden"></div>

        {/* Navbar actions */}
        <div className="flex gap-3 items-center justify-center md:w-full">
          {/* Search area */}

          <Search
            size={20}
            className="cursor-pointer md:hidden"
            onClick={toggleMobileSearch}
          />
          {showMobileSearch && (
            <div
              className="absolute top-[48px] left-0 w-full bg-background
                shadow-lg z-[50] p-3 items-center md:hidden"
            >
              <div className="flex-1 flex items-center gap-2 items-center">
                <div className="w-full relative">
                  <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search anime..."
                    className="w-full outline-0 pl-2 pr-9 py-1 rounded-md
                        bg-backgroundtwo"
                    ref={searchInputRef}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        handleMoreResultsClickInMobile();
                      }
                    }}
                  />

                  <div
                    className="absolute right-0 top-0
                      bg-backgroundHover h-full flex justify-center items-center
                      px-[4px] rounded-r-md"
                    onClick={handleMoreResultsClickInMobile}
                  >
                    <TextSearch size={24} />
                  </div>
                </div>
                <X
                  size={30}
                  className="cursor-pointer text-[#c0c0c0]
                      active:bg-[#2b485e] p-1 rounded-md"
                  onClick={toggleMobileSearch}
                />
              </div>
              {query.trim() !== "" && (
                <div className="mt-2 bg-background rounded-md z-[40]">
                  {searchLoading ? (
                    // Show loading state when searching
                    <div className="flex justify-center items-center p-4">
                      <LoadingSke />
                      <span
                        className="ml-2 text-foreground text-[16px]
                      font-[700]"
                      >
                        Searching...
                      </span>
                    </div>
                  ) : results.length > 0 ? (
                    // Show results when search is complete
                    <>
                      {results.length > 0 && query.trim() !== "" && (
                        <div className="mt-2 bg-background rounded-md z-[40]">
                          {results.slice(0, 3).map(anime => (
                            <Link
                              href={`/anime/${anime.id}`}
                              onClick={e => {
                                handleClearQuery();
                                toggleMobileSearch();
                              }}
                              key={`${anime.id}`}
                            >
                              <div
                                key={anime.id}
                                className="flex gap-2 p-2 hover:bg-backgroundHover
                            "
                              >
                                <img
                                  src={anime.poster}
                                  alt={anime.name}
                                  className="w-12 h-16 object-cover rounded-sm"
                                />
                                <div className="w-10/12 pt-1">
                                  <h3
                                    className="text-sm font-semibold truncate
                              text-foreground"
                                  >
                                    {anime.name}
                                  </h3>
                                  <p
                                    className="text-xs
                              text-animeCardDimmerForeground"
                                  >
                                    {anime.moreInfo[1]} • {anime.moreInfo[2]}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                          <div className="text-center pt-2 w-full bg-background">
                            <div
                              className="text-foreground flex justify-center items-center
                          gap-2 font-[800] py-2 bg-main
                          w-full rounded-sm"
                              onClick={handleMoreResultsClickInMobile}
                            >
                              <TextSearch size={24} />
                              <span>More results</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    // Show nothing if no results
                    <div
                      className="text-muted p-4 flex
                    gap-2 items-center justify-center"
                    >
                      <Cat />
                      <span className="font-[700]">No results found</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div
            className="relative ml-8 w-[360px] hidden md:flex"
            ref={searchInputRef}
          >
            <div className="w-full relative">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search anime..."
                className="w-full outline-0 pl-2 pr-10 py-[8px] rounded-md
                        bg-backgroundtwo"
                onFocus={() => setShowSearch(true)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleMoreResults(); // Call your function here
                  }
                }}
              />

              <div
                className="absolute right-0 top-0
                      bg-backgroundHover h-full flex justify-center items-center
                      px-[6px] rounded-r-md active:bg-separatorOnBackground
                      hover:bg-separatorOnBackground cursor-pointer"
                onClick={handleMoreResults}
              >
                <Search />
              </div>
            </div>
            {showSearch && query.trim() !== "" && (
              <div
                className="absolute top-full left-0 w-full bg-background
                shadow-md rounded-md z-[40] p-1"
              >
                <div className="mt-2 bg-background rounded-md z-[40]">
                  {searchLoading ? (
                    // Show loading state when searching
                    <div className="flex justify-center items-center p-4">
                      <LoadingSke />
                      <span
                        className="ml-2 text-foreground text-[16px]
                      font-[700]"
                      >
                        Searching...
                      </span>
                    </div>
                  ) : results.length > 0 ? (
                    // Show results when search is complete
                    <>
                      {results.length > 0 && query.trim() !== "" && (
                        <div className="mt-2 bg-background rounded-md z-[40]">
                          {results.slice(0, 3).map(anime => (
                            <Link
                              href={`/anime/${anime.id}`}
                              onClick={handleClearQuery}
                              key={`${anime.id}`}
                            >
                              <div
                                key={anime.id}
                                className="flex gap-2 p-2 hover:bg-backgroundHover
                            "
                              >
                                <img
                                  src={anime.poster}
                                  alt={anime.name}
                                  className="w-12 h-16 object-cover rounded-sm"
                                />
                                <div className="w-10/12 pt-1">
                                  <h3
                                    className="text-sm font-semibold truncate
                              text-foreground"
                                  >
                                    {anime.name}
                                  </h3>
                                  <p
                                    className="text-xs
                              text-animeCardDimmerForeground"
                                  >
                                    {anime.moreInfo[1]} • {anime.moreInfo[2]}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                          <div className="text-center pt-2 w-full bg-background">
                            <div
                              className="text-foreground flex justify-center items-center
                          gap-2 font-[800] py-2 bg-main
                          w-full rounded-sm"
                              onClick={handleMoreResultsClickInMobile}
                            >
                              <TextSearch size={24} />
                              <span>More results</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    // Show nothing if no results
                    <div
                      className="text-muted p-4 flex
                    gap-2 items-center justify-center"
                    >
                      <Cat />
                      <span className="font-[700]">No results found</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* social icons */}
          <div className="ml-4 gap-1 justify-center items-center hidden md:flex">
            <Link
              href="https://discord.gg/D8fFtJT8TU"
              className="
            p-1 hover:bg-[#334346] rounded-full
            "
            >
              <Image
                src="/social-icons/Discord-icon.png"
                width={30}
                height={30}
                alt="Discord Icon"
              />
            </Link>

            <Link
              href="https://x.com/animekuntop"
              className="
            p-1 hover:bg-[#334346] rounded-full
            "
            >
              <Image
                src="/social-icons/X-icon.png"
                width={34}
                height={34}
                alt="X(Twitter) Icon"
              />
            </Link>

            <Link
              href="#"
              className="
            p-1 hover:bg-[#334346] rounded-full
            "
            >
              <Image
                src="/social-icons/reddit-logo.png"
                width={34}
                height={34}
                alt="Reddit Icon"
              />
            </Link>

            <Link
              href="https://bsky.app/profile/animekuntop.bsky.social"
              className="
            p-1 hover:bg-[#334346] rounded-full
            "
            >
              <Image
                src="/social-icons/bluesky-icon.png"
                width={26}
                height={26}
                alt="BlueSky Icon"
              />
            </Link>
          </div>

          {/* Spacer */}
          <div className="flex-1 hidden md:flex"></div>

          {/* Account actions */}
          <div>
            <Button onClick={handleLogin} className="px-3 h-8">
              Login
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
