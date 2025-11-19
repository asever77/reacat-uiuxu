"use client";

// ⚠️ CUSTOM MODIFIED VERSION - DO NOT OVERWRITE
// 이 파일은 커스텀 accostyle prop이 추가된 버전입니다.
// shadcn/ui 업데이트 시 주의하세요!
//
// 수정 내역:
// 1. AccordionStyle 타입 추가
// 2. AccordionContext 추가
// 3. accostyle prop 추가
// 4. 각 컴포넌트에 스타일 분기 로직 추가
//
// 수정일: 2025-11-18
// 작성자: [jo]

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type AccordionStyle = "default" | "box" | "line" | "minimal";

const AccordionContext = React.createContext<AccordionStyle>("default");

interface AccordionProps {
  accostyle?: AccordionStyle;
}

function Accordion({
  accostyle = "default",
  className,
  ...props
}: AccordionProps & React.ComponentProps<typeof AccordionPrimitive.Root>) {
  const accordionStyles = {
    default: "",
    box: "bg-gray-50 rounded-lg p-2 border",
    line: "border-l-2 border-blue-500 pl-4",
    minimal: "space-y-1",
  };

  return (
    <AccordionContext.Provider value={accostyle}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        className={cn(accordionStyles[accostyle], className)}
        {...props}
      />
    </AccordionContext.Provider>
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const accostyle = React.useContext(AccordionContext);

  const itemStyles = {
    default: "border-b last:border-b-0",
    box: "bg-white rounded-md mb-2 border shadow-sm overflow-hidden",
    line: "border-b-2 border-gray-200 last:border-b-0 py-2",
    minimal: "py-1",
  };

  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(itemStyles[accostyle], className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  const accostyle = React.useContext(AccordionContext);

  const triggerStyles = {
    default:
      "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
    box: "flex flex-1 items-center justify-between gap-4 p-4 text-left font-medium transition-all hover:bg-gray-50 [&[data-state=open]>svg]:rotate-180",
    line: "flex flex-1 items-center justify-between gap-4 py-3 text-left font-semibold text-blue-600 transition-all hover:text-blue-800 [&[data-state=open]>svg]:rotate-180",
    minimal:
      "flex flex-1 items-center justify-between gap-4 py-2 text-left font-medium transition-all hover:text-gray-600 [&[data-state=open]>svg]:rotate-180",
  };

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(triggerStyles[accostyle], className)}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const accostyle = React.useContext(AccordionContext);

  const contentStyles = {
    default: "pt-0 pb-4",
    box: "px-4 pb-4 pt-0 text-gray-600",
    line: "pt-0 pb-3 pl-4 text-gray-700",
    minimal: "pt-0 pb-2 text-sm text-gray-600",
  };

  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn(contentStyles[accostyle], className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
