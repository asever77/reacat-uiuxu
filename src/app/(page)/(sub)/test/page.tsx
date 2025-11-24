"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchUserById } from "@/stores/slices/userSlice";
import { RootState, AppDispatch } from "@/stores";

export default function TestPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { entity, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const handleFetchUser = () => {
    dispatch(fetchUserById("1"));
  };

  return (
    <div className="p-4">
      <h1>Redux 데이터 지속성 테스트</h1>

      {/* 사용자 데이터 로드 */}
      <button
        onClick={handleFetchUser}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        사용자 데이터 로드
      </button>

      {/* SPA 라우팅으로 페이지 이동 */}
      <button
        onClick={() => router.push("/about")}
        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
      >
        About 페이지로 이동 (SPA)
      </button>

      {/* 전체 새로고침 */}
      <button
        onClick={() => (window.location.href = "/about")}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        About 페이지로 이동 (새로고침)
      </button>

      {/* 현재 상태 표시 */}
      <div className="mt-4">
        <h2>현재 Redux 상태:</h2>
        <p>Loading: {loading}</p>
        <p>Error: {error}</p>
        <p>User: {entity ? entity.name : "없음"}</p>
      </div>
    </div>
  );
}
