import { http, HttpResponse } from "msw";

export const authHandlers = [
  // 회원가입 API
  http.post("/api/auth/register", async ({ request }) => {
    const body = await request.json();
    const { email, password, name } = body as {
      email: string;
      password: string;
      name: string;
    };

    // 입력 데이터 검증
    if (!email || !password || !name) {
      return HttpResponse.json(
        { error: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return HttpResponse.json(
        { error: "올바른 이메일 형식이 아닙니다." },
        { status: 400 }
      );
    }

    // 비밀번호 강도 검증
    if (password.length < 8) {
      return HttpResponse.json(
        { error: "비밀번호는 8자 이상이어야 합니다." },
        { status: 400 }
      );
    }

    // 이미 존재하는 이메일 체크 (모킹)
    const existingUsers = [
      "existing@example.com",
      "test@existing.com",
      "admin@example.com",
    ];
    if (existingUsers.includes(email)) {
      return HttpResponse.json(
        { error: "이미 가입된 이메일입니다." },
        { status: 409 }
      );
    }

    // 회원가입 성공 응답
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      createdAt: new Date().toISOString(),
    };

    console.log("[MSW] 회원가입 성공:", { email, name });

    return HttpResponse.json(
      {
        success: true,
        message: "회원가입이 완료되었습니다.",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
      },
      { status: 201 }
    );
  }),

  // 로그인 API (추가 예시)
  http.post("/api/auth/login", async ({ request }) => {
    const body = await request.json();
    const { email, password } = body as { email: string; password: string };

    // 테스트 계정
    const testUsers = [
      {
        email: "test@example.com",
        password: "password123",
        name: "테스트 유저",
      },
      { email: "admin@example.com", password: "admin123", name: "관리자" },
    ];

    const user = testUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return HttpResponse.json(
        { error: "이메일 또는 비밀번호가 잘못되었습니다." },
        { status: 401 }
      );
    }

    return HttpResponse.json(
      {
        success: true,
        message: "로그인 성공",
        user: {
          id: Math.random().toString(36).substr(2, 9),
          email: user.email,
          name: user.name,
        },
        token: "mock-jwt-token",
      },
      { status: 200 }
    );
  }),
];
