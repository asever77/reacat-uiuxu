import { ReactNode, createElement } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Typography 컴포넌트
type TypoStyle =
  | "display-l"
  | "display-m"
  | "display-s"
  | "heading-xl"
  | "heading-l"
  | "heading-m"
  | "heading-s"
  | "heading-xs"
  | "body-l"
  | "body-m"
  | "body-s"
  | "body-xs";

interface TypoProps {
  tag?: string;
  style?: TypoStyle;
  children?: ReactNode;
}

export const Typo = ({
  tag = "p",
  style = "heading-xl",
  children,
}: TypoProps) => {
  const getStyleClass = (style: TypoStyle) => {
    switch (style) {
      case "display-l":
        return "text-6xl font-bold leading-tight tracking-tight";
      case "display-m":
        return "text-5xl font-bold leading-tight tracking-tight";
      case "display-s":
        return "text-4xl font-bold leading-tight tracking-tight";
      case "heading-xl":
        return "text-3xl font-semibold leading-tight tracking-tight";
      case "heading-l":
        return "text-2xl font-semibold leading-snug tracking-tight";
      case "heading-m":
        return "text-xl font-medium leading-snug tracking-normal";
      case "heading-s":
        return "text-lg font-medium leading-normal tracking-normal";
      case "heading-xs":
        return "text-base font-medium leading-normal tracking-wide";
      case "body-l":
        return "text-lg font-normal leading-relaxed tracking-normal";
      case "body-m":
        return "text-base font-normal leading-relaxed tracking-normal";
      case "body-s":
        return "text-sm font-normal leading-normal tracking-normal";
      case "body-xs":
        return "text-xs font-normal leading-normal tracking-wide";
      default:
        return "text-3xl font-semibold leading-tight tracking-tight";
    }
  };

  return createElement(tag, { className: getStyleClass(style) }, children);
};

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

// Img 컴포넌트
interface ImgProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}

export const Img = ({
  src,
  alt,
  width = 40, // 40rem = 400px (1rem = 10px 기준)
  height = 30, // 30rem = 300px
  className,
  priority = false,
  fill = false,
  sizes,
}: ImgProps) => {
  // rem을 픽셀로 변환하는 함수 (1rem = 10px 기준)
  const remToPixels = (remValue: number) => Math.round(remValue * 10);

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes || "100vw"}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={remToPixels(width)}
      height={remToPixels(height)}
      sizes={sizes} // sizes prop 추가
      priority={priority}
      className={cn("rounded-lg", className)}
      style={{
        width: `${width}rem`,
        height: `${height}rem`,
        objectFit: "cover",
      }}
    />
  );
};

// ChatBubble 컴포넌트
type ChatPosition = "left" | "right";

interface ChatBubbleProps {
  position?: ChatPosition;
  children?: ReactNode;
  className?: string;
}

export const ChatBubble = ({
  position = "left",
  children,
  className,
}: ChatBubbleProps) => {
  const isLeft = position === "left";

  return (
    <div
      className={cn(
        "flex items-end gap-2 flex-1 w-full relative",
        isLeft ? "justify-start" : "justify-end ml-auto",
        className
      )}
    >
      {/* 말풍선 꼬리 (왼쪽용) */}
      {isLeft && (
        <div className="absolute top-0 -left-[0.7rem]">
          <svg
            width="1.8rem"
            height="7rem"
            viewBox="0 0 18 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 27.5C8 18.8849 3.9179 10.593 1.18871 6.75643C0.720983 6.09892 1.09415 5.11677 1.899 5.05921C11.4724 4.37455 16.5905 9.79314 18 12.7688C14.5 21.2688 8 37.5 8 27.5Z"
              fill="#414650"
            />
          </svg>
        </div>
      )}

      {/* 메시지 버블 */}
      <div className="w-full relative px-5 py-4 rounded-[2.4rem] shadow-[0_0.8rem_2rem_rgba(0,0,0,0.16)] bg-[#414650] text-white">
        <div className="text-[1.3rem] leading-[1.44] tracking-[-0.039rem] font-medium">
          {children}
        </div>
      </div>

      {/* 말풍선 꼬리 (오른쪽용) */}
      {!isLeft && (
        <div className="relative w-4.5 h-6.25 shrink-0 mb-2">
          <svg
            width="18"
            height="70"
            viewBox="0 0 18 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 27.5C8 18.8849 3.9179 10.593 1.18871 6.75643C0.720983 6.09892 1.09415 5.11677 1.899 5.05921C11.4724 4.37455 16.5905 9.79314 18 12.7688C14.5 21.2688 8 37.5 8 27.5Z"
              fill="#414650"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

// ButtonArea 컴포넌트
interface ButtonAreaProps {
  children?: ReactNode;
  className?: string;
}

export const ButtonArea = ({ children, className }: ButtonAreaProps) => {
  return (
    <div
      className={cn(
        "flex w-full justify-center gap-2 [&>_button]:flex-1",
        className
      )}
    >
      {children}
    </div>
  );
};
