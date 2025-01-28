import axios from "axios";
import Link from "next/link";
import "../../Styles/AnimeCardGrid.css";

import AnimeCard from "../../Sections/Universal/AnimeCard.jsx";
import FilterSection from "../../Sections/SearchPage/FilterSection.jsx";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

export async function generateMetadata({ searchParams }) {
  const { q = "All-Animes" } = await searchParams;

  return {
    title:
      `Search Results for '${q.replace(/-/g, " ")}' - Animekun` ||
      "Watch Anime Online In English Dub & Sub In HD Quality - AnimeKun",
    description:
      `Anime search results for query '${q.replace(
        /-/g,
        " "
      )}'. Get all the related anime results matching with the term "${q.replace(
        /-/g,
        " "
      )}".` ||
      "Watch and download Animes online in english Dub/Sub options. Stream your favourite episodes with HD-quality video for good experience.",
    keywords: [
      `${q.replace(/-/g, " ")}`,
      `Stream ${q.replace(/-/g, " ")} online`,
      `watch ${q.replace(/-/g, " ")} online`,
      `${q.replace(/-/g, " ")} watch`,
      `${q.replace(/-/g, " ")} online`,
      `${q.replace(/-/g, " ")} stream`,
      `${q.replace(/-/g, " ")} sub`,
      `${q.replace(/-/g, " ")} english dub`,
      "anime to watch",
      "no ads anime website",
      "watch anime",
      "ad free anime site",
      "anime online",
      "free anime online",
      "online anime",
      "anime streaming",
      "stream anime online",
      "english anime",
      "english dubbed anime"
    ],
    openGraph: {
      title:
        `Search Results for '${q.replace(/-/g, " ")}' - Animekun` ||
        "Watch Anime Online In English Dub & Sub In HD Quality - AnimeKun",
      description:
        `Anime search results for query '${q.replace(/-/g, " ")}'` ||
        "Watch and download Animes online in english Dub/Sub options. Stream your favourite episodes with HD-quality video for good experience.",
      url: `https://animekun.lol/search?q=${q}`,
      siteName: "AnimeKun",
      images: [
        {
          url: "https://i.imgur.com/kBhogcl.jpeg",
          width: 1200,
          height: 430,
          alt: `${q.replace(/-/g, " ")} banner`
        }
      ],
      locale: "en_US",
      type: "website"
    },
    alternates: {
      canonical: `/search?q=${q}`
    }
  };
}

const SearchAnime = async ({ searchParams }) => {
  const lol = await searchParams;

  const {
    q = "",
    lang,
    sort,
    status,
    type,
    rated,
    score,
    season,
    start_date,
    end_date,
    genres,
    page = 1
  } = lol;

  // Prepare the query parameters for the API request
  const params = {
    q,
    lang,
    sort,
    status,
    type,
    rated,
    score,
    season,
    start_date,
    end_date,
    genres: genres?.split(",").join("+"), // Adjust genres if it's a comma-separated string
    page
  };

  // Filter out undefined/null values from params
  Object.keys(params).forEach(key => {
    if (!params[key]) delete params[key];
  });

  // Fetch data from the API
  let animes = [];
  let totalPages = 1;
  let currentPage;

  try {
    const response = await axios.get("https://mantomart.in/api/mantox/search", {
      params
    });
    animes = response.data.animes || [];
    totalPages = response.data.totalPages || 1;
    currentPage = response.data.currentPage || 1;
  } catch (error) {
    console.error("Error fetching anime data:", error);
  }

  const constructPageHref = page => {
    const updatedParams = new URLSearchParams();

    // Ensure searchParams is iterable
    Object.entries(lol || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        updatedParams.set(key, value);
      }
    });

    // Set the page parameter
    updatedParams.set("page", Number(page));

    return `?${updatedParams.toString()}`;
  };

  return (
    <>
      <div className="flex flex-col md:flex-row bg-backgroundtwo">
        <div className="container flex-1 mx-auto mt-2 p-4">
          <div className="flex justify-between items-center">
            <h1
              className="text-[14px] truncate mr-2 font-[700] p-4 bg-gradient-to-l
        from-transparent to-backgroundHover
            rounded-md"
            >
              Search Results for '{q.replace(/-/g, " ")}'
            </h1>

            <Dialog>
              <DialogTrigger
                className="bg-backgroundHover h-8 w-16 hidden
              md:flex justify-center items-center font-[700]"
              >
                Filter
              </DialogTrigger>
              <DialogContent>
                <FilterSection q={q} page={Number(page)} />
              </DialogContent>
            </Dialog>
            <Drawer>
              <DrawerTrigger
                className="bg-backgroundHover h-8 w-16 flex
              md:hidden justify-center items-center font-[700]"
              >
                Filter
              </DrawerTrigger>
              <DrawerContent>
                <FilterSection q={q} page={Number(page)} />
              </DrawerContent>
            </Drawer>
          </div>

          <div className="mt-6 min-h-screen">
            <div className="grid animeCardGrid gap-4">
              {animes.map(anime => (
                <AnimeCard anime={anime} />
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                {/* Previous Page Button */}
                {page > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href={constructPageHref(Number(page) - 1)}
                      className="h-[24px] w-[24px] text-[12px] md:h-[34px] md:w-[34px]
                      md:text-[16px] hover:bg-backgroundHover p-0 mt-1
                      
                      "
                    />
                  </PaginationItem>
                )}

                {/* First Page Link */}
                {page > 2 && (
                  <PaginationItem>
                    <PaginationLink
                      href={constructPageHref(1)}
                      className="h-[24px] w-[24px] text-[12px] md:h-[34px] md:w-[34px]
                      md:text-[16px]"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* Ellipsis for pages far from the first */}
                {page > 3 && <PaginationEllipsis />}

                {/* Dynamic Page Links */}
                {Array.from({ length: 3 }, (_, index) => {
                  const pageNumber = Number(page) - 1 + index;
                  if (pageNumber > 0 && pageNumber <= totalPages) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href={constructPageHref(pageNumber)}
                          isActive={pageNumber === Number(page)}
                          className="h-[24px] w-[24px] text-[12px] hover:bg-backgroundHover md:h-[34px] md:w-[34px]
                      md:text-[16px]"
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  return null;
                })}

                {/* Ellipsis for pages far from the last */}
                {page < totalPages - 2 && <PaginationEllipsis />}

                {/* Last Page Link */}
                {page < totalPages - 1 && (
                  <PaginationItem>
                    <PaginationLink
                      href={constructPageHref(totalPages)}
                      className="h-[24px] w-[24px] text-[12px] hover:bg-backgroundHover md:h-[34px] md:w-[34px]
                      md:text-[16px]"
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* Next Page Button */}
                {page < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      href={constructPageHref(Number(page) + 1)}
                      className="h-[24px] w-[24px] text-[12px] hover:bg-backgroundHover p-0 md:h-[34px] md:w-[34px]
                      md:text-[16px]"
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchAnime;
