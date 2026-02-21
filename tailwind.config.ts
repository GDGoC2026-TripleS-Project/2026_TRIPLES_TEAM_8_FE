import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        primary: {
          dark: "var(--color-primary-dark)",
          warm: "var(--color-primary-warm)",
          sand: "var(--color-primary-sand)",
          cream: "var(--color-primary-cream)",
        },

        system: {
          error: "var(--color-system-error)",
          blue: "var(--color-system-blue)",
        },

        gray: {
          white: "var(--color-white)",
          bg: "var(--color-bg-gray)",
          text1: "var(--color-text-gray1)",
          text2: "var(--color-text-gray2)",
        },

        stroke: "var(--color-stroke)",

        card: {
          pink: "var(--color-card-pink)",
          yellow: "var(--color-card-yellow)",
          blue: "var(--color-card-blue)",
          purple: "var(--color-card-purple)",
        },

        /* 키워드 베이스 색상(필요할 때만 사용) */
        kw: {
          love: "var(--kw-love)",
          joy: "var(--kw-joy)",
          sad: "var(--kw-sad)",
          tension: "var(--kw-tension)",
          anger: "var(--kw-anger)",
          comfort: "var(--kw-comfort)",
          light: "var(--kw-light)",
          immersive: "var(--kw-immersive)",
          aftertaste: "var(--kw-aftertaste)",
          speed: "var(--kw-speed)",
          insight: "var(--kw-insight)",
          shift: "var(--kw-shift)",
          bright: "var(--kw-bright)",
          warm: "var(--kw-warm)",
          calm: "var(--kw-calm)",
          heavy: "var(--kw-heavy)",
          sharp: "var(--kw-sharp)",
          hope: "var(--kw-hope)",
        },
      },

      borderRadius: {
        btn: "var(--radius-btn)", // 12
        card: "var(--radius-card)", // 20
      },

      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },

      fontSize: {
        h1_sb: [
          "20px",
          { lineHeight: "normal", letterSpacing: "0", fontWeight: "600" },
        ],
        h2_sb: [
          "16px",
          { lineHeight: "normal", letterSpacing: "0", fontWeight: "600" },
        ],
        h3_sb: [
          "14px",
          { lineHeight: "normal", letterSpacing: "0", fontWeight: "600" },
        ],
        body_sb: [
          "12px",
          { lineHeight: "normal", letterSpacing: "0", fontWeight: "600" },
        ],
        cap_sb: [
          "10px",
          { lineHeight: "normal", letterSpacing: "0", fontWeight: "600" },
        ],
        h0_m: [
          "30px",
          { lineHeight: "normal", letterSpacing: "0", fontWeight: "500" },
        ],
        h1_m: [
          "20px",
          { lineHeight: "normal", letterSpacing: "0", fontWeight: "500" },
        ],
        h2_m: [
          "16px",
          { lineHeight: "normal", letterSpacing: "0", fontWeight: "500" },
        ],
        h3_m: [
          "14px",
          { lineHeight: "normal", letterSpacing: "0", fontWeight: "500" },
        ],
        body_m: [
          "12px",
          { lineHeight: "normal", letterSpacing: "0", fontWeight: "500" },
        ],
        cap_m: [
          "10px",
          { lineHeight: "normal", letterSpacing: "0", fontWeight: "500" },
        ],
      },
    },
  },
  plugins: [],
};

export default config;
