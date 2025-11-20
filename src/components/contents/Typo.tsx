import { ReactNode, createElement } from "react";
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
  className?: string;
}

export const Typo = ({
  tag = "p",
  style = "heading-xl",
  children,
  className,
}: TypoProps) => {
  const getStyleClass = (style: TypoStyle) => {
    switch (style) {
      case "display-l":
        return "block text-6xl font-bold leading-tight tracking-tight";
      case "display-m":
        return "block text-5xl font-bold leading-tight tracking-tight";
      case "display-s":
        return "block text-4xl font-bold leading-tight tracking-tight";
      case "heading-xl":
        return "block text-3xl font-semibold leading-tight tracking-tight";
      case "heading-l":
        return "block text-2xl font-semibold leading-snug tracking-tight";
      case "heading-m":
        return "block text-xl font-medium leading-snug tracking-normal";
      case "heading-s":
        return "block text-lg font-medium leading-normal tracking-normal";
      case "heading-xs":
        return "block text-base font-medium leading-normal tracking-wide";
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

  return createElement(
    tag,
    { className: cn(getStyleClass(style), className) },
    children
  );
};
