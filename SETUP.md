# 🚀 프론트엔드 개발 환경 설치 가이드 (Next.js & pnpm)

Node.js 24 LTS 버전 확인

```bash
node -v
```

## 1. pnpm 설치

pnpm은 효율적인 패키지 관리와 디스크 공간 절약을 위해 사용됩니다.

```bash
npm install -g pnpm
```

## 2. 새 프로젝트 생성

최신 Next.js 프로젝트를 TypeScript, ESLint, Tailwind CSS와 함께 생성합니다

```bash
pnpm create next-app@latest my-project-1
- TypeScript? yes
- ESLint? yes
- TailwindCSS? yes
- src/ directory? yes
- App Router? yes
- import alias (@/\*)? yes
```

## 3. pnpm 설정 최적화 (Peer Dependencies 관리)`

peer dependency 충돌을 유연하게 처리하고 자동 설치되도록 설정합니다.

```bash
# 필요한 peerDependencies를 자동으로 설치해 줍니다. (편의성 증가)
pnpm config set auto-install-peers true
# peerDependencies 버전 불일치 시에도 경고만 표시 (설치 안정성 향상)`
pnpm config set strict-peer-dependencies false
```

## 4. shadcn/ui 설치 및 초기화`

컴포넌트 개발에 필수적인 shadcn/ui를 설치하고 초기 환경을 설정합니다.

```bash
pnpm dlx shadcn@latest init
```

### 4.1 shadcn/ui 컴포넌트 개별설치(예시)

```bash
pnpm dlx shadcn@latest add accordion alert-dialog alert aspect-ratio avatar badge breadcrumb button-group button calendar card carousel chart checkbox collapsible command context-menu dialog drawer dropdown-menu empty field form hover-card input-group input-otp input item kbd label menubar native-select navigation-menu pagination popover progress radio-group resizable scroll-area select separator sheet sidebar skeleton slider sonner spinner switch table tabs textarea toggle-group toggle tooltip
```

## 5. Storybook 설치 및 설정

컴포넌트 시각화 및 테스트를 위한 Storybook 환경을 구축합니다.

```bash
# minimal 선택으로 개별 애드온 추가
pnpm dlx storybook@latest init
```

## 6. MSW(Mock Service Worker) 설치 및 설정

개발 환경에서 API 목킹(Mocking)을 통해 백엔드 없이 컴포넌트를 독립적으로 테스트합니다.

```bash
pnpm add msw --save-dev
# MSW와 Storybook 연동 애드온 설치
pnpm add msw msw-storybook-addon --save-dev
# public 디렉토리에 MSW 서비스 워커 파일 생성
pnpm msw init public/ --save
```

### 6.1. 목킹 핸들러 정의 (src/mocks/handlers.ts)

목킹할 API 엔드포인트와 응답 데이터를 정의합니다.

```tsx
import { http, HttpResponse } from "msw";

export const handlers = [
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
```

### 6.2. Storybook에 MSW 연동 (.storybook/preview.ts)

MSW를 Storybook에 초기화하고 모든 스토리에 핸들러를 로드합니다.

```tsx
import { initialize, mswLoader } from "msw-storybook-addon";
import { handlers } from "../src/mocks/handlers";
import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";

initialize();

const preview: Preview = {
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: handlers,
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
```

### 6.3. Storybook 설정 파일 업데이트 (.storybook/main.ts)

MSW 애드온을 등록하고 Next.js 환경 설정을 명시합니다.

```tsx
import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "msw-storybook-addon",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
  features: {
    experimentalRSC: true,
  },
};

export default config;
```

### 6.4. storybook pages 생성

🤖 AI Agent 요청  
🗨️ "page+layout 형식으로 width layout, page only, mobile with layout 3가지 패턴으로 생성"

- 1️⃣ With Layout
  - 실제 앱 경험
  - Header + Footer 포함
  - 완전한 사용자 경험
  - 디자인 리뷰용
  - QA 테스트용
