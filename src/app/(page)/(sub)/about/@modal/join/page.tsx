"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/uiux/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/uiux/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function JoinModal() {
  const router = useRouter();

  const handleClose = () => {
    router.back(); // 이전 페이지로 돌아감
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>회원가입</DialogTitle>
          <DialogDescription>
            새로운 계정을 생성하여 더 많은 기능을 이용해보세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" placeholder="example@email.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="8자 이상 입력해주세요"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              type="text"
              placeholder="실제 이름을 입력해주세요"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="rounded border-gray-300"
            />
            <Label htmlFor="terms" className="text-sm text-gray-600">
              서비스 이용약관 및 개인정보 처리방침에 동의합니다
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button className="w-full">회원가입</Button>
          <div className="w-full text-center mt-4">
            <span className="text-sm text-gray-600">
              이미 계정이 있으신가요?{" "}
              <Button variant="link" className="p-0 h-auto">
                로그인
              </Button>
            </span>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
