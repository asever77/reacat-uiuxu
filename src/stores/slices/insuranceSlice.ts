import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InsuranceState {
  policies: Policy[];
  selectedPolicy: Policy | null;
  loading: boolean;
  error: string | null;
}

interface Policy {
  id: string;
  name: string;
  premium: number;
  coverage: number;
}

const initialState: InsuranceState = {
  policies: [
    // 테스트용 더미 데이터
    { id: "1", name: "자동차보험", premium: 500000, coverage: 10000000 },
    { id: "2", name: "건강보험", premium: 300000, coverage: 5000000 },
    { id: "3", name: "생명보험", premium: 800000, coverage: 20000000 },
  ],
  selectedPolicy: null,
  loading: false,
  error: null,
};

const insuranceSlice = createSlice({
  name: "insurance",
  initialState,
  reducers: {
    // 동기 액션들
    setPolicies: (state, action: PayloadAction<Policy[]>) => {
      state.policies = action.payload;
      state.loading = false;
    },
    selectPolicy: (state, action: PayloadAction<Policy>) => {
      state.selectedPolicy = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setPolicies, selectPolicy, setLoading, setError, clearError } =
  insuranceSlice.actions;
export default insuranceSlice.reducer;
