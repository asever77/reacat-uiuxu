import {
  Typo,
  StickyArea,
  FixedArea,
  Img,
  ChatBubble,
} from "@/components/contents";
import FadeOutTransition from "@/components/layout/FadeOutTransition";
import AboutLoading from "./loading";

import StepComponent from "./_components/Step";
import TestForm from "./_components/TestForm";
import Counter from "./_components/Counter";
import PolicyList from "./_components/PolicyList";
import PolicyForm from "./_components/PolicyForm";
import {
  BottomFixedButton,
  StepModalButton,
} from "./_components/InteractiveButtons";

export default function AboutPage() {
  return (
    <FadeOutTransition
      fallback={<AboutLoading />}
      detectionDelay={150} // 로딩 완료 후 150ms 대기
      fadeDuration={600} // 600ms 동안 fade
    >
      <main>
        <StickyArea style="AIChat" top={5.6}>
          <Typo tag="h2" style="heading-l">
            대출금의 용도는 무엇인가요?
          </Typo>
          <div className="flex gap-4 align-start justify-between">
            <Img
              src="/images/test/ai.png"
              alt="ai 비서"
              width={6}
              height={6.4}
              priority={true}
            />
            <ChatBubble position="left">
              안녕하세요! <br />
              소개 페이지에 오신 것을 환영합니다.
            </ChatBubble>
          </div>
        </StickyArea>
        <div className="p-5 flex flex-col gap-6">
          <Typo tag="p" style="body-m">
            이 페이지는 뒤로가기 버튼이 있고 우측에 편집 버튼이 있습니다.
          </Typo>

          <Counter />

          <StepModalButton />

          <PolicyForm />

          <PolicyList />

          <TestForm />

          {/* 회원가입 로직 */}
          <StepComponent />
        </div>

        <FixedArea style="base" bottom={0}>
          <BottomFixedButton />
        </FixedArea>
      </main>
    </FadeOutTransition>
  );
}
