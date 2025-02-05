import AnimeCard from "../Universal/AnimeCard.jsx";
import "../../Styles/AnimeCardGrid.css";

const AnimeRecommendations = ({ anime }) => {
  const { recommendedAnimes, relatedAnimes } = anime;
  return (
    <>
      <div className="p-3 md:p-6 bg-backgroundtwo">
        <h2 className="text-[17px] font-bold text-foreground">
          Recommended for you
        </h2>
        <div className="grid animeCardGrid gap-4 mt-4">
        
                    {relatedAnimes.map(anime => (
              <AnimeCard anime={anime} />
            ))}
        
          {recommendedAnimes.map((anime, index) => (
            <AnimeCard anime={anime} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AnimeRecommendations;
