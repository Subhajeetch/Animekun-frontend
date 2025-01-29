import { HiAnime } from "aniwatch";

const hianime = new HiAnime.Scraper();

export const getSearchResults = async (
  searchQuery,
  page,
  sort,
  lang,
  status,
  type,
  rated,
  score,
  season,
  startDate,
  endDate,
  genresQq
) => {
  const genresParams = genresQq;
  const genres = genresParams ? genresParams.replace(/\+/g, ",") : null;

  try {
    const data = await hianime.search(`${searchQuery}`, page, {
      sort: sort,
      language: lang,
      status: status,
      type: type,
      rated: rated,
      season: season,
      start_date: startDate,
      end_date: endDate,
      genres: genres
    });
    return {
      manto: true,
      data: data
    };
  } catch (err) {
    console.error("Error fetching data:", err);
    return {
      manto: false,
      error: err.message
    };
  }
};
