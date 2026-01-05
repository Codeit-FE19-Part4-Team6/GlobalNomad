// src/hooks/useLogoutMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { token } from '@/apis/auth/token';
import { http } from '@/apis/http';

export const useLogoutMutation = () => {
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // 서버 로그아웃 API가 있으면 호출
      await http.post('/auth/logout');
    },
    onSettled: () => {
      // ✅ 1. 토큰 제거
      token.clearTokens();

      // ✅ 2. axios 헤더 제거
      delete http.defaults.headers.common.Authorization;

      // ✅ 3. Zustand 상태 초기화
      logout();

      // ✅ 4. React Query 캐시 제거
      queryClient.clear();
    },
  });
};
