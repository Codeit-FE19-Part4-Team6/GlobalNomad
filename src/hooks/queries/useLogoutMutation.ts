// src/hooks/useLogoutMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
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
      delete http.defaults.headers.common.Authorization; // axios 헤더 제거

      logout(); //  Zustand 상태 초기화

      queryClient.clear(); // React Query 캐시 제거
    },
  });
};
