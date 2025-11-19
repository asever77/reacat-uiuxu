// components/layout/Header.tsx
"use client";

import { usePathname } from "next/navigation";
import { BackArrow } from "@/components/icons";
import { ReactNode } from "react";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  rightContent?: ReactNode;
  onBackClick?: () => void;
  type?: "main" | "sub" | "auth";
  hidden?: boolean; // Header를 완전히 숨길지 여부
}

const getHeaderConfig = (pathname: string) => {
  interface HeaderConfig {
    title: string;
    showBackButton: boolean;
    type: string;
    rightContent?: ReactNode;
  }

  const configs: Record<string, HeaderConfig> = {
    "/": {
      title: "홈페이지",
      showBackButton: false,
      type: "main",
      rightContent: (
        <div className="flex items-center gap-2">
          <span>홈</span>
          <div className="w-6 h-6 bg-green-500 rounded-full" />
        </div>
      ),
    },
    "/about": {
      title: "소개 페이지",
      showBackButton: true,
      type: "sub",
      rightContent: (
        <div className="flex items-center gap-2">
          <span>소개</span>
          <div className="w-6 h-6 bg-blue-500 rounded-full" />
        </div>
      ),
    },
    "/profile": {
      title: "프로필",
      showBackButton: true,
      type: "sub",
      rightContent: (
        <div className="flex items-center gap-2">
          <span>프로필</span>
          <div className="w-6 h-6 bg-purple-500 rounded-full" />
        </div>
      ),
    },
  };

  // 정확한 매치가 있으면 반환
  if (configs[pathname]) {
    return configs[pathname];
  }

  // 패턴 매칭 (하위 경로 처리)
  if (pathname.startsWith("/about")) {
    return {
      title: "소개 페이지",
      showBackButton: true,
      type: "sub",
      rightContent: configs["/about"]?.rightContent,
    };
  }

  if (pathname.startsWith("/profile")) {
    return {
      title: "프로필",
      showBackButton: true,
      type: "sub",
      rightContent: configs["/profile"]?.rightContent,
    };
  }

  if (pathname.startsWith("/dashboard")) {
    return {
      title: "대시보드",
      showBackButton: pathname !== "/dashboard",
      type: pathname === "/dashboard" ? "main" : "sub",
    };
  }

  // 기본값
  return {
    title: "My App",
    showBackButton: false,
    type: "main",
    rightContent: null,
  };
};

const Header = ({
  title,
  showBackButton,
  rightContent,
  onBackClick = () => window.history.back(),
  type,
  hidden = false,
}: HeaderProps) => {
  const pathname = usePathname();

  // Header를 숨기는 조건들 (더 포괄적으로)
  const hideHeaderPaths = ["/not-found", "/error", "/_error", "/500", "/404"];

  const isErrorPage =
    hideHeaderPaths.includes(pathname) ||
    pathname.includes("_error") ||
    pathname.includes("(error)") ||
    pathname.includes("/error") ||
    pathname.includes("/not-found") ||
    // Next.js 에러 페이지 패턴들
    pathname.endsWith("/404") ||
    pathname.endsWith("/500") ||
    pathname.endsWith("/error") ||
    // 브라우저에서 실제로 보이는 경로가 다를 수 있음
    (typeof window !== "undefined" &&
      (window.location.pathname.includes("error") ||
        window.location.pathname.includes("not-found")));

  // 디버깅: 현재 경로 확인
  console.log("🔍 Header Debug - pathname:", pathname);
  console.log("🔍 Header Debug - isErrorPage:", isErrorPage);
  console.log("🔍 Header Debug - hidden:", hidden);

  // Props로 숨김 요청되었거나 에러 페이지인 경우 Header 숨기기
  if (hidden || isErrorPage) {
    console.log("🚫 Header 숨김 처리됨");
    return null;
  }

  const config = getHeaderConfig(pathname);

  // Props 우선, 없으면 자동 설정 사용 (?? 연산자 사용)
  const finalTitle = title ?? config.title;
  const finalShowBackButton = showBackButton ?? config.showBackButton;
  const finalRightContent = rightContent ?? config.rightContent;
  const finalType = type ?? config.type;

  return (
    <header className="w-full sticky flex items-center justify-center top-0 left-0 min-h-[5.6rem] bg-white border-b border-gray-100">
      <div className="flex items-center justify-between w-full h-full px-5 py-1">
        {finalShowBackButton ? (
          <button
            type="button"
            aria-label="이전 페이지"
            onClick={onBackClick}
            className="p-2 -ml-2 cursor-pointer"
          >
            <BackArrow size={2.2} />
          </button>
        ) : (
          <div className="w-6" />
        )}

        <div className="text-lg font-semibold">
          {finalTitle}
          <span className="text-xs text-gray-400 ml-2">({finalType})</span>
        </div>

        <div className="flex items-center">
          {finalRightContent || <div className="w-6" />}
        </div>
      </div>
    </header>
  );
};

export default Header;
