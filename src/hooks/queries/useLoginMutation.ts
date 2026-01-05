// src/hooks/useLoginMutation.ts
import { useMutation } from '@tanstack/react-query';
import type { LoginRequest, LoginResponse } from '@/apis/type';
import { useAuthStore } from '@/stores/authStore';
import { http } from '@/apis/http';

export const useLoginMutation = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await http.post<LoginResponse>('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      // Zustand store의 login 함수 호출
      login(data.accessToken, data.refreshToken, data.user);
    },
  });
};