- 2️⃣ Page Only
  - 개발/디버깅용
  - 페이지 컴포넌트만
  - 빠른 개발 피드백
  - 격리된 테스트
  - 컴포넌트 집중
- 3️⃣ Mobile With Layout
  - 반응형 테스트
  - 모바일 뷰포트
  - 완전한 모바일 UX
  - 터치 인터랙션
  - 반응형 검증

## 7. 스타일 설정 src/app/globals.css

피그마에서 plugins에서 Token Variable Export 설치하여
디자인토큰정보 생성하여
src/styles/tokens.css 파일 생성

```css
@import "tailwindcss";
@import "tw-animate-css"; //shadcn/ui에서 사용
@import "../styles/tokens.css"; //figma token style

html {
  font-size: 62.5%; /* 1rem = 10px */
}

@theme inline {
  --spacing: 0.4rem;
  --radius: 0.4rem;
}
```

### 7.1. spacing 0.1rem 설정

이 코드를 extend 섹션의 spacing 안에 추가하면, 이제부터 프로젝트 전체에서 left-1, p-1, m-1, w-1 등의 모든 유틸리티 클래스가 **$0.1\text{rem}$**으로 변환됩니다.

```ts
// tailwind.config.ts

/** @type {import('tailwindcss').Config} */
const config = {
  // content 설정은 그대로 유지
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // 💡 theme.spacing을 직접 정의하여 기본 스케일 전체를 덮어씁니다.
    spacing: {
      "0": "0",
      "0.5": "calc(var(--spacing) * 0.5)", // 0.2rem
      "1": "var(--spacing)", // 0.4rem - base unit
      "1.5": "calc(var(--spacing) * 1.5)", // 0.6rem
      "2": "calc(var(--spacing) * 2)", // 0.8rem
      "2.5": "calc(var(--spacing) * 2.5)", // 1rem
      "3": "calc(var(--spacing) * 3)", // 1.2rem
      "3.5": "calc(var(--spacing) * 3.5)", // 1.4rem
      "4": "calc(var(--spacing) * 4)", // 1.6rem
      "5": "calc(var(--spacing) * 5)", // 2rem
      "6": "calc(var(--spacing) * 6)", // 2.4rem
      "7": "calc(var(--spacing) * 7)", // 2.8rem
      "8": "calc(var(--spacing) * 8)", // 3.2rem
      "9": "calc(var(--spacing) * 9)", // 3.6rem
      "10": "calc(var(--spacing) * 10)", // 4rem
      "11": "calc(var(--spacing) * 11)", // 4.4rem
      "12": "calc(var(--spacing) * 12)", // 4.8rem
      "14": "calc(var(--spacing) * 14)", // 5.6rem
      "16": "calc(var(--spacing) * 16)", // 6.4rem
      "20": "calc(var(--spacing) * 20)", // 8rem
      "24": "calc(var(--spacing) * 24)", // 9.6rem
      px: "1px", // 1px 단위는 보통 그대로 유지합니다.
    },
    fontSize: {
      xs: "calc(var(--spacing) * 3)", // 12px (0.4rem * 3)
      sm: "calc(var(--spacing) * 3.5)", // 14px (0.4rem * 3.5)
      base: "calc(var(--spacing) * 4)", // 16px (0.4rem * 4)
      lg: "calc(var(--spacing) * 4.5)", // 18px (0.4rem * 4.5)
      xl: "calc(var(--spacing) * 5)", // 20px (0.4rem * 5)
      "2xl": "calc(var(--spacing) * 6)", // 24px (0.4rem * 6)
      "3xl": "calc(var(--spacing) * 7.5)", // 30px (0.4rem * 7.5)
      "4xl": "calc(var(--spacing) * 9)", // 36px (0.4rem * 9)
      "5xl": "calc(var(--spacing) * 12)", // 48px (0.4rem * 12)
      "6xl": "calc(var(--spacing) * 15)", // 60px (0.4rem * 15)
      "7xl": "calc(var(--spacing) * 18)", // 72px (0.4rem * 18)
      "8xl": "calc(var(--spacing) * 24)", // 96px (0.4rem * 24)
      "9xl": "calc(var(--spacing) * 32)", // 128px (0.4rem * 32)
    },
    borderRadius: {
      none: "0",
      sm: "calc(var(--radius) * 0.5)", // --radius의 0.5배
      DEFAULT: "var(--radius)", // 기본 radius 값
      md: "calc(var(--radius) * 1.5)", // --radius의 1.5배
      lg: "calc(var(--radius) * 2)", // --radius의 2배
      xl: "calc(var(--radius) * 3)", // --radius의 3배
      "2xl": "calc(var(--radius) * 4)", // --radius의 4배
      "3xl": "calc(var(--radius) * 6)", // --radius의 6배
      full: "9999px",
    },
    borderWidth: {
      "0": "0px",
      DEFAULT: "1px", // 1px - 최소 단위 유지
      "2": "var(--spacing)", // 4px (0.4rem × 1)
      "4": "calc(var(--spacing) * 2)", // 8px (0.4rem × 2)
      "6": "calc(var(--spacing) * 3)", // 12px (0.4rem × 3)
      "8": "calc(var(--spacing) * 4)", // 16px (0.4rem × 4)
    },
    lineHeight: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
      "3": "calc(var(--spacing) * 3)", // 12px (0.4rem × 3)
      "4": "calc(var(--spacing) * 4)", // 16px (0.4rem × 4)
      "5": "calc(var(--spacing) * 5)", // 20px (0.4rem × 5)
      "6": "calc(var(--spacing) * 6)", // 24px (0.4rem × 6)
      "7": "calc(var(--spacing) * 7)", // 28px (0.4rem × 7)
      "8": "calc(var(--spacing) * 8)", // 32px (0.4rem × 8)
      "9": "calc(var(--spacing) * 9)", // 36px (0.4rem × 9)
      "10": "calc(var(--spacing) * 10)", // 40px (0.4rem × 10)
    },
    letterSpacing: {
      tighter: "calc(var(--spacing) * -0.125)", // -0.05rem (-0.5px)
      tight: "calc(var(--spacing) * -0.0625)", // -0.025rem (-0.25px)
      normal: "0rem",
      wide: "calc(var(--spacing) * 0.0625)", // 0.025rem (0.25px)
      wider: "calc(var(--spacing) * 0.125)", // 0.05rem (0.5px)
      widest: "calc(var(--spacing) * 0.25)", // 0.1rem (1px)
    },
    extend: {
      // 다른 속성들은 여기에 추가할 수 있습니다.
    },
  },
  plugins: [],
};

export default config;
```

