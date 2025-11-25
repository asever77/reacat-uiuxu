// app/global-error.tsx
"use client"; // 에러 컴포넌트는 반드시 클라이언트 컴포넌트여야 합니다.

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Sentry 같은 에러 로깅 서비스에 에러를 보낼 수 있습니다.
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            치명적인 오류가 발생했습니다.
          </h2>
          <p className="mb-4 text-gray-700">
            애플리케이션의 루트 레이아웃에서 문제가 생겼습니다.
          </p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => reset()} // 페이지를 다시 로드하여 복구를 시도합니다.
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
