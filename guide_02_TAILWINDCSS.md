# 🚀 Tailwindcss 설정

기본 설정을 1rem이 10px, Design System Base Unit 값을 0.4rem(4px) 로 변경

---

## 디자인 token 변수 생성

1. 피그마에서 plugins에서 Token Variable Export 설치
2. 디자인토큰정보 생성
3. src/styles/tokens.css 파일 생성

## src/app/globals.css

```css
@import "tailwindcss";
@import "tw-animate-css"; /* shadcn/ui에서 사용 */
@import "../styles/tokens.css"; /* figma token style */

/* 기본 재설정 */
@config "../../tailwind.config.ts";

/* 1rem = 10px */
html {
  font-size: 10px;
}
@media (max-width: 374px) {
  html {
    font-size: 2.6667vw;
  }
}

@theme inline {
  /* Design System Base Unit (0.4rem = 4px at 10px font-size) */
  --base-unit: 0.4rem;

  /* Legacy variables for backward compatibility */
  --spacing: 0.4rem;
  --radius: 0.4rem;
}

@layer base {
  body {
    font-family: var(--font-pretendard), -apple-system, BlinkMacSystemFont, system-ui,
      sans-serif;
    @apply bg-background text-foreground;
    /** 
    @apply
    Tailwind CSS의 유틸리티 클래스를 CSS 안에서 직접 사용할 수 있게 해주는 기능
    Tailwind 클래스들을 CSS의 한 구문처럼 묶어서 재사용
    ✔ CSS 파일에서 Tailwind 유틸리티를 재사용하고 싶을 때
    ✔ 특정 요소에 공통 스타일을 줄 때
    ✔ 커스텀 컴포넌트 스타일을 Tailwind로 구성하고 싶을 때
    */
  }
}
```

## tailwind.config.ts

```ts
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
      "0.5": "calc(var(--base-unit) * 0.5)", // 0.2rem
      "1": "var(--base-unit)", // 0.4rem - base unit
      "1.5": "calc(var(--base-unit) * 1.5)", // 0.6rem
      "2": "calc(var(--base-unit) * 2)", // 0.8rem
      "2.5": "calc(var(--base-unit) * 2.5)", // 1rem
      "3": "calc(var(--base-unit) * 3)", // 1.2rem
      "3.5": "calc(var(--base-unit) * 3.5)", // 1.4rem
      "4": "calc(var(--base-unit) * 4)", // 1.6rem
      "5": "calc(var(--base-unit) * 5)", // 2rem
      "6": "calc(var(--base-unit) * 6)", // 2.4rem
      "7": "calc(var(--base-unit) * 7)", // 2.8rem
      "8": "calc(var(--base-unit) * 8)", // 3.2rem
      "9": "calc(var(--base-unit) * 9)", // 3.6rem
      "10": "calc(var(--base-unit) * 10)", // 4rem
      "11": "calc(var(--base-unit) * 11)", // 4.4rem
      "12": "calc(var(--base-unit) * 12)", // 4.8rem
      "14": "calc(var(--base-unit) * 14)", // 5.6rem
      "16": "calc(var(--base-unit) * 16)", // 6.4rem
      "20": "calc(var(--base-unit) * 20)", // 8rem
      "24": "calc(var(--base-unit) * 24)", // 9.6rem
      px: "1px", // 1px 단위는 보통 그대로 유지합니다.
    },
    fontSize: {
      xs: "calc(var(--base-unit) * 3)", // 12px (0.4rem * 3)
      sm: "calc(var(--base-unit) * 3.5)", // 14px (0.4rem * 3.5)
      base: "calc(var(--base-unit) * 4)", // 16px (0.4rem * 4)
      lg: "calc(var(--base-unit) * 4.5)", // 18px (0.4rem * 4.5)
      xl: "calc(var(--base-unit) * 5)", // 20px (0.4rem * 5)
      "2xl": "calc(var(--base-unit) * 6)", // 24px (0.4rem * 6)
      "3xl": "calc(var(--base-unit) * 7.5)", // 30px (0.4rem * 7.5)
      "4xl": "calc(var(--base-unit) * 9)", // 36px (0.4rem * 9)
      "5xl": "calc(var(--base-unit) * 12)", // 48px (0.4rem * 12)
      "6xl": "calc(var(--base-unit) * 15)", // 60px (0.4rem * 15)
      "7xl": "calc(var(--base-unit) * 18)", // 72px (0.4rem * 18)
      "8xl": "calc(var(--base-unit) * 24)", // 96px (0.4rem * 24)
      "9xl": "calc(var(--base-unit) * 32)", // 128px (0.4rem * 32)
    },
    borderRadius: {
      none: "0",
      sm: "calc(var(--base-unit) * 0.5)",
      DEFAULT: "var(--base-unit)",
      md: "calc(var(--base-unit) * 1.5)",
      lg: "calc(var(--base-unit) * 2)",
      xl: "calc(var(--base-unit) * 3)",
      "2xl": "calc(var(--base-unit) * 4)",
      "3xl": "calc(var(--base-unit) * 6)",
      full: "9999px",
    },
    borderWidth: {
      "0": "0px",
      DEFAULT: "1px", // 1px - 최소 단위 유지
      "2": "var(--base-unit)",
      "4": "calc(var(--base-unit) * 2)",
      "6": "calc(var(--base-unit) * 3)",
      "8": "calc(var(--base-unit) * 4)",
    },
    lineHeight: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
      "3": "calc(var(--base-unit) * 3)", // 12px (0.4rem × 3)
      "4": "calc(var(--base-unit) * 4)", // 16px (0.4rem × 4)
      "5": "calc(var(--base-unit) * 5)", // 20px (0.4rem × 5)
      "6": "calc(var(--base-unit) * 6)", // 24px (0.4rem × 6)
      "7": "calc(var(--base-unit) * 7)", // 28px (0.4rem × 7)
      "8": "calc(var(--base-unit) * 8)", // 32px (0.4rem × 8)
      "9": "calc(var(--base-unit) * 9)", // 36px (0.4rem × 9)
      "10": "calc(var(--base-unit) * 10)", // 40px (0.4rem × 10)
    },
    letterSpacing: {
      tighter: "calc(var(--base-unit) * -0.125)", // -0.05rem (-0.5px)
      tight: "calc(var(--base-unit) * -0.0625)", // -0.025rem (-0.25px)
      normal: "0rem",
      wide: "calc(var(--base-unit) * 0.0625)", // 0.025rem (0.25px)
      wider: "calc(var(--base-unit) * 0.125)", // 0.05rem (0.5px)
      widest: "calc(var(--base-unit) * 0.25)", // 0.1rem (1px)
    },
    extend: {
      // 다른 속성들은 여기에 추가할 수 있습니다.
    },
  },
  plugins: [],
};

export default config;
```