## 8. 테스트 src/stories/Accordion.stories.tsx

테스트용 스토리북 mock 서버와 연결 확인용

```tsx
import type { Meta, StoryObj } from "@storybook/nextjs";
//Meta는 컴포넌트 전체의 설명 정보(제목, 설명 등)
//StoryObj는 개별 스토리(예: '기본 아코디언', 'FAQ 형태')의 정보
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";

// Accordion 컴포넌트를 위한 래퍼 컴포넌트
const AccordionDemo = ({
  type = "single",
  collapsible = true,
  items = [],
}: {
  type?: "single" | "multiple";
  collapsible?: boolean;
  items?: Array<{ id: string; title: string; content: string }>;
}) => {
  // 완전한 해결방안: type에 따라 다르게 처리
  if (type === "single") {
    // single 타입일 때는 collapsible 속성이 필요
    return (
      <Accordion
        type="single"
        collapsible={collapsible || undefined} // false일 때 undefined로 변환
        className="w-full max-w-md"
      >
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  // multiple 타입일 때는 collapsible 속성이 불필요
  return (
    <Accordion type="multiple" className="w-full max-w-md">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

// 해결방안 2: undefined 사용 (false 대신 undefined)
const AccordionWithUndefined = ({
  type = "single",
  collapsible = true,
  items = [],
}: {
  type?: "single" | "multiple";
  collapsible?: boolean;
  items?: Array<{ id: string; title: string; content: string }>;
}) => {
  // 더 안전한 접근: 조건부 props 객체 생성
  const baseProps = {
    type,
    className: "w-full max-w-md" as const,
  };

  // type이 "single"이고 collapsible이 true일 때만 collapsible 속성 추가
  const accordionProps =
    type === "single" && collapsible
      ? { ...baseProps, collapsible: true }
      : baseProps;

  return (
    <Accordion {...accordionProps}>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

//전체 메타데이터 설정
const meta: Meta<typeof AccordionDemo> = {
  title: "Components/UI/Accordion",
  component: AccordionDemo, //props를 분석해서 자동으로 테스트 컨트롤(knobs) 생성
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix UI 기반의 접을 수 있는 아코디언 컴포넌트입니다. MSW로 API 데이터를 모킹하여 테스트할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      options: ["single", "multiple"],
      description:
        "한 번에 하나만 열리거나(single) 여러개가 동시에 열릴 수 있습니다(multiple)",
    },
    collapsible: {
      control: "boolean",
      description: "열린 아이템을 다시 닫을 수 있는지 여부",
    },
    items: {
      control: "object",
      description: "아코디언에 표시할 아이템들",
    },
  },
} satisfies Meta<typeof AccordionDemo>;
export default meta;

// 스토리 타입 정의 ------------------------------
type Story = StoryObj<typeof meta>;

// 기본 아코디언
export const Default: Story = {
  args: {
    type: "single",
    collapsible: true,
    items: [
      {
        id: "item-1",
        title: "React란 무엇인가요?",
        content:
          "React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다. 컴포넌트 기반 아키텍처를 통해 재사용 가능한 UI 요소를 만들 수 있습니다.",
      },
      {
        id: "item-2",
        title: "Storybook이란?",
        content:
          "Storybook은 UI 컴포넌트를 격리된 환경에서 개발하고 테스트할 수 있는 도구입니다. 컴포넌트의 다양한 상태를 시각적으로 확인할 수 있습니다.",
      },
      {
        id: "item-3",
        title: "MSW로 API 모킹하기",
        content:
          "Mock Service Worker(MSW)를 사용하면 실제 API 없이도 개발과 테스트를 진행할 수 있습니다. 네트워크 레벨에서 요청을 가로채어 모킹된 응답을 제공합니다.",
      },
    ],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/example/accordion-design",
      name: "Accordion Design System",
    },
  },
};

// 여러 개 동시 열기 가능
export const Multiple: Story = {
  args: {
    type: "multiple",
    collapsible: true,
    items: [
      {
        id: "frontend",
        title: "프론트엔드 기술",
        content:
          "HTML, CSS, JavaScript, React, Vue.js, Angular 등의 기술들을 사용하여 사용자가 직접 상호작용하는 웹 인터페이스를 개발합니다.",
      },
      {
        id: "backend",
        title: "백엔드 기술",
        content:
          "Node.js, Python, Java, .NET 등을 사용하여 서버 로직, 데이터베이스 연동, API 개발을 담당합니다.",
      },
      {
        id: "devops",
        title: "DevOps",
        content:
          "Docker, Kubernetes, CI/CD 파이프라인, 클라우드 서비스 등을 활용하여 개발과 운영을 자동화합니다.",
      },
      {
        id: "design",
        title: "UI/UX 디자인",
        content:
          "Figma, Sketch, Adobe XD 등의 도구를 사용하여 사용자 경험을 고려한 인터페이스를 설계합니다.",
      },
    ],
  },
};

// 해결방안 데모: undefined 사용
export const BooleanPropFixed: Story = {
  render: () => (
    <AccordionWithUndefined
      type="single"
      collapsible={true}
      items={[
        {
          id: "solution-1",
          title: "해결방안 1: 조건부 속성 전달",
          content:
            "collapsible이 true일 때만 속성을 전달하고, false일 때는 속성을 제거합니다. 이는 가장 깔끔한 해결방안입니다.",
        },
        {
          id: "solution-2",
          title: "해결방안 2: undefined 사용",
          content:
            "false 대신 undefined를 사용합니다. React는 undefined 속성을 DOM에 렌더링하지 않습니다.",
        },
        {
          id: "solution-3",
          title: "해결방안 3: 컴포넌트 래퍼",
          content:
            "내부적으로 boolean 값을 적절히 처리하는 래퍼 컴포넌트를 만듭니다.",
        },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "React에서 boolean 속성 경고를 해결하는 다양한 방법들을 보여주는 예제입니다.",
      },
    },
  },
};

// API 데이터로 아코디언 만들기를 위한 컴포넌트
const AccordionWithAPI = () => {
  const [faqs, setFaqs] = useState<
    Array<{ id: string; title: string; content: string }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // MSW로 모킹된 API 호출
    fetch("/api/faqs")
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback 데이터
        setFaqs([
          {
            id: "faq-1",
            title: "MSW는 어떻게 작동하나요?",
            content:
              "MSW는 Service Worker API를 사용하여 브라우저에서 네트워크 요청을 가로채고 모킹된 응답을 제공합니다.",
          },
          {
            id: "faq-2",
            title: "Storybook에서 MSW를 어떻게 사용하나요?",
            content:
              "msw-storybook-addon을 사용하여 Storybook에서 MSW를 쉽게 설정할 수 있습니다.",
          },
        ]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-md">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full max-w-md">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger>{faq.title}</AccordionTrigger>
          <AccordionContent>{faq.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

// API 데이터로 아코디언 만들기 (MSW 사용)
export const WithAPIData: Story = {
  render: () => <AccordionWithAPI />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/example/dynamic-accordion",
      name: "Dynamic Data Accordion",
    },
    docs: {
      description: {
        story:
          "MSW를 사용하여 API에서 FAQ 데이터를 가져와 아코디언으로 표시하는 예제입니다.",
      },
    },
  },
};

// 간단한 FAQ 형태
export const FAQ: Story = {
  args: {
    type: "single",
    collapsible: true,
    items: [
      {
        id: "shipping",
        title: "배송은 얼마나 걸리나요?",
        content:
          "일반적으로 주문 후 2-3일 내에 배송됩니다. 도서 지역의 경우 1-2일 추가로 소요될 수 있습니다.",
      },
      {
        id: "return",
        title: "반품이 가능한가요?",
        content:
          "상품 수령 후 7일 이내에 반품 신청이 가능합니다. 단, 상품의 상태가 양호해야 하며 포장이 훼손되지 않아야 합니다.",
      },
      {
        id: "payment",
        title: "어떤 결제 방법을 지원하나요?",
        content:
          "신용카드, 체크카드, 계좌이체, 무통장입금, 카카오페이, 네이버페이 등 다양한 결제 방법을 지원합니다.",
      },
      {
        id: "membership",
        title: "회원가입 혜택이 있나요?",
        content:
          "회원가입 시 즉시 사용 가능한 5% 할인 쿠폰을 드리며, 구매 금액에 따른 적립금 혜택도 제공합니다.",
      },
    ],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Jzno3mH9itRYkpqP2qYWzd/KRDS_v1.0.0--Community-?node-id=5153-118258&m=dev",
      name: "FAQ Accordion Design",
    },
  },
};
```

