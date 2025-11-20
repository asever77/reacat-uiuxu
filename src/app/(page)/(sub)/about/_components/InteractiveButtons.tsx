"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ButtonArea } from "@/components/contents";
import { Button } from "@/components/uiux";
import { SystemDialog } from "@/providers/SystemDialog";

export function BottomFixedButton() {
  const [showDialog, setShowDialog] = useState(false);

  const handleNextClick = () => {
    setShowDialog(true);
  };

  // callback functions for dialog actions
  const handleConfirm = () => {
    console.log("다음 페이지로 이동");
    // 실제 네비게이션 로직
    setShowDialog(false);
  };

  const handleCancel = () => {
    console.log("취소됨");
    setShowDialog(false);
  };

  return (
    <ButtonArea>
      <Button type="button" variant="outline">
        이전
      </Button>
      <Button type="button" variant="destructive" onClick={handleNextClick}>
        다음
      </Button>

      <SystemDialog
        title="페이지 이동 확인"
        description="다음 페이지로 이동하시겠습니까? 현재 작업 중인 내용이 저장되지 않을 수 있습니다."
        open={showDialog}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText="이동하기"
        cancelText="취소"
      />
    </ButtonArea>
  );
}

export function StepModalButton() {
  const router = useRouter();

  const handleJoinModalClick = () => {
    // URL 기반 모달로 이동
    router.push("/about/join");
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="mt-4"
      onClick={handleJoinModalClick}
    >
      Join 모달 열기
    </Button>
  );
}
