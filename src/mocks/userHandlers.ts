import { http, HttpResponse } from "msw";

export const userHandlers = [
  // 개별 포스트 API
  http.get("/api/posts/:id", ({ params }) => {
    const postId = parseInt(params.id as string);
    const posts = [
      {
        id: 1,
        title: "React와 Storybook 활용하기",
        content:
          "React 컴포넌트를 Storybook으로 개발하고 테스트하는 방법에 대해 알아봅시다. Storybook은 컴포넌트 주도 개발을 위한 훌륭한 도구입니다.",
        author: "John Doe",
        createdAt: "2024-11-01T10:00:00Z",
        likes: 15,
        comments: 3,
      },
      {
        id: 2,
        title: "MSW로 API 모킹하기",
        content:
          "Mock Service Worker를 사용해서 API를 모킹하는 효과적인 방법을 소개합니다. 개발 중에 실제 API가 준비되지 않았을 때 매우 유용합니다.",
        author: "Jane Smith",
        createdAt: "2024-11-02T14:30:00Z",
        likes: 23,
        comments: 7,
      },
    ];

    const post = posts.find((p) => p.id === postId);
    if (post) {
      return HttpResponse.json(post);
    }
    return new HttpResponse(null, { status: 404 });
  }),

  // FAQ API
  http.get("/api/faqs", () => {
    return HttpResponse.json([
      {
        id: "faq-1",
        title: "MSW는 어떻게 작동하나요?",
        content:
          "MSW(Mock Service Worker)는 Service Worker API를 사용하여 브라우저에서 네트워크 요청을 가로채고 모킹된 응답을 제공합니다. 실제 API 서버 없이도 개발과 테스트를 진행할 수 있어 매우 유용합니다.",
      },
      {
        id: "faq-2",
        title: "Storybook에서 MSW를 어떻게 사용하나요?",
        content:
          "msw-storybook-addon을 사용하여 Storybook에서 MSW를 쉽게 설정할 수 있습니다. preview.ts에서 initialize()를 호출하고 handlers를 등록하면 됩니다.",
      },
      {
        id: "faq-3",
        title: "Accordion 컴포넌트는 어떻게 사용하나요?",
        content:
          "Radix UI 기반의 Accordion 컴포넌트는 접을 수 있는 콘텐츠 영역을 제공합니다. single 또는 multiple 타입으로 설정할 수 있으며, collapsible 속성으로 다시 닫을 수 있는지 제어할 수 있습니다.",
      },
      {
        id: "faq-4",
        title: "API 데이터를 어떻게 아코디언에 표시하나요?",
        content:
          "useEffect와 useState를 사용하여 API에서 데이터를 가져온 후, map 함수로 AccordionItem들을 동적으로 생성할 수 있습니다. 로딩 상태와 에러 처리도 함께 구현하는 것이 좋습니다.",
      },
      {
        id: "faq-5",
        title: "Tailwind CSS 클래스는 어떻게 적용하나요?",
        content:
          "cn() 함수를 사용하여 기본 스타일과 커스텀 스타일을 조합할 수 있습니다. className prop을 통해 추가적인 스타일링도 가능합니다.",
      },
    ]);
  }),
];
