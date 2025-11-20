"use client";

import { useMemo } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/stores";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // React 18+ 호환: useMemo를 사용하여 스토어를 한 번만 생성
  // 렌더링 중 ref 접근을 피하고 안전하게 스토어 초기화
  const store = useMemo(() => makeStore(), []);

  return <Provider store={store}>{children}</Provider>;
}
