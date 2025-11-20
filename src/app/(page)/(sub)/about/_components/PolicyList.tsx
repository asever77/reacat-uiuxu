"use client";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectPolicy } from "@/stores/slices/insuranceSlice";

interface Policy {
  id: string;
  name: string;
  premium: number;
  coverage: number;
}

export default function PolicyList() {
  const dispatch = useAppDispatch();

  // 상태 읽기
  const { policies, loading, error, selectedPolicy } = useAppSelector(
    (state) => {
      console.log("전체 상태:", state);
      console.log("insurance 상태:", state.insurance);
      return state.insurance;
    }
  );

  const handlePolicySelect = (policy: Policy) => {
    dispatch(selectPolicy(policy));
  };

  if (loading) return <div className="p-4 text-center">로딩 중...</div>;
  if (error)
    return <div className="p-4 text-center text-red-600">에러: {error}</div>;

  // policies가 없거나 빈 배열인 경우 처리
  if (!policies || policies.length === 0) {
    return (
      <div className="bg-gray-50 p-4 text-center">보험 상품이 없습니다.</div>
    );
  }

  return (
    <div className="bg-gray-50 p-4">
      <h2 className="text-xl font-bold mb-4">보험 상품 목록</h2>

      {selectedPolicy && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          현재 선택된 정책: <strong>{selectedPolicy.name}</strong>
        </div>
      )}

      <div className="space-y-3">
        {policies.map((policy) => (
          <div
            key={policy.id}
            className={`p-4 rounded-lg shadow cursor-pointer transition-colors ${
              selectedPolicy?.id === policy.id
                ? "bg-blue-200 border-2 border-blue-500"
                : "bg-white hover:bg-gray-100 border border-gray-200"
            }`}
            onClick={() => handlePolicySelect(policy)}
          >
            <h3 className="font-semibold text-lg">{policy.name}</h3>
            <p className="text-blue-600 font-medium">
              보험료: {policy.premium.toLocaleString()}원/월
            </p>
            <p className="text-gray-600">
              보장금액: {policy.coverage.toLocaleString()}원
            </p>
            <p className="text-sm text-gray-500 mt-2">클릭하여 선택</p>
          </div>
        ))}
      </div>
    </div>
  );
}
