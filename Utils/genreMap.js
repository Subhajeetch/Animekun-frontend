const genresMap = [
  {
    display: "Action",
    id: "action",
    idTwo: "action",
    url: "https://i.imgur.com/dkDDB9o.jpeg",
    backgroundColor: "#c00030",
    foreground: "#e8e8e8"
  },
  {
    display: "Adventure",
    id: "adventure",
    idTwo: "adventure",
    url: "https://i.imgur.com/f7Lp0Zf.jpeg",
    backgroundColor: "#3da20f",
    foreground: "#ffffff"
  },
  {
    display: "Romance",
    id: "romance",
    idTwo: "romance",
    url: "https://i.imgur.com/657a4B6_d.jpeg",
    backgroundColor: "#9c00e9",
    foreground: "#ffffff"
  },
  {
    display: "Fantasy",
    id: "fantasy",
    idTwo: "fantasy",
    url: "https://i.imgur.com/YkZhjVw.jpeg",
    backgroundColor: "#4691ff",
    foreground: "#ffffff"
  },
  {
    display: "Comedy",
    id: "comedy",
    idTwo: "comedy",
    url: "https://i.imgur.com/xVqhcQt.jpeg",
    backgroundColor: "#c9af67",
    foreground: "#f2f2f2"
  },
  {
    display: "Cars",
    id: "cars",
    idTwo: "cars",
    url: "https://i.imgur.com/mAQB8HM.jpeg",
    backgroundColor: "#f0a2e1",
    foreground: "#232323"
  },
  {
    display: "Military",
    id: "military",
    idTwo: "military",
    url: "https://i.imgur.com/9nuxdhq.jpeg",
    backgroundColor: "#556b2f",
    foreground: "#ffffff"
  },
  {
    display: "Demons",
    id: "demons",
    idTwo: "demons",
    url: "https://i.imgur.com/eZwoRYB.jpeg",
    backgroundColor: "#b46ce6",
    foreground: "#242424"
  },
  {
    display: "Dementia",
    id: "dementia",
    idTwo: "dementia",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#6b6b6b",
    foreground: "#ffffff"
  },
  {
    display: "Drama",
    id: "drama",
    idTwo: "drama",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#ff5757",
    foreground: "#ffffff"
  },
  {
    display: "Ecchi",
    id: "ecchi",
    idTwo: "ecchi",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#ffc0cb",
    foreground: "#000000"
  },

  {
    display: "Game",
    id: "game",
    idTwo: "game",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#0e76a8",
    foreground: "#ffffff"
  },
  {
    display: "Harem",
    id: "harem",
    idTwo: "harem",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#ffa07a",
    foreground: "#000000"
  },
  {
    display: "Historical",
    id: "historical",
    idTwo: "historical",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#c9a563",
    foreground: "#000000"
  },
  {
    display: "Isekai",
    id: "isekai",
    idTwo: "isekai",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#4b0082",
    foreground: "#ffffff"
  },
  {
    display: "Josei",
    id: "josei",
    idTwo: "josei",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#ff69b4",
    foreground: "#000000"
  },
  {
    display: "Kids",
    id: "kids",
    idTwo: "kids",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#ffd700",
    foreground: "#000000"
  },
  {
    display: "Magic",
    id: "magic",
    idTwo: "magic",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#8e44ad",
    foreground: "#ffffff"
  },
  {
    display: "Martial Arts",
    id: "martialArts",
    idTwo: "martialArts",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#000000",
    foreground: "#ffffff"
  },
  {
    display: "Mecha",
    id: "mecha",
    idTwo: "mecha",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#808080",
    foreground: "#ffffff"
  },
  {
    display: "Parody",
    id: "parody",
    idTwo: "parody",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#ffa500",
    foreground: "#000000"
  },
  {
    display: "Music",
    id: "music",
    idTwo: "music",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#4682b4",
    foreground: "#ffffff"
  },
  {
    display: "Mystery",
    id: "mystery",
    idTwo: "mystery",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#2f4f4f",
    foreground: "#ffffff"
  },
  {
    display: "Police",
    id: "police",
    idTwo: "police",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#00008b",
    foreground: "#ffffff"
  },
  {
    display: "Psychological",
    id: "psychological",
    idTwo: "psychological",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#696969",
    foreground: "#ffffff"
  },

  {
    display: "Samurai",
    id: "samurai",
    idTwo: "samurai",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#8b0000",
    foreground: "#ffffff"
  },
  {
    display: "School",
    id: "school",
    idTwo: "school",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#000080",
    foreground: "#ffffff"
  },
  {
    display: "Sci Fi",
    id: "sciFi",
    idTwo: "sci-fi",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#2e8b57",
    foreground: "#ffffff"
  },
  {
    display: "Seinen",
    id: "seinen",
    idTwo: "seinen",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#708090",
    foreground: "#ffffff"
  },
  {
    display: "Shoujo",
    id: "shoujo",
    idTwo: "shoujo",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#ffb6c1",
    foreground: "#000000"
  },
  {
    display: "Shoujo Ai",
    id: "shoujoAi",
    idTwo: "shoujo-ai",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#db7093",
    foreground: "#ffffff"
  },
  {
    display: "Shounen",
    id: "shounen",
    idTwo: "shounen",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#ff4500",
    foreground: "#ffffff"
  },
  {
    display: "Shounen Ai",
    id: "shounenAi",
    idTwo: "shounen-ai",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#8b008b",
    foreground: "#ffffff"
  },
  {
    display: "Slice Of Life",
    id: "sliceOfLife",
    idTwo: "slice-of-life",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#32cd32",
    foreground: "#ffffff"
  },
  {
    display: "Space",
    id: "space",
    idTwo: "space",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#191970",
    foreground: "#ffffff"
  },
  {
    display: "Sports",
    id: "sports",
    idTwo: "sports",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#228b22",
    foreground: "#ffffff"
  },
  {
    display: "Super Power",
    id: "superPower",
    idTwo: "super-power",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#ff6347",
    foreground: "#ffffff"
  },
  {
    display: "Super Natural",
    id: "supernatural",
    idTwo: "supernatural",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#800080",
    foreground: "#ffffff"
  },
  {
    display: "Thriller",
    id: "thriller",
    idTwo: "thriller",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#696969",
    foreground: "#ffffff"
  },
  {
    display: "Vampire",
    id: "vampire",
    idTwo: "vampire",
    url: "https://cdn.discordapp.com/attachments/1125343948060246028/1324650136185470996/20250103_133624.jpg?ex=6778ec13&is=67779a93&hm=8178fda8336bd79369c81cef0e2a1c7ee19f78ffdc20d05821fa436a5e2b1e24&",
    backgroundColor: "#ff0000",
    foreground: "#ffffff"
  }
];

export default genresMap;
