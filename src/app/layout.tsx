import type { Metadata } from "next";
import StoreProvider from "@/providers/StoreProvider";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "@/app/globals.css";

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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/layout.tsx - 모든 메타데이터 포함 예시
export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  // 기본 정보
  title: {
    default: "홈페이지 - 최고의 웹사이트",
    template: "%s | 홈페이지",
  },
  description: "최고의 웹사이트입니다. Next.js로 제작되었습니다.",
  keywords: ["Next.js", "React", "웹개발", "홈페이지", "TypeScript"],
  authors: [{ name: "개발자", url: "https://github.com/developer" }],
  creator: "개발팀",
  publisher: "회사명",

  // 테마 및 색상
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "dark light",

  // 뷰포트
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },

  // 아이콘
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },

  // 오픈그래프
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://example.com",
    siteName: "홈페이지",
    title: "홈페이지 - 최고의 웹사이트",
    description: "최고의 웹사이트입니다. Next.js로 제작되었습니다.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "홈페이지 오픈그래프 이미지",
      },
    ],
  },

  // 트위터
  twitter: {
    card: "summary_large_image",
    title: "홈페이지 - 최고의 웹사이트",
    description: "최고의 웹사이트입니다. Next.js로 제작되었습니다.",
    images: ["/twitter-image.jpg"],
  },

  // SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // PWA
  manifest: "/manifest.json",

  // 기타
  category: "웹사이트",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
