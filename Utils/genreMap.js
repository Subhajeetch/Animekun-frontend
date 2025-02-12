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
    url: "https://i.pinimg.com/736x/8a/47/a0/8a47a0b5c8cb7d172e2229739cb08865.jpg",
    backgroundColor: "#ffe4ca",
    foreground: "#3d3d3d",
    gif: "",
    bg: ""
  },
  {
    display: "Martial Arts",
    id: "martialArts",
    idTwo: "martial-arts",
    url: "https://i.pinimg.com/474x/c2/f2/ed/c2f2edc1dc839a23a69562a84041daad.jpg",
    backgroundColor: "#ca8f59",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Mecha",
    id: "mecha",
    idTwo: "mecha",
    url: "https://i.pinimg.com/736x/98/80/47/9880478d34863dbffa991a3d67979a51.jpg",
    backgroundColor: "#5e4d5c",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Parody",
    id: "parody",
    idTwo: "parody",
    url: "https://i.pinimg.com/474x/8c/15/45/8c1545aa37752ad0883ed6cae3586e10.jpg",
    backgroundColor: "#f2d49d",
    foreground: "#000000",
    gif: "",
    bg: ""
  },
  {
    display: "Music",
    id: "music",
    idTwo: "music",
    url: "https://i.pinimg.com/736x/f0/31/f6/f031f648f0653e2ee8f3a734bd54c09d.jpg",
    backgroundColor: "#baefff",
    foreground: "#545454",
    gif: "",
    bg: ""
  },
  {
    display: "Mystery",
    id: "mystery",
    idTwo: "mystery",
    url: "https://i.pinimg.com/736x/b6/a0/4f/b6a04f1d2a4386b09112e4241b7b821e.jpg",
    backgroundColor: "#5f513d",
    foreground: "#dbdbdb",
    gif: "",
    bg: ""
  },
  {
    display: "Police",
    id: "police",
    idTwo: "police",
    url: "https://i.pinimg.com/236x/53/0f/e8/530fe8f0533d237fee6445eb546c5bd2.jpg",
    backgroundColor: "#cacaca",
    foreground: "#233134",
    gif: "",
    bg: ""
  },
  {
    display: "Samurai",
    id: "samurai",
    idTwo: "samurai",
    url: "https://i.pinimg.com/736x/ec/1e/f4/ec1ef4a4c8af828b11e02211d62d1f1b.jpg",
    backgroundColor: "#97accc",
    foreground: "#4b4b4b",
    gif: "",
    bg: ""
  },
  {
    display: "School",
    id: "school",
    idTwo: "school",
    url: "https://m.media-amazon.com/images/M/MV5BMDg3MGVhNWUtYTQ2NS00ZDdiLTg5MTMtZmM5MjUzN2IxN2I4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    backgroundColor: "#e1004f",
    foreground: "#dfdfdf",
    gif: "",
    bg: ""
  },
  {
    display: "Sci Fi",
    id: "sciFi",
    idTwo: "sci-fi",
    url: "https://i.pinimg.com/736x/3f/33/39/3f33395d0bb30eef1646fef1fd1ac921.jpg",
    backgroundColor: "#338055",
    foreground: "#ebebeb",
    gif: "",
    bg: ""
  },
  {
    display: "Seinen",
    id: "seinen",
    idTwo: "seinen",
    url: "https://i.pinimg.com/736x/06/ed/1f/06ed1f8ca0f97a34c2430f1d231f5082.jpg",
    backgroundColor: "#708090",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Shoujo",
    id: "shoujo",
    idTwo: "shoujo",
    url: "https://i.pinimg.com/736x/d6/0a/c2/d60ac2111e9a2ba0fee793aabddd0e88.jpg",
    backgroundColor: "#da6d7e",
    foreground: "#313131",
    gif: "",
    bg: ""
  },
  {
    display: "Shoujo Ai",
    id: "shoujoAi",
    idTwo: "shoujo-ai",
    url: "https://i.pinimg.com/736x/95/77/7f/95777f2772b622eb752db753dd55b4d1.jpg",
    backgroundColor: "#e4c3ee",
    foreground: "#676767",
    gif: "",
    bg: ""
  },
  {
    display: "Shounen",
    id: "shounen",
    idTwo: "shounen",
    url: "https://i.pinimg.com/736x/c4/0e/c2/c40ec282d5bb29cf199eb56cbd01edfa.jpg",
    backgroundColor: "#dfdfdf",
    foreground: "#434343",
    gif: "",
    bg: ""
  },
  {
    display: "Shounen Ai",
    id: "shounenAi",
    idTwo: "shounen-ai",
    url: "https://i.pinimg.com/736x/5b/57/dd/5b57dd2f035f11b34cb253d3ee481fce.jpg",
    backgroundColor: "#306e5c",
    foreground: "#ececec",
    gif: "",
    bg: ""
  },

  {
    display: "Space",
    id: "space",
    idTwo: "space",
    url: "https://img.freepik.com/free-photo/anime-style-character-space_23-2151134351.jpg?semt=ais_hybrid",
    backgroundColor: "#7b7bc9",
    foreground: "#2c2c2c",
    gif: "",
    bg: ""
  },
  {
    display: "Sports",
    id: "sports",
    idTwo: "sports",
    url: "https://i.pinimg.com/474x/96/a9/34/96a934ae534c305baa9affd907a8b828.jpg",
    backgroundColor: "#ffa965",
    foreground: "#444444",
    gif: "",
    bg: ""
  },
  {
    display: "Super Power",
    id: "superPower",
    idTwo: "super-power",
    url: "https://i.pinimg.com/736x/41/25/15/412515751c3f003bd7c1661f1e469e1b.jpg",
    backgroundColor: "#d43aff",
    foreground: "#242424",
    gif: "",
    bg: ""
  },
  {
    display: "Super Natural",
    id: "supernatural",
    idTwo: "supernatural",
    url: "https://i.pinimg.com/736x/97/36/80/9736806e978c1eb7a43e7cd68534566d.jpg",
    backgroundColor: "#006b48",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Thriller",
    id: "thriller",
    idTwo: "thriller",
    url: "https://i.pinimg.com/564x/57/20/ed/5720eda1561236dfd344a9f3cc0606a7.jpg",
    backgroundColor: "#434e3b",
    foreground: "#ededed",
    gif: "",
    bg: ""
  },
  {
    display: "Vampire",
    id: "vampire",
    idTwo: "vampire",
    url: "https://i.pinimg.com/736x/64/99/f9/6499f971657b63fa3a40b911faf48c6e.jpg",
    backgroundColor: "#ff0000",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  },
  {
    display: "Dementia",
    id: "dementia",
    idTwo: "dementia",
    url: "https://i.pinimg.com/736x/2c/7a/d7/2c7ad7b270cd1ca3d0c380ad767655cc.jpg",
    backgroundColor: "#6b6b6b",
    foreground: "#ffffff",
    gif: "",
    bg: ""
  }
];

export default genresMap;
