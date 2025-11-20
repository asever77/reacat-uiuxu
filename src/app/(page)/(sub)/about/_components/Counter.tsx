"use client"; // 훅을 사용하므로 클라이언트 컴포넌트여야 함

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { increment, decrement } from "@/stores/slices/counterSlice";
import { fetchUserById } from "@/stores/slices/userSlice";

export default function Counter() {
  // State 읽기
  const count = useAppSelector((state) => state.counter.value);
  // Action 실행 도구 가져오기
  const dispatch = useAppDispatch();

  const { entity, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserById("1"));
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center p-10 gap-4">
      <h1 className="text-2xl font-bold">Next 16 + RTK Example</h1>
      <div className="text-4xl font-mono">{count}</div>
      <div className="flex gap-2">
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          감소 -
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          증가 +
        </button>
      </div>
    </div>
  );
}