## 9. 웹폰트 설정 (Pretendard)

```bash
pnpm i pretendard
```

Next.js 권장 방식

- Next.js 폰트 최적화 활용 (자동 preload, 폰트 swap 등)
- 타입 안전성 (TypeScript 지원)
- 성능 최적화 (폰트 로딩 최적화)
- 유연성 (조건부 폰트 적용 가능)

## 9.1. src/app/layout.tsx

```tsx
import localFont from "next/font/local";

const pretendard = localFont({
  src: [
    {
      path: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

<body className={`${pretendard.variable} antialiased`}>
```

## 9.2. src/app/globals.css

````css
@layer base {
  body {
    font-family: var(--font-pretendard), -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  }
}```

````

## 10. App Router

- Route Groups (() 괄호 사용) - 폴더명 무시
  - 라우팅 시스템에 포함되지만 URL 경로에서 제외
  - 페이지 조직화를 위한 논리적 그룹핑
  - 그룹 내부의 page.tsx는 여전히 접근 가능
- Dynamic Routes ([] 대괄호 사용)
  - 라우팅 시스템에서 완전히 제외
  - 내부 파일들은 URL로 절대 접근 불가
  - 컴포넌트, 유틸리티 등 내부 코드 저장용
- Private Folders (\_)
  - 주로 page.tsx에서 사용
  - 목적: 내부 파일 조직화
  - 특징: URL 접근 불가
  - 사용 사례: 컴포넌트, 유틸리티, 스타일
- Parallel Routes (@)
  - 주로 layout.tsx에서 사용
  - 목적: 동시에 여러 컨텐츠 렌더링
  - 특징: 같은 레이아웃에서 병렬 처리
  - 사용 사례: 모달, 사이드바, 대시보드

deep link 지원  
(.)  
/dashboard/(.)detail/123 ->  
최종 URL: /dashboard/detail/123

(..)  
/settings/profile/(..)billing ->  
최종 URL: /settings/billing

두 표기법은 **"가로채기가 실패했을 때 이동할 최종 경로"**를 지정해 줍니다.

## 11. "use client" 사용

### 필요한 경우

1. 상태 관리 (useState, useReducer)
2. 이벤트 핸들러 (onClick, onChange 등)
3. 브라우저 전용 API (localStorage, window 등)
4. useEffect, useLayoutEffect
5. 외부 라이브러리 (브라우저 전용)

### 불필요한 경우

1. 정적 콘텐츠만 렌더링
2. 서버 데이터 페칭 (async/await)
3. 단순 prop 전달

### 서버 컴포넌트 장점

- 빠른 초기 로드 - 서버에서 미리 렌더링
- SEO 친화적 - 검색엔진이 콘텐츠를 바로 읽을 수 있음
- 보안성 - API 키 등 민감한 정보를 서버에서만 처리
- 번들 크기 감소 - 브라우저로 전송되는 JavaScript 코드 감소

🔴 현재 방식 (전체 클라이언트):
서버 → 브라우저: 빈 HTML + 모든 JavaScript
브라우저: JavaScript 실행 → 전체 렌더링
SEO: 검색엔진이 빈 페이지만 봄

🟢 개선된 방식 (하이브리드):
서버 → 브라우저: 완성된 HTML + 필요한 JavaScript만
브라우저: 일부만 hydration
SEO: 검색엔진이 완전한 콘텐츠를 봄

```
app/about/
├── _components/
│   ├── AboutHeader.tsx           # 서버 컴포넌트
│   └── InteractiveAccordion.tsx  # 클라이언트 컴포넌트
├── _data/
│   └── accordionData.ts          # 정적 데이터
└── page.tsx                      # 서버 컴포넌트 (메인)

