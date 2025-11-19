import { ReactNode } from "react";

// StickyArea 컴포넌트
interface StickyAreaProps {
  top?: number;
  style?: string;
  children?: ReactNode;
}

export const StickyArea = ({
  top = 0,
  style = "base",
  children,
}: StickyAreaProps) => {
  const getStyleClass = (style: string) => {
    // 기본 스타일 정의 (top 제외)
    const baseStyles = {
      base: "w-full sticky flex items-center justify-center left-0 bg-white z-10",
      header:
        "w-full sticky flex items-center justify-between left-0 bg-white border-b z-10 px-4 py-2",
      floating:
        "w-full sticky flex items-center justify-center left-0 bg-white/80 backdrop-blur-sm z-10 rounded-lg mx-4",
      AIChat:
        "w-full sticky flex flex-col left-0 bg-white z-10 gap-5 px-5 py-2",
    };

    // 선택된 스타일 반환 (top은 인라인으로 처리)
    return baseStyles[style as keyof typeof baseStyles] || baseStyles.base;
  };

  return (
    <div className={getStyleClass(style)} style={{ top: `${top}rem` }}>
      {children}
    </div>
  );
};
