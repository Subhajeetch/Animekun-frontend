import axios from "axios";
import AnimeCard from "../../../Sections/Universal/AnimeCard.jsx";
import "../../../Styles/AnimeCardGrid.css";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

export async function generateMetadata({ params }) {
  const { producer = "Animekun" } = await params;

  function kebabToTitleCase(input) {
    return input
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  const formattedProducerName = `${kebabToTitleCase(producer)} Producer's Animes`;

  return {
    title:
      `Watch ${formattedProducerName} Online, Available On SUB/DUB Without ADS - Animekun` ||
      "Watch Anime Online In English Dub & Sub In HD Quality - AnimeKun",
    description:
      `Stream and download ${formattedProducerName} online ad free. Watch  your favourite ${formattedProducerName} with the fastest video servers` ||
      "Watch and download Animes online in english Dub/Sub options. Stream your favourite episodes with HD-quality video for good experience.",
    keywords: [
      `${formattedProducerName}`,
      `Stream ${formattedProducerName} online`,
      `watch ${formattedProducerName} online`,
      `${formattedProducerName} watch`,
      `${formattedProducerName} online`,
      `${formattedProducerName} stream`,
      `${formattedProducerName} sub`,
      `${formattedProducerName} english dub`,
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
        `Watch ${formattedProducerName} Online, Available On SUB/DUB Without ADS - Animekun` ||
        "Watch Anime Online In English Dub & Sub In HD Quality - AnimeKun",
      description:
        `Stream and download ${formattedProducerName} online ad free. Watch  your favourite ${formattedProducerName} with the fastest video servers` ||
        "Watch and download Animes online in english Dub/Sub options. Stream your favourite episodes with HD-quality video for good experience.",
      url: `https://animekun.lol/producer/${producer}`,
      siteName: "AnimeKun",
      images: [
        {
          url: "https://i.imgur.com/dgkXTMO.png",
          width: 1200,
          height: 430,
          alt: `${formattedProducerName} banner`
        },
        {
          url: "https://i.imgur.com/kBhogcl.jpeg",
          width: 1200,
          height: 430,
          alt: "Animekun Website Banner"
        }
      ],
      locale: "en_US",
      type: "website"
    },
    alternates: {
      canonical: `/producer/${producer}`
    }
  };
}

const ProducerPage = async ({ params, searchParams }) => {
  const { producer } = await params; // Extract category from params
  const { page = 1 } = await searchParams; // Default to page 1 if not provided

  // Fetch data from the API
  let animes = [];
  let totalPages = 1;
  let currentPage = parseInt(page, 10);
  let producerName = "";

  try {
    const response = await axios.get(
      `https://mantomart.in/api/mantox/producer/${producer}?page=${currentPage}`
    );
    animes = response.data.animes || [];
    totalPages = response.data.totalPages || 1;
    currentPage = response.data.currentPage || 1;
    producerName = response.data.producerName || producer;
  } catch (error) {
    console.error("Error fetching anime data:", error);
  }

  // Helper function to construct pagination href
  const constructPageHref = page => {
    return `/producer/${producer}?page=${page}`;
  };

  return (
    <>
      <div className="flex flex-col md:flex-row bg-backgroundtwo">
        <div className="container flex-1 mx-auto mt-2 p-4">
          <div className="flex justify-between items-center">
            <h1
              className="text-[20px] font-[800] p-4 bg-gradient-to-l
        from-transparent to-backgroundHover
            rounded-md"
            >
              {producerName.replace(/-/g, " ").toUpperCase()}
            </h1>
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

export default ProducerPage;
