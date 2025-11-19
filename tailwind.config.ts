// tailwind.config.ts

/** @type {import('tailwindcss').Config} */
const config = {
  // content 설정은 그대로 유지
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // 💡 theme.spacing을 직접 정의하여 기본 스케일 전체를 덮어씁니다.
    spacing: {
      "0": "0",
      "0.5": "calc(var(--spacing) * 0.5)", // 0.2rem
      "1": "var(--spacing)", // 0.4rem - base unit
      "1.5": "calc(var(--spacing) * 1.5)", // 0.6rem
      "2": "calc(var(--spacing) * 2)", // 0.8rem
      "2.5": "calc(var(--spacing) * 2.5)", // 1rem
      "3": "calc(var(--spacing) * 3)", // 1.2rem
      "3.5": "calc(var(--spacing) * 3.5)", // 1.4rem
      "4": "calc(var(--spacing) * 4)", // 1.6rem
      "5": "calc(var(--spacing) * 5)", // 2rem
      "6": "calc(var(--spacing) * 6)", // 2.4rem
      "7": "calc(var(--spacing) * 7)", // 2.8rem
      "8": "calc(var(--spacing) * 8)", // 3.2rem
      "9": "calc(var(--spacing) * 9)", // 3.6rem
      "10": "calc(var(--spacing) * 10)", // 4rem
      "11": "calc(var(--spacing) * 11)", // 4.4rem
      "12": "calc(var(--spacing) * 12)", // 4.8rem
      "14": "calc(var(--spacing) * 14)", // 5.6rem
      "16": "calc(var(--spacing) * 16)", // 6.4rem
      "20": "calc(var(--spacing) * 20)", // 8rem
      "24": "calc(var(--spacing) * 24)", // 9.6rem
      px: "1px", // 1px 단위는 보통 그대로 유지합니다.
    },
    fontSize: {
      xs: "calc(var(--spacing) * 3)", // 12px (0.4rem * 3)
      sm: "calc(var(--spacing) * 3.5)", // 14px (0.4rem * 3.5)
      base: "calc(var(--spacing) * 4)", // 16px (0.4rem * 4)
      lg: "calc(var(--spacing) * 4.5)", // 18px (0.4rem * 4.5)
      xl: "calc(var(--spacing) * 5)", // 20px (0.4rem * 5)
      "2xl": "calc(var(--spacing) * 6)", // 24px (0.4rem * 6)
      "3xl": "calc(var(--spacing) * 7.5)", // 30px (0.4rem * 7.5)
      "4xl": "calc(var(--spacing) * 9)", // 36px (0.4rem * 9)
      "5xl": "calc(var(--spacing) * 12)", // 48px (0.4rem * 12)
      "6xl": "calc(var(--spacing) * 15)", // 60px (0.4rem * 15)
      "7xl": "calc(var(--spacing) * 18)", // 72px (0.4rem * 18)
      "8xl": "calc(var(--spacing) * 24)", // 96px (0.4rem * 24)
      "9xl": "calc(var(--spacing) * 32)", // 128px (0.4rem * 32)
    },
    borderRadius: {
      none: "0",
      sm: "calc(var(--radius) * 0.5)", // --radius의 0.5배
      DEFAULT: "var(--radius)", // 기본 radius 값
      md: "calc(var(--radius) * 1.5)", // --radius의 1.5배
      lg: "calc(var(--radius) * 2)", // --radius의 2배
      xl: "calc(var(--radius) * 3)", // --radius의 3배
      "2xl": "calc(var(--radius) * 4)", // --radius의 4배
      "3xl": "calc(var(--radius) * 6)", // --radius의 6배
      full: "9999px",
    },
    borderWidth: {
      "0": "0px",
      DEFAULT: "1px", // 1px - 최소 단위 유지
      "2": "var(--spacing)", // 4px (0.4rem × 1)
      "4": "calc(var(--spacing) * 2)", // 8px (0.4rem × 2)
      "6": "calc(var(--spacing) * 3)", // 12px (0.4rem × 3)
      "8": "calc(var(--spacing) * 4)", // 16px (0.4rem × 4)
    },
    lineHeight: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
      "3": "calc(var(--spacing) * 3)", // 12px (0.4rem × 3)
      "4": "calc(var(--spacing) * 4)", // 16px (0.4rem × 4)
      "5": "calc(var(--spacing) * 5)", // 20px (0.4rem × 5)
      "6": "calc(var(--spacing) * 6)", // 24px (0.4rem × 6)
      "7": "calc(var(--spacing) * 7)", // 28px (0.4rem × 7)
      "8": "calc(var(--spacing) * 8)", // 32px (0.4rem × 8)
      "9": "calc(var(--spacing) * 9)", // 36px (0.4rem × 9)
      "10": "calc(var(--spacing) * 10)", // 40px (0.4rem × 10)
    },
    letterSpacing: {
      tighter: "calc(var(--spacing) * -0.125)", // -0.05rem (-0.5px)
      tight: "calc(var(--spacing) * -0.0625)", // -0.025rem (-0.25px)
      normal: "0rem",
      wide: "calc(var(--spacing) * 0.0625)", // 0.025rem (0.25px)
      wider: "calc(var(--spacing) * 0.125)", // 0.05rem (0.5px)
      widest: "calc(var(--spacing) * 0.25)", // 0.1rem (1px)
    },
    extend: {
      // 다른 속성들은 여기에 추가할 수 있습니다.
    },
  },
  plugins: [],
};

export default config;
