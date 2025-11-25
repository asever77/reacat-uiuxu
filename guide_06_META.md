# Meta 속성 설정

## src/config/metadata.ts

````ts
import type { Metadata } from "next";

/**
 * 사이트 기본 정보
 * 여러 곳에서 재사용할 수 있도록 상수로 정의
 */
export const SITE_CONFIG = {
  name: "홈페이지",
  title: "홈페이지 - 최고의 웹사이트",
  description: "최고의 웹사이트입니다. Next.js로 제작되었습니다.",
  url: "https://example.com",
  ogImage: "/og-image.jpg",
  twitterImage: "/twitter-image.jpg",
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

/**
 * Root Layout 기본 메타데이터
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  // 기본 정보
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: SITE_CONFIG.authors,
  creator: SITE_CONFIG.creator,
  publisher: SITE_CONFIG.publisher,

  // 오픈그래프
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} 오픈그래프 이미지`,
      },
    ],
  },

  // 트위터
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.twitterImage],
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
};

/**
 * 페이지별 메타데이터 생성 헬퍼 함수
 *
 * @example
 * ```ts
 * export const metadata = createMetadata({
 *   title: "About 페이지",
 *   description: "소개 페이지입니다.",
 * });
 * ```
 */
export function createMetadata(override: Metadata): Metadata {
  return {
    ...baseMetadata,
    ...override,
    openGraph: {
      ...baseMetadata.openGraph,
      ...override.openGraph,
    },
    twitter: {
      ...baseMetadata.twitter,
      ...override.twitter,
    },
  };
}
````

## src/app/layout.tsx

```tsx
import { baseMetadata } from "@/config/metadata";

// 메타데이터는 외부 파일(config/metadata.ts)에서 관리
export { baseMetadata as metadata };
```
