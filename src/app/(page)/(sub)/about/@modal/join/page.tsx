"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Checkbox,
} from "@/components/uiux";
import { ButtonArea } from "@/components/contents";

const joinFormSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요")
      .email("올바른 이메일 형식이 아닙니다"),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)/,
        "비밀번호는 영문과 숫자를 포함해야 합니다"
      ),
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요"),
    name: z
      .string()
      .min(2, "이름은 2자 이상이어야 합니다")
      .max(50, "이름은 50자 이하여야 합니다"),
    terms: z.boolean().refine((val) => val === true, {
      message: "서비스 이용약관에 동의해주세요",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다",
  });

type JoinFormValues = z.infer<typeof joinFormSchema>;

export default function JoinModal() {
  const router = useRouter();

  const form = useForm<JoinFormValues>({
    resolver: zodResolver(joinFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      terms: false,
    },
  });

  const onSubmit = async (values: JoinFormValues) => {
    try {
      console.log("회원가입 폼 제출:", values);

      // 실제 회원가입 API 호출
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          name: values.name,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("회원가입 성공:", result);

        // 성공 시 로그인 페이지나 환영 페이지로 이동
        router.push("/login?message=가입이 완료되었습니다");
      } else {
        const error = await response.json();
        console.error("회원가입 실패:", error);
        // 에러 처리 (토스트 메시지 등)
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      // 네트워크 에러 처리
    }
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* 이메일 필드 */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>이메일양식으로 입력</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 비밀번호 필드 */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="8자 이상, 영문과 숫자 포함"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    영문, 숫자를 포함하여 8자 이상 입력해주세요
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 비밀번호 확인 필드 */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="비밀번호를 다시 입력해주세요"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 이름 필드 */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="실제 이름을 입력해주세요"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 약관 동의 체크박스 */}
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-gray-600">
                      서비스 이용약관 및 개인정보 처리방침에 동의합니다
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="flex-col space-y-2">
              <ButtonArea direction="column">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "가입 중..." : "회원가입"}
                </Button>

                <div className="w-full text-center">
                  <span className="text-sm text-gray-600">
                    이미 계정이 있으신가요?{" "}
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto"
                      onClick={handleLoginClick}
                    >
                      로그인
                    </Button>
                  </span>
                </div>
              </ButtonArea>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
