import { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ButtonArea 컴포넌트
interface ButtonAreaProps {
  children?: ReactNode;
  direction?: "row" | "column";
  className?: string;
}

export const ButtonArea = ({
  children,
  direction = "row",
  className,
}: ButtonAreaProps) => {
  return (
    <div
      className={cn(
        "flex w-full gap-2 *:flex-1",
        direction === "column" ? "flex-col" : "flex-row",
        className
      )}
    >
      {children}
    </div>
  );
};
