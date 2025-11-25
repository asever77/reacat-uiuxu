import type { Meta, StoryObj } from "@storybook/nextjs-vite";
//Meta는 컴포넌트 전체의 설명 정보(제목, 설명 등)
//StoryObj는 개별 스토리(예: '기본 아코디언', 'FAQ 형태')의 정보
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/uiux/accordion";

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
