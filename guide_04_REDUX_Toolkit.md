# 🚀 Redux Toolkit (RTK) 설정

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

**Redux 메모리**

- 저장위치: 브라우저 RAM
- 지속성:❌ 새로고침시 소실
- 용량제한:🟡 메모리 한계
- 보안성: ✅ 높음
- 기기간 동기화: ❌ 불가능
- 사용사례: 임시 UI 상태
  **Redux Persist (localStorage)**
- 저장위치: 브라우저 디스크
- 지속성:✅ 브라우저 종료해도 유지
- 용량제한:🟡 ~10MB
- 보안성:🟡 보통 (클라이언트)
- 기기간 동기화: ❌ 불가능
- 사용사례: 사용자 설정, 장바구니, 테마
  **Redux Persist (sessionStorage)**
- 저장위치: 브라우저 메모리
- 지속성:🟡 탭 닫으면 소실
- 용량제한:🟡 ~10MB
- 보안성:🟡 보통 (클라이언트)
- 기기간 동기화: ❌ 불가능
- 사용사례: 임시 폼 데이터
  **서버 세션**
- 저장위치: 서버 DB/Redis
- 지속성:✅ 기기 간 동기화
- 용량제한:✅ 무제한
- 보안성:✅ 높음 (서버)
- 기기간 동기화: ✅ 가능
- 사용사례: 인증 정보, 중요 데이터

---

## [로직] Slice (기능 정의) src/stores/slices/{name}Slice.ts

```ts
// src/stores/slices/userSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// User 타입 정의
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// 1. 비동기 액션 생성 (Thunk)
// 첫 번째 인자: 액션 이름 ('user/fetchById'), 두 번째 인자: 비동기 함수
export const fetchUserById = createAsyncThunk(
  "user/fetchById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      if (!response.ok) {
        throw new Error("Server Error");
      }
      return (await response.json()) as User; // 타입 단언 추가
    } catch {
      return rejectWithValue("사용자를 찾을 수 없습니다."); // error 변수 제거
    }
  }
);

interface UserState {
  entity: User | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

// 현재 userSlice.ts의 상태
const initialState: UserState = {
  entity: null, // 🧠 메모리에 저장
  loading: "idle", // 🧠 메모리에 저장
  error: null, // 🧠 메모리에 저장
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 동기적인 액션은 여기에 (예: 로그아웃 시 데이터 초기화)
    resetUser: (state) => {
      state.entity = null;
    },
  },
  // 2. 비동기 액션의 상태 변화 감지
  extraReducers: (builder) => {
    builder
      // (1) 로딩 시작
      .addCase(fetchUserById.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      // (2) 성공
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.entity = action.payload; // Thunk에서 리턴한 데이터
      })
      // (3) 실패
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
```

## [등록] Store (저장소 생성 함수) src/stores/index.ts

```ts
// 추가 설치 필요: npm install redux-persist
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import userReducer from "@/stores/slices/userSlice";

// 1. makeStore 함수로 스토어 인스턴스를 생성하는 로직을 통합합니다.
export const makeStore = () => {
  const store = configureStore({
    reducer: {
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
import StoreProvider from "@/providers/StoreProvider";

<body>
  <StoreProvider>{children}</StoreProvider>
</body>;
```
