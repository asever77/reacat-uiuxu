# 🚀 프론트엔드 개발 환경 설치 가이드 (Next.js)

```bash
# 0. Node.js 24 LTS 버전 확인
node -v

# 1. pnpm 설치 : 효율적인 패키지 관리와 디스크 공간 절약을 위해 사용됩니다.
npm install -g pnpm

# 2. 새 프로젝트 생성
pnpm create next-app@latest my-project-1
- TypeScript? yes
- ESLint? yes
- TailwindCSS? yes
- src/ directory? yes
- App Router? yes
- import alias (@/\*)? yes

# 3. pnpm 설정 최적화 (Peer Dependencies 관리)
pnpm config set auto-install-peers true
pnpm config set strict-peer-dependencies true

# 4. Storybook 설치 및 설정
pnpm dlx storybook@latest init

# 5. MSW(Mock Service Worker) 설치 및 설정
pnpm add msw --save-dev
pnpm add msw msw-storybook-addon --save-dev
pnpm msw init public/ --save

# 6. Redux Toolkit (RTK) 설치 및 설정
pnpm add @reduxjs/toolkit react-redux
pnpm add -D @types/react-redux
pnpm install redux-persist

# 7. 웹폰트 설정 (Pretendard)
pnpm i pretendard

# 8. shadcn/ui 설치 및 컴포넌트 개별설치(예시)
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add accordion alert-dialog alert aspect-ratio avatar badge breadcrumb button-group button calendar card carousel chart checkbox collapsible command context-menu dialog drawer dropdown-menu empty field form hover-card input-group input-otp input item kbd label menubar native-select navigation-menu pagination popover progress radio-group resizable scroll-area select separator sheet sidebar skeleton slider sonner spinner switch table tabs textarea toggle-group toggle tooltip

# 9. Framer Motion을 사용한 Fade-In 애니메이션
pnpm add framer-motion

```

## tsconfig.json (타입스크립트 관련 설정)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "noUncheckedIndexedAccess": true,
    // 배열/객체 접근 시 undefined 체크 강제
    "noImplicitReturns": true,
    // 모든 코드 경로에서 return 강제
    "noFallthroughCasesInSwitch": true,
    // switch문 fallthrough 방지
    "exactOptionalPropertyTypes": true
    // 선택적 속성의 정확한 타입 체크
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
