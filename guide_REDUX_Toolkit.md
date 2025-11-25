# 🚀 Redux Toolkit (RTK)

- 설정 간소화: 스토어 설정, 미들웨어 추가 등이 configureStore 하나로 끝납니다.
  - configureStore : store를 생성하기 위해 제공하는 표준 함수
    - 설정의 단순화로 reducer를 합치는 combineReducers 과정을 자동 처리
    - 필수 미드웨어 기본 탑재
      - redux-thunk: 비동기 로직 처리 바로 사용 가능
      - Immutability Check: State 직접 변경 시 에러 알림
      - Serializability Check: 직렬화 불가능 값(Promise, Class instance)이 지정 방지
    - DevTools 자동 연동
- 불변성 관리 자동화: Immer 라이브러리 내장되어 코드로 작성해도 안전하게 불변성유지
  (예:store.value = 123)
- Duck Pattern의 진화: createSlice 하나의 함수로 관리

Redux Toolkit의 데이터 흐름을 시각적으로 이해하면 훨씬 쉽습니다.

1. Slice (슬라이스): 기능별로 상태와 리듀서(상태 변경 함수)를 묶어놓은 조각입니다. (예: userSlice, cartSlice)
2. Store (스토어): 애플리케이션의 모든 상태(State)가 저장되는 중앙 저장소입니다.
3. Provider (제공자): React 컴포넌트들이 스토어에 접근할 수 있게 감싸주는 래퍼입니다.
4. Hooks (훅):  
   useSelector: 스토어에서 값을 읽어올 때 사용합니다.  
   useDispatch: 상태를 변경하는 액션을 실행(Dispatch)할 때 사용합니다.

```bash
pnpm add @reduxjs/toolkit react-redux
pnpm add -D @types/react-redux
pnpm install redux-persist
```

## Redux 디렉토리 구조

```
📂.storybook
📂public
📂src
├──📂app
├──📂components
├──📂hooks
├──📂lib
├──📂mocks
│
├──📂providers
│  └──📄StoreProvider.tsx
├──📂stores
│  ├──📂hooks
│  │  └──📄index.ts
│  ├──📂slices
│  │  ├──📄{name}Slice.ts
│  │  └──📄{name}Slice.ts
│  └──📄index.ts
│
└──📂stories
```

## [로직] Slice (기능 정의) src/stores/slices/{name}Slice.ts

```ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/stores"; // 스토어 설정 파일에서 RootState 타입 가져오기

// 1. 타입 정의 (Type Definitions)
// API에서 받아올 사용자 데이터의 모양
export interface UserData {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

// 슬라이스에서 관리할 전체 상태의 모양
interface UserState {
  data: UserData | null;
  status: "idle" | "loading" | "succeeded" | "failed"; // 명확한 상태 관리
  error: string | null;
}

// 초기 상태값
const initialState: UserState = {
  data: null,
  status: "idle",
  error: null,
};

// 2. 비동기 액션 (Async Thunk)
// <반환값타입, 매개변수타입, { rejectValue: 에러타입 }>
export const fetchUserProfile = createAsyncThunk<
  UserData,
  string,
  { rejectValue: string }
>("user/fetchProfile", async (userId, { rejectWithValue }) => {
  try {
    // 실제 API 호출 (예시)
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );

    if (!response.ok) {
      throw new Error("서버 에러가 발생했습니다.");
    }

    const data = await response.json();
    return data as UserData; // 성공 시 payload로 전달됨
  } catch (error: any) {
    // 실패 시 에러 메시지를 payload로 전달
    return rejectWithValue(error.message || "알 수 없는 에러가 발생했습니다.");
  }
});

// 3. 슬라이스 생성 (Slice)
export const userSlice = createSlice({
  name: "user",
  initialState,
  // (1) 동기적인 액션 (클라이언트 내부 로직)
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
      state.status = "idle"; // 에러 확인 후 대기 상태로 복귀
    },
  },
  // (2) 비동기적인 액션 (외부 API 연동 등)
  extraReducers: (builder) => {
    builder
      // --- 요청 시작 (Loading) ---
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // --- 요청 성공 (Success) ---
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      // --- 요청 실패 (Fail) ---
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "네트워크 에러";
      });
  },
});

// 4. 액션 및 셀렉터 내보내기 (Export)

// 컴포넌트에서 사용할 동기 액션들
export const { logout, clearError } = userSlice.actions;

// 컴포넌트에서 데이터를 쉽게 꺼내기 위한 셀렉터(Selector)
// 사용법: const user = useAppSelector(selectUser);
export const selectUser = (state: RootState) => state.user.data;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;
```

