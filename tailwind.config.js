export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#FFDB33", // Adjusted to match primary button color
          accent: "#F5C518", // Darker yellow/orange for contrast
          black: "#1A1A1A",
          white: "#FFFFFF",
          cream: "var(--primaryBG, #fff5cb)",
          green: "#A8E6A3",
          red: "#E63946",
          gray: "#666666",
          "warm-offwhite": "#FDFBF7",
          "soft-black": "#1A1A1A",
        },
      },
      borderRadius: {
        "3xl": "32px",
        "2xl": "1rem",
      },
      boxShadow: {
        retro: "3px 3px 0 #1A1A1A",
        "retro-sm": "2px 2px 0 #1A1A1A",
        "retro-lg": "5px 5px 0 #1A1A1A",
        "retro-xl": "6px 6px 0 #1A1A1A",
      },
      borderWidth: {
        3: "3px",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ['"DM Sans"', '"Manrope"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
        serif: ['"Instrument Serif"', "serif"],
      },
    },
  },
  plugins: [],
};
