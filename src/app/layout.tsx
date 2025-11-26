import StoreProvider from "@/providers/StoreProvider";
import localFont from "next/font/local";
import "@/app/globals.css";
import type { Metadata, ResolvingMetadata } from "next";

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

// 메타데이터는 외부 파일(config/metadata.ts)에서 관리
export const metadata: Metadata = {
  title: "홈페이지 - 최고의 웹사이트",
  description: "최고의 웹사이트입니다. Next.js로 제작되었습니다.",
  keywords: [
    "Next.js",
    "React",
    "웹개발",
    "홈페이지",
    "TypeScript",
  ] as string[],
  authors: [{ name: "개발자", url: "https://github.com/developer" }],
  creator: "개발팀",
  publisher: "회사명",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${pretendard.variable} antialiased`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