```

## 12. tsconfig.json 타입스크립트 관련 설정

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "noUncheckedIndexedAccess": true, // 배열/객체 접근 시 undefined 체크 강제
    "noImplicitReturns": true, // 모든 코드 경로에서 return 강제
    "noFallthroughCasesInSwitch": true, // switch문 fallthrough 방지
    "exactOptionalPropertyTypes": true // 선택적 속성의 정확한 타입 체크
  },
  "paths": {
    "@/*": ["src/*"],
    "@/components/*": ["src/components/*"],
    "@/lib/*": ["src/lib/*"],
    "@/hooks/*": ["src/hooks/*"],
    "@/mocks/*": ["src/mocks/*"],
    "@/stories/*": ["src/stories/*"],
    "@/styles/*": ["src/styles/*"],
    "@/types/*": ["src/types/*"], // ✅ 타입 정의용
    "@/utils/*": ["src/utils/*"] // ✅ 유틸리티용
  }
}
```

## 13. 모달의 구조와 위치

- URL 연동 필요 > @modal (Parallel Routes) : URL 상태 관리, 뒤로가기 지원
  - full 페이지 모달
- 복잡 + 페이지전용 > \_components/modals/ : 독립성, 코로케이션
  - 페이지내에서 사용하는 복잡한 구조의 모달
