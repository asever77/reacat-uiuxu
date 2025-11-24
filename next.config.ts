import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  /**
   * GitHub Pages 배포 설정
   * - output: 정적 HTML로 export
   * - basePath: GitHub 저장소 이름 (username.github.io가 아닌 경우)
   * - images.unoptimized: 정적 export 시 이미지 최적화 비활성화
   */
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/reacat-uiuxu" : "",
  images: {
    unoptimized: true, // 정적 export 시 필수
  },
};

export default nextConfig;
