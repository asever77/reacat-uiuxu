# 🚀 Web Font 설정 (Pretendard)

Next.js 권장 방식

- Next.js 폰트 최적화 활용 (자동 preload, 폰트 swap 등)
- 타입 안전성 (TypeScript 지원)
- 성능 최적화 (폰트 로딩 최적화)
- 유연성 (조건부 폰트 적용 가능)

# src/app/layout.tsx

store, webFont, meta 설정

```tsx
import localFont from "next/font/local";

const pretendard = localFont({
  src: [
    {
      path: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>{children}</body>
    </html>
  );
}
```

## src/app/globals.css

```css
@layer base {
  body {
    font-family: var(--font-pretendard), -apple-system, BlinkMacSystemFont, system-ui,
      sans-serif;
  }
}
```