- 간단 + 전역사용 > providers/ : 일관성, 편의성
  - alert주로 사용 (page에서 내용전달)
- 복잡 + 여러 페이지 > components/modals/ : 재사용성
  - 여러 페이지에서 사용하는 모달

## 14. 디렉토리 구조

app router에서는 layout.tsx는 상속이 되는 구조   
```
📂.storybook
│  ├──📄main.ts
│  ├──📄preview.ts
│  └──📄vitest.setup.ts
📂public
│  ├──📂images
│  └──📄mockServiceWorker.js
📂src
├──📂app
│  ├──📂(error)
│  │  ├──📄error.tsx
│  │  ├──📄layout.tsx  # Root > error Layout
│  │  └──📄not-found.tsx  # 404 페이지
│  │
│  ├──📂(page)
│  │  ├──📄layout.tsx  # Root > page Layout
│  │  ├──📂(main)
│  │  │  ├──📄layout.tsx  # Root > page > main Layout
│  │  │  └──📄page.tsx
│  │  │
│  │  ├──📂(sub1)
│  │  │  ├──📂sub1-1
│  │  │  │  ├──📂_components
│  │  │  │  │  ├──📄InteractiveButton.tsx
│  │  │  │  │  └──📄InnerComponent.tsx
│  │  │  │  ├──📂@modal
│  │  │  │  │  ├──📂modal-name1
│  │  │  │  │  │  └──📄page.tsx
│  │  │  │  │  ├──📂modal-name2
│  │  │  │  │  │  └──📄page.tsx
│  │  │  │  │  └──📄default.tsx  # @modal 안의 페이지가 없는 경우 설정
│  │  │  │  ├──📄layout.tsx  # Root > page > sub1-1 Layout
│  │  │  │  └──📄page.tsx
│  │  │  │ 
│  │  │  └──📂(sub1-2)
│  │  ├──📂(sub2)
│  │  │  ├──📂(sub2-1)
│  │  │  └──📂(sub2-2)
│  │  └──📂(sub3)
│  │
│  ├──⭐favicon.tsx
│  ├──🎨globals.css    
│  └──📄layout.tsx  # Root Layout
│
├──📂components  # 공통 컴포넌트
│  ├──📂contents
│  │  └──📄PageContent.tsx  # 컨텐츠 컴포넌트
│  ├──📂icons
│  │  ├──📄CommonIcons.tsx  # SVG 아이콘 컴포넌트
│  │  └──📄index.ts  # 배럴 파일
│  ├──📂layout
│  │  ├──📄Footer.tsx
│  │  └──📄Header.tsx
│  ├──📂ui  # shadcn 설치된 파일 최종 사용 안함
│  └──📂uiux  # shadcn 수정한 파일로 최종 사용 할 컴포넌트
├──📂mocks  # mock 데이터
│  ├──📄userHandlers.ts
│  └──📄index.ts  # 배럴 파일
└──📂stories  # stroybook 페이지
```