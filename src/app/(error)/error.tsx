"use client";

import { useEffect } from "react";
import { Button } from "@/components/uiux/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅 (선택적)
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 에러 아이콘 */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-red-200 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-16 h-16 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* 에러 메시지 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-red-800 mb-2">
            문제가 발생했습니다
          </h1>
          <p className="text-red-600 mb-4">
            예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
          </p>

          {/* 개발 모드에서만 에러 상세 정보 표시 */}
          {process.env.NODE_ENV === "development" && (
            <details className="text-left bg-red-50 p-4 rounded-lg mb-4">
              <summary className="cursor-pointer font-semibold text-red-800 mb-2">
                에러 상세 정보 (개발 모드)
              </summary>
              <pre className="text-xs text-red-700 overflow-x-auto">
                {error.message}
              </pre>
              {error.digest && (
                <p className="text-xs text-red-600 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </details>
          )}
        </div>

        {/* 액션 버튼들 */}
        <div className="space-y-3">
          <Button
            onClick={reset}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            다시 시도하기
          </Button>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full px-4 py-2 border border-red-300 rounded-md text-red-700 hover:bg-red-50 transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>

        {/* 추가 도움말 */}
        <div className="mt-8 p-4 bg-red-50 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-2">문제 해결 방법</h3>
          <div className="text-sm text-red-700 space-y-1 text-left">
            <div>• 페이지를 새로고침해 보세요</div>
            <div>• 브라우저 캐시를 삭제해 보세요</div>
            <div>• 인터넷 연결을 확인해 보세요</div>
            <div>• 문제가 지속되면 관리자에게 문의해 주세요</div>
          </div>
        </div>
      </div>
    </div>
  );
}
