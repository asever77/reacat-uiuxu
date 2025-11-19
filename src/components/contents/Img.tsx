import Image from "next/image";
import { cn } from "@/lib/utils";

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
