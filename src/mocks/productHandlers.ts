import { http, HttpResponse } from 'msw';

export const productHandlers = [
  // 모든 상품 목록 조회
  http.get('/api/products', () => {
    return HttpResponse.json([
      { id: 'p1', name: '노트북' },
      { id: 'p2', name: '키보드' },
    ]);
  }),
];