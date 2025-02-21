import Link from "next/link";
import "../../app/home/some.css";

const AnimeCard = ({ news }) => {
  function getFakeId(id) {
    return id.replace(/\//g, "_");
  }

  function getRealId(id) {
    return id.replace(/_/g, "/");
  }

  const getRowSpan = () => {
    const imageHeight = 200; // Approximate image height
    const textHeight = 50 + (news.topics?.length * 15 || 0); // Approx text height
    const totalHeight = imageHeight + textHeight;
    return Math.ceil(totalHeight / 10); // Divided by grid-auto-rows value
  };

  return (
    <Link
      key={getFakeId(news.id) || index}
      className="flex flex-col p-2 mb-3 masonry-item"
      href={`/anime/news/${getFakeId(news.id)}`}
    >
      <img
        src={news.thumbnail}
        className="rounded-md"
        style={{
          gridRowEnd: `span ${getRowSpan()}`
        }}
        alt={news.title}
      ></img>
      <h3
        className="text-[14px] line-clamp-2 font-[700]
        pl-1 mt-1"
      >
        {news.title}
      </h3>
      <span className="text-[10px] pl-1 text-animeCardDimmerForeground">
        {news.date || news.uploadedAt}
      </span>
      <p
        className="text-[10px] pl-1 font-[600] text-[#00c5e7e6] flex flex-wrap
      gap-1"
      >
        {news.topics && news.topics.map((t, i) => <span key={i}>#{t}</span>)}
      </p>
    </Link>
  );
};

export default AnimeCard;
