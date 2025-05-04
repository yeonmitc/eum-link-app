import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 브라우저 포커스시 재요청 방지
      retry: 1, // 실패 시 재시도 횟수
      staleTime: 1000 * 10, // 10초간은 fresh 상태 유지
    },
    mutations: {
      retry: 1,
    },
  },
});

export default queryClient;
