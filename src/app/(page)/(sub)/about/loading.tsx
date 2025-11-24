import { Skeleton } from "@/components/ui/skeleton";

/**
 * About 페이지 로딩 스켈레톤
 * - 실제 페이지 레이아웃과 동일한 구조
 * - Sticky 영역, 컨텐츠 영역, Fixed 버튼 영역
 * - shadcn/ui Skeleton 컴포넌트 사용
 */
export default function AboutLoading() {
  return (
    <main className="relative">
      {/* Sticky Area - AI Chat 영역 */}
      <div className="sticky top-[5.6rem] z-10 bg-white p-5 border-b border-gray-100">
        {/* 제목 스켈레톤 */}
        <Skeleton className="h-8 w-3/4 mb-4" />

        {/* AI 채팅 영역 */}
        <div className="flex gap-4 items-start justify-between">
          {/* AI 이미지 */}
          <Skeleton className="w-24 h-25 rounded-full shrink-0" />

          {/* 채팅 버블 */}
          <div className="flex-1 bg-gray-100 rounded-2xl p-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 flex flex-col gap-6 pb-32">
        {/* 텍스트 블록 */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Counter 카드 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-center gap-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="w-16 h-10" />
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>
        </div>

        {/* 모달 버튼 */}
        <Skeleton className="h-12 w-full" />

        {/* PolicyForm 카드 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-2/3" />
        </div>

        {/* PolicyList 카드 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3">
          <Skeleton className="h-6 w-1/4 mb-4" />
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-gray-100"
            >
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
              <Skeleton className="w-16 h-8" />
            </div>
          ))}
        </div>

        {/* TestForm 카드 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <Skeleton className="h-6 w-1/3" />
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>

        {/* StepComponent */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <Skeleton className="w-8 h-8 rounded-full" />
                {i < 4 && <Skeleton className="w-12 h-0.5 mx-2" />}
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 z-20">
        <Skeleton className="h-14 w-full" />
      </div>
    </main>
  );
}
