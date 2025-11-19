import Link from "next/link";
import { Button } from "@/components/uiux";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 아이콘/이미지 */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-gray-300 mb-4">404</div>
          <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6M12 21l-7-7 7-7 7 7-7 7z"
              />
            </svg>
          </div>
        </div>

        {/* 에러 메시지 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-1">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <p className="text-sm text-gray-500">URL을 다시 확인해 주세요.</p>
        </div>

        {/* 액션 버튼들 */}
        <div className="space-y-3">
          <Link href="/" className="block">
            <Button className="w-full">홈으로 돌아가기</Button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            이전 페이지로 돌아가기
          </button>
        </div>

        {/* 추가 도움말 */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">
            도움이 필요하신가요?
          </h3>
          <div className="text-sm text-blue-700 space-y-1">
            <div>
              •{" "}
              <Link href="/about" className="underline hover:no-underline">
                소개 페이지
              </Link>
              에서 사이트 정보 확인
            </div>
            <div>
              •{" "}
              <Link href="/docs" className="underline hover:no-underline">
                문서
              </Link>
              에서 가이드 참고
            </div>
            <div>• 문제가 지속되면 관리자에게 문의해 주세요</div>
          </div>
        </div>

        {/* 검색 기능 (선택적) */}
        <div className="mt-6">
          <div className="relative">
            <input
              type="text"
              placeholder="찾고 싶은 내용을 검색해보세요..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const query = (e.target as HTMLInputElement).value;
                  if (query.trim()) {
                    window.location.href = `/?search=${encodeURIComponent(
                      query
                    )}`;
                  }
                }
              }}
            />
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
