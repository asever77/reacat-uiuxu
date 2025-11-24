"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeInWrapperProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

/**
 * Framer Motion을 사용한 Fade-In 애니메이션
 * - 더 부드러운 애니메이션
 * - 더 나은 성능
 * - 더 많은 제어 옵션
 */
export default function FadeInWrapper({
  children,
  duration = 0.5,
  delay = 0,
  className = "",
}: FadeInWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
