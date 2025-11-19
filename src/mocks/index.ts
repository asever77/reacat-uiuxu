import { userHandlers } from './userHandlers';
import { productHandlers } from './productHandlers';
// import { orderHandlers } from './orderHandlers'; // 추후 추가될 핸들러

// 모든 핸들러를 배열에 통합하여 export
export const handlers = [
  ...userHandlers,
  ...productHandlers,
  // ...orderHandlers,
];
