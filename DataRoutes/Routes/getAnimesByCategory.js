import { HiAnime } from "aniwatch";
import underrated from "@/Utils/underratedMap.js";

const hianime = new HiAnime.Scraper();
const ANIMES_PER_PAGE = 34;

export const getAnimesByCategory = async (c, p) => {
  const page = parseInt(p, 10) || 1;

  try {
    if (c === "underrated") {
      if (!Array.isArray(underrated) || underrated.length === 0) {
        throw new Error("Underrated anime list is empty or invalid.");
      }

      const totalAnimes = underrated.length;
      const totalPages = Math.ceil(totalAnimes / ANIMES_PER_PAGE);
      if (page > totalPages || page < 1) {
        throw new Error("Invalid page number.");
      }

      const startIndex = (page - 1) * ANIMES_PER_PAGE;
      const endIndex = startIndex + ANIMES_PER_PAGE;
      const paginatedAnimes = underrated.slice(startIndex, endIndex);

      return {
        manto: true,
        data: {
          animes: paginatedAnimes,
          totalPages,
          hasNextPage: page < totalPages,
          currentPage: page,
          category: "Underrated Animes"
        }
      };
    }

    // Fetch from HiAnime for other categories
    const data = await hianime.getCategoryAnime(c, page);
    return {
      manto: true,
      data
    };
  } catch (err) {
    console.error("Error fetching data:", err.message);
    return {
      success: false,
      error: err.message
    };
  }
};
