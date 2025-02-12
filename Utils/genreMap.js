const genresMap = [
  {
    display: "Action",
    id: "action",
    idTwo: "action",
    url: "https://i.imgur.com/dkDDB9o.jpeg",
    backgroundColor: "#c00030",
    foreground: "#e8e8e8",
    gif: "https://i.pinimg.com/originals/7c/9a/3c/7c9a3cb7b488581e26318e2d6ec88a0f.gif",
    bg: ""
  },
  {
    display: "Adventure",
    id: "adventure",
    idTwo: "adventure",
    url: "https://i.imgur.com/f7Lp0Zf.jpeg",
    backgroundColor: "#3da20f",
    foreground: "#ffffff",
    gif: "https://giffiles.alphacoders.com/222/222456.gif",
    bg: ""
  },
  {
    display: "Romance",
    id: "romance",
    idTwo: "romance",
    url: "https://i.imgur.com/657a4B6_d.jpeg",
    backgroundColor: "#9c00e9",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Fantasy",
    id: "fantasy",
    idTwo: "fantasy",
    url: "https://i.imgur.com/YkZhjVw.jpeg",
    backgroundColor: "#4691ff",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Comedy",
    id: "comedy",
    idTwo: "comedy",
    url: "https://i.imgur.com/xVqhcQt.jpeg",
    backgroundColor: "#c9af67",
    foreground: "#f2f2f2",
    gif: "",
    bg: ""
  },
  {
    display: "Cars",
    id: "cars",
    idTwo: "cars",
    url: "https://i.imgur.com/mAQB8HM.jpeg",
    backgroundColor: "#f0a2e1",
    foreground: "#232323",
    gif: "",
    bg: ""
  },
  {
    display: "Military",
    id: "military",
    idTwo: "military",
    url: "https://i.imgur.com/9nuxdhq.jpeg",
    backgroundColor: "#556b2f",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Demons",
    id: "demons",
    idTwo: "demons",
    url: "https://i.imgur.com/eZwoRYB.jpeg",
    backgroundColor: "#6987ac",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Slice Of Life",
    id: "sliceOfLife",
    idTwo: "slice-of-life",
    url: "https://i.imgur.com/WwXK8VY.jpeg",
    backgroundColor: "#c8f9c8",
    foreground: "#181818",
    gif: "",
    bg: ""
  },
  {
    display: "Psychological",
    id: "psychological",
    idTwo: "psychological",
    url: "https://i.imgur.com/vXsqIqi.jpeg",
    backgroundColor: "#74a2ca",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },

  {
    display: "Ecchi",
    id: "ecchi",
    idTwo: "ecchi",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#e2c6ed",
    foreground: "#1f1f1f",
    gif: "",
    bg: ""
  },
  {
    display: "Drama",
    id: "drama",
    idTwo: "drama",
    url: "https://i.pinimg.com/736x/c1/00/46/c1004661baadca884e6b11aca478c5e6.jpg",
    backgroundColor: "#f30068",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Game",
    id: "game",
    idTwo: "game",
    url: "https://i.pinimg.com/736x/d5/e2/9c/d5e29c0cb5fbe66afe2415211685fbc4.jpg",
    backgroundColor: "#0e76a8",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Harem",
    id: "harem",
    idTwo: "harem",
    url: "https://i.pinimg.com/736x/64/d3/1d/64d31dfcbc889c45be3cbd488ca7fb72.jpg",
    backgroundColor: "#ff5252",
    foreground: "#000000",
    gif: "",
    bg: ""
  },
  {
    display: "Historical",
    id: "historical",
    idTwo: "historical",
    url: "https://i.pinimg.com/736x/3d/29/7f/3d297fd607f3844ee9ddb5f1c934b109.jpg",
    backgroundColor: "#98acbb",
    foreground: "#000000",
    gif: "",
    bg: ""
  },
  {
    display: "Isekai",
    id: "isekai",
    idTwo: "isekai",
    url: "https://i.pinimg.com/736x/89/e1/59/89e159eebcc4c61fc23dffc82795d056.jpg",
    backgroundColor: "#4f3b82",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Josei",
    id: "josei",
    idTwo: "josei",
    url: "https://i.pinimg.com/736x/63/74/4f/63744f37408dc34f685ab7a1b5d2df96.jpg",
    backgroundColor: "#ff972d",
    foreground: "#000000",
    gif: "",
    bg: ""
  },
  {
    display: "Kids",
    id: "kids",
    idTwo: "kids",
    url: "https://i.pinimg.com/236x/fa/c7/ce/fac7ce45301a7d7e68b9b680ee52ab47.jpg",
    backgroundColor: "#008edc",
    foreground: "#000000",
    gif: "",
    bg: ""
  },
  {
    display: "Magic",
    id: "magic",
    idTwo: "magic",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#8e44ad",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Martial Arts",
    id: "martialArts",
    idTwo: "martial-arts",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#000000",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Mecha",
    id: "mecha",
    idTwo: "mecha",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#808080",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Parody",
    id: "parody",
    idTwo: "parody",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#ffa500",
    foreground: "#000000",
    gif: "",
    bg: ""
  },
  {
    display: "Music",
    id: "music",
    idTwo: "music",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#4682b4",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Mystery",
    id: "mystery",
    idTwo: "mystery",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#2f4f4f",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Police",
    id: "police",
    idTwo: "police",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#00008b",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Samurai",
    id: "samurai",
    idTwo: "samurai",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#8b0000",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "School",
    id: "school",
    idTwo: "school",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#000080",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Sci Fi",
    id: "sciFi",
    idTwo: "sci-fi",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#2e8b57",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Seinen",
    id: "seinen",
    idTwo: "seinen",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#708090",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Shoujo",
    id: "shoujo",
    idTwo: "shoujo",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#ffb6c1",
    foreground: "#000000",
    gif: "",
    bg: ""
  },
  {
    display: "Shoujo Ai",
    id: "shoujoAi",
    idTwo: "shoujo-ai",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#db7093",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Shounen",
    id: "shounen",
    idTwo: "shounen",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#ff4500",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Shounen Ai",
    id: "shounenAi",
    idTwo: "shounen-ai",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#8b008b",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },

  {
    display: "Space",
    id: "space",
    idTwo: "space",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#191970",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Sports",
    id: "sports",
    idTwo: "sports",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#228b22",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Super Power",
    id: "superPower",
    idTwo: "super-power",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#ff6347",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Super Natural",
    id: "supernatural",
    idTwo: "supernatural",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#800080",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Thriller",
    id: "thriller",
    idTwo: "thriller",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#696969",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Vampire",
    id: "vampire",
    idTwo: "vampire",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#ff0000",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Dementia",
    id: "dementia",
    idTwo: "dementia",
    url: "https://i.imgur.com/Jl4b562.jpeg",
    backgroundColor: "#6b6b6b",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  }
];

export default genresMap;
