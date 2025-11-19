import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/uiux";
import { Typo } from "@/components/contents";

const StepComponent = () => {
  return (
    <div className="mt-8 space-y-8">
      {/* Box Style Accordion */}
      <div>
        <div className="mb-4">
          <Typo tag="h3" style="heading-m">
            Box Style 아코디언
          </Typo>
        </div>
        <Accordion
          accostyle="box"
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>대출 목적 확인</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Our flagship product combines cutting-edge technology with sleek
                design. Built with premium materials, it offers unparalleled
                performance and reliability.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Shipping Details</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                We offer worldwide shipping through trusted courier partners.
                Standard delivery takes 3-5 business days.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Line Style Accordion */}
      <div>
        <div className="mb-4">
          <Typo tag="h3" style="heading-m">
            Line Style 아코디언
          </Typo>
        </div>
        <Accordion
          accostyle="line"
          type="single"
          collapsible
          className="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>결제 방법</AccordionTrigger>
            <AccordionContent>
              신용카드, 체크카드, 계좌이체, 휴대폰 결제 등 다양한 결제 수단을
              지원합니다.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>환불 정책</AccordionTrigger>
            <AccordionContent>
              구매 후 7일 이내 100% 환불 가능합니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Minimal Style Accordion */}
      <div>
        <div className="mb-4">
          <Typo tag="h3" style="heading-m">
            Minimal Style 아코디언
          </Typo>
        </div>
        <Accordion
          accostyle="minimal"
          type="single"
          collapsible
          className="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>자주 묻는 질문</AccordionTrigger>
            <AccordionContent>
              고객센터 운영시간은 평일 09:00~18:00입니다.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>연락처</AccordionTrigger>
            <AccordionContent>
              전화: 1588-1234, 이메일: support@example.com
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Default Style Accordion */}
      <div>
        <div className="mb-4">
          <Typo tag="h3" style="heading-m">
            Default Style 아코디언
          </Typo>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>기본 스타일</AccordionTrigger>
            <AccordionContent>
              accostyle을 지정하지 않으면 기본 스타일이 적용됩니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default StepComponent;
