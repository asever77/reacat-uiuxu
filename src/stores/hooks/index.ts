import { useDispatch, useSelector, useStore } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "./index";

// 1. **가장 최신 권장 방식 (타입 안전한 버전):**
// 'useStore', 'useDispatch', 'useSelector'에 한 번에 타입을 바인딩합니다.
// 이 방식을 사용하면 아래의 개별 함수 정의가 필요 없습니다.

// 훅에 타입을 바인딩하여 타입 안전한 버전의 훅을 생성합니다.
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<AppStore>();
