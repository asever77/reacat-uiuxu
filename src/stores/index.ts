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
