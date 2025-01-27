/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./Sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        main: "var(--main)",
        dimmerMain: "var(--dimmer-main)",
        background: "var(--background)",
        backgroundtwo: "var(--backgroundtwo)",
        backgroundHover: "var(--background-hover)",
        foreground: "var(--foreground)",
        separatorOnBackground: "var(--separator-on-background)",
        separatorOnBackgroundtwo: "var(--separator-on-backgroundtwo)",

        animeCardBackground: "var(--animecard-background)",
        animeCardForeground: "var(--animecard-foreground)",
        animeCardDimmerForeground: "var(--animecard-dimmer-foreground)",
        subBackground: "var(--sub-background)",
        dubBackground: "var(--dub-background)",
        subForeground: "var(--sub-foreground)",
        dubForeground: "var(--dub-foreground)",

        rating: "var(--rating)",
        quality: "var(--quality)",
        status: "var(--status)",
        infoForeground: "var(--colored-info-foreground)",
        discriptionForeground: "var(--discription-foreground)",

        episodeContainerBackground: "var(--episode-container-background)",
        episodeBackground: "var(--episode-background)",
        episodeForeground: "var(--episode-foreground)",
        watchedEpisodeBackground: "var(--watched-episode-background)",
        watchedEpisodeForeground: "var(--watched-episode-foreground)",
        fillerEpisodeBackground: "var(--filler-episode-background)",
        introOutroHighlight: "var(--intro-outro-highlight-on-player)",

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
