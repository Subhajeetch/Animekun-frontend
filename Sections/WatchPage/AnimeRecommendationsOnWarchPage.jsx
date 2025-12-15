import AnimeCard from "../Universal/AnimeCard.jsx";
import "../../Styles/AnimeCardGrid.css";

const AnimeRecommendations = ({ anime }) => {
  const { recommendedAnimes, relatedAnimes } = anime;

  // Merge related and recommended lists and remove duplicates by `id`.
  // This prevents rendering the same anime twice and avoids duplicate React keys.
  const mergedAnimes = [...(relatedAnimes || []), ...(recommendedAnimes || [])];
  const uniqueAnimesMap = new Map();
  mergedAnimes.forEach(a => {
    if (!uniqueAnimesMap.has(a.id)) uniqueAnimesMap.set(a.id, a);
  });
  const uniqueAnimes = Array.from(uniqueAnimesMap.values());


  return (
    <div className="max-w-[1800px] mx-auto px-4 mt-12 pb-6" >
      <h2
        className="relative h-[40px] bg-gradient-to-l
        from-transparent to-backgroundHover mb-[10px] p-2 flex
        items-center font-[700] text-[18px] rounded-l-md gap-2 w-full
        max-w-[400px]"
      >
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512.000000 512.000000"
          preserveAspectRatio="xMidYMid meet"
          className="h-[24px] w-[24px]"
          style={{ fill: "var(--foreground)" }}
        >
          <g
            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
            stroke="none"
          >
            <path
              d="M3883 4498 c-11 -13 -64 -97 -119 -186 -61 -102 -109 -169 -124 -177
-14 -7 -106 -32 -205 -55 -209 -49 -235 -60 -235 -97 0 -31 17 -54 158 -217
57 -66 109 -131 115 -144 8 -16 6 -76 -4 -205 -20 -258 -16 -287 33 -287 11 0
105 34 209 75 103 41 201 75 218 75 17 0 108 -32 203 -71 205 -84 221 -88 249
-63 23 21 24 -7 -1 318 -7 96 -6 126 5 153 8 19 62 90 121 160 105 124 154
189 154 203 0 4 -8 17 -17 29 -14 16 -63 32 -203 66 -102 25 -199 51 -216 59
-24 11 -56 54 -137 183 -58 93 -115 177 -125 186 -26 23 -55 21 -79 -5z"
            />
            <path
              d="M2498 3997 c-59 -23 -123 -64 -157 -102 -68 -77 -96 -165 -112 -348
-14 -157 -44 -270 -102 -381 -123 -237 -352 -415 -599 -466 -31 -6 -61 -16
-66 -23 -11 -14 -26 -1962 -16 -2026 l7 -41 1076 2 1076 3 55 30 c117 64 180
155 219 316 27 109 286 1305 301 1387 31 177 -87 377 -258 434 -65 21 -83 22
-504 26 -241 2 -438 6 -438 8 0 3 9 40 19 82 35 139 45 233 44 417 -1 318 -44
477 -159 585 -79 75 -148 103 -259 107 -59 2 -103 -1 -127 -10z"
            />
            <path
              d="M587 2666 c-48 -18 -62 -29 -81 -70 -14 -30 -16 -134 -16 -959 l0
-924 23 -34 c45 -67 60 -70 362 -67 267 3 270 3 304 27 64 46 61 0 61 1006 0
881 -1 917 -19 953 -38 73 -53 77 -341 79 -196 2 -264 0 -293 -11z"
            />
          </g>
        </svg>

        <span>Recommended For You</span>
      </h2>
      <div className="grid animeCardGrid gap-4 mt-4">
        {uniqueAnimes.map(anime => (
          <AnimeCard anime={anime} key={`anime-${anime.id}`} />
        ))}
      </div>
    </div >
  );
};

export default AnimeRecommendations;
