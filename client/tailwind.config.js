/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      tapeYellow: "#BBF771",
      tapePink: "#FF65AA",
      tapeBlack: "#151515",
      tapeOffBlack: "#181818",
      tapeWhite: "#FFFFFF",
      tapeGray: "#767676",
      tapeDarkGrey: "#909090"

    },
    fontFamily: {
      sans: ["Darker Grotesque"],
    },
    extend: {
      gradient: {},
      animation: {
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
