// 📂 components/FadeOutTransition.tsx
"use client";

import { useState, useEffect, ReactNode, useRef } from "react";

interface FadeOutTransitionProps {
  children: ReactNode;
  fallback: ReactNode;
  /**
   * 로딩 완료 감지 지연 시간 (ms)
   * children이 렌더링된 후 얼마나 기다릴지 설정
   * @default 100
   */
  detectionDelay?: number;
  /**
   * Fade 애니메이션 지속 시간 (ms)
   * @default 500
   */
  fadeDuration?: number;
}

/**
 * 로딩 UI에서 최종 콘텐츠로 부드럽게 전환하는 컴포넌트
 * - children이 실제로 렌더링 완료되면 자동으로 fade-out 시작
 * - Intersection Observer로 콘텐츠 로딩 완료 감지
 *
 * @param children - 로딩 완료된 최종 콘텐츠
 * @param fallback - 로딩 중 표시될 UI (스피너 또는 스켈레톤)
 * @param detectionDelay - 로딩 완료 감지 지연 시간
 * @param fadeDuration - Fade 애니메이션 지속 시간
 */
export default function FadeOutTransition({
  children,
  fallback,
  detectionDelay = 100,
  fadeDuration = 500,
}: FadeOutTransitionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // children이 실제로 DOM에 렌더링되었는지 감지
  useEffect(() => {
    if (!contentRef.current) return;

    // Intersection Observer로 콘텐츠가 화면에 표시되는지 확인
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            // 콘텐츠가 화면에 나타나면 로딩 완료로 간주
            setTimeout(() => {
              setIsLoaded(true);
              // Fade-out 애니메이션 시작
              setTimeout(() => {
                setIsFadingOut(true);
              }, detectionDelay);
            }, 50);
          }
        });
      },
      {
        threshold: 0.1, // 10%만 보여도 감지
      }
    );

    observer.observe(contentRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoaded, detectionDelay]);

  // 폴백으로 children이 없는 경우 감지
  useEffect(() => {
    if (children && !isLoaded) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
        setTimeout(() => {
          setIsFadingOut(true);
        }, detectionDelay);
      }, 100);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [children, isLoaded, detectionDelay]);

  return (
    <div className="relative min-h-screen">
      {/* 로딩 UI - Fade-out */}
      <div
        className="absolute inset-0 transition-opacity z-10"
        style={{
          opacity: isFadingOut ? 0 : 1,
          transitionDuration: `${fadeDuration}ms`,
          pointerEvents: isFadingOut ? "none" : "auto",
        }}
      >
        {fallback}
      </div>

      {/* 최종 콘텐츠 - Fade-in */}
      <div
        ref={contentRef}
        className="relative transition-opacity"
        style={{
          opacity: isFadingOut ? 1 : 0,
          transitionDuration: `${fadeDuration}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
