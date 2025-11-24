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
