import { ReactNode } from "react";

// fixedArea 컴포넌트
interface FixedAreaProps {
  bottom?: number;
  style?: string;
  children?: ReactNode;
}

export const FixedArea = ({
  bottom = 0,
  style = "base",
  children,
}: FixedAreaProps) => {
  const getStyleClass = (style: string) => {
    // 기본 스타일 정의 (bottom 제외)
    const baseStyles = {
      base: "w-full fixed bottom-0 flex items-center justify-center left-0 bg-white z-10 gap-2 px-5 pt-2 pb-4",
    };

    // 선택된 스타일 반환 (bottom은 인라인으로 처리)
    return baseStyles[style as keyof typeof baseStyles] || baseStyles.base;
  };

  return (
    <div className={getStyleClass(style)} style={{ bottom: `${bottom}rem` }}>
      {children}
    </div>
  );
};
