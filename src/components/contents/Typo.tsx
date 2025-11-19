import { ReactNode, createElement } from "react";

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
