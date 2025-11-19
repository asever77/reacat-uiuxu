import { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
