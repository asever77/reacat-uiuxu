import { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