## [등록] Store (저장소 생성 함수) src/stores/index.ts

```ts
// 추가 설치 필요: npm install redux-persist
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import insuranceReducer from "@/stores/slices/insuranceSlice";
import counterReducer from "@/stores/slices/counterSlice";
import userReducer from "@/stores/slices/userSlice";

// 1. makeStore 함수로 스토어 인스턴스를 생성하는 로직을 통합합니다.
export const makeStore = () => {
  const store = configureStore({
    reducer: {
      insurance: insuranceReducer,
      counter: counterReducer,
      user: userReducer,
    },
    // 미들웨어 설정은 makeStore 내부에서 처리합니다.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }),
  });

  // setupListeners도 makeStore 내부에서 처리합니다.
  setupListeners(store.dispatch);

  return store;
};

// 2. makeStore의 ReturnType을 기반으로 타입 별칭을 정의합니다.
// makeStore 함수의 반환 타입 (스토어 인스턴스)
export type AppStore = ReturnType<typeof makeStore>;
// RootState는 스토어의 getState 함수의 반환 타입에서 추론
export type RootState = ReturnType<AppStore["getState"]>;
// AppDispatch는 스토어의 dispatch 속성 타입에서 추론
// ⚠️ 주의: 일반적으로 Thunk 미들웨어 타입도 포함하여 정의합니다.
export type AppDispatch = AppStore["dispatch"];
```

## [정의] Hooks (타입 안전성 확보) src/stores/hooks/index.ts

```ts
import { useDispatch, useSelector, useStore } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "@/stores/";

// 1. **가장 최신 권장 방식 (타입 안전한 버전):**
// 'useStore', 'useDispatch', 'useSelector'에 한 번에 타입을 바인딩합니다.
// 이 방식을 사용하면 아래의 개별 함수 정의가 필요 없습니다.

// 훅에 타입을 바인딩하여 타입 안전한 버전의 훅을 생성합니다.
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<AppStore>();
```

## [주입] Provider (Next.js 연동 핵심) src/providers/StoreProvider.tsx

Lazy 초기화 함수로 해결 (Redux 공식 권장)

```tsx
"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/stores";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return <Provider store={storeRef.current!}>{children}</Provider>;
}
```

## [사용] (Layout 및 Component)src/app/layout.tsx

```tsx
import { Providers } from "@/providers/Providers";
<body>
  <Providers>{children}</Providers>
</body>;
```

## 저장 방식별 특징 비교

- **Redux 메모리**
  - 저장위치: 브라우저 RAM
  - 지속성:❌ 새로고침시 소실
  - 용량제한:🟡 메모리 한계
  - 보안성: ✅ 높음
  - 기기간 동기화: ❌ 불가능
  - 사용사례: 임시 UI 상태
- **Redux Persist (localStorage)**
  - 저장위치: 브라우저 디스크
  - 지속성:✅ 브라우저 종료해도 유지
  - 용량제한:🟡 ~10MB
  - 보안성:🟡 보통 (클라이언트)
  - 기기간 동기화: ❌ 불가능
  - 사용사례: 사용자 설정, 장바구니, 테마
- **Redux Persist (sessionStorage)**
  - 저장위치: 브라우저 메모리
  - 지속성:🟡 탭 닫으면 소실
  - 용량제한:🟡 ~10MB
  - 보안성:🟡 보통 (클라이언트)
  - 기기간 동기화: ❌ 불가능
  - 사용사례: 임시 폼 데이터
- **서버 세션**
  - 저장위치: 서버 DB/Redis
  - 지속성:✅ 기기 간 동기화
  - 용량제한:✅ 무제한
  - 보안성:✅ 높음 (서버)
  - 기기간 동기화: ✅ 가능
  - 사용사례: 인증 정보, 중요 데이터
