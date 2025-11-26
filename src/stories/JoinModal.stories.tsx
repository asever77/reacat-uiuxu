import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { http, HttpResponse } from "msw";
import JoinModal from "@/app/(page)/(sub)/about/@modal/join/page";
import React from "react";

const meta: Meta<typeof JoinModal> = {
  title: "Pages/Modal/JoinModal",
  component: JoinModal,
  parameters: {
    docs: {
      page: null,
    },
    layout: "fullscreen",
    msw: {
      handlers: [
        http.post("/api/auth/register", async ({ request }) => {
          const body = await request.json();
          const { email, name } = body as { email: string; name: string };

          console.log("📝 회원가입 요청 데이터:", { email, name });

          // 이메일 중복 체크
          if (email === "existing@example.com") {
            console.log("❌ 이메일 중복 오류");
            return HttpResponse.json(
              { error: "이미 가입된 이메일입니다." },
              { status: 409 }
            );
          }

          // 성공 응답
          console.log("✅ 회원가입 성공");
          return HttpResponse.json(
            {
              success: true,
              message: "회원가입이 완료되었습니다.",
              user: { id: "user_" + Date.now(), email, name },
            },
            { status: 201 }
          );
        }),
      ],
    },
    nextjs: {
      appDirectory: true,
      navigation: { pathname: "/about/join" },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  name: "기본 상태",
  parameters: {
    docs: {
      description: {
        story:
          "회원가입 모달의 기본 상태입니다. 모든 필드를 직접 입력하여 테스트해보세요.",
      },
    },
  },
};

// 성공 시나리오 안내
export const SuccessScenario: Story = {
  name: "✅ 성공 시나리오 테스트",
  parameters: {
    docs: {
      description: {
        story: `
### 성공 시나리오 테스트 방법:
1. 이메일: test@example.com (또는 아무 이메일)
2. 비밀번호: password123 (8자 이상, 영문+숫자)
3. 비밀번호 확인: password123 (동일하게 입력)
4. 이름: 홍길동 (2자 이상)
5. 약관 동의 체크
6. 회원가입 버튼 클릭
7. 개발자 도구 콘솔에서 성공 로그 확인
        `,
      },
    },
  },
};

// 이메일 중복 오류 시나리오
export const DuplicateEmailScenario: Story = {
  name: "❌ 이메일 중복 오류 테스트",
  parameters: {
    docs: {
      description: {
        story: `
### 중복 이메일 오류 테스트 방법:
1. 이메일: **existing@example.com** (특별히 이 이메일 사용)
2. 비밀번호: password123
3. 비밀번호 확인: password123
4. 이름: 홍길동
5. 약관 동의 체크
6. 회원가입 버튼 클릭
7. 409 오류 응답 확인
        `,
      },
    },
  },
};

// 유효성 검사 오류 시나리오
export const ValidationErrorScenario: Story = {
  name: "⚠️ 유효성 검사 오류 테스트",
  parameters: {
    docs: {
      description: {
        story: `
### 유효성 검사 오류 테스트 방법:
1. **잘못된 이메일**: invalid-email (@ 없이)
2. **짧은 비밀번호**: 123 (8자 미만)
3. **비밀번호 불일치**: 다른 비밀번호 입력
4. **짧은 이름**: a (2자 미만)
5. **약관 미동의**: 체크박스 선택 안함
6. 각 필드별로 실시간 에러 메시지 확인
        `,
      },
    },
  },
};
